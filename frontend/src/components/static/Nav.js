import React  from 'react';
import { NavLink } from 'react-router-dom';

export default function Nav(){
  return (
    <nav>
      <NavLink to="/" activeClassName='active'>Etusivu</NavLink>
      <NavLink to="/turnaukset" activeClassName='active'>Turnaukset</NavLink>
    </nav>
  );
}

