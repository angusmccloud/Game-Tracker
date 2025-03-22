'use client';
import React, { useState } from 'react';
import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Snackbar, Alert } from '@mui/material';
import { darkTheme, lightTheme } from '@/app/themes/themes';
import { DefaultSnackbar, SnackbarContext } from '@/app/contexts/SnackbarContext/SnackbarContext';
import '@aws-amplify/ui-react/styles.css';
import outputs from '../amplify_outputs.json';

Amplify.configure(outputs);

export default function RootLayout(props) {
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarDetails, setSnackbarDetails] = useState(DefaultSnackbar);

  // Pieces for the Snackbar Context
  const setSnackbar = (props) => {
    const { message, action, severity = 'success', duration = 7000 } = props;
    setSnackbarDetails({
      message: message,
      duration: duration,
      action: action,
      severity: severity,
    });
    setShowSnackbar(true);
  };

  const onDismissSnackBar = () => {
    setShowSnackbar(false);
    setSnackbarDetails(DefaultSnackbar);
  };
  
  return (
    <html lang="en">
      <body>
        <Authenticator>
          {({ signOut, user }) => (
            <ThemeProvider theme={lightTheme}>
              <SnackbarContext.Provider
                value={{ snackbar: snackbarDetails, setSnackbar }}
              >
                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                <CssBaseline />
                {/* This is where a page actually loads */}
                {props.children}
                <Snackbar
                  open={showSnackbar}
                  onClose={onDismissSnackBar}
                  message={snackbarDetails.message}
                  action={snackbarDetails.action}
                  autoHideDuration={snackbarDetails.duration}
                  anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
                >
                  <Alert onClose={onDismissSnackBar} severity={snackbarDetails.severity} sx={{ width: '100%' }}>
                    {snackbarDetails.message}
                  </Alert>
                </Snackbar>
              </SnackbarContext.Provider>
            </ThemeProvider>
        )}
        </Authenticator>
      </body>
    </html>
  );
}