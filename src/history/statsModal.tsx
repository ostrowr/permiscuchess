import React from "react";
import { GameResult } from "../engine/worker";
import Plot from "react-plotly.js";
import Modal from "react-bootstrap/Modal";
import Jumbotron from "react-bootstrap/Jumbotron";

interface IProps {
  games: GameResult[];
  show: boolean;
  onHide: () => void;
}

export const StatsModal: React.FC<IProps> = (props) => {
  const nWhiteWins = props.games.filter((p) => p.outcome === "White wins")
    .length;
  const nBlackWins = props.games.filter((p) => p.outcome === "Black wins")
    .length;
  const nDraws = props.games.filter((p) => p.outcome === "Draw").length;

  const whitePercentage = ((nWhiteWins * 100) / props.games.length).toFixed(1);
  const blackPercentage = ((nBlackWins * 100) / props.games.length).toFixed(1);
  const drawPercentage = ((nDraws * 100) / props.games.length).toFixed(1);

  const checkmate = {
    x: ["White wins", "Black wins"],
    y: [nWhiteWins, nBlackWins],
    name: "checkmate/forfeit",
    type: "bar" as const,
  };

  const fiftyMoveRule = {
    x: ["Draw"],
    y: [props.games.filter((p) => p.by === "fifty move rule").length],
    name: "fifty move rule",
    type: "bar" as const,
  };

  const stalemate = {
    x: ["Draw"],
    y: [props.games.filter((p) => p.by === "stalemate").length],
    name: "stalemate",
    type: "bar" as const,
  };

  const insufficientMaterial = {
    x: ["Draw"],
    y: [props.games.filter((p) => p.by === "insufficient material").length],
    name: "insufficient material",
    type: "bar" as const,
  };

  const threefold = {
    x: ["Draw"],
    y: [props.games.filter((p) => p.by === "threefold repetition").length],
    name: "threefold repetiion",
    type: "bar" as const,
  };

  const data = [
    checkmate,
    fiftyMoveRule,
    stalemate,
    insufficientMaterial,
    threefold,
  ];

  const layout = {
    barmode: "stack",
    width: 480,
  } as const;

  return (
    <Modal show={props.show} onHide={props.onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Stats</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.games.length > 0 ? (
          <>
            <Jumbotron style={{ padding: 10 }}>
              <h4>
                White: {whitePercentage}%; Black: {blackPercentage}%; Draw:{" "}
                {drawPercentage}%
              </h4>
            </Jumbotron>
            <Plot data={data} layout={layout} />
          </>
        ) : (
          <Jumbotron style={{ padding: 10 }}>
            <h4>No games played</h4>
          </Jumbotron>
        )}
      </Modal.Body>
    </Modal>
  );
};
