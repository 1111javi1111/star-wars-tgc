import React, { useState, useEffect } from "react";
import GameBoard from "./GameBoard";
import {
  createNewGame,
  drawCard,
  playCard,
  nextPhase,
  attackPlayer
} from "../utils/game";
import { allCards, getStarterDeck } from "../utils/cards";
import "../Game.css";

const Game = ({ onNavigate }) => {
  const [gameState, setGameState] = useState(null);
  const [showGameOver, setShowGameOver] = useState(false);

  useEffect(() => {
    const newGame = createNewGame(["Jugador", "Oponente"]);
    const playerDeck = [...getStarterDeck(), ...allCards.slice(0, 2)];
    const opponentDeck = [...allCards.slice(2, 5), ...allCards.slice(0, 1)];
    newGame.players[0].deck = shuffleArray([...playerDeck]);
    newGame.players[1].deck = shuffleArray([...opponentDeck]);

    for (let i = 0; i < 5; i++) {
      drawCard(newGame.players[0]);
      drawCard(newGame.players[1]);
    }

    setGameState(newGame);
  }, []);

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const handleCardPlay = (cardIndex) => {
    if (!gameState) return;
    const newState = { ...gameState };
    const activePlayer = newState.players[newState.activePlayer];
    if (playCard(activePlayer, cardIndex)) {
      setGameState({ ...newState });
    }
  };

  const handleNextPhase = () => {
    if (!gameState) return;
    const newState = nextPhase({ ...gameState });
    if (newState.phase === "draw") {
      const activePlayer = newState.players[newState.activePlayer];
      drawCard(activePlayer);
      if (activePlayer.mana.total < 10) {
        activePlayer.mana.total += 1;
      }
      activePlayer.mana.current = activePlayer.mana.total;
    }
    setGameState({ ...newState });
  };

  const handleAttack = (attackingCardIndices) => {
    if (!gameState) return;
    const newState = { ...gameState };
    const attackerIndex = newState.activePlayer;
    const defenderIndex = (attackerIndex + 1) % newState.players.length;
    const gameOver = attackPlayer(
      newState.players[attackerIndex],
      newState.players[defenderIndex],
      attackingCardIndices
    );
    if (gameOver) {
      newState.winner = attackerIndex;
      setShowGameOver(true);
    }
    setGameState({ ...newState });
  };

  if (!gameState) {
    return <div className="loading">Cargando partida...</div>;
  }

  return (
    <div className="game-screen">
      <div className="game-header">
        <button className="back-button" onClick={() => onNavigate("menu")}>
          ← Volver al Menú
        </button>
        <h2 className="game-title">Star Wars: The Force Realms</h2>
      </div>

      <GameBoard
        gameState={gameState}
        onCardPlay={handleCardPlay}
        onNextPhase={handleNextPhase}
        onAttack={handleAttack}
      />

      {showGameOver && (
        <div className="game-over-overlay">
          <div className="game-over-modal">
            <h2 className="game-over-title">¡Partida Finalizada!</h2>
            <p className="game-over-message">
              {gameState.winner === 0
                ? "¡Has ganado la partida!"
                : "¡Has perdido la partida!"}
            </p>
            <div className="game-over-buttons">
              <button
                className="game-over-button"
                onClick={() => onNavigate("menu")}
              >
                Volver al Menú Principal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Game;