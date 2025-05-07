export const createNewGame = (playerNames) => ({
  players: playerNames.map((name) => ({
    name,
    life: 20,
    deck: [],
    hand: [],
    board: [],
    mana: { current: 5, total: 5, colors: { neutral: 5 } }
  })),
  activePlayer: 0,
  phase: "inicio",
  winner: null
});

export const drawCard = (player) => {
  const card = player.deck.shift();
  if (card) player.hand.push(card);
};

export const playCard = (player, index) => {
  const card = player.hand[index];
  if (!card || player.mana.current < (card.cost || 1)) return false;
  player.hand.splice(index, 1);
  player.board.push(card);
  player.mana.current -= (card.cost || 1);
  return true;
};

export const nextPhase = (gameState) => {
  const order = ["inicio", "draw", "principal", "final"];
  const i = order.indexOf(gameState.phase);
  gameState.phase = order[(i + 1) % order.length];
  if (gameState.phase === "inicio") {
    gameState.activePlayer = (gameState.activePlayer + 1) % gameState.players.length;
  }
  return gameState;
};

export const attackPlayer = () => false;