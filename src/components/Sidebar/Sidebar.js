import React, { useState } from 'react';
import styled from 'styled-components';
import { Box } from '@mui/material';
import { Typography, colors } from '@leapeasy/ui-kit';
import logo from 'assets/logo_horizontal.png';
import collapsedLogo from 'assets/logo-sm.png'
import toggle from 'assets/toggle.png'
import { Menu } from 'components/Menu';
import { primaryMenu, secondaryMenu } from 'data/ui/menu';
import { useDispatch } from 'react-redux';
import { collapsedAction } from 'store/actions/uiActions';

export const Sidebar = ({ collapsed }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  // const collapsed = useSelector((state) => state.getIn(['ui', 'collapsed']));
  const dispatch = useDispatch();

  return (
    <Container
      collapsed={collapsed}
      background={colors.purple[700]}
    >
      <img
        src={toggle}
        style={{
          position: 'absolute',
          top: 14,
          right: (collapsed ? '-48px' : '-16px'),
          cursor: 'pointer',
          transition: 'all 0.5s ease'
        }}
        alt='toggle'
        onClick={() => { 
          dispatch(collapsedAction(!collapsed))
        }}
      />
      <Box
        sx={{
          borderBottom: '1px solid rgba(234, 234, 234, 0.1)',
          padding: '12px 24px',
        }}
        display="flex"
        flexDirection="column"
        gap="4px"
        paddingLeft={collapsed && 12}
      >
        <img
          alt='logo'
          src={collapsed ? collapsedLogo : logo}
          style={{
            width: collapsed ? '30px' : '100px',
            height: 31,
            transition: "all 0.5s ease",
            marginLeft: collapsed && '-15px'
          }}
        />

        <Typography
          variant="cta-xs"
          style={{ color: '#DAD4DD', fontWeight: 500, textAlign: 'center', width: '100px', opacity: collapsed ? 0 : 1, transition: 'all 0.5s ease' }}
        >
          Portal
        </Typography>
      </Box>

      <Box sx={{ flexGrow: 1, borderBottom: '1px solid rgba(234, 234, 234, 0.1)' }}>
        <Menu isOpen={isMenuOpen} data={primaryMenu} collapsed={collapsed} />
      </Box>

      <Box>
        <Menu isOpen={isMenuOpen} data={secondaryMenu} collapsed={collapsed} />
      </Box>
    </Container>
  );
};


const Container = styled.div`
  
  /* max-width: 240px; */
  max-width: ${(props) => props.collapsed ? '70px' : '240px'};
  min-width: ${(props) => props.collapsed ? '70px' : '240px'};
  /* min-width: 240px; */
  min-height: 100vh;
  box-sizing: border-box;
  padding: 12px 12px 20px;
  gap: 20px;
  display: flex;
  flex-direction: column;
  max-height: 100vh;
  background: ${(props) => props.background};
  position: relative;
  transition: all 0.5s ease;

  /* overflow: auto; */


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