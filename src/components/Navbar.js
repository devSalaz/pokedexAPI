import React, { useState } from "react";

import { Link } from "react-router-dom";

import {
  TiSocialInstagramCircular,
  TiSocialLinkedinCircular,
  TiSocialGithubCircular,
} from "react-icons/ti";

import { FaArtstation } from "react-icons/fa";
//importing Assets
//Styles
import "../assets/styles/navbarStyles.css";
//Images
import Logo from "../assets/images/pokemonWhite-Logo.png";

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const showMenu = () => {
    if (!menu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    setMenu(!menu);
  };

  const setOverflow = () => {
    document.body.style.overflow = "auto";
  };

  return (
    <header>
      <nav>
        <div className="nav-container">
          <Link to="/" onClick={setOverflow}>
            <img src={Logo} className="logo" alt="logo"></img>
          </Link>

          <div className="social-links">
            <ul>
              <li>
                <a
                  href="https://www.instagram.com/el.salaz/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <TiSocialInstagramCircular className="nav-icon" size="2em" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/andres-salaz/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <TiSocialLinkedinCircular className="nav-icon" size="2em" />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/devSalaz"
                  target="_blank"
                  rel="noreferrer"
                >
                  <TiSocialGithubCircular className="nav-icon" size="2em" />
                </a>
              </li>
            </ul>
          </div>
          <div
            className={`menu-bars ${menu ? "change" : ""}`}
            onClick={showMenu}
          >
            <div className="bar1"></div>
            <div className="bar2"></div>
            <div className="bar3"></div>
          </div>
          <div className={`menu-links ${menu ? "change" : ""}`}>
            <ul>
              <li>
                <a
                  href="https://www.instagram.com/el.salaz/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <TiSocialInstagramCircular className="nav-icon" size="3em" />
                  <span>Instagram</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/andres-salaz/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <TiSocialLinkedinCircular className="nav-icon" size="3em" />
                  <span>Linkedin</span>
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/devSalaz"
                  target="_blank"
                  rel="noreferrer"
                >
                  <TiSocialGithubCircular className="nav-icon" size="3em" />
                  <span>Github</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
