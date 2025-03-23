'use client'; // directive for Next.js to indicate this is a client-side component
import React, {useState, useEffect} from 'react';
import { Authenticator } from '@aws-amplify/ui-react';
import PageHeader from '@/app/containers/PageHeader/PageHeader';
import Box from '@/app/components/Box/Box';
import Typography from '@/app/components/Typography/Typography';
import PageWrapper from '@/app/containers/PageWrapper/PageWrapper';
import Button from '@/app/components/Button/Button';
import { createGame } from '@/app/service/games';
import Game from '@/app/containers/Game/Game'
import { generateClient } from "aws-amplify/data";

const client = generateClient();

// Main component for the HostGamePage
export default function HostGamePage() {
  const [gameId, setGameId] = useState('e6baa065-9efa-4828-bc9e-00e7bfaebe9c'); // TO-DO: Pull this from Local Storage
  const [ playerList, setPlayerList ] = useState([]);
  const [game, setGame] = useState(null);
  const [playerTurns, setPlayerTurns] = useState([]);

  useEffect(() => {
    if(!gameId) {
      return;
    }

    const playerSub = client.models.GamePlayers.observeQuery(
      {
        authMode: 'apiKey',
        filter: {
          gameId: {
            eq: gameId
          },
        },
      },
    ).subscribe({
      next: ({ items }) => {
        const newPlayers = [...items];
        setPlayerList(newPlayers);
      },
    });

    const gameSub = client.models.Games.observeQuery(
      {
        authMode: 'apiKey',
        filter: {
          gameId: {
            eq: gameId
          },
        },
      },
    ).subscribe({
      next: ({ items }) => {
        if(items?.length > 0) {
          setGame(items[0]);
        }
      },
    });

    const turnsSub = client.models.Turns.observeQuery(
      {
        authMode: 'apiKey',
        filter: {
          gameId: {
            eq: gameId
          },
        },
      }
    ).subscribe({
      next: ({ items }) => {
        const newTurns = [...items];
        setPlayerTurns(newTurns);
      },
    }); 

    return () => {
      // If you have multiple data models, make sure you ubsub from all of them
      playerSub.unsubscribe();
      gameSub.unsubscribe();
      turnsSub.unsubscribe();
    };
  }, [gameId]);

  return (
    <Authenticator>
    {({ signOut, user }) => (
        <>
          <PageHeader pageName="Host Game" />
          <PageWrapper>
            <Box sx={{ paddingBottom: 4 }}>
              <Typography>
                Host Game
              </Typography>
              <Button onClick={signOut}>
                Sign Out
              </Button>
              <Button variant="contained" onClick={createGame}>
                Create Game
              </Button>
              <Game
                playerList={playerList}
                game={game}
                turns={playerTurns}
               />
            </Box>
          </PageWrapper>
        </>
      )}
    </Authenticator>
  );
}