'use client'; // directive for Next.js to indicate this is a client-side component
import React, { useState, useEffect } from 'react';
import Box from '@/app/components/Box/Box';
import Button from '@/app/components/Button/Button';
import Typography from '@/app/components/Typography/Typography';
import { createOrUpdateTurn } from '@/app/service/turns';
import NotesForDMModal from '@/app/containers/NotesForDMModal/NotesForDMModal';

export default function PlayGame(props) {
  const { gamePlayer, game, playerTurns } = props;

  if (!gamePlayer || !game || !playerTurns) {
    return (
      <Box sx={{ paddingBottom: 4 }}>
        <Typography>
          Loading...
        </Typography>
      </Box>
    );
  }

  const turnsThisRound = playerTurns.filter(turn => turn.roundNumber === game.currentRound);
  const currentTurn = turnsThisRound[0] || {};
  const turnStatus = turnsThisRound.length === 0 ? 'inProgress' : currentTurn.turnStatus;

  const [isNotesModalOpen, setIsNotesModalOpen] = useState(false);

  const handleTurnAction = async (status, notes = currentTurn.notesForDM || '', flag = currentTurn.flagForDMActionAtRoundEnd || false) => {
    const result = await createOrUpdateTurn(currentTurn.turnId, game.gameId, gamePlayer.gamePlayerId, game.currentRound, status, notes, flag);
    if (result.success) {
      console.log('Turn action completed:', result.turn);
    }
  };

  const handleOpenNotesModal = () => {
    setIsNotesModalOpen(true);
  };

  const handleCloseNotesModal = () => {
    setIsNotesModalOpen(false);
  };

  const handleSaveNotes = (notes) => {
    handleTurnAction('inProgress', notes);
    setIsNotesModalOpen(false);
  };

  return (
    <Box sx={{ paddingBottom: 4 }}>
      {game.gameStatus !== 'inProgress' ? (
        <Typography>
          Game is not in progress, no actions you can take
        </Typography>
      ) : (
        <>
          <Typography>
            Game Round: {game.currentRound}
          </Typography>
          <Typography>
            Turn Status: {turnStatus}
          </Typography>
          <Typography>
            Need DM at End of Turn: {currentTurn.flagForDMActionAtRoundEnd ? 'Yes' : 'No'}
          </Typography>
          <Typography>
            Notes for DM: {currentTurn.notesForDM || 'None'}
          </Typography>
          {turnStatus === 'inProgress' ? (
            <>
              <Button variant="contained" onClick={() => handleTurnAction('complete')}>End Turn</Button>
              <Button variant="contained" onClick={handleOpenNotesModal}>Add Note for DM</Button>
              <Button variant="contained" onClick={() => handleTurnAction('inProgress', currentTurn.notesForDM, !currentTurn.flagForDMActionAtRoundEnd)}>{currentTurn.flagForDMActionAtRoundEnd ? 'Remove ' : ''}Flag for DM's Attention</Button>
            </>
          ) : (
            <Button variant="contained" onClick={() => handleTurnAction('inProgress')}>Undo End Turn</Button>
          )}
        </>
      )}

      <NotesForDMModal
        open={isNotesModalOpen}
        handleClose={handleCloseNotesModal}
        handleSave={handleSaveNotes}
        initialNotes={currentTurn.notesForDM}
      />

      {/* Below here is for debugging/info purposes only */}
      {/*
      <Typography>
        Game ID: {game.gameId}
      </Typography>
      <br/>
      <Typography>
        Player ID: {gamePlayer.gamePlayerId}
      </Typography>
      <br/>
      <Typography>
        Game Round: {game.currentRound}
      </Typography>
      <br/>
      <Typography>
        Game Status: {game.gameStatus}
      </Typography>
      <br/>
      <Typography>
        Game Player: {JSON.stringify(gamePlayer)}
      </Typography>
      <br/>
      <Typography>
        Game: {JSON.stringify(game)}
      </Typography>
      <br/>
      <Typography>
        Current Turn: {JSON.stringify(currentTurn)}
      </Typography>
      <br/>
      <Typography>
        Player Turns: {JSON.stringify(playerTurns)}
      </Typography>
      <br/>
      <Typography>
        Player Items: {JSON.stringify(gamePlayer.items)}
      </Typography>
      */}
    </Box>
  );
}