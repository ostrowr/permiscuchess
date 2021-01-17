import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Move } from "../engine/game";
import { textToMove } from "./moveSerialization";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

interface IProps {
  show: boolean;
  strategy: Move[] | undefined;
  onHide: () => void;
  onSave: (moves: Move[]) => void;
}

const validateTextStrategy = (
  textStrategy: string | undefined
): Move[] | false => {
  if (!textStrategy) {
    return false;
  }
  const moves = textStrategy.split(/\s+/).filter((f) => f.length > 0);
  try {
    return moves.map(textToMove);
  } catch (e) {
    return false;
  }
};

export const EditStrategyModal: React.FC<IProps> = (props) => {
  const { strategy: strategyFromProps } = props;

  const [currStrategy, setCurrStrategy] = useState<string | undefined>(
    undefined
  );
  useEffect(() => {
    const strategyAsText = strategyFromProps
      ?.map((p) => [`${p.piece}:${p.destination}`])
      .join("\n");
    setCurrStrategy(strategyAsText);
  }, [strategyFromProps]);

  const validStrategy = validateTextStrategy(currStrategy);
  return (
    <>
      <Modal show={props.show} onHide={props.onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Strategy</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col>TODO</Col>
              <Col>
                <textarea
                  value={currStrategy}
                  onChange={(e) => setCurrStrategy(e.target.value)}
                  rows={20}
                  placeholder="paste strategy here"
                  spellCheck={false}
                ></textarea>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            disabled={!validStrategy}
            onClick={() => {
              if (!validStrategy) {
                return;
              }
              props.onSave(validStrategy);
            }}
          >
            {validStrategy ? "Save" : "Invalid strategy"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
