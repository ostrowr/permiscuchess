import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

interface IProps {
  show: boolean;
  pgn: string | null;
  onHide: () => void;
}

export const PGNModal: React.FC<IProps> = (props) => {
  const [lichessLoading, setLichessLoading] = useState(false);
  return (
    <Modal show={props.show} onHide={props.onHide}>
      <Modal.Header closeButton>
        <Modal.Title>PGN</Modal.Title>
      </Modal.Header>

      <Modal.Body>{props.pgn}</Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => {
            if (props.pgn) {
              navigator.clipboard.writeText(props.pgn);
            }
            // TODO toast or alert
            console.log("copied");
          }}
        >
          Copy
        </Button>
        <Button
          variant="secondary"
          disabled={lichessLoading}
          onClick={async () => {
            setLichessLoading(true);
            const result = await fetch("https://lichess.org/api/import", {
              method: "POST",
              body: new URLSearchParams({ pgn: props.pgn! }),
            });
            const { url } = await result.json();
            setLichessLoading(false);
            window.open(url);
          }}
        >
          Open in Lichess
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
