import React from 'react';

import Nav from './Nav.js';

const Header = () => {
  return (
    <header>
      <img src="/assets/img/logo.png"/>
      <h1>RKC-Volley</h1>
      <Nav/>
    </header>
  );
};

export default Header;