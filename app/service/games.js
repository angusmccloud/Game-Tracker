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
