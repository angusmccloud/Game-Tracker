import React, { useContext } from 'react';
import ReactMarkdown from 'react-markdown';
import { useTheme } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ErrorIcon from '@mui/icons-material/Error';
import Box from '@/app/components/Box/Box';
import Typography from '@/app/components/Typography/Typography';
import IconButton from '@/app/components/IconButton/IconButton';
import Tooltip from '@/app/components/Tooltip/Tooltip';
import postFeedback from '@/app/services/postFeedback';
import { SnackbarContext } from '@/app/contexts/SnackbarContext/SnackbarContext';

const ConversationBubble = ({ entry, conversationId }) => {
  const theme = useTheme();
  const { setSnackbar } = useContext(SnackbarContext);

  const handleFeedback = async (type) => {
    const success = await postFeedback(entry.requestId, type, conversationId);
    if (success) {
      // console.log('Feedback posted successfully');
      setSnackbar({
        message: 'Feedback Received',
        severity: 'success',
      })
    } else {
      // console.log('Failed to post feedback');
      setSnackbar({
        message: 'There was an Error Receiving Your Feedback',
        severity: 'error',
      })
    }
  };

  return (
    <Box
      sx={{
        width: '80%',
        alignSelf: entry.askedBy === 'user' ? 'flex-end' : 'flex-start',
        backgroundColor: entry.askedBy === 'user' ? theme.palette.primary.main : theme.palette.background.paper,
        color: entry.askedBy === 'user' ? theme.palette.primary.contrastText : theme.palette.text.primary,
        borderRadius: entry.askedBy === 'user' ? '16px 16px 0 16px' : '16px 16px 16px 0',
        borderWidth: entry.askedBy === 'bot' ? 1 : 0,
        borderStyle: entry.askedBy === 'bot' ? 'solid' : 'none',
        borderColor: entry.askedBy === 'bot' ? theme.palette.primary.main : 'none',
        padding: 2,
        marginBottom: 1,
      }}
    >
      <ReactMarkdown
        children={entry.text}
        components={{
          p: ({ children }) => (
            <Typography 
              variant={entry.askedBy === 'bot' ? 'botMessage' : 'userMessage'}
              sx={{
                marginBottom: entry.askedBy === 'bot' ? '1em' : 0,
              }}>
              {children}
            </Typography>
          ),
          ul: ({ children }) => (
            <ul style={{ marginTop: 0, marginBottom: 0, paddingInlineStart: '1em' }}>
              {children}
            </ul>
          ),
        }}
      />
      {(entry.askedBy === 'bot') && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 1 }}>
          <Tooltip title="Included Spoilers">
            <IconButton aria-label="Included Spoilers" color={'error'} onClick={() => handleFeedback('spoiler')}>
              <ErrorIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Not Helpful">
            <IconButton aria-label="Not Helpful" color={'error'} onClick={() => handleFeedback('negative')}>
              <ThumbDownIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Helpful">
            <IconButton aria-label="Helpful" color={'success'} onClick={() => handleFeedback('positive')}>
              <ThumbUpIcon />
            </IconButton>
          </Tooltip>
        </Box>
      )}
    </Box>
  );
};

export default ConversationBubble;
