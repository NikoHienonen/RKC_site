import React from 'react'
import { Link } from 'react-router-dom';

export default () => {
  return (
    <div>
      <h1>Ylläpitäjä</h1>
      <Link to="/admin/adduser" >Lisää käyttäjä</Link>
    </div>
  )
}
