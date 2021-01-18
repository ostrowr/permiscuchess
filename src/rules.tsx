import React from "react";
import Modal from "react-bootstrap/Modal";

interface IProps {
  show: boolean;
  onHide: () => void;
}
export const Rules: React.FC<IProps> = (props) => {
  return (
    <Modal show={props.show} onHide={props.onHide}>
      <Modal.Header closeButton>
        <Modal.Title>How to Play</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Permiscuchess is a chess variant that is entirely pre-played. Instead
          of a real-time battle of wits, Permiscuchess is played by devising a
          clever strategy.
        </p>
        <h2>Defining a strategy</h2>
        <p>
          Each piece on a Permiscuchess board is labeled according to its
          starting file. For example, <code>pb</code> is the pawn that starts on
          file <code>b</code>. <code>pb</code> will continue to identify that
          pawn throughout the game, even if it moves off of the <code>b</code>{" "}
          file or if it is promoted.
        </p>
        <p>
          A strategy is just a list of moves specifying a piece and a
          destination square. For example, <code>pa:b5</code> is a move that
          says "move the piece with identifier <code>pa</code> to square{" "}
          <code>b5</code>."
        </p>
        <p>
          Most moves in your strategy are likely to be illegal at most points in
          the game. Each turn, the computer chooses the next legal move in your
          strategy, looping around if it gets to the end.
        </p>
        <p>
          There are 960 possible permiscuchess moves. All pieces except bishops
          can explore the whole board, and bishops can only explore their color.
          You may repeat moves in your strategy – that is, your strategy does
          not need to be exactly 960 moves long.
        </p>
        <p>
          The piece identifiers are:
          <p>
            <code>
              Pawns: pa pb pc pd pe pf pg ph <br />
              Rooks: ra rh <br />
              Knights: nb ng <br />
              Bishops: bc bf <br />
              King: k <br />
              Queen: q <br />
            </code>
          </p>
        </p>
        <h2>Gameplay</h2>
        The computer plays a single turn in Permiscuchess by following these
        steps:
        <ol>
          <li>
            Select the next legal move in the current player's strategy, looping
            to the beginning if necessary. If there are no legal moves in the
            whole strategy, the current player forfeits.
          </li>
          <li>Make the move.</li>
          <li>
            If the move ended in checkmate or draw (by threefold repetition,
            stalemate, insufficient material, or 50 moves without a capture),
            end the game.
          </li>
          <li>Go to the other player's turn and repeat.</li>
        </ol>
        Permiscuchess is played just like normal chess, with a few caveats:
        <ul>
          <li>
            If a pawn reaches the eigth rank, it is automatically promoted to a
            queen.
          </li>
          <li>There is no castling.</li>
        </ul>
        <h2>Tips</h2>
        <ol>
          <li>
            You should never have to forfeit. There are only 960 possible moves,
            and at least one of them must be legal until the game is over!
            "Randomize" just shuffles those moves for you.
          </li>
          <li>
            On average, random strategies playing against one another each win
            about 13% of the time, with the remaining 74% of games drawn. Can
            you find a strategy that wins 20% of its games? Click on "Stats" to
            see how you're doing.
          </li>
          <li>
            You can adjust the slider at the bottom to simulate between 1 and
            1000 games at a time against randomly generated opponents.
          </li>
          <li>
            Try clicking on the PGN of a game you're viewing to view it in
            Lichess!
          </li>
        </ol>
      </Modal.Body>
    </Modal>
  );
};
