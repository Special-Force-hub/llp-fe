import React, { useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import { Typography, styles, colors } from '@leapeasy/ui-kit';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from 'components/Sidebar';
import { Topbar } from 'components/Topbar';
import { BreadCrumbs } from 'components/BreadCrumbs';

export default ({ children }) => {
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const currentUser = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!token || !currentUser || currentUser.require2FA || currentUser.requirePasswordUpdate) {
      navigate('/login');
    }
  }, [token, currentUser]);

  if (!currentUser) return null;

  return (
    <Box display="flex" sx={{ width: '100%', minHeight: '100vh' }}>
      <Sidebar />

      <Box sx={{ flexGrow: 1, background: colors.purple[100] }}>
        <Topbar />
        <BreadCrumbs />

        <Box>{children}</Box>
      </Box>
    </Box>
  );
};
