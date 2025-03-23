import { generateClient } from "aws-amplify/data";
import { v4 as uuidv4 } from 'uuid';

const client = generateClient();

export const addPlayerToGame = async (gameId, playerName) => {
  const newPlayer = {
    gamePlayerId: uuidv4(),
    gameId: gameId,
    name: playerName,
    icon: 'warrior', // To-Do: Update this
  };

  const { errors, data } = await client.models.GamePlayers.create(
    newPlayer,
    { authMode: 'apiKey'},
  );
  if(errors) {
    console.log('Error adding player to game:', errors);
    return {success: false, error: errors};
  }

  console.log('-- New Player --', data);
  return {success: true, player: data}
}

export const getPlayersSubscription = async (dataSetterCallback, gameId, additionalFilters) => {
  const playerSub = client.models.GamePlayers.observeQuery(
    {
      authMode: 'apiKey',
      filter: {
        gameId: {
          eq: gameId
        },
        ...additionalFilters,
      },
    },
  ).subscribe({
    next: ({ items }) => {
      dataSetterCallback(items);
    },
  });

  return playerSub;
}