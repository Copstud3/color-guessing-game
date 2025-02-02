import React from "react";
import { useState, useEffect } from "react";
import "./gamebox.css";

const Gamebox = () => {
  const colors = ["red", "blue", "green", "yellow", "purple", "orange"]; // Array of colors used

  // All the states used in the game
  const [targetColor, setTargetColor] = useState(" "); // this is color the player is expected to choose
  const [isWaiting, setIsWaiting] = useState(false); //
  const [score, setScore] = useState(0); // this is the score of the player
  const [message, setMessage] = useState("Choose from the color options"); // This is the message to be displayed
  const [shuffledColors, setShuffledColors] = useState(colors); // State for shuffled colors


  useEffect(() => {
    startNewGame();
  }, []); // This state chooses a random color whe the game starts

  const shuffleColors = () => {
    const shuffled = [...colors];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Swap elements
    }
    return shuffled;
  };

  const startNewGame = () => {
    const randomColor = shuffledColors[Math.floor(Math.random() * shuffledColors.length)];
    setTargetColor(randomColor);
    setShuffledColors(shuffleColors()); // Shuffle colors for the next round
    setMessage("Choose from the color options");
  };

  const resetGame = () => {
    setScore(0);
    setMessage("Choose from the color options");
    startNewGame();
    setIsWaiting(false);
  };
  // Handles guesses
  const handleGuess = (color) => {
    // Prevent clicks if the game is waiting
    if (isWaiting) return;

    if (color === targetColor) {
      setScore(score + 1);
      setMessage("Correct! 🎉") || setIsWaiting(true);

      setTimeout(() => {
        startNewGame();
      }, 1000);
      
    } else {
      setMessage("Wrong! Try again. ❌");

      setTimeout(() => {
        startNewGame();
      }, 1000);
      setIsWaiting(true);
    }

    // Set waiting state to true
    setTimeout(() => {
      setIsWaiting(false);
    }, 1000);
  };

  return (
    <section className="game">
      {/* Display the target color */}
      <div
        data-testid="colorBox"
        className="color-box"
        style={{ backgroundColor: targetColor }}
      ></div>

      {/*Displays the game instructions and messages */}
      <p data-testid="gameInstructions" className="game-instructions">
        Guess the correct color!
      </p>
      <p data-testid="gameStatus" className="game-status">
        {message}
      </p>

      {/* Displays all the color options */}
      <div className="color-options">
        {shuffledColors.map((color) => (
          <button
            key={color}
            data-testid="colorOption"
            className="color-button"
            style={{ backgroundColor: color }}
            onClick={() => handleGuess(color)}
            disabled={isWaiting}
          ></button>
        ))}
      </div>

      {/*Displays the current score */}
      <p data-testid="score" className="score">
        Score: {score}
      </p>

      {/*The game resets when this button is clicked i.e score changes back to zero*/}
      <button
        data-testid="newGameButton"
        className="new-game-btn"
        onClick={resetGame}
      >
        New Game
      </button>
      <p className="endnote">Developed by <a href="http://chris-is-a-dev.vercel.app">Copstud3</a> - HNG 12 2025</p>
    </section>
  );
};

export default Gamebox;
