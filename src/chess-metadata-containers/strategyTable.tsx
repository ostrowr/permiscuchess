import React from "react";
import BaseTable, { Column } from "react-base-table";
import { Move, PieceId } from "../engine/game";

interface IProps {
  moves: Move[];
  draggable: boolean; // todo!! https://autodesk.github.io/react-base-table/examples/draggable-rows
}

export const StrategyTable: React.FC<IProps> = (props) => {
  const data = props.moves.map((move, ix) => {
    return {
      id: ix + 1,
      piece: <strong>{pieceToDisplayName(move.piece)}</strong>,
      destination: <strong>{move.destination}</strong>,
    };
  });
  return (
    <BaseTable data={data} width={360} height={350}>
      <Column key="id" dataKey="id" width={100} title={"Turn"} />
      <Column key="piece" dataKey="piece" width={100} title={"Piece"} />
      <Column
        key="destination"
        dataKey="destination"
        width={100}
        title={"Destination"}
      />
    </BaseTable>
  );
};

const pieceToDisplayName = (p: PieceId) => {
  const letterToPiece: { [k: string]: string } = {
    n: "Knight",
    q: "Queen",
    p: "Pawn",
    r: "Rook",
    b: "Bishop",
    k: "King",
  };
  const pieceType = letterToPiece[p[0]];
  if (p.length === 1) {
    return pieceType;
  }
  return `${pieceType} (${p[1]})`;
};
