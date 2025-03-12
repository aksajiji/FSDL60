import React, { useState, useEffect } from 'react';
import './App.css';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [targetColor, setTargetColor] = useState('');
  const [options, setOptions] = useState([]);
  const [playerScore, setPlayerScore] = useState(0);
  const [opponentScore, setOpponentScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameOver, setGameOver] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [streak, setStreak] = useState(0); // Combo Multiplier
  const [round, setRound] = useState(0); // Round Counter
  const [leaderboard, setLeaderboard] = useState(JSON.parse(localStorage.getItem('leaderboard')) || []);

  // Generate random hex color
  const generateRandomColor = () => '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');

  // Start a new round
  const newRound = () => {
    const correctColor = generateRandomColor();
    const colorOptions = [correctColor];
    while (colorOptions.length < 4) {
      const newColor = generateRandomColor();
      if (!colorOptions.includes(newColor)) colorOptions.push(newColor);
    }
    setTargetColor(correctColor);
    setOptions(colorOptions.sort(() => Math.random() - 0.5));
    setFeedback('');
    setRound(round + 1);
    document.body.style.background = `linear-gradient(135deg, ${correctColor}, #acb6e5)`; // Dynamic Background
  };

  // Simulate opponent's choice
  const simulateOpponent = () => {
    const randomChoice = options[Math.floor(Math.random() * options.length)];
    if (randomChoice === targetColor) setOpponentScore(opponentScore + 1);
  };

  // Handle player's choice
  const handleChoice = (chosenColor) => {
    if (!gameOver) {
      if (chosenColor === targetColor) {
        const newStreak = streak + 1;
        setStreak(newStreak);
        const points = newStreak >= 3 ? 2 : 1; // Combo Multiplier
        setPlayerScore(playerScore + points);
        setFeedback(`Nice!${newStreak >= 3 ? ' x2 Combo!' : ''}`);
      } else {
        setStreak(0);
        setFeedback('Oops!');
      }
      simulateOpponent();
      setTimeout(newRound, 500);
    }
  };

  // Timer and leaderboard logic
  useEffect(() => {
    newRound();
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setGameOver(true);
          const newLeaderboard = [...leaderboard, playerScore].sort((a, b) => b - a).slice(0, 5);
          setLeaderboard(newLeaderboard);
          localStorage.setItem('leaderboard', JSON.stringify(newLeaderboard));
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Restart game
  const restartGame = () => {
    setPlayerScore(0);
    setOpponentScore(0);
    setTimeLeft(30);
    setGameOver(false);
    setStreak(0);
    setRound(0);
    newRound();
  };

  return (
    <div className="App">
      <motion.h1
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Color Clash: Match Attack
      </motion.h1>
      <div className="scoreboard">
        <p>Round: {round}</p>
        <p>You: {playerScore} | Opponent: {opponentScore}</p>
        <p>Streak: {streak}</p>
      </div>
      <div className="progress-bar">
        <motion.div
          initial={{ width: '100%' }}
          animate={{ width: `${(timeLeft / 30) * 100}%` }}
          transition={{ duration: 1, ease: 'linear' }}
          className="progress"
        />
      </div>

      <AnimatePresence>
        {!gameOver ? (
          <motion.div
            key="game"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <p className="prompt">Match this color:</p>
            <motion.div
              className="target"
              style={{ backgroundColor: targetColor }}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2 }}
            ></motion.div>
            <div className="options">
              {options.map((color, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleChoice(color)}
                  style={{ backgroundColor: color }}
                  whileHover={{ scale: 1.1, boxShadow: '0 5px 15px rgba(0,0,0,0.3)' }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.1 }}
                >
                  {index + 1} {/* Color Blind Mode */}
                </motion.button>
              ))}
            </div>
            <motion.p
              className="feedback"
              initial={{ opacity: 0 }}
              animate={{ opacity: feedback ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {feedback}
            </motion.p>
          </motion.div>
        ) : (
          <motion.div
            key="gameover"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="game-over"
          >
            <h2>Game Over!</h2>
            <p>Final Score: You - {playerScore} | Opponent - {opponentScore}</p>
            <p className="result">
              {playerScore > opponentScore ? 'You Win!' : playerScore < opponentScore ? 'Opponent Wins!' : 'Tie!'}
            </p>
            <motion.button
              onClick={restartGame}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="restart"
            >
              Play Again
            </motion.button>
            <div className="leaderboard">
              <h3>Leaderboard</h3>
              <ul>
                {leaderboard.map((score, i) => (
                  <li key={i}>{score}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;