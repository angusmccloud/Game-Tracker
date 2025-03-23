'use client'; // directive for Next.js to indicate this is a client-side component
import React, { useState, useEffect } from 'react';
import PageHeader from '@/app/containers/PageHeader/PageHeader';
import Box from '@/app/components/Box/Box';
import Typography from '@/app/components/Typography/Typography';
import PageWrapper from '@/app/containers/PageWrapper/PageWrapper';
import { getCurrentGame } from '@/app/utils/localStorage';
import PlayGame from '@/app/containers/PlayGame/PlayGame';
import { getPlayersSubscription } from '@/app/service/players';
import { getGameSubscription } from '@/app/service/games';
import { getTurnsSubscription } from '@/app/service/turns';

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

    const playerSub = getPlayersSubscription(
      (items) => {
        if(items?.length > 0) {
          setGamePlayer(items[0]);
        }
      },
      gameId,
      { gamePlayerId: { eq: gamePlayerId } }
    );

    const gameSub = getGameSubscription(
      (items) => {
        if(items?.length > 0) {
          setGame(items[0]);
        }
      },
      gameId,
      {}
    );

    const turnsSub = getTurnsSubscription(
      (items) => {
        if(items?.length > 0) {
          const newTurns = [...items];
          setPlayerTurns(newTurns);
        }
      },
      gameId,
      { gamePlayerId: { eq: gamePlayerId } }
    );

    return () => {
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
            <PlayGame 
              gamePlayer={gamePlayer}
              game={game}
              playerTurns={playerTurns}
            />
          )}
        </Box>
      </PageWrapper>
    </>
  );
}