import Chess, { ChessInstance } from "chess.js";

// Unique identifiers for all 16 pieces. `pa` represents the pawn that starts on
// the a file, even if it moves to a different file (or is promoted) later in the game.
export type PieceId = typeof PieceIds[number];
export const PieceIds = [
  "pa",
  "pb",
  "pc",
  "pd",
  "pe",
  "pf",
  "pg",
  "ph",
  "ra",
  "rh",
  "nb",
  "ng",
  "bc",
  "bf",
  "k",
  "q",
] as const;

export type Square = typeof Squares[number];
export const Squares = [
  "a8",
  "b8",
  "c8",
  "d8",
  "e8",
  "f8",
  "g8",
  "h8",
  "a7",
  "b7",
  "c7",
  "d7",
  "e7",
  "f7",
  "g7",
  "h7",
  "a6",
  "b6",
  "c6",
  "d6",
  "e6",
  "f6",
  "g6",
  "h6",
  "a5",
  "b5",
  "c5",
  "d5",
  "e5",
  "f5",
  "g5",
  "h5",
  "a4",
  "b4",
  "c4",
  "d4",
  "e4",
  "f4",
  "g4",
  "h4",
  "a3",
  "b3",
  "c3",
  "d3",
  "e3",
  "f3",
  "g3",
  "h3",
  "a2",
  "b2",
  "c2",
  "d2",
  "e2",
  "f2",
  "g2",
  "h2",
  "a1",
  "b1",
  "c1",
  "d1",
  "e1",
  "f1",
  "g1",
  "h1",
] as const;

// Mapping from each piece to the square where it currently resides (or null if it has been taken)
type Position = { [k in PieceId]: Square | null };

export interface Move {
  piece: PieceId;
  destination: Square;
}

export type Outcome =
  | {
      outcome: "white wins" | "black wins";
      reason: "checkmate" | "forfeit";
    }
  | {
      outcome: "draw";
      reason:
        | "threefold repetition"
        | "stalemate"
        | "insufficient material"
        | "fifty move rule";
    };

export class Permiscuchess {
  private game: ChessInstance;
  private positions: { w: Position; b: Position };

  constructor() {
    this.game = new ((Chess as unknown) as typeof Chess.Chess)(); // types are wrong here

    const WHITE_START: Position = {
      pa: "a2",
      pb: "b2",
      pc: "c2",
      pd: "d2",
      pe: "e2",
      pf: "f2",
      pg: "g2",
      ph: "h2",
      ra: "a1",
      rh: "h1",
      nb: "b1",
      ng: "g1",
      bc: "c1",
      bf: "f1",
      k: "e1",
      q: "d1",
    };

    const BLACK_START: Position = {
      pa: "a7",
      pb: "b7",
      pc: "c7",
      pd: "d7",
      pe: "e7",
      pf: "f7",
      pg: "g7",
      ph: "h7",
      ra: "a8",
      rh: "h8",
      nb: "b8",
      ng: "g8",
      bc: "c8",
      bf: "f8",
      k: "e8",
      q: "d8",
    };

    this.positions = {
      [this.game.WHITE]: WHITE_START,
      [this.game.BLACK]: BLACK_START,
    };
  }

  private move(mv: Move) {
    const turn = this.game.turn();
    const position = this.positions[turn];
    const oldPosition = position[mv.piece];
    if (!oldPosition) {
      return false;
    }

    const destinationIsOnLastRank =
      mv.destination.endsWith("1") || mv.destination.endsWith("8");
    const isPawn = this.game.get(oldPosition)?.type === "p";
    const moveResult = this.game.move({
      from: oldPosition,
      to: mv.destination,
      promotion: destinationIsOnLastRank && isPawn ? "q" : undefined,
    });
    if (!moveResult) {
      return false;
    }
    position[mv.piece] = mv.destination;
    return true;
  }

  public play(whiteMoves: Move[], blackMoves: Move[]): Outcome {
    const moves = {
      [this.game.WHITE]: {
        ix: 0,
        moves: whiteMoves,
      },
      [this.game.BLACK]: {
        ix: 0,
        moves: blackMoves,
      },
    };
    while (!this.game.game_over()) {
      const turn = this.game.turn();
      const availableMoves = this.game.moves({ verbose: true });
      let nLoopsAround = 0;
      while (true) {
        const moveIx = moves[turn]["ix"];
        const move = moves[turn]["moves"][moveIx];
        moves[turn]["ix"] += 1;
        moves[turn]["ix"] %= moves[turn]["moves"].length;
        if (moves[turn]["ix"] === 0) {
          nLoopsAround++; // if we hit move 0 twice before moving on to the next player, we weren't able to make a move. That's a forfeit.
        }
        if (nLoopsAround === 2) {
          return {
            outcome: this.game.turn() === "w" ? "black wins" : "white wins",
            reason: "forfeit",
          };
        }
        if (
          availableMoves.find(
            (m) =>
              m.from === this.positions[turn][move.piece] &&
              m.to === move.destination
          )
        ) {
          this.move(move);
          break;
        }
      }
    }

    if (this.game.in_checkmate()) {
      return {
        outcome: this.game.turn() === "w" ? "black wins" : "white wins",
        reason: "checkmate",
      };
    }
    return {
      outcome: "draw",
      reason: this.game.in_threefold_repetition()
        ? "threefold repetition"
        : this.game.in_stalemate()
        ? "stalemate"
        : this.game.insufficient_material()
        ? "insufficient material"
        : "fifty move rule",
    };
  }

  public fen() {
    return this.game.fen();
  }

  public pgn() {
    return this.game.pgn();
  }
}
