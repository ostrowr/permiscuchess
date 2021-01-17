import React, { useState } from "react";
import "./App.css";
import Chessboard from "chessboardjsx";

import { PendingSpinner, PlayGameButton } from "./play-game-button";
import { GameResult } from "./engine/worker";
import { PGNModal } from "./chess-metadata-containers/pgnModal";
import RangeSlider from "react-bootstrap-range-slider";
import { Move } from "./engine/game";
import { StrategyModal } from "./strategy/strategyModal";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Alert from "react-bootstrap/Alert";
import { ALL_POSSIBLE_MOVES } from "./engine/utils";
import { HistoryCard } from "./history/historyCard";
import { Title } from "./title";
import { StrategyCard } from "./strategy/strategyCard";

function App() {
  const [games, setGames] = useState<GameResult[]>([]);

  const [pgnForModal, setPgnForModal] = useState<string | null>(null);
  const [strategyForModal, setStrategyForModal] = useState<Move[] | null>(null);
  const [currentGame, setCurrentGame] = useState<
    (GameResult & { gameIndex: number }) | null
  >(null);
  const [numCurrentlySimulating, setNumCurrentlySimulating] = useState(0);
  const [nGamesToSimulate, setNGamesToSimulate] = useState(1);
  const [strategy, setStrategy] = useState<Move[]>(ALL_POSSIBLE_MOVES);
  const [strategyFor, setStrategyFor] = useState<"w" | "b" | null>(null);
  // TODO factor out each card type
  const gameCard = currentGame ? (
    <Card style={{ width: 400 }}>
      <Card.Body>
        <Card.Title>{`Game ${currentGame.gameIndex}`}</Card.Title>
        <Card.Subtitle>{`${currentGame?.outcome} by ${currentGame?.by}`}</Card.Subtitle>
        <Card.Text>
          <ButtonGroup>
            <Button
              onClick={() => setPgnForModal(currentGame.pgn)}
              size="sm"
              variant="info"
            >
              PGN
            </Button>
            <Button
              onClick={() => setStrategyForModal(currentGame.whiteStrategy)}
              size="sm"
              variant="light"
            >
              White strategy
            </Button>
            <Button
              onClick={() => setStrategyForModal(currentGame.blackStrategy)}
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
          position={currentGame?.fen ?? "start"}
          boardStyle={{
            borderRadius: "5px",
            boxShadow: `0 5px 15px rgba(0, 0, 0, 0.5)`,
          }}
        />
      </Card.Body>
    </Card>
  ) : (
    <Card style={{ width: 400, height: 500 }}>
      <Card.Body>
        <Card.Title>No game selected</Card.Title>
        <Alert variant={"info"}>Select a game from the "History" section</Alert>
      </Card.Body>
    </Card>
  );

  // TODO use rows/columns instead from bootstrap layout
  return (
    <>
      <Title />
      <div style={{ marginBottom: 20, marginLeft: 30 }}>
        <div style={{ display: "flex" }}>
          {gameCard}
          <StrategyCard
            strategy={strategy}
            setStrategy={setStrategy}
            strategyFor={strategyFor}
            setStrategyFor={setStrategyFor}
          />
          <HistoryCard
            games={games}
            setGames={setGames}
            setCurrentGame={setCurrentGame}
          />
        </div>
        <PlayGameButton
          nGamesToSimulate={nGamesToSimulate}
          onGameComplete={(gameResult) => {
            setGames((games) => {
              return [...games, gameResult];
            });
            setNumCurrentlySimulating((prev) => prev - 1);
          }}
          onSimulationStart={() =>
            setNumCurrentlySimulating((prev) => prev + 1)
          }
          strategies={{
            blackMoves: strategyFor === "b" ? strategy : undefined,
            whiteMoves: strategyFor === "w" ? strategy : undefined,
          }}
        />
        <PendingSpinner nPending={numCurrentlySimulating} />
        <div style={{ width: 150 }}>
          <RangeSlider
            value={nGamesToSimulate}
            onChange={(e) => setNGamesToSimulate(parseInt(e.target.value, 10))}
            min={1}
            max={1000}
          />
        </div>
        <PGNModal
          pgn={pgnForModal}
          onHide={() => setPgnForModal(null)}
          show={pgnForModal !== null}
        />
        <StrategyModal
          strategy={strategyForModal}
          onHide={() => setStrategyForModal(null)}
          show={strategyForModal !== null}
        />
      </div>
    </>
  );
}

export default App;
