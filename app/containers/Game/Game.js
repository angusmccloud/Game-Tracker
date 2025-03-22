import React from 'react';
import Box from '@/app/components/Box/Box'
import Player from '@/app/components/Player/Player'

const Game = (props) => {
  return (
    <Box>
      Game is Here!
      <Box>
        List of Players
        <Player></Player>
      </Box>
    </Box>
  );
};

export default Game;