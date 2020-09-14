import React from "react";
import { NavLink } from "react-router-dom";
import Logout from "../admin/Logout";

export default function Nav() {
  const authData = sessionStorage.getItem("currentAuthData");
  const onClick = (e) => {
    if (e.target.className !== "unclickable") {
      let checked = document.querySelector(".toggler").checked;
      if (checked === true) {
        document.querySelector(".toggler").checked = false;
      }
    }
  };
  return (
    <div className="menu-wrap">
      <input type="checkbox" className="toggler" />
      <div className="hamburger">
        <div></div>
      </div>
      <div className="menu">
        <div>
          <div>
            <ul onClick={onClick}>
              <li>
                <NavLink
                  to="/koti"
                  className="menu-item"
                  activeClassName="active"
                >
                  Etusivu
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/turnaukset"
                  className="menu-item"
                  activeClassName="active"
                >
                  Turnaukset/Sarjat
                </NavLink>
              </li>
              {authData ? (
                <li>
                  <NavLink
                    to="/admin/vaihda-salasana"
                    className="menu-item"
                    activeClassName="active"
                  >
                    Vaihda salasana
                  </NavLink>
                </li>
              ) : null}
              <li>
                {authData ? (
                  <Logout />
                ) : (
                  <NavLink
                    to="/kirjaudu"
                    className="menu-item"
                    activeClassName="active"
                  >
                    Kirjaudu
                  </NavLink>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
