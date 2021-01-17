import Button from "react-bootstrap/Button";
import { ChessWorkerInput, GameResult } from "../engine/worker";
import Spinner from "react-bootstrap/Spinner";

// @ts-expect-error
// eslint-disable-next-line import/no-webpack-loader-syntax
import Worker from "worker-loader!../engine/worker.ts";

interface IProps {
  strategies: ChessWorkerInput;
  nGamesToSimulate: number;
  onGameComplete: (outcome: GameResult) => void;
  onSimulationStart: () => void;
}

export const PlayGameButton: React.FC<IProps> = (props) => {
  const workers: Worker[] = [];
  const nWorkers = 1; // try navigator.hardwareConcurrency
  for (let i = 0; i < nWorkers; i++) {
    const worker = new Worker();
    worker.onmessage = (msg: MessageEvent<GameResult>) => {
      props.onGameComplete(msg.data);
    };
    workers.push(worker);
  }

  return (
    <Button
      onClick={() => {
        for (let i = 0; i < props.nGamesToSimulate; i++) {
          props.onSimulationStart();
          // simplest possible scheduling algorithm; just rotate workers.
          // not sure if this is actually faster than just 1 worker; need
          // to test! Or maybe use in some sort of proper pool.
          workers[i % workers.length].postMessage(props.strategies);
        }
      }}
    >
      Simulate {props.nGamesToSimulate} game
      {props.nGamesToSimulate === 1 ? "" : "s"}
    </Button>
  );
};

export const PendingSpinner: React.FC<{ nPending: number }> = (props) => {
  if (props.nPending === 0) {
    return null;
  }
  const simulations = props.nPending === 1 ? "simulation" : "simulations";
  return (
    <>
      <Spinner animation="grow" size="sm" />{" "}
      <span>{` ${props.nPending} ${simulations} pending...`}</span>
    </>
  );
};
