import { DashboardLayoutContainer } from 'components/Layouts/DashboardLayout';
import { Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Table } from '@leapeasy/ui-kit';
import { getPolicyAction } from 'store/actions/propertyActions';

export const Policies = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPolicyAction());
  }, []);

  return (
    <DashboardLayoutContainer>
      <Box></Box>
    </DashboardLayoutContainer>
  );
};
