import { PieceIds, Squares } from "./game";

// including impossible bishop moves (for now)
const ALL_POSSIBLE_MOVES = PieceIds.flatMap((pieceId) => {
  return Squares.map((s) => {
    return {
      piece: pieceId,
      destination: s,
    };
  });
});

export const randomStrategy = () => {
  return shuffled(ALL_POSSIBLE_MOVES);
};

function shuffled<T>(inArr: T[]): T[] {
  const outArr = [...inArr];
  for (let i = outArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [outArr[i], outArr[j]] = [outArr[j], outArr[i]];
  }
  return outArr;
}
