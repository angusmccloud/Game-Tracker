import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import ArrowBack from '@mui/icons-material/ArrowBack';

const MainMenu = ({ fontSize }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        edge="start"
        sx={{ 
          color: 'white',
          marginRight: 0.5
        }}
        aria-label="menu"
        onClick={handleMenuOpen}
      >
        <MenuIcon sx={{ fontSize: 38 }} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        sx={{
          zIndex: 1200
        }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Typography variant="pageAccent" sx={{ fontSize, paddingLeft: '15px' }}>{`Story Sage`}</Typography>
        <MenuItem onClick={handleMenuClose}>
          <Typography variant="pageAccent" sx={{ fontSize: "1rem" }}>{`These don't do anything yet 😅`}</Typography>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleMenuClose}>
          <Typography variant="pageAccent" sx={{ fontSize }}>{`📖 Story Snacks`}</Typography>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Typography variant="pageAccent" sx={{ fontSize }}>{`🎭 Character Chat`}</Typography>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Typography variant="pageAccent" sx={{ fontSize }}>{`📑 Quick Quote Quest`}</Typography>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Typography variant="pageAccent" sx={{ fontSize }}>{`⏰ Timeline Tracker`}</Typography>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Typography variant="pageAccent" sx={{ fontSize }}>{`🗺️ Plot Plotter`}</Typography>
        </MenuItem>
        <Divider />
        <MenuItem 
          onClick={handleMenuClose}
          sx={{
            justifyContent: 'flex-start',
            color: 'text.secondary'
          }}
        >
          <Typography variant="pageAccent" sx={{ fontSize }}>
            <ArrowBack sx={{ marginRight: '8px' }} /> Close
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

MainMenu.propTypes = {
  fontSize: PropTypes.string
};

MainMenu.defaultProps = {
  fontSize: '1rem'
};

export default MainMenu;

/*

📚 Bookworm's Buffet
🔮 Plot Predictor
🦉 Wisdom Whisperer
📖 Story Snacks
🪶 Quill Quest
🎭 Character Chat
☕️ Chapter & Chill
🌙 Bedtime Bytes
☕️ Chapter & Chill
📑 Quick Quote Quest
📚 Series Seeker
🎭 Character Compass
🗺️ Plot Plotter
⏰ Timeline Tracker
🎬 Scene Scanner
*/