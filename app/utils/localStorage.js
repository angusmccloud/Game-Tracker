export const setCurrentGame = async (gameId, gamePlayerId) => {
  localStorage.setItem('gameTracker:currentGame', JSON.stringify({
    gameId: gameId,
    playerId: gamePlayerId,
  }));
}

export const getCurrentGame = async () => {
  const currentGame = localStorage.getItem('gameTracker:currentGame');
  if (!currentGame) {
    return null;
  }
  return JSON.parse(currentGame);
}