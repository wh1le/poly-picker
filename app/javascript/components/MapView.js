import React, { Component } from 'react';
import axios from 'axios'

import PolygonsList from './PolygonsList'
import Map from './Map'

class MapView extends Component {
  constructor(props){ 
    super(props)

    this.state = {
      polygons: [],
      selected: undefined
    }
  }

  componentDidMount() {
    axios.get('/api/polygons').then(response => {
      this.setState({
        ...this.state,
        selected: response.data[0],
        polygons: response.data
      })
    })
  }

  polygonSavedHandler = (geoJSON) => {
    axios.post('/api/polygons', { polygon: geoJSON  }).then(response => {
      this.setState({
        ...this.state,
        polygons: [response.data, ...this.state.polygons],
        selected: response.data
      })
    })
  }

  polygonSelectedHandler = (selected) => {
    this.setState({
      ...this.state,
      selected: selected
    })
  }

  deleteButtonPressedHandler = () => {
    this.setState({
      ...this.state,
      selected: undefined
    })
  }

  render() {
    const { selected, polygons } = this.state

    return (
      <div className="map-container">
        <Map 
          poligonSaved={this.polygonSavedHandler} 
          currentPolygon={this.currentPolygon}
          deleteButtonPressed={this.deleteButtonPressedHandler}
          selected={selected}
        />
        <div className="workarea">
          <h2> Polygons </h2>
          <PolygonsList 
            selected={selected}
            polygons={polygons} 
            polygonSelected={this.polygonSelectedHandler}
          />
        </div>
      </div>
    )
  }
}

export default MapView;
