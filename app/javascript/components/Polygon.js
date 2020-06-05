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

export default Polygon;
