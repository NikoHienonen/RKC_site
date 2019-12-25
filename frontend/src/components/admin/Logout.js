import React from 'react';

export default function Logout() {
  return (
    <button className="menu-item" onClick={() => {
      sessionStorage.clear();
      window.location.reload();
    }}>
      Kirjaudu ulos
    </button>
  );
}
