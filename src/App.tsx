import React, { useState, useEffect } from "react";
import "./App.css";
import Chessboard from "chessboardjsx";
import type { ChessWorkerOutput } from "./engine/worker";
// @ts-expect-error
// eslint-disable-next-line import/no-webpack-loader-syntax
import Worker from "worker-loader!./engine/worker.ts";

const Board: React.FC = () => {
  // const [worker, setWorker] = useState<Worker>();
  const [fen, setFen] = useState("start");

  useEffect(() => {
    const worker = new Worker();
    worker.onmessage = (msg: MessageEvent<ChessWorkerOutput>) => {
      setFen(msg.data.fen);
      console.log(msg.data.outcome);
      console.log(msg.data.pgn);
    };
    worker.postMessage({ blackMoves: undefined, whiteMoves: undefined });
    return () => {
      worker.terminate();
    };
  }, []);

  return (
    <Chessboard
      width={320}
      // id="random"
      draggable={false}
      position={fen}
      // transitionDuration={100}
      boardStyle={{
        borderRadius: "5px",
        boxShadow: `0 5px 15px rgba(0, 0, 0, 0.5)`,
      }}
    />
  );
};

function App() {
  return (
    <div>
      <Board />
    </div>
  );
}

export default App;
