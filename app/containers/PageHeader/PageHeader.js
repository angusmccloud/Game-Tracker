import React from 'react';
import AppBar from '@/app/components/AppBar/AppBar';
import Container from '@/app/components/Container/Container';
import Toolbar from '@/app/components/Toolbar/Toolbar';
import Typography from '@/app/components/Typography/Typography';
// import logoImage from '../../assets/images/sage-icon.jpg';
import Box from '@/app/components/Box/Box';
import { useTheme, useMediaQuery } from '@mui/material';
import MainMenu from '@/app/components/MainMenu/MainMenu';
import { PaddingRounded } from '@mui/icons-material';


const PageHeader = ({ pageName }) => {
  const theme = useTheme();
  const isXL = useMediaQuery(theme.breakpoints.up('xl'));
  const isL = useMediaQuery(theme.breakpoints.up('lg'));
  const isM = useMediaQuery(theme.breakpoints.up('md'));
  const isS = useMediaQuery(theme.breakpoints.up('sm'));
  return (
    <Box
      sx={{
        backgroundColor: 'primary.dark',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          maxWidth: '80rem',
          margin: '0 auto',
          color: 'white',
          alignItems: 'center',
          gap: 0,
          paddingLeft: 2,
          paddingRight: 0,
          paddingTop: 0,
          paddingBottom: 0,
          height: '4rem',
          position: 'relative', // added for absolute Typography positioning
        }}
      >
        {/* <MainMenu
          fontSize='2rem'
          sx={{ 
            display: isM ? 'block' : 'none',
            backgroundColor: 'primary.paper',
          }}
        /> */}
        <Typography 
          variant="pageTitle"
        >
          {pageName}
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        {/* <img src={logoImage.src} alt="Story Sage" style={{ height: "100%", width: "auto", position: "relative", borderRadius: 0 }} /> */}
      </Box>
    </Box>
  );
};

export default PageHeader;
