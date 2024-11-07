import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import styled from 'styled-components';
import { Typography, colors } from '@leapeasy/ui-kit';
import logo from 'assets/logo_horizontal.png';
import logoSmall from 'assets/logo-small.png';
import { Menu } from 'components/Menu';
import { primaryMenu, secondaryMenu } from 'data/ui/menu';

// Icons
import { IconGraphy } from '@leapeasy/ui-kit'

export const Sidebar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  return (
    <Container color={colors.purple[700]} isOpen={isMenuOpen}>
      <IconContainer isOpen={isMenuOpen}>
        <img
          src={isMenuOpen ? logoSmall : logo}
          style={{
            width: !isMenuOpen ? 100 : '100%',
            height: 31,
          }}
        />
        {
          !isMenuOpen && (
            <Typography
              variant="cta-xs"
              style={{ color: '#DAD4DD', fontWeight: 500, textAlign: 'center', width: '100px' }}
            >
              Portal
            </Typography>
          )
        }
        <IconGraphy icon={'EditorLayout.FormatIndentDecrease'} onClick={() => setMenuOpen(!isMenuOpen)} />
      </IconContainer>
      <Box sx={{ flexGrow: 1, borderBottom: '1px solid rgba(234, 234, 234, 0.1)' }}>
        <Menu setMenuOpen={setMenuOpen} isOpen={isMenuOpen} data={primaryMenu} />
      </Box>
      <Box>
        <Menu setMenuOpen={setMenuOpen} isOpen={isMenuOpen} data={secondaryMenu} />
      </Box>
    </Container>
  );
};

const Container = styled.div`
  width: ${(props) => props.isOpen ? '68px' : '240px'};
  background: ${(props) => props.color};
  min-height: 100vh;
  box-sizing: border-box;
  padding: ${(props) => props.isOpen ? '0' : '12px 12px 20px'};
  gap: 20px;
  display: flex;
  flex-direction: column;
  & > div:nth-of-type(1) {
    position: relative;
    svg {
      position: absolute;
      top: 15%;
      right: -25px;
      background-color: #E8D6EB;
      padding: 8px;
      border-radius: 10px;
      width: 16px;
      height: 16px;
      color: ${(props) => props.color};
      cursor: pointer;
    }
  }
`;

const IconContainer = styled.div`
  border-bottom: 1px solid rgba(234, 234, 234, 0.1);
  padding: ${(props) => props.isOpen ? '12px 12px': '12px 24px'};
  display: flex;
  flex-direction: column;
  gap: 4px;

  img {
    width: 100%;
    height: auto;
  }
`;