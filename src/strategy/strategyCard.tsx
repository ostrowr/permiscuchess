import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { randomStrategy } from "../engine/utils";
import Alert from "react-bootstrap/Alert";
import { StrategyTable } from "./strategyTable";
import { Move } from "../engine/game";
import { CSVLink } from "react-csv";
import { EditStrategyModal } from "./editStrategyModal";

interface IProps {
  strategy: Move[];
  strategyFor: "w" | "b" | null;
  setStrategy: React.Dispatch<React.SetStateAction<Move[]>>;
  setStrategyFor: React.Dispatch<React.SetStateAction<"w" | "b" | null>>;
}

export const StrategyCard: React.FC<IProps> = (props) => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const strategyAsText = props.strategy.map((p) => [
    `${p.piece}:${p.destination}`,
  ]);
  return (
    <>
      <Card style={{ height: 500 }}>
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
          {props.strategyFor !== null ? (
            <>
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
                    onClick={() => setEditModalOpen(true)}
                    variant="light"
                  >
                    Edit
                  </Button>
                  <CSVLink // probably should download directly, not with csvlink
                    data={strategyAsText}
                    filename={"permiscuchess-strategy.txt"}
                  >
                    <Button size="sm" variant="dark">
                      Export
                    </Button>
                  </CSVLink>
                </ButtonGroup>
              </Card.Text>
              <StrategyTable moves={props.strategy} draggable={true} />
            </>
          ) : (
            <Alert variant={"info"}>
              Both players are playing randomly. Click "neither player" above to
              set a strategy for Black or White.
            </Alert>
          )}
        </Card.Body>
      </Card>
      <EditStrategyModal
        show={editModalOpen}
        onHide={() => setEditModalOpen(false)}
        onSave={(moves: Move[]) => {
          props.setStrategy(moves);
          setEditModalOpen(false);
        }}
        strategy={props.strategy}
      />
    </>
  );
};
