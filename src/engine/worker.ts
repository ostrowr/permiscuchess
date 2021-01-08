import { Permiscuchess, Move, Outcome } from "./game";
import { randomStrategy } from "./utils";

export type ChessWorkerInput = {
  whiteMoves: Move[] | undefined;
  blackMoves: Move[] | undefined;
};

export type ChessWorkerOutput = {
  outcome: Outcome;
  pgn: string;
  fen: string;
};

onmessage = (msg: MessageEvent<ChessWorkerInput>) => {
  const blackMoves = msg.data.blackMoves ?? randomStrategy();
  const whiteMoves = msg.data.whiteMoves ?? randomStrategy();

  const game = new Permiscuchess();
  const outcome = game.play(whiteMoves, blackMoves);
  const pgn = game.pgn();
  const fen = game.fen();
  // @ts-expect-error
  postMessage({ outcome, pgn, fen }); // TODO – change on production; maybe window.opener.location?
};
