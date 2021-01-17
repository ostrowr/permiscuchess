import React, { useState } from "react";
import "./App.css";

import { PendingSpinner, PlayGameButton } from "./play-game-button";
import { GameResult } from "./engine/worker";
import RangeSlider from "react-bootstrap-range-slider";
import { Move } from "./engine/game";
import { ALL_POSSIBLE_MOVES } from "./engine/utils";
import { HistoryCard } from "./history/historyCard";
import { Title } from "./title";
import { StrategyCard } from "./strategy/strategyCard";
import { BoardCard } from "./board/boardCard";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function App() {
  const [games, setGames] = useState<GameResult[]>([]);

  const [currentGame, setCurrentGame] = useState<
    (GameResult & { gameIndex: number }) | null
  >(null);
  const [numCurrentlySimulating, setNumCurrentlySimulating] = useState(0);
  const [nGamesToSimulate, setNGamesToSimulate] = useState(1);
  const [strategy, setStrategy] = useState<Move[]>(ALL_POSSIBLE_MOVES);
  const [strategyFor, setStrategyFor] = useState<"w" | "b" | null>(null);

  return (
    <>
      <Container fluid>
        <Row>
          <Col>
            <Title />
          </Col>
        </Row>
        <Row>
          <Col>
            <BoardCard game={currentGame} />
          </Col>
          <Col>
            <StrategyCard
              strategy={strategy}
              setStrategy={setStrategy}
              strategyFor={strategyFor}
              setStrategyFor={setStrategyFor}
            />
          </Col>
          <Col>
            <HistoryCard
              games={games}
              setGames={setGames}
              setCurrentGame={setCurrentGame}
            />
          </Col>
        </Row>
        <Row>
          <Col>
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
                onChange={(e) =>
                  setNGamesToSimulate(parseInt(e.target.value, 10))
                }
                min={1}
                max={1000}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
