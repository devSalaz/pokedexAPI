import React from "react";

import { FaLongArrowAltRight } from "react-icons/fa";

import "../assets/styles/heroStyles.css";

const HeroSection = () => {
  return (
    <div className="hero-section">
      <div className="hero-div">
        <div className="circle-hero1"></div>
        <div className="circle-hero2"></div>
        <div className="hero-left">
          <h2>
            Pokedex API, <br />
            React and Three JS
          </h2>
          <a
            href="https://www.artstation.com/elsalaz"
            target="_blank"
            className="hero-button"
          >
            {" "}
            Check Portfolio &nbsp;
            <span>
              <FaLongArrowAltRight />
            </span>
          </a>
        </div>
        <div className="hero-right">
          <div className="gengar-container"></div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
