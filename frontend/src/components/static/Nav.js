import React  from 'react';
import { NavLink } from 'react-router-dom';

export default function Nav(){
  return (
    <nav>
      <NavLink to="/">Etusivu</NavLink>
      <NavLink to="/turnaukset">Turnaukset</NavLink>
    </nav>
  );
}

