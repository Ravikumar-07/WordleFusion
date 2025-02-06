import React, { useState } from 'react';
import './App.css';

const WordleGame = () => {
  const solution = "SPARK";
  const maxAttempts = 6;

  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [message, setMessage] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const handleInputChange = (e) => {
    if (e.target.value.length <= 5) {
      setCurrentGuess(e.target.value.toUpperCase());
    }
  };

  const checkGuess = () => {
    if (currentGuess.length !== 5) {
      setMessage("Guess must be a 5-letter word.");
      return;
    }

    if (gameOver) {
      setMessage("Game is over. Start a new game.");
      return;
    }

    const feedback = currentGuess.split("").map((letter, index) => {
      if (letter === solution[index]) return "green";
      else if (solution.includes(letter)) return "yellow";
      return "gray";
    });

    setGuesses([...guesses, { word: currentGuess, feedback }]);
    setAttempts(attempts + 1);

    if (currentGuess === solution) {
      setMessage("Congratulations! You guessed the word!");
      setGameOver(true);
    } else if (attempts + 1 === maxAttempts) {
      setMessage(`Game Over! The word was: ${solution}`);
      setGameOver(true);
    } else {
      setMessage("");
    }

    setCurrentGuess("");
  };

  const resetGame = () => {
    setGuesses([]);
    setCurrentGuess("");
    setMessage("");
    setAttempts(0);
    setGameOver(false);
  };

  return (
    <div className="game-container">
      <h1 className="title">Wordle Fusion</h1>
      <input
        type="text"
        value={currentGuess}
        onChange={handleInputChange}
        disabled={gameOver}
        placeholder="Enter your guess"
        className="guess-input"
      />
      <div className="buttons">
        <button onClick={checkGuess} disabled={gameOver} className="submit-button">
          Submit Guess
        </button>
        <button onClick={resetGame} className="new-game-button">
          New Game
        </button>
      </div>
      <p className="message">{message}</p>
      <div className="guess-grid">
        {guesses.map((guess, index) => (
          <div key={index} className="guess-row">
            {guess.word.split("").map((letter, i) => (
              <span key={i} className={`letter ${guess.feedback[i]}`}>
                {letter}
              </span>
            ))}
          </div>
        ))}
      </div>
      <p className="attempts">
        Attempts: {attempts}/{maxAttempts}
      </p>
    </div>
  );
};

export default WordleGame;