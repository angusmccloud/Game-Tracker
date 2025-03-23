'use client';
import React, { useEffect, useState } from 'react';
import Box from '@/app/components/Box/Box'
import Player from '@/app/components/Player/Player';
import { generateClient } from "aws-amplify/data";

const client = generateClient();

const Game = (props) => {
  const { playerList, game, turns } = props;

  return (
    <Box>
      Game is Here!
      <Box>
        {/* List of Players {JSON.stringify(playerList)} */}
        {playerList.map((player) => 
          <Player
            name={player.name}
            icon={player.icon}
          ></Player>
          // JSON.stringify(player)
        )}
      </Box>
    </Box>
  );
};

export default Game;