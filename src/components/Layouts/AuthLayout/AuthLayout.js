import React, { useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import styled from 'styled-components';
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
        <Container>
          <InfoContainer>
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
          </InfoContainer>
          <Grid item md={0.5} />
          <LoginContainer>
            <LoginInnerDiv
              boxShadow={styles.boxShadow.md}
              borderRadius={styles.borderRadius.large}
              padding={styles.spacing.space12}
              sx={{
                
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
            </LoginInnerDiv>
          </LoginContainer>
        </Container>
      </Box>
      <Background />
    </Box>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  min-height: 70vh;
  align-items: stretch;
  margin-top: 12vh;
  width: 100%;
`


const InfoContainer = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  
  @media screen and (max-width: ${({theme}) => theme['2xl']}) {
    display: none;
  }
`

const LoginContainer = styled.div`
  width: 50%;
  min-height: 70vh;

  @media screen and (max-width: ${({theme}) => theme['2xl']}) {
    width:100%;
  }
`

const LoginInnerDiv = styled.div`
  box-shadow: ${(props) => props.boxShadow};
  border-radius: ${(props) => props.borderRadius + 'px'};
  padding: ${(props) => props.padding+'px'};
  background: white;
  box-sizing: border-box;
  min-height: 100%;
  width: 80%;
  @media screen and (max-width: ${({theme}) => theme['2xl']}) {
    width:100%;
  }
  @media screen and (max-width: ${({theme}) => theme['sm']}) {
    padding-left: 10px;
    padding-right: 10px;
  }
  max-width: 480px;
  margin: auto;
  display: flex;
  flex-direction: column;
`