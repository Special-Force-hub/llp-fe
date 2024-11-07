import React, { useEffect, useContext } from 'react';
import { Box } from '@mui/material';
import styled from 'styled-components';
import { styles, colors } from '@leapeasy/ui-kit';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from 'components/Sidebar';
import { Topbar } from 'components/Topbar';
import { BreadCrumbs } from 'components/BreadCrumbs';
import { useDispatch, useSelector } from 'react-redux';
import { primaryMenu, secondaryMenu } from 'data/ui/menu';
import { openMenuItem } from 'store/actions/uiActions';

// Context
import { UserContext } from 'context/context';

export default ({ children, shouldShowCard = true }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useContext(UserContext);

  const token = localStorage.getItem('token');
  const currentUser = JSON.parse(localStorage.getItem('user'));

  // update selected menu item when router changes
  const router = useSelector((state) => state.getIn(['router']));
  const activeMenu = useSelector((state) => state.getIn(['ui', 'menuItem'])) || 'dashboard';

  useEffect(() => {
    for (const menuList of [primaryMenu, secondaryMenu]) {
      for (const menuItem of menuList) {
        if (menuItem.child) {
          for (const childItem of menuItem.child) {
            if (router.location.pathname.includes(childItem.link)) {
              const newKey = `${menuItem.key}.${childItem.key}`;

              if (newKey !== activeMenu) {
                dispatch(openMenuItem(newKey));
              }
              return;
            }
          }
        } else {
          if (router.location.pathname.includes(menuItem.link)) {
            if (menuItem.key !== activeMenu) {
              dispatch(openMenuItem(menuItem.key));
            }

            return;
          }
        }
      }
    }
  }, [router, activeMenu]);

  // redirect back to login if not authenticated yet
  useEffect(() => {
    if (!token || !currentUser || currentUser.require2FA || currentUser.requirePasswordUpdate) {
      navigate('/login');
    }
  }, [token, currentUser]);

  if (!currentUser) return null;

  return (
    <Container >
      <Sidebar />
      <Box
        sx={{ flexGrow: 1, background: colors.purple[100], minHeight: '100%' }}
        display="flex"
        flexDirection="column"
      >
        <Topbar />
        <BreadCrumbs />

        <Box
          sx={{
            flexGrow: 1,
            margin: '0px 8px 8px 8px',
            ...(shouldShowCard
              ? {
                padding: '20px 28px',
                borderRadius: `${styles.borderRadius.large}px`,
                background: 'white',
                border: `1px solid ${colors.black[300]}`,
              }
              : {}),
          }}
        >
          {children}
        </Box>
      </Box>
      {
        user.menuOpenInMobile &&
          <MobileSidebar id={'cover-div'} onClick={(e) => {
            e.target.id == 'cover-div' && user.setMenuOpenInMobile(false)
          }}>
            <Sidebar />
          </MobileSidebar>
      }
    </Container >
  );
};

const Container = styled.div`
  display: flex;
  width: 100%;
  /* min-height: 100vh; */

  & > div:nth-of-type(2) {
   /* height: 100vh; */
   /* overflow: auto; */
  }
  @media screen and (max-width: 1280px) {
    & > div:nth-of-type(1) {
      display: none;
    }
  }
`;

const MobileSidebar = styled.div`

  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  min-height: 100vh;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;


  @media screen and (min-width: 1280px) {
    display: none;
  }
`