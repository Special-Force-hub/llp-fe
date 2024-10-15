import { useSelector, useDispatch } from 'react-redux';
import { Typography } from '@leapeasy/ui-kit';
import { Box } from '@mui/material';
import { AllApplicationsChart } from 'elements/Charts/AllApplicationsChart';
import { AppTypeChart } from 'elements/Charts/AppTypeChart';
import { getAppReportAction } from 'store/actions/reportActions';
import { useEffect } from 'react';

const RateCard = ({ item }) => {
  return (
    <Box
      width="20%"
      boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
      background="#F7F7F9"
      borderRadius="12px"
      padding="17px"
      margin="10px"
    >
      <Box>
        <Typography variant="body2" style={{ padding: '6px' }}>
          {item.title}
        </Typography>
      </Box>
      <Box>
        <Typography variant="h1" style={{ color: '#4D1859', fontWeight: '700' }}>
          {item.rate}
        </Typography>
      </Box>
    </Box>
  );
};

export const ReportTab = ({ building, onNavigateToApplications }) => {
  const dispatch = useDispatch();

  const buildingReportData = useSelector((state) => state.getIn(['report', 'buildingAppReport']));

  useEffect(() => {
    dispatch(getAppReportAction({ buildingId: building.building_id }));
  }, [building.building_id]);

  if (!buildingReportData) return;

  return (
    <>
      <Box display="flex" justifyContent="space-between" marginTop="15px">
        <RateCard
          item={{
            title: 'Building Approval Rate',
            rate: Number(building.building_approval_rate).toFixed(2) + '%',
          }}
        />

        <RateCard
          item={{
            title: 'Building Approval to Issue',
            rate: Number(building.building_approved_to_issue_rate).toFixed(2) + '%',
          }}
        />

        <RateCard
          item={{
            title: 'Total Decline Rate',
            rate: Number(building.decline_percentage).toFixed(2) + '%',
          }}
        />

        <RateCard
          item={{
            title: 'Total Cancellation Rate',
            rate: Number(building.cancellation_percentage).toFixed(2) + '%',
          }}
        />
      </Box>

      <Box display="flex" justifyContent="space-between" gap="20px">
        {buildingReportData && (
          <>
            <Box flex="1 1 0%">
              <AllApplicationsChart
                data={buildingReportData.toJS().data}
                onClickItem={onNavigateToApplications}
              />
            </Box>

            <Box flex="1 1 0%">
              <AppTypeChart
                data={buildingReportData.toJS().data}
                onClickItem={onNavigateToApplications}
              />
            </Box>
          </>
        )}
      </Box>
    </>
  );
};
