import React, { useState } from "react";

import { motion } from "framer-motion";

import "../assets/styles/accordionStyles.css";

const Toggle = ({ question, answer, isLast, link }) => {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <motion.div layout className="accordion-item">
      <motion.div
        layout
        className="accordion-top"
        onClick={() => setIsClicked(!isClicked)}
      >
        <div className="accordion-question">{question}</div>
        <div className="accordion-icon">
          <div
            className={`accordion-icon1 ${isClicked ? "selected" : ""}`}
          ></div>
          <div
            className={`accordion-icon2 ${isClicked ? "selected" : ""}`}
          ></div>
        </div>
      </motion.div>

      {isClicked ? <div className="accordion-answer">{answer}</div> : null}
      {!isLast ? <div className="accordion-line"></div> : null}
    </motion.div>
  );
};

export default Toggle;
