import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { GameResult } from "../engine/worker";
import Button from "react-bootstrap/Button";
import { HistoryTable } from "./historyTable";
import { StatsModal } from "./statsModal";

interface IProps {
  setGames: (games: GameResult[]) => void;
  games: GameResult[];
  setCurrentGame: (game: GameResult & { gameIndex: number }) => void;
}

export const HistoryCard: React.FC<IProps> = (props) => {
  const [statsModalOpen, setStatsModalOpen] = useState(false);
  return (
    <>
      <Card style={{ width: 400 }}>
        <Card.Body>
          <Card.Title>History</Card.Title>
          <Card.Subtitle>All games played</Card.Subtitle>
          <Card.Text>
            <ButtonGroup>
              <Button
                onClick={() => props.setGames([])}
                size="sm"
                variant="info"
              >
                Clear
              </Button>
              <Button
                onClick={() => setStatsModalOpen(true)}
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
              games={props.games}
              onRowClick={(game: GameResult, gameIndex: number) =>
                props.setCurrentGame({ ...game, gameIndex })
              }
            />
          </div>
        </Card.Body>
      </Card>
      <StatsModal
        games={props.games}
        onHide={() => setStatsModalOpen(false)}
        show={statsModalOpen}
      />
    </>
  );
};
