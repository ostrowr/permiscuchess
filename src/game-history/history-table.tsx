import React from "react";
import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";
import { GameResult } from "../engine/worker";
import { Move } from "../engine/game";

// Should support
// * download
// * clear
// * get statistics
export const HistoryTable: React.FC<{
  games: GameResult[];
  onPgnClick: (pgn: string) => void;
  onViewStrategy: (strategy: Move[]) => void;
  onRowClick: (game: GameResult, gameNumber: number) => void;
}> = (props) => {
  const header = (
    <thead>
      <tr>
        <th>#</th>
        <th>Outcome</th>
        <th>By</th>
      </tr>
    </thead>
  );
  const rows = props.games.map((g, i) => {
    return (
      <tr key={i} onClick={() => props.onRowClick(g, i)}>
        <td>{i}</td>
        <td>{g.outcome}</td>
        <td>{g.by}</td>
      </tr>
    );
  });
  if (rows.length === 0) {
    return <Alert variant={"info"}>No games played yet!</Alert>;
  }

  return (
    <Table striped bordered hover size="sm">
      {header}
      <tbody>{rows.reverse()}</tbody>
    </Table>
  );
};
