import { Move, PieceId, PieceIds, Squares, Square } from "../engine/game";

export const moveToText = (m: Move): string => {
  return `${m.piece}:${m.destination}`;
};

function assertValidPiece(piece: string): asserts piece is PieceId {
  if (!PieceIds.includes(piece as PieceId)) {
    throw new Error(`Invalid piece identifier: ${piece}`);
  }
}

function assertValidSquare(square: string): asserts square is Square {
  if (!Squares.includes(square as Square)) {
    throw new Error(`Invalid square: ${square}`);
  }
}

export const textToMove = (t: string): Move => {
  const [piece, destination] = t.split(":");
  assertValidPiece(piece);
  assertValidSquare(destination);
  return {
    piece,
    destination,
  };
};
