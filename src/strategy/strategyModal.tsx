import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Move } from "../engine/game";
import { StrategyTable } from "./strategyTable";

interface IProps {
  show: boolean;
  strategy: Move[] | null;
  onHide: () => void;
}

export const StrategyModal: React.FC<IProps> = (props) => {
  return (
    <Modal show={props.show} onHide={props.onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Strategy</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          {props.strategy ? (
            <StrategyTable moves={props.strategy} draggable={false} />
          ) : null}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
