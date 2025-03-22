'use client'; // directive for Next.js to indicate this is a client-side component
import React, { useState } from 'react';
import PageHeader from '@/app/containers/PageHeader/PageHeader';
import PageWrapper from '@/app/containers/PageWrapper/PageWrapper';
import JoinGameModal from '@/app/containers/JoinGameModal/JoinGameModal';
import Button from '@/app/components/Button/Button';

// Main component for the HomePage
export default function HomePage() {
  const [showJoinGameModal, setShowJoinGameModal] = useState(false);

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
      </PageWrapper>
    </>
  );
}