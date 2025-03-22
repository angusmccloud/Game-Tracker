'use client'; // directive for Next.js to indicate this is a client-side component
import React, { useState, useEffect } from 'react';
import PageHeader from '@/app/containers/PageHeader/PageHeader';
import Box from '@/app/components/Box/Box';
import Typography from '@/app/components/Typography/Typography';
import PageWrapper from '@/app/containers/PageWrapper/PageWrapper';
import { getCurrentGame } from '@/app/utils/localStorage';

// Main component for the PlayGamePage
export default function PlayGamePage() {
  const [gameId, setGameId] = useState(null);
  const [gamePlayerId, setGamePlayerId] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

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
            </>
          )}
        </Box>
      </PageWrapper>
    </>
  );
}