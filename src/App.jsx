import { useState, useEffect, useMemo, useRef } from "react";
import "./App.css";
import Confetti from "react-confetti";

const gameIcons = ["👌", "🐟", "😎", "🎪", "🙌", "🦓", "🏍️", "👀", "🐧"];

function App() {
  const [pieces, setPieces] = useState([]);
  let timeOut = useRef();

  const checkIsFinished = useMemo(() => {
    if (pieces.length && pieces.every((piece) => piece.solved)) {
      return true;
    }
    return false;
  }, [pieces]);

  const startGame = () => {
    const dublicatGameIcons = [...gameIcons, ...gameIcons];
    const newGameIcones = [];

    while (newGameIcones.length < gameIcons.length * 2) {
      const randomIndex = Math.floor(Math.random() * dublicatGameIcons.length);

      newGameIcones.push({
        emoji: dublicatGameIcons[randomIndex],
        flipped: false,
        solved: false,
        position: newGameIcones.length,
      });

      dublicatGameIcons.splice(randomIndex, 1);
    }

    setPieces(newGameIcones);
  };

  useEffect(() => {
    startGame();
  }, []);

  const handleActive = (data) => {
    const flippedData = pieces.filter((data) => data.flipped && !data.solved);
    if (flippedData.length === 2) return;
    const newPiece = pieces.map((piece) => {
      if (piece.position === data.position) {
        piece.flipped = !piece.flipped;
      }
      return piece;
    });
    setPieces(newPiece);
  };

  const logicForFlipped = () => {
    const flippedData = pieces.filter((data) => data.flipped && !data.solved);
    timeOut.current = setTimeout(() => {
      if (flippedData.length === 2) {
        setPieces(
          pieces.map((data) => {
            if (
              data.position === flippedData[0].position ||
              data.position === flippedData[1].position
            ) {
              if (flippedData[0].emoji === flippedData[1].emoji) {
                data.solved = true;
              } else {
                data.flipped = false;
              }
            }
            return data;
          })
        );
      }
    }, 800);
  };

  useEffect(() => {
    logicForFlipped();
    return () => {
      clearInterval(timeOut.current);
    };
  }, [pieces]);

  console.log(pieces);
  return (
    <>
      <main>
        <h1>Memory Game</h1>
        <div className={"container"}>
          {pieces.map((data, index) => (
            <div
              className={`flip-card ${
                data.flipped || data.solved ? "active" : ""
              }`}
              key={index}
              onClick={() => handleActive(data)}
            >
              <div className="flip-card-inner">
                <div className="flip-card-front" />

                <div className="flip-card-back">{data.emoji}</div>
              </div>
            </div>
          ))}
        </div>
        {checkIsFinished && (
          <div className="game-completed">
            <Confetti width={window.innerWidth} height={window.innerHeight} />
            <h1>YOU WON !!!</h1>
          </div>
        )}
      </main>
    </>
  );
}

export default App;
