import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { GameResult } from "../engine/worker";
import Button from "react-bootstrap/Button";
import { HistoryTable } from "./historyTable";
import { StatsModal } from "./statsModal";
import { CSVLink } from "react-csv";

interface IProps {
  setGames: (games: GameResult[]) => void;
  games: GameResult[];
  setCurrentGame: (game: GameResult & { gameIndex: number }) => void;
}

export const HistoryCard: React.FC<IProps> = (props) => {
  const [statsModalOpen, setStatsModalOpen] = useState(false);

  // we don't really need to recompute this every time; investigate if
  // we should just compute everything when the download button is clicked!
  const csvHeaders = ["#", "Outcome", "By", "PGN"];
  const csvData = props.games.map((g, i) => [i, g.outcome, g.by, g.pgn]);
  return (
    <>
      <Card style={{ height: 500 }}>
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
              <CSVLink
                data={[csvHeaders, ...csvData]}
                filename={"permiscuchess-results.csv"}
              >
                <Button size="sm" variant="dark">
                  Download
                </Button>
              </CSVLink>
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
