import React from 'react';
import Box from '@/app/components/Box/Box'
import Typography from '@/app/components/Typography/Typography'

const Player = (props) => {
  const { name, icon } = props;
  return (
    <Box>
      <Typography>
        Name: {name}
      </Typography>
      <Typography>
        Icon: {icon}
      </Typography>
    </Box>
    
  );
};

export default Player;