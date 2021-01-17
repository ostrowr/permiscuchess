import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

interface IProps {
  show: boolean;
  pgn: string | null;
  onHide: () => void;
}

export const PGNModal: React.FC<IProps> = (props) => {
  return (
    <Modal show={props.show} onHide={props.onHide}>
      <Modal.Header closeButton>
        <Modal.Title>PGN</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.pgn}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
