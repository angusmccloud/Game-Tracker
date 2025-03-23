'use client'; // directive for Next.js to indicate this is a client-side component
import React, { useState, useEffect } from 'react';
import PageHeader from '@/app/containers/PageHeader/PageHeader';
import Box from '@/app/components/Box/Box';
import Typography from '@/app/components/Typography/Typography';
import PageWrapper from '@/app/containers/PageWrapper/PageWrapper';
import { getCurrentGame } from '@/app/utils/localStorage';
import { generateClient } from "aws-amplify/data";

const client = generateClient();

// Main component for the PlayGamePage
export default function PlayGamePage() {
  const [gameId, setGameId] = useState(null);
  const [gamePlayerId, setGamePlayerId] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [gamePlayer, setGamePlayer] = useState(null);
  const [game, setGame] = useState(null);
  const [playerTurns, setPlayerTurns] = useState([]);

  useEffect(() => {
    if(!gameId || !gamePlayerId) {
      return;
    }

    const playerSub = client.models.GamePlayers.observeQuery(
      {
        authMode: 'apiKey',
        filter: {
          gameId: {
            eq: gameId
          },
          gamePlayerId: {
            eq: gamePlayerId
          },
        },
      },
    ).subscribe({
      next: ({ items }) => {
        if(items?.length > 0) {
          setGamePlayer(items[0]);
        }
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
          gamePlayerId: {
            eq: gamePlayerId
          },
        },
      }
    ).subscribe({
      next: ({ items }) => {
        if(items?.length > 0) {
          setPlayerTurns(items);
        }
      },
    }); 

    return () => {
      // If you have multiple data models, make sure you ubsub from all of them
      playerSub.unsubscribe();
      gameSub.unsubscribe();
      turnsSub.unsubscribe();
    };
  }, [gameId, gamePlayerId]);

  useEffect(() => {
    const fetchCurrentGame = async () => {
      const currentGame = await getCurrentGame();
      if (currentGame) {
        setGameId(currentGame.gameId);
        setGamePlayerId(currentGame.playerId);
      } else {
        setError('No game found');
      }
      setLoading(false);
    };
    fetchCurrentGame();
  }, []);

  return (
    <>
      <PageHeader pageName="Play Game" />
      <PageWrapper>
        <Box sx={{ paddingBottom: 4 }}>
          {loading ? (
            <Typography>
              Loading...
            </Typography>
          ) : error ? (
            <Typography>
              {error}
            </Typography>
          ) : (
            <>
              <Typography>
                Game ID: {gameId}
              </Typography>
              <Typography>
                Player ID: {gamePlayerId}
              </Typography>
              <Typography>
                Game Player: {JSON.stringify(gamePlayer)}
              </Typography>
              <Typography>
                Game: {JSON.stringify(game)}
              </Typography>
              <Typography>
                Player Turns: {JSON.stringify(playerTurns)}
              </Typography>
            </>
          )}
        </Box>
      </PageWrapper>
    </>
  );
}