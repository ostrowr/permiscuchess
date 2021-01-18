import { Permiscuchess, Move } from "./game";
import { randomStrategy } from "./utils";

export type ChessWorkerInput = {
  whiteMoves: Move[] | undefined;
  blackMoves: Move[] | undefined;
};

export interface GameResult {
  outcome: "White wins" | "Black wins" | "Draw";
  by:
    | "threefold repetition"
    | "stalemate"
    | "insufficient material"
    | "fifty move rule"
    | "checkmate"
    | "forfeit";
  whiteStrategy: Move[];
  blackStrategy: Move[];
  fen: string;
  pgn: string;
}

onmessage = (msg: MessageEvent<ChessWorkerInput>) => {
  const blackStrategy = msg.data.blackMoves ?? randomStrategy();
  const whiteStrategy = msg.data.whiteMoves ?? randomStrategy();

  const game = new Permiscuchess();
  const result = game.play(whiteStrategy, blackStrategy);

  const messageToReturn: GameResult = {
    pgn: game.pgn(),
    fen: game.fen(),
    whiteStrategy,
    blackStrategy,
    outcome:
      result.outcome === "draw"
        ? "Draw"
        : result.outcome === "white wins"
        ? "White wins"
        : "Black wins",
    by: result.reason,
  };
  // @ts-expect-error
  postMessage(messageToReturn); // TODO – change on production; maybe window.opener.location?
};
