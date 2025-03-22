import React from 'react';
import Box from '@/app/components/Box/Box'
import TextField from '@/app/components/TextField/TextField'

const Player = (props) => {
  return (
    <Box>
      I'm a player!
      <p>
        Name: {props.name}
      </p>
      <p>
        Icon: {props.icon}
      </p>
      <p>
        Status: {props.status}
      </p>
    </Box>
    
  );
};

export default Player;