import React, { useState } from "react";
import "./App.css";
import Chessboard from "chessboardjsx";

// todo move to index
import "bootstrap/dist/css/bootstrap.min.css";
import "react-base-table/styles.css";
import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";

import { HistoryTable } from "./game-history/history-table";
import {
  PendingSpinner,
  PlayGameButton,
} from "./game-history/play-game-button";
import { GameResult } from "./engine/worker";
import { PGNModal } from "./chess-metadata-containers/pgnModal";
import RangeSlider from "react-bootstrap-range-slider";
import { Move } from "./engine/game";
import { StrategyModal } from "./chess-metadata-containers/strategyModal";
import Jumbotron from "react-bootstrap/Jumbotron";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Alert from "react-bootstrap/Alert";
import { StrategyTable } from "./chess-metadata-containers/strategyTable";
import { ALL_POSSIBLE_MOVES, randomStrategy } from "./engine/utils";

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
      <Jumbotron style={{ padding: 10 }}>
        <h1>Permiscuchess</h1>
        <p>TODOTODO</p>
      </Jumbotron>

      <div style={{ marginBottom: 20, marginLeft: 30 }}>
        <div style={{ display: "flex" }}>
          {gameCard}
          <Card style={{ width: 400 }}>
            <Card.Body>
              <Card.Title>Strategy</Card.Title>
              <Card.Subtitle>
                Setting strategy for{" "}
                <span
                  style={{ color: "gray", cursor: "pointer" }}
                  onClick={() =>
                    setStrategyFor((prev) =>
                      prev === "w" ? "b" : prev === "b" ? null : "w"
                    )
                  }
                >
                  {strategyFor === "w"
                    ? "white"
                    : strategyFor === "b"
                    ? "black"
                    : "neither player"}
                </span>
              </Card.Subtitle>
              <Card.Text>
                <ButtonGroup>
                  <Button
                    size="sm"
                    onClick={() => setStrategy(randomStrategy())}
                    variant="info"
                  >
                    Randomize
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => console.log("TODO")}
                    variant="light"
                  >
                    Import
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => console.log("TODO")}
                    variant="dark"
                  >
                    Export
                  </Button>
                </ButtonGroup>
              </Card.Text>
              {strategyFor !== null ? (
                <StrategyTable moves={strategy} draggable={true} />
              ) : (
                <Alert variant={"info"}>
                  Both players are playing randomly. Click "neither player"
                  above to set a strategy for Black or White.
                </Alert>
              )}
            </Card.Body>
          </Card>
          <Card style={{ width: 400 }}>
            <Card.Body>
              <Card.Title>History</Card.Title>
              <Card.Subtitle>All games played</Card.Subtitle>
              <Card.Text>
                <ButtonGroup>
                  <Button onClick={() => setGames([])} size="sm" variant="info">
                    Clear
                  </Button>
                  <Button
                    onClick={() => console.log("TODO")}
                    size="sm"
                    variant="light"
                  >
                    Stats
                  </Button>
                  <Button
                    onClick={() => console.log("TODO")}
                    size="sm"
                    variant="dark"
                  >
                    Download
                  </Button>
                </ButtonGroup>
              </Card.Text>
              <div style={{ maxHeight: 350, overflow: "scroll" }}>
                <HistoryTable
                  games={games}
                  onPgnClick={(pgn: string) => setPgnForModal(pgn)}
                  onViewStrategy={(strategy: Move[]) =>
                    setStrategyForModal(strategy)
                  }
                  onRowClick={(game: GameResult, gameIndex: number) =>
                    setCurrentGame({ ...game, gameIndex })
                  }
                />
              </div>
            </Card.Body>
          </Card>
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
