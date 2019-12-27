import React from 'react';
import { Link } from 'react-router-dom';

export default function MenuButton({ name, attribute }) {
  const url = `/turnaukset/${name}/muokkaa/${attribute}`;
  return (
    <button className="menu-button">
      <Link to={url}>{attribute}</Link>
    </button>
  );
}
