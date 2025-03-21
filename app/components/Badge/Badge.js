import React from 'react';
import { Badge as MUIBadge } from '@mui/material';

const Badge = (props) => {
  return (
    <MUIBadge {...props}>
      {props.children}
    </MUIBadge>
  );
};

export default Badge;
