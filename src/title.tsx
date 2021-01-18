import React, { useState } from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import { Github } from "react-bootstrap-icons";

import { Rules } from "./rules";

export const Title: React.FC = (props) => {
  const [showRules, setShowRules] = useState(false);
  return (
    <>
      <Jumbotron style={{ padding: 10 }}>
        <h1>Permiscuchess</h1>
        <p>By Robbie Ostrow</p>
        <Button
          variant="outline-primary"
          size="sm"
          onClick={() => setShowRules(true)}
        >
          How to Play
        </Button>
        <a
          href="https://github.com/ostrowr/permiscuchess"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="outline-secondary" size="sm">
            <Github /> View source
          </Button>
        </a>
      </Jumbotron>
      <Rules show={showRules} onHide={() => setShowRules(false)} />
    </>
  );
};
