// 'use client' directive for Next.js to indicate this is a client-side component
'use client';

// Import necessary React hooks and components
import React, { useState, useEffect, useRef, use } from 'react';
import PageHeader from '@/app/containers/PageHeader/PageHeader';
import Box from '@/app/components/Box/Box';
import Typography from '@/app/components/Typography/Typography';
import PageWrapper from '@/app/containers/PageWrapper/PageWrapper';

// Main component for the HomePage
export default function HomePage() {

  // Render the component
  return (
    <>
      <PageHeader pageName="Game Tracker" />
      <PageWrapper>
        <Box sx={{ paddingBottom: 4 }}>
          <Typography variant="introMessage">
            Words. Go. Here.
          </Typography>
        </Box>
      </PageWrapper>
    </>
  );
}