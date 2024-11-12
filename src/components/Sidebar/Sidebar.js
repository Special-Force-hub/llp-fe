import React, { useState } from 'react';
import styled from 'styled-components';
import { Box } from '@mui/material';
import { Typography, colors } from '@leapeasy/ui-kit';
import logo from 'assets/logo_horizontal.png';
import { Menu } from 'components/Menu';
import { primaryMenu, secondaryMenu } from 'data/ui/menu';

export const Sidebar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  return (
    <Container
      background={colors.purple[700]}
    >
      <Box
        sx={{
          borderBottom: '1px solid rgba(234, 234, 234, 0.1)',
          padding: '12px 24px',
        }}
        display="flex"
        flexDirection="column"
        gap="4px"
      >
        <img
          src={logo}
          style={{
            width: 100,
            height: 31,
          }}
        />

        <Typography
          variant="cta-xs"
          style={{ color: '#DAD4DD', fontWeight: 500, textAlign: 'center', width: '100px' }}
        >
          Portal
        </Typography>
      </Box>

      <Box sx={{ flexGrow: 1, borderBottom: '1px solid rgba(234, 234, 234, 0.1)' }}>
        <Menu isOpen={isMenuOpen} data={primaryMenu} />
      </Box>

      <Box>
        <Menu isOpen={isMenuOpen} data={secondaryMenu} />
      </Box>
    </Container>
  );
};


const Container = styled.div`
  max-width: 240px;
  min-width: 240px;
  min-height: 100vh;
  box-sizing: border-box;
  padding: 12px 12px 20px;
  gap: 20px;
  display: flex;
  flex-direction: column;
  max-height: 100vh;
  background: ${(props) => props.background};

  overflow: auto;


  /* Webkit browsers (Chrome, Safari, newer Edge) */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(234, 234, 234, 0.1);
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(234, 234, 234, 0.3);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgba(234, 234, 234, 0.5);
  }
`