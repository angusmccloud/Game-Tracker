import React, { useState } from 'react';
import BaseModal from '@/app/components/BaseModal/BaseModal';
import Button from '@/app/components/Button/Button';
import TextField from '@/app/components/TextField/TextField';
import Typography from '@/app/components/Typography/Typography';
import Box from '@/app/components/Box/Box';

const JoinGameModal = (props) => {
  const { open, handleClose } = props;
  const [gameId, setGameId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const resetModal = () => {
    handleClose();
    setGameId('');
    setError('');
    setLoading(false);
  }

  const handleJoinGame = () => {
    setLoading(true);
    console.log('Joining game with ID:', gameId);
    // Simulate API call
    setTimeout(() => {
      if (gameId === 'validGameId') {
        setLoading(false);
        resetModal();
      } else {
        setLoading(false);
        setError('Invalid Game ID');
      }
    }, 2000);
  }

  return (
    <BaseModal
      open={open}
      onClose={!loading ? resetModal : undefined}
    >
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
      {error && (
        <Typography color="error" variant="body2" style={{ marginTop: '16px' }}>
          {error}
        </Typography>
      )}
      {loading && (
        <Typography variant="body2" style={{ marginTop: '16px' }}>
          Joining game...
        </Typography>
      )}
    </BaseModal>
  );
};

export default JoinGameModal;
