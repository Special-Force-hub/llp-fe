import { DashboardLayoutContainer } from 'components/Layouts/DashboardLayout';
import { Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import React, { useEffect } from 'react';
import { Tooltip } from '@leapeasy/ui-kit';
import {
  getBuildingAction,
  getFilteredDataAction,
  setBuildingAction,
} from 'store/actions/propertyActions';
import { BuildingTable } from 'components/BuildingTable/BuildingTable';

export const Buildings = props => {
  const { filter } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    if (filter) {
      let filterData;
      if (filter === 'Event Process') {
        filterData = { building_type: ['Event Process'] };
      } else if (filter === 'Auto Enroll') {
        filterData = { building_type: ['Auto Enroll'] };
      } else if (filter === 'Active Leap Unit Building') {
        filterData = 'active_leap_units';
      }
      dispatch(setBuildingAction(null));
      dispatch(
        getFilteredDataAction({
          filterData,
          title: 'building',
        }),
      );
    } else {
      dispatch(getBuildingAction({ filter }));
    }
  }, []);

  return (
    <DashboardLayoutContainer>
      <Box>
        <BuildingTable />
      </Box>
    </DashboardLayoutContainer>
  );
};
