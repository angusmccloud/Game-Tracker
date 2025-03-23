import React, { useState, useEffect } from 'react';
import BaseModal from '@/app/components/BaseModal/BaseModal';
import { Box, Button, TextField } from '@mui/material';

const NotesForDMModal = ({ open, handleClose, handleSave, initialNotes }) => {
  const [notes, setNotes] = useState(initialNotes);

  useEffect(() => {
    if (!open) {
      setNotes(initialNotes);
    }
  }, [open, initialNotes]);

  const handleNotesChange = (event) => {
    setNotes(event.target.value);
  };

  const handleSaveClick = () => {
    handleSave(notes);
  };

  const handleCancelClick = () => {
    setNotes(initialNotes);
    handleClose();
  };

  return (
    <BaseModal open={open} handleClose={handleCancelClick}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Notes for DM"
          multiline
          rows={4}
          value={notes}
          onChange={handleNotesChange}
          variant="outlined"
        />
        <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
          <Button variant="outlined" onClick={handleCancelClick}>Cancel</Button>
          <Button variant="contained" onClick={handleSaveClick}>Save</Button>
        </Box>
      </Box>
    </BaseModal>
  );
};

export default NotesForDMModal;
