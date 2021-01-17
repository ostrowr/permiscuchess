import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { randomStrategy } from "../engine/utils";
import Alert from "react-bootstrap/Alert";
import { StrategyTable } from "./strategyTable";
import { Move } from "../engine/game";

interface IProps {
  strategy: Move[];
  strategyFor: "w" | "b" | null;
  setStrategy: React.Dispatch<React.SetStateAction<Move[]>>;
  setStrategyFor: React.Dispatch<React.SetStateAction<"w" | "b" | null>>;
}

export const StrategyCard: React.FC<IProps> = (props) => {
  return (
    <Card style={{ width: 400 }}>
      <Card.Body>
        <Card.Title>Strategy</Card.Title>
        <Card.Subtitle>
          Setting strategy for{" "}
          <span
            style={{ color: "gray", cursor: "pointer" }}
            onClick={() =>
              props.setStrategyFor((prev) =>
                prev === "w" ? "b" : prev === "b" ? null : "w"
              )
            }
          >
            {props.strategyFor === "w"
              ? "white"
              : props.strategyFor === "b"
              ? "black"
              : "neither player"}
          </span>
        </Card.Subtitle>
        <Card.Text>
          <ButtonGroup>
            <Button
              size="sm"
              onClick={() => props.setStrategy(randomStrategy())}
              variant="info"
            >
              Randomize
            </Button>
            <Button
              size="sm"
              onClick={() => console.log("TODO")}
              variant="light"
            >
              Import
            </Button>
            <Button
              size="sm"
              onClick={() => console.log("TODO")}
              variant="dark"
            >
              Export
            </Button>
          </ButtonGroup>
        </Card.Text>
        {props.strategyFor !== null ? (
          <StrategyTable moves={props.strategy} draggable={true} />
        ) : (
          <Alert variant={"info"}>
            Both players are playing randomly. Click "neither player" above to
            set a strategy for Black or White.
          </Alert>
        )}
      </Card.Body>
    </Card>
  );
};
