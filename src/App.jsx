import { useState, useEffect } from "react";
import "./App.css";

const gameIcons = [
  "👌",
  "🐟",
  "😎",
  "🎪",
  "🙌",
  "🦓",
  "🏍️",
  "👀",
  "🐧",
  "🍬",
  "✈️",
  "🎉",
];

function App() {
  const [pieces, setPieces] = useState([]);

  console.log(gameIcons);

  const startGame = () => {
    const dublicatGameIcons = [...gameIcons, ...gameIcons];

    const newGameIcones = [];

    while (newGameIcones.length < gameIcons.length) {
      const randomIndex = Math.floor(Math.random() * dublicatGameIcons.length);

      newGameIcones.push({
        emoji:dublicatGameIcons[randomIndex],
        flipped:false,
        solved:false,
        position:newGameIcones.length
      });
    }

    setPieces(newGameIcones);
  };

  useEffect(() => {
    startGame();
  }, []);

  return (
    <>
      <main>
        <h1>Memory Game</h1>
        <div className="container">
          {pieces.map((data, index) => (
            <div className="flip-card" key={index}>
              <div className="flip-card-inner">
                <div className="flip-card-front" />

                <div className="flip-card-back">{data.emoji}</div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

export default App;
