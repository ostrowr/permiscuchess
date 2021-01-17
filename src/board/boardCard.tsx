import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Alert from "react-bootstrap/Alert";
import { GameResult } from "../engine/worker";
import Chessboard from "chessboardjsx";
import { PGNModal } from "./pgnModal";
import { StrategyModal } from "../strategy/strategyModal";
import { Move } from "../engine/game";

interface IProps {
  game: (GameResult & { gameIndex: number }) | null;
}

export const BoardCard: React.FC<IProps> = (props) => {
  const [pgnForModal, setPgnForModal] = useState<string | undefined>(undefined);
  const [strategyForModal, setStrategyForModal] = useState<Move[] | undefined>(
    undefined
  );
  if (!props.game) {
    return (
      <Card style={{ height: 500 }}>
        <Card.Body>
          <Card.Title>No game selected</Card.Title>
          <Alert variant={"info"}>
            Select a game from the "History" section
          </Alert>
        </Card.Body>
      </Card>
    );
  }
  return (
    <>
      <Card style={{ height: 500 }}>
        <Card.Body>
          <Card.Title>{`Game ${props.game.gameIndex}`}</Card.Title>
          <Card.Subtitle>{`${props.game.outcome} by ${props.game.by}`}</Card.Subtitle>
          <Card.Text>
            <ButtonGroup>
              <Button
                onClick={() => setPgnForModal(props.game?.pgn)}
                size="sm"
                variant="info"
              >
                PGN
              </Button>
              <Button
                onClick={() => setStrategyForModal(props.game?.whiteStrategy)}
                size="sm"
                variant="light"
              >
                White strategy
              </Button>
              <Button
                onClick={() => setStrategyForModal(props.game?.blackStrategy)}
                size="sm"
                variant="dark"
              >
                Black strategy
              </Button>
            </ButtonGroup>
          </Card.Text>
          <Chessboard
            width={358}
            draggable={false}
            position={props.game.fen}
            boardStyle={{
              borderRadius: "5px",
              boxShadow: `0 5px 15px rgba(0, 0, 0, 0.5)`,
            }}
          />
        </Card.Body>
      </Card>
      <PGNModal
        pgn={pgnForModal}
        onHide={() => setPgnForModal(undefined)}
        show={pgnForModal !== undefined}
      />
      <StrategyModal
        strategy={strategyForModal}
        onHide={() => setStrategyForModal(undefined)}
        show={strategyForModal !== undefined}
      />
    </>
  );
};
