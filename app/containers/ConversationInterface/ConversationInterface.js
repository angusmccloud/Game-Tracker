import React, { useRef, useState, useEffect, useMemo } from 'react';
import Box from '@/app/components/Box/Box';
import Typography from '@/app/components/Typography/Typography';
import Select from '@/app/components/Select/Select';
import Slider from '@/app/components/Slider/Slider';
import FormControl from '@/app/components/FormControll/FormControl';
import InputLabel from '@/app/components/InputLabel/InputLabel';
import MenuItem from '@/app/components/MenuItem/MenuItem';
import TextField from '@/app/components/TextField/TextField';
import Button from '@/app/components/Button/Button';
import SageLoading from '@/app/components/SageLoading/SageLoading';
import ConditionalWrapper from '@/app/components/ConditionalWrapper/ConditionalWrapper';
import ConversationBubble from '@/app/containers/ConversationBubble/ConversationBubble';
import ConversationDivider from '@/app/containers/ConversationDivider/ConversationDivider';
import Fab from '@/app/components/Fab/Fab';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useTheme, useMediaQuery } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import QuestionHistory from '../../utils/QuestionHistory';
const imageUrl = process.env.NEXT_PUBLIC_IMAGE_URL;

const ConversationInterface = ({
  series,
  selectedSeries,
  selectedBook,
  selectedChapter,
  currentQuestion,
  conversation,
  conversationLoading,
  handleSeriesChange,
  handleBookChange,
  handleChapterChange,
  handleAskQuestion: originalHandleAskQuestion,
  setCurrentQuestion,
  conversationEndRef,
  handleOpenDialog,
  conversationId,
  loadingMessage,
  questionInputRef
}) => {
  const theme = useTheme();
  const isXL = useMediaQuery(theme.breakpoints.up('xl'));
  const isL = useMediaQuery(theme.breakpoints.up('lg'));
  const isM = useMediaQuery(theme.breakpoints.up('md'));
  const isS = useMediaQuery(theme.breakpoints.up('sm'));


  const [isExpanded, setIsExpanded] = useState(false);
  // useEffect(() => {
  //   console.log('Series Data:', series);
  //   console.log('Selected Series:', selectedSeries);
  //   console.log('Selected Book:', selectedBook);
  //   console.log('Selected Chapter:', selectedChapter);
  // }, [series, selectedSeries, selectedBook, selectedChapter]);


  // Safe access to series data
  // const selectedSeriesBooks = useMemo(() => {
  //   if (!series || !selectedSeries) return [];
  //   const found = series.find(s => s.seriesId === selectedSeries);
  //   if (!found) {
  //     console.warn('Selected series not found in series data:', selectedSeries);
  //     return [];
  //   }
  //   return found.books || [];
  // }, [series, selectedSeries]);

  // Expand UI if no series is selected
  // useEffect(() => {
  //   if (!selectedSeries) {
  //     setIsExpanded(true);
  //   }
  // }, [selectedSeries]);

  const questionHistory = useRef(new QuestionHistory());

  const selectedSeriesBooks = selectedSeries ? series.find(s => s.seriesId === selectedSeries).books : [];

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleQuestionSubmit();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setCurrentQuestion(questionHistory.current.previous());
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setCurrentQuestion(questionHistory.current.next());
    }
  };

  const handleQuestionSubmit = () => {
    if (!currentQuestion) return;
    questionHistory.current.add(currentQuestion);
    originalHandleAskQuestion();
  };

  const currentLabelFontProps = {
    fontFamily: theme.typography.currentLabel.fontFamily,
    fontSize: isS ? '1.7rem' : '1.2rem',
    '&.Mui-focused': {
      fontFamily: theme.typography.currentLabel.fontFamily,
    },
    top: "-10px"
  };

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: isXL || isL || isM ? 'row' : 'column', gap: 2 }}>
        <Box sx={{ 
          display: 'flex', 
          gap: 2,
          padding: 2,
          borderRadius: 1,
          boxShadow: 0,
          width: '100%',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            {!isExpanded && selectedSeries && (
              <>
                <Typography sx={currentLabelFontProps}>
                  <strong>Series:</strong> {series.find(s => s.seriesId === selectedSeries)?.seriesName}
                </Typography>
                {selectedBook && (
                  <>
                    <Typography sx={currentLabelFontProps}>
                      <strong>Book:</strong> {selectedSeriesBooks.find(b => b.numberInSeries === selectedBook)?.title}
                    </Typography>
                    <Typography sx={currentLabelFontProps}>
                      <strong>Chapter:</strong> {selectedChapter || 1}
                    </Typography>
                  </>
                )}
              </>
            )}
            {isExpanded && (
              <>
                <Typography sx={{fontFamily: theme.typography.introMessage.fontFamily}}>
                  Pick a series, book, and chapter to start a conversation. I'll try to remember your choices for next time.
                </Typography>
              </>
            )}
          </Box>
          <Button
            size="small"
            variant="outlined"
            color="primaryDark"
            onClick={() => setIsExpanded(!isExpanded)}
            startIcon={isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            sx={{
              minWidth: 'auto',
              marginLeft: 'auto'
            }}
          >
            {isExpanded ? 'Close' : 'Change'}
          </Button>
        </Box>
      </Box>

      {isExpanded && (
        <Box sx={{ display: 'flex', flexDirection: isXL || isL || isM ? 'row' : 'column', gap: 2, mt: 2 }}>
          <FormControl fullWidth={isS}>
            <InputLabel 
              id="series-select-label"
              sx={{ 
                fontFamily: theme.typography.inputLabel.fontFamily,
                fontSize: theme.typography.inputLabel.fontSize,
                '&.Mui-focused': {
                  fontFamily: theme.typography.inputLabel.fontFamily,
                },
                top: "-10px"
              }}
            >
              Series
            </InputLabel>
            <Select
              labelId="series-select-label"
              id="series-select"
              label="Series"
              value={selectedSeries || ''}
              onChange={handleSeriesChange}
              disabled={series.length === 0 || conversationLoading}
            >
              {series.map(s => (
                <MenuItem key={s.seriesId} value={s.seriesId}>{s.seriesName}</MenuItem>
              ))}
            </Select>
          </FormControl>
          {selectedSeriesBooks.length > 1 && (
            <FormControl fullWidth={isS}>
              <InputLabel 
                id="book-select-label"
                sx={{ 
                  fontFamily: theme.typography.inputLabel.fontFamily,
                  fontSize: theme.typography.inputLabel.fontSize,
                  '&.Mui-focused': {
                    fontFamily: theme.typography.inputLabel.fontFamily,
                  },
                  top: "-10px"
                }}
              >
                Book
              </InputLabel>
              <Select
                labelId="book-select-label"
                id="book-select"
                label="Book"
                value={selectedBook || ''}
                onChange={handleBookChange}
                disabled={!selectedSeries || conversationLoading}
              >
                {selectedSeriesBooks.map(b => {
                  const img = b.coverImage ? `${imageUrl}/${b.coverImage}` : null;
                  return (
                    <ConditionalWrapper
                      key={b.numberInSeries}
                      condition={img}
                      wrapper={(children) => (
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '5px' }}>
                          <img src={img} alt={b.title} style={{ height: '36px', marginLeft: '6px'}} />
                          {children}
                        </div>
                      )}
                    >
                      <MenuItem key={b.numberInSeries} value={b.numberInSeries}>{b.title} ({b.numberInSeries})</MenuItem>
                    </ConditionalWrapper>
                  )
                })}
              </Select>
            </FormControl>
          )}
        </Box>
      )}

      {isExpanded && selectedSeries && selectedBook ? (
        <Box sx={{ marginTop: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, marginBottom: 1 }}>
            <Button
              size="small"
              variant="outlined"
              color="primaryDark"
              onClick={() => handleChapterChange(null, Math.max(1, (selectedChapter || 1) - 1))}
              disabled={!selectedBook || conversationLoading || selectedChapter === 1}
            >
              <RemoveIcon />
            </Button>
            <Typography 
              variant="pageAccent"
              sx={{ minWidth: '120px', textAlign: 'center', fontSize: '2rem' }}
            >
              Chapter: {selectedChapter || 1}
            </Typography>
            <Button
              size="small"
              variant="outlined"
              color="primaryDark"
              onClick={() => handleChapterChange(null, Math.min(selectedSeriesBooks.find(b => b.numberInSeries === selectedBook).numberOfChapters, (selectedChapter || 1) + 1))}
              disabled={!selectedBook || conversationLoading || selectedChapter === selectedSeriesBooks.find(b => b.numberInSeries === selectedBook).numberOfChapters}
            >
              <AddIcon />
            </Button>
          </Box>
          <Slider
            value={selectedChapter || 1}
            onChange={handleChapterChange}
            min={1}
            max={selectedBook ? selectedSeriesBooks.find(b => b.numberInSeries === selectedBook).numberOfChapters : 1}
            disabled={!selectedBook || conversationLoading}
            valueLabelDisplay="auto"
            sx={{
              color: theme.palette.primary.dark,
              '& .MuiSlider-thumb': {
                color: theme.palette.primary.dark,
              },
              '& .MuiSlider-track': {
                color: theme.palette.primary.dark,
              },
              '& .MuiSlider-rail': {
                color: theme.palette.primary.dark,
                opacity: 0.3,
              }
            }}
          />
        </Box>
      ) : null}

      <ConditionalWrapper
        condition={conversation.length > 0 || conversationLoading}
        wrapper={(children) => (
          <Box sx={{
            borderRadius: 3, 
            borderColor: theme.palette.primary.main, 
            borderWidth: 1, 
            borderStyle: 'solid', 
            position: 'relative',
          }}>
            <Box sx={{paddingTop: 2, paddingBottom: 2, paddingLeft: 2, paddingRight: 2, display: 'flex', flexDirection: 'column', maxHeight: { xs: '50vh', sm: '55vh', md: '60vh', lg: '65vh', xl: '70vh' }, overflowY: 'auto'}}>
              {conversation.map((entry, index) => {
                const previousEntry = conversation[index - 1];
                const showDivider = previousEntry && (previousEntry.book !== entry.book || previousEntry.chapter !== entry.chapter);
              
                return (
                  <React.Fragment key={index}>
                    {(index === 0 || showDivider) && (
                      <ConversationDivider book={entry.book} chapter={entry.chapter} />
                    )}
                    <ConversationBubble entry={entry} conversationId={conversationId} />
                  </React.Fragment>
                );
              })}
              {conversationLoading && (
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  padding: 2,
                  marginTop: 2
                }}>
                  <CircularProgress size={20} sx={{ marginRight: 1 }} />
                  <Typography variant="body2" color="text.secondary">
                    {loadingMessage}
                  </Typography>
                </Box>
              )}
              <div ref={conversationEndRef} />
            </Box>
            {children}
            {conversation.length >= 1 && (
              <Fab color="secondary" sx={{ position: 'absolute', bottom: 88, right: 16 }} onClick={handleOpenDialog}>
                <DeleteIcon />
              </Fab>
            )}
          </Box>
        )}
      >
        <Box sx={{borderTopWidth: 1, borderTopColor: theme.palette.primary.main, borderTopStyle: 'solid', paddingLeft: conversation.length > 0 ? 2 : 0, paddingRight: conversation.length > 0 ? 2 : 0, display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
          <TextField
            label="Ask a question"
            fullWidth
            variant="outlined"
            value={currentQuestion || ''}
            onChange={(e) => setCurrentQuestion(e.target.value)}
            onKeyDown={handleKeyDown}
            sx = {{marginTop: 1, marginBottom: 1, marginRight: 1}}
            disabled={
              series.length === 0 ||
              !selectedSeries ||
              !selectedBook ||
              !selectedChapter ||
              conversationLoading
            }
            inputRef={questionInputRef}
          />
          <Button
            variant="contained"
            color="secondary"
            sx={{
              marginTop: 1, 
              marginBottom: 1,
              // backgroundColor: theme.palette.primary.dark,
              // color: "white",
              // '&:hover': {
              //   backgroundColor: theme.palette.primary.highlight,
              // }
            }}
            onClick={handleQuestionSubmit}
            disabled={
              series.length === 0 ||
              !selectedSeries ||
              !selectedBook ||
              !selectedChapter ||
              !currentQuestion ||
              conversationLoading
            }
          >
            Ask
          </Button>
        </Box>
      </ConditionalWrapper>
    </>
  );
};

export default ConversationInterface;
