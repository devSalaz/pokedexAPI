import React, { useState } from "react";

import EveeImage from "../assets/images/pokedex-render-1024.png";
import MonocleImage from "../assets/images/emojis/monocle.png";
import { dataAccordion } from "../components/utils/dataAccordion";

import Toggle from "../components/Toggle";
import { AnimateSharedLayout } from "framer-motion";

import "../assets/styles/accordionStyles.css";

const Accordion = () => {
  const [clicked, setClicked] = useState(false);

  const toggle = (index) => {
    if (clicked === index) {
      return setClicked(null);
    }

    setClicked(index);
  };

  return (
    <>
      <div className="accordion-section">
        <div className="accordion-container">
          <img
            src={EveeImage}
            alt="evee-reference"
            className="accordion-image"
          />
          <AnimateSharedLayout>
            <div className="accordion-div">
              <h3 className="accordion-tittle">
                FAQ
                <span>
                  {" "}
                  <img
                    src={MonocleImage}
                    className="monocle-emoji"
                    alt="monocle-emoji"
                  />
                </span>
              </h3>
              <h5 className="accordion-subtittle">
                This is a personal project with the only purpose to learn and
                practice how to combine Three JS and Html worlds.
              </h5>
              <div className="accordion-wrapper">
                {dataAccordion.map((item, index) => {
                  return (
                    <Toggle
                      question={item.question}
                      answer={item.answer}
                      isLast={item.isLast}
                      link={item.link}
                      key={index}
                    />
                  );
                })}
              </div>
            </div>
          </AnimateSharedLayout>
        </div>
      </div>
    </>
  );
};

export default Accordion;
