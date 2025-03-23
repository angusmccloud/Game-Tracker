'use client'; // directive for Next.js to indicate this is a client-side component
import React, { useState, useEffect } from 'react';
import PageHeader from '@/app/containers/PageHeader/PageHeader';
import PageWrapper from '@/app/containers/PageWrapper/PageWrapper';
import JoinGameModal from '@/app/containers/JoinGameModal/JoinGameModal';
import Button from '@/app/components/Button/Button';
import { getCurrentGame } from '@/app/utils/localStorage';
import { getGameStatus } from '@/app/service/games';

// Main component for the HomePage
export default function HomePage() {
  const [showJoinGameModal, setShowJoinGameModal] = useState(false);
  const [rejoinGame, setRejoinGame] = useState(false);

  useEffect(() => {
    const checkRejoinGame = async () => {
      const currentGame = await getCurrentGame();
      if (currentGame) {
        const { success, gameStatus } = await getGameStatus(currentGame.gameId);
        if (success && (gameStatus === 'setup' || gameStatus === 'inProgress')) {
          setRejoinGame(true);
        }
      }
    };
    checkRejoinGame();
  }, []);

  return (
    <>
      <PageHeader pageName="Game Tracker" />
      <PageWrapper>
        <JoinGameModal
          open={showJoinGameModal}
          handleClose={() => setShowJoinGameModal(false)}
        />
        <Button variant="contained" onClick={() => setShowJoinGameModal(true)}>
          Join Game
        </Button>
        {rejoinGame && (
          <Button variant="contained" onClick={() => window.location.href = '/play'}>
            Rejoin Game
          </Button>
        )}
      </PageWrapper>
    </>
  );
}