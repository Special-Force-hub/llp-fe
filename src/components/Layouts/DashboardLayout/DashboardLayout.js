import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import { styles, colors } from '@leapeasy/ui-kit';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from 'components/Sidebar';
import { Topbar } from 'components/Topbar';
import { BreadCrumbs } from 'components/BreadCrumbs';
import { useDispatch, useSelector } from 'react-redux';
import { primaryMenu, secondaryMenu } from 'data/ui/menu';
import { openMenuItem } from 'store/actions/uiActions';

export default ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    <Box display="flex" sx={{ width: '100%', minHeight: '100vh' }}>
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
            margin: '0px 8px 8px 8px',
            padding: '20px 28px',
            borderRadius: `${styles.borderRadius.large}px`,
            background: 'white',
            border: `1px solid ${colors.black[300]}`,
            flexGrow: 1,
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};
