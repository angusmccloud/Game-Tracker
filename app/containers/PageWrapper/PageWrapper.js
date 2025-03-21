import React from 'react';
import Box from '@/app/components/Box/Box';

const PageWrapper = ({ children }) => {
  return (
    <Box
      sx={{
        paddingLeft: { xs: 1, sm: 2, md: 3, lg: 4, xl: 5 },
        paddingRight: { xs: 1, sm: 2, md: 3, lg: 4, xl: 5 },
        paddingTop: 2,
        paddingBottom: 2,
        maxWidth: { xs: '100%', sm: '100%', md: '100%', lg: '80%', xl: '80%' },
        margin: '0 auto',
      }}
    >
      {children}
    </Box>
  );
};

export default PageWrapper;
