import { DashboardLayoutContainer } from 'components/Layouts/DashboardLayout';
import { Box } from '@mui/material';
import styled from 'styled-components';
import { Typography, colors, Loading } from '@leapeasy/ui-kit';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  getUserCountAction,
  getAppReportAction,
  getBuildingCountAction,
  getLandlordCountAction,
  getFlaggedCancelReportAction,
} from 'store/actions/reportActions';
import { BuildingCount } from './Reports/BuildingCount';
import { UserCount } from './Reports/UserCount';
import { AdminReport } from './Reports/Admin';

export const Dashboard = () => {
  const dispatch = useDispatch();

  const adminReportData = useSelector((state) => state.getIn(['report', 'adminAppReport']));
  const buildingCount = useSelector((state) => state.getIn(['report', 'buildingCount']));
  const landlordCount = useSelector((state) => state.getIn(['report', 'landlordCount']));
  const userCount = useSelector((state) => state.getIn(['report', 'userCount']));
  const currentUser = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!buildingCount) {
      dispatch(getBuildingCountAction());
    }
    if (!landlordCount) {
      dispatch(getLandlordCountAction());
    }
    dispatch(getUserCountAction());
    if (!adminReportData) {
      dispatch(getAppReportAction());
    }
    dispatch(getFlaggedCancelReportAction());
  }, []);

  if (!currentUser) return <DashboardLayoutContainer />;

  return (
    <DashboardLayoutContainer>
      <Box display="flex" flexDirection="column" gap="24px" style={{ color: colors.purple[900] }}>
        <Typography variant="h3" style={{ fontWeight: '500' }}>
          Dashboard
        </Typography>

        {((!userCount || !buildingCount) && <Loading size="medium" isPathVisible />) || (
          <>
            <TotalInfoContainer display="flex" flexDirection="column" gap="20px">
              <UserCount data={userCount.toJS().data} />
              <BuildingCount data={buildingCount.toJS().data} />
            </TotalInfoContainer>
            {adminReportData && <AdminReport data={adminReportData.toJS().data} />}
          </>
        )}
      </Box>
    </DashboardLayoutContainer>
  );
};


const TotalInfoContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media screen and (max-width: ${({ theme }) => theme['lg']}) {
    & > div {
      flex-direction: column;
    }

    @media screen and (max-width: ${({ theme }) => theme['md']}) {
      & > div:nth-of-type(2) {
        & > div {
          & > div:nth-of-type(2) {
            flex-direction: column;
          }
          /* border: 1px solid red !important; */
        }
      }
    }

  }
`