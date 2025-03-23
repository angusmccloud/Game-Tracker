import { generateClient } from "aws-amplify/data";
import { randomString } from "@/app/utils/stringUtils";
import { v4 as uuidv4 } from 'uuid';

const client = generateClient();

export const createGame = async (event) => {
  event.preventDefault();

  const newGame = {
    gameId: uuidv4(),
    joinCode: randomString(5),
    gameStatus: "setup",
    currentRound: 0,
    gameNotes: '',
  }

  const { errors, data } = await client.models.Games.create(
    newGame,
    { authMode: 'userPool'},
  );
  if(errors) {
    console.log('Error creating game:', errors);
    return {success: false, error: errors};
  }

  console.log('-- New Game --', data);
  return {success: true, game: data}
}

export const findGameByJoinCode = async (joinCode) => {
  const {data, errors} = await client.models.Games.list({
    filter: {
      joinCode: {
        eq: joinCode
      },
      gameStatus: {
        eq: 'setup'
      }
    },
    authMode: 'apiKey',
  });

  if(errors) {
    console.log('Error finding game:', errors);
    return {success: false, error: errors};
  }

  if(!data || data.length === 0) {
    return {success: false, error: 'Game not found'};
  }

  console.log('-- Found Game --', data[0]);
  return {success: true, game: data[0]};
}

export const getGameStatus = async (gameId) => {
  const {data, errors} = await client.models.Games.list({
    filter: {
      gameId: {
        eq: gameId
      },
    },
    authMode: 'apiKey',
  });

  if (errors) {
    console.log('Error getting game status:', errors);
    return { success: false, error: errors };
  }

  if (!data) {
    return { success: false, error: 'Game not found' };
  }

  console.log('-- Game Status --', data);
  if (data.length === 0) {
    return { success: false, error: 'Game not found' };
  }
  
  return {
    success: true,
    gameStatus: data[0].gameStatus,
  }
}

export const getGameSubscription = async (dataSetterCallback, gameId, additionalFilters) => {
  const gameSub = client.models.Games.observeQuery(
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

  return gameSub;
}
