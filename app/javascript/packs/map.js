// Libs
import L from 'leaflet'
import axios from 'axios'
require('leaflet-draw')

// Utils
import showNotification from './utils/showNotification'

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

class Map {
  constructor() {
    this.map = L.map('map', {
      center: [38.680, -9.156],
      zoom: 13
    })
    this.editableLayers = new L.FeatureGroup();
    this.map.addLayer(this.editableLayers);

    this.configure()
  }

  configure() {
    let provider = this.previewProvider();
    provider.addTo(this.map)

    let drawControl = new L.Control.Draw(drawPluginOptions(this.editableLayers));

    this.map.zoomControl.setPosition('bottomright')
    this.map.addControl(drawControl);
    this.map.on('draw:created', this.polygonCreatedHandler);
    this.map.on('draw:editstop', this.saveClickedHandler);
  }

  polygonCreatedHandler = (event) => {
    if (Object.keys(this.editableLayers._layers).length === 1) {
      return showNotification("You can't have two polygons at the same time, please save previous before continue.")
    } else {
      this.editableLayers.addLayer(event.layer);
    }
  }

  point = (position) => {
    const { latitude, longitude } = position.coords

    this.map.panTo(new L.LatLng(latitude, longitude));
  }

  // NOTE: List of providers https://leaflet-extras.github.io/leaflet-providers/preview
  previewProvider() {
    return L.tileLayer('https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png', {
      maxZoom: 20,
      attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
    })
  }
}

export default Map;
