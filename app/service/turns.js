import { generateClient } from "aws-amplify/data";
import { v4 as uuidv4 } from 'uuid';

const client = generateClient();

export const createOrUpdateTurn = async (turnId, gameId, gamePlayerId, roundNumber, turnStatus, notesForDM = '', flagForDMActionAtRoundEnd = false) => {
  const turnData = {
    turnId: turnId || uuidv4(),
    gameId: gameId,
    gamePlayerId: gamePlayerId,
    roundNumber: roundNumber,
    turnStatus: turnStatus,
    notesForDM: notesForDM,
    flagForDMActionAtRoundEnd: flagForDMActionAtRoundEnd,
  };

  const operation = turnId ? 'update' : 'create';
  const { errors, data } = await client.models.Turns[operation](
    turnData,
    { authMode: 'apiKey' },
  );
  if (errors) {
    console.log(`Error ${operation} turn:`, errors);
    return { success: false, error: errors };
  }

  console.log(`-- ${operation.charAt(0).toUpperCase() + operation.slice(1)} Turn --`, data);
  return { success: true, turn: data };
};

export const getTurnsSubscription = async (dataSetterCallback, gameId, additionalFilters) => {
  const turnsSub = client.models.Turns.observeQuery(
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

  return turnsSub;
}
