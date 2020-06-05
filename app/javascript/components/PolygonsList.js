import React from 'react';

import Polygon from './Polygon'

const polygonsList = ({ polygons, selected, polygonSelected }) => (
  <div className="polygons-list">
    {polygons.map((polygon) => (
      <Polygon
        key={polygon.id}
        polygonSelected={() => polygonSelected(polygon)}
        {...polygon}
        selected={selected}
      />
    ))}
  </div>
);

export default polygonsList;
