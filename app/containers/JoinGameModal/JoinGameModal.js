import React, { useState } from 'react';
import BaseModal from '@/app/components/BaseModal/BaseModal';
import Button from '@/app/components/Button/Button';
import TextField from '@/app/components/TextField/TextField';
import Typography from '@/app/components/Typography/Typography';
import Box from '@/app/components/Box/Box';
import { findGameByJoinCode } from '@/app/service/games';
import { addPlayerToGame } from '@/app/service/players';
import { setCurrentGame } from '@/app/utils/localStorage';

const JoinGameModal = (props) => {
  const { open, handleClose } = props;
  const [gameId, setGameId] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [gameFound, setGameFound] = useState(false);
  const [joinedGame, setJoinedGame] = useState(null);

  const resetModal = () => {
    handleClose();
    setGameId('');
    setPlayerName('');
    setError('');
    setLoading(false);
    setGameFound(false);
  }

  const handleJoinGame = async () => {
    setLoading(true);
    setError('');
    const { success, error, game } = await findGameByJoinCode(gameId);
    if (success) {
      // console.log('Game found:', game);
      setGameFound(true);
      setJoinedGame(game);
    } else {
      console.error('Error joining game:', error);
      setError('Error joining game');
    }
    setLoading(false);
  }

  const handleConfirmJoin = async () => {
    // Placeholder function for joining the game
    // console.log('Joining game with name:', playerName);
    const { success, error, player } = await addPlayerToGame(joinedGame.gameId, playerName);
    if (success) {
      // console.log('Player added:', player);
      setCurrentGame(joinedGame.gameId, player.gamePlayerId);
      // Navigate to `/play`
      window.location.href = '/play';
      handleClose();
    } else {
      console.error('Error adding player:', error);
      setError('Error adding player');
    }
  }

  return (
    <BaseModal
      open={open}
      onClose={!loading ? resetModal : undefined}
    >
      {gameFound ? (
        <>
          <Typography>
            Game found! Enter your name to join
          </Typography>
          <TextField
            label="Enter Your Name"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={(e) => setPlayerName(e.target.value)}
            value={playerName}
            error={!!error}
            helperText={error}
          />
          <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleConfirmJoin}
              disabled={loading || !playerName}
            >
              Join Game
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={resetModal}
              disabled={loading}
            >
              Cancel
            </Button>
          </Box>
          {loading && (
            <Typography variant="body2" style={{ marginTop: '16px' }}>
              Joining game...
            </Typography>
          )}
        </>
      ) : (
        <>
          <Typography>
            Join Game by Host Code
          </Typography>
          <TextField
            label="Enter Game Code"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={(e) => setGameId(e.target.value)}
            value={gameId}
            error={!!error}
            helperText={error}
          />
          <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleJoinGame}
              disabled={loading}
            >
              Find Game
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={resetModal}
              disabled={loading}
            >
              Cancel
            </Button>
          </Box>
          {loading && (
            <Typography variant="body2" style={{ marginTop: '16px' }}>
              Searching for Game...
            </Typography>
          )}
        </>
      )}
      {error && (
        <Typography color="error" variant="body2" style={{ marginTop: '16px' }}>
          {error}
        </Typography>
      )}
    </BaseModal>
  );
};

export default JoinGameModal;