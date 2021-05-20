import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function Header() {
  const activeStyle = {
    color: "purple",
  };

  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">
              <img alt="Carved Rock Fitness" src="/images/logo.png" />
            </Link>
          </li>
          <li>
            <NavLink to="/shoes" activeStyle={activeStyle}>
              Shoes
            </NavLink>
          </li>
          <li>
            <NavLink to="/cart" activeStyle={activeStyle}>
              Cart
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
