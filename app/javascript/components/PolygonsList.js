import React from 'react';

const Polygon = ({
  id, created_at, selected, polygonSelected,
}) => (
  <a
    onClick={polygonSelected}
    className={selected && id === selected.id ? 'selected' : ''}
  >
    <b>ID: </b>
    <span>{id}</span>
    <br />
    <b>Added: </b>
    <span>{created_at}</span>
  </a>
);

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
