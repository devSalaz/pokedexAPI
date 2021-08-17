import React, { useState } from "react";
import "../assets/styles/footerStyles.css";

import {
  FaArtstation,
  FaYoutube,
  FaSnapchatGhost,
  FaGoogle,
} from "react-icons/fa";

import { IoCube, IoLogoYoutube } from "react-icons/io5";

const Footer = () => {
  const Year = new Date().getFullYear();
  const [colorFollow, setCollorFollow] = useState("oli");

  return (
    <footer>
      <div className="footer-container">
        <h3 className="follow-text">
          Follow me on&nbsp;
          <span className={`span-follow ${colorFollow}`}></span>
        </h3>
        <div className="social-container">
          <a
            href="https://www.artstation.com/elsalaz"
            target="_blank"
            rel="noreferrer"
          >
            <div
              className="social-icon"
              onMouseEnter={() => {
                setCollorFollow("artstation");
              }}
              onMouseLeave={() => {
                setCollorFollow("");
              }}
            >
              <div className="icon-shadow"></div>
              <FaArtstation className="footer-icon artstation" size="1.5em" />
            </div>
          </a>

          <a
            href="https://sketchfab.com/andressalazar264"
            target="_blank"
            rel="noreferrer"
          >
            <div
              className="social-icon"
              onMouseEnter={() => {
                setCollorFollow("sketchfab");
              }}
              onMouseLeave={() => {
                setCollorFollow("");
              }}
            >
              <div className="icon-shadow"></div>

              <IoCube className="footer-icon sketchfab" size="1.6em" />
            </div>
          </a>

          <a
            href="https://www.youtube.com/channel/UCJGU3eMq1dQGeSaP6E-vQgg"
            target="_blank"
            rel="noreferrer"
          >
            <div
              className="social-icon"
              onMouseEnter={() => {
                setCollorFollow("youtube");
              }}
              onMouseLeave={() => {
                setCollorFollow("");
              }}
            >
              <div className="icon-shadow"></div>
              <FaYoutube className="footer-icon youtube" size="1.5em" />
            </div>
          </a>

          <a
            href="https://lensstudio.snapchat.com/creator/LWN5S24hOgABsqIsqwdSGA"
            target="_blank"
            rel="noreferrer"
          >
            <div
              className="social-icon"
              onMouseEnter={() => {
                setCollorFollow("snapchat");
              }}
              onMouseLeave={() => {
                setCollorFollow("");
              }}
            >
              <div className="icon-shadow"></div>
              <FaSnapchatGhost className="footer-icon snapchat" size="1.5em" />
            </div>
          </a>
        </div>
        <p className="copyright-text">
          {`Copyright DevAndres ©${Year}. All rights reserved.`}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
