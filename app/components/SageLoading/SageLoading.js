import React from 'react';
import { CircularProgress, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Image from 'next/image';
import sageIcon from '../../assets/images/sage-icon.jpg';

const SageLoading = (props) => {
  const theme = useTheme();
  const size = props.size || 40;

  return (
    <Box sx={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
      <Image
        src={sageIcon}
        alt="Sage Icon"
        style={{ height: size, width: size, borderRadius: size / 2 }}
      />
      <CircularProgress
        size={size + 5}
        sx={{
          color: theme.palette.primary.main,
          position: 'absolute',
        }}
      />
    </Box>
  );
};

export default SageLoading;
