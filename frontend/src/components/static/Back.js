import React from 'react';
import { Link } from 'react-router-dom';

export default function Back({link}) {
  return (
    <Link to={link} className="back-button">
    Palaa
    </Link>
  );
}
