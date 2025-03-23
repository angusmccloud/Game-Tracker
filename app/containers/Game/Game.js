'use client';
import React from 'react';
import Box from '@/app/components/Box/Box'
import Player from '@/app/components/Player/Player'
import { useEffect, useState } from 'react'
import { generateClient } from "aws-amplify/data";

const client = generateClient();
const gameId = 'e6baa065-9efa-4828-bc9e-00e7bfaebe9c'

const Game = (props) => {
  const [ playerList, setPlayerList ] = useState([]);
  useEffect(() => {
    if(!gameId) {
      return;
    }

    const gameSub = client.models.GamePlayers.observeQuery(
      {
        filter: {
          gameId: {
            eq: gameId
          },
        },
      },
    ).subscribe({
      next: ({ items }) => {
        console.log(items);
        setPlayerList(items);
      },
    });
    return () => {
      // If you have multiple data models, make sure you ubsub from all of them
      gameSub.unsubscribe();
    };
  }, [gameId]);
  return (
    <Box>
      Game is Here!
      <Box>
        List of Players {JSON.stringify(playerList)}
        <Player></Player>
      </Box>
    </Box>
  );
};

export default Game;