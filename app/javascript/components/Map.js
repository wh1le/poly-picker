import React, { Component } from 'react';

import L from 'leaflet'
require('leaflet-draw')

import showNotification from '../utils/showNotification';

const drawPluginOptions = (layersProvider) => {
  return {
    position: 'topright',
    draw: {
      polygon: {
        allowIntersection: false,
        drawError: {
          color: '#e1e100',
          message: '<strong>Oh snap!<strong> you can\'t draw that!'
        },
        shapeOptions: {
          color: '#97009c'
        }
      },
      polyline: false,
      circle: false, 
      circlemarker: false,
      rectangle: false,
      marker: false,
    },
    edit: {
      featureGroup: layersProvider,
      remove: true
    }
  }
}

class Map extends Component {
  constructor(props) {
    super(props)

    this.editableLayers = new L.FeatureGroup();
  }

  componentDidMount() {
    this.map = L.map('map', {
      center: [38.680, -9.156],
      zoom: 13
    })

    this.map.addLayer(this.editableLayers);

    let provider = L.tileLayer('https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png', {
      maxZoom: 20,
      attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
    })
    provider.addTo(this.map)

    let drawControl = new L.Control.Draw(drawPluginOptions(this.editableLayers));

    this.map.zoomControl.setPosition('bottomright')
    this.map.addControl(drawControl);

    this.map.on('draw:created', this.polygonAddedHandler);
    this.map.on('draw:edited', this.polygonSavedHandler.bind(this));
    this.map.on('draw:deleted', this.props.deleteButtonPressed)
  }

  point = (position) => {
    const { latitude, longitude } = position.coords

    this.map.panTo(new L.LatLng(latitude, longitude));
  }

  polygonSavedHandler = (event) => {
    console.log(event)
    const geoJSON = Object.values(this.editableLayers._layers)[0].toGeoJSON()

    this.props.poligonSaved(geoJSON)
  }

  polygonAddedHandler = (event) => {
    if (Object.keys(this.editableLayers._layers).length === 1) {
      return showNotification("You can't have two polygons at the same time, please save or clear previous one.")
    } else {
      this.editableLayers.addLayer(event.layer);
    }
  }

  removeLastPolygonFromLayer = () => {
    let keys = Object.keys(this.editableLayers._layers)

    if(keys.length === 0) return

    this.editableLayers.removeLayer(Math.max(keys))
  }

  assignSelectedPolygon = () => {
    this.removeLastPolygonFromLayer()

    this.editableLayers.addLayer(
      L.geoJson(this.props.selected.value)
    )
  }

  render() {
    if(this.props.selected) this.assignSelectedPolygon()

    return (
      <div id="map" selected={this.props.selected}/>
    )
  }
}

export default Map;
