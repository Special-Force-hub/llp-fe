import React, { useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import logo from 'assets/logo_horizontal.png';
import { Typography, styles } from '@leapeasy/ui-kit';
import Background from './Background';
import logoLightGray from 'assets/logo_light_gray.png';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default ({ children, showGrayLogo = false }) => {
  const navigate = useNavigate();

  const userState = useSelector((state) => state.getIn(['auth', 'currentUser']));
  const token = localStorage.getItem('token');
  const currentUser = userState ? userState.toJS() : null;

  // Redirect login page to the application pages according to the user role data
  useEffect(() => {
    if (token && currentUser) {
      if (currentUser.require2FA) {
        if (!currentUser.mfaMethod) {
          navigate('/setup-2fa');
        }
      } else if (currentUser.requirePasswordUpdate) {
        navigate('/update-auth');
      } else {
        navigate('/dashboard');
      }
    }
  }, [token, currentUser]);

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
      }}
    >
      <Box
        sx={{
          height: '100%',
          display: 'flex',
          alignItems: 'flex-start',
          width: '1440px',
          maxWidth: '90%',
          margin: 'auto',
        }}
      >
        <Grid
          container
          justifyContent="space-between"
          alignItems="stretch"
          sx={{ marginTop: '12vh' }}
        >
          <Grid
            item
            md={6}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '70vh',
            }}
          >
            <img
              src={logo}
              style={{
                width: 250,
                height: 80,
              }}
            />

            <Box display="flex" flexDirection="column" sx={{ gap: '16px' }}>
              <Typography variant="h1" style={{ color: 'white', fontWeight: '700' }}>
                Welcome to Your Leap Portal
              </Typography>

              <Typography variant="body1" style={{ color: 'white' }}>
                Transforming property management for Admins, Landlords, and <br />
                Property Managers. Sign in to streamline your operations and <br />
                enhance portfolio performance
              </Typography>
            </Box>
          </Grid>

          <Grid item md={0.5} />
          <Grid item md={5.5} sx={{ minHeight: '70vh' }}>
            <Box
              sx={{
                boxShadow: styles.boxShadow.md,
                background: 'white',
                borderRadius: `${styles.borderRadius.large}px`,
                padding: `${styles.spacing.space12}px`,
                boxSizing: 'border-box',
                minHeight: '100%',
                width: '90%',
                margin: 'auto',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {children}

              {showGrayLogo && (
                <>
                  <Box flexGrow={1} />

                  <Box display="flex" justifyContent="center" mt={4}>
                    <img src={logoLightGray} />
                  </Box>
                </>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Background />
    </Box>
  );
};
