import { generateClient } from "aws-amplify/data";
import { randomString } from "../utils/stringUtils";
import { v4 as uuidv4 } from 'uuid';

const client = generateClient();

export const createGame = async (event) => {
  event.preventDefault();
  const form = new FormData(event.target);

  const newGame = {
    gameId: uuidv4(),
    joinCode: randomString(),
    gameStatus: "Setup",
    currentRound: 0,
    gameNotes: '',
  }

  const { errors, data } = await client.models.Games.create(
    newGame,
    { authMode: 'userPool'},
  );
  if(errors) {
    console.log('Error creating game:', errors);
    return;
  }

  console.log('-- New Game --', data);
  event.target.reset();
}
