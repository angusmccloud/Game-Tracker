'use client'; // directive for Next.js to indicate this is a client-side component
import React from 'react';
import { Authenticator } from '@aws-amplify/ui-react';
import PageHeader from '@/app/containers/PageHeader/PageHeader';
import Box from '@/app/components/Box/Box';
import Typography from '@/app/components/Typography/Typography';
import PageWrapper from '@/app/containers/PageWrapper/PageWrapper';
import Button from '@/app/components/Button/Button';
import { createGame } from '@/app/service/games';


// Main component for the HostGamePage
export default function HostGamePage() {

  return (
    <Authenticator>
    {({ signOut, user }) => (
        <>
          <PageHeader pageName="Host Game" />
          <PageWrapper>
            <Box sx={{ paddingBottom: 4 }}>
              <Typography>
                Host Game
              </Typography>
              <Button onClick={signOut}>
                Sign Out
              </Button>
              <Button variant="contained" onClick={createGame}>
                Create Game
              </Button>
            </Box>
          </PageWrapper>
        </>
      )}
    </Authenticator>
  );
}