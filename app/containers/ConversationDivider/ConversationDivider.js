import React from 'react';
import Box from '@/app/components/Box/Box';
import Typography from '@/app/components/Typography/Typography';
import { useTheme } from '@mui/material';

const ConversationDivider = ({ book, chapter }) => {
  const theme = useTheme();

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', marginY: 2 }}>
      <Box sx={{ flexGrow: 1, borderBottom: '1px solid', borderColor: theme.palette.divider }} />
      <Typography variant="pageAccent" sx={{ marginX: 2, whiteSpace: 'nowrap', fontSize: '1.5rem' }}>
        {`Book ${book}, Chapter ${chapter}`}
      </Typography>
      <Box sx={{ flexGrow: 1, borderBottom: '1px solid', borderColor: theme.palette.divider }} />
    </Box>
  );
};

export default ConversationDivider;
