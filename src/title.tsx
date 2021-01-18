import React, { useState } from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";

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
      </Jumbotron>
      <Rules show={showRules} onHide={() => setShowRules(false)} />
    </>
  );
};
