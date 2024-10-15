import { DashboardLayoutContainer } from 'components/Layouts/DashboardLayout';
import { Box } from '@mui/material';
import { Grid, IconGraphy, Tab, Typography, colors } from '@leapeasy/ui-kit';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import {
  getAppReportAction,
  getBuildingCountAction,
  getFlaggedCancelReportAction,
  getLandlordCountAction,
  getUserCountAction,
} from 'store/actions/reportActions';
import { AllApplicationsChart } from 'elements/Charts/AllApplicationsChart';
import { AppTypeChart } from 'elements/Charts/AppTypeChart';
import { DetailCard } from 'elements/ReportCard/DetailCard';

const rateData = [
  {
    title: 'Building Approval Rate',
    rate: '100%',
  },
  {
    title: 'Building Approval to Issue',
    rate: '0.00%',
  },
  {
    title: 'Total Decline Rate',
    rate: '0.00%',
  },
  {
    title: 'Total Cancellation Rate',
    rate: '100%',
  },
];
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
        <Typography variant="body2" style={{ padding: '5px' }}>
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

export const DetailPage = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selected, setSelected] = useState(1);

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

  const adminReportData = useSelector((state) => state.getIn(['report', 'adminAppReport']));
  const buildingCount = useSelector((state) => state.getIn(['report', 'buildingCount']));
  const landlordCount = useSelector((state) => state.getIn(['report', 'landlordCount']));

  return (
    <DashboardLayoutContainer>
      <Box
        sx={{
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          marginBottom: '15px',
        }}
        onClick={() => navigate(-1)}
      >
        <IconGraphy icon="Arrow.ArrowBack" />
        <Typography
          variant="h3"
          style={{ color: colors.purple[900], fontWeight: '500', padding: '5px 5px 5px 15px' }}
        >
          Chelsea Apartments
        </Typography>
      </Box>
      <DetailCard />
      <Box marginTop="20px">
        <Grid>
          <Tab
            title="Report"
            icon="General.Report"
            isSelected={selected === 1}
            onClick={() => setSelected(1)}
          />
          <Tab
            title="Applications"
            icon="HomePlaces.MapsHomeWork"
            isSelected={selected === 2}
            onClick={() => setSelected(2)}
          />
          <Tab
            title="Policy"
            icon="FileFolder.FindInPage"
            isSelected={selected === 3}
            onClick={() => setSelected(3)}
          />
          <Tab
            title="Claim"
            icon="HomePlaces.Gite"
            isSelected={selected === 4}
            onClick={() => setSelected(4)}
          />
          <Tab
            title="Invoice"
            icon="FileFolder.Receipt"
            isSelected={selected === 5}
            onClick={() => setSelected(5)}
          />
          <Tab
            title="Details"
            icon="FileFolder.Plagiarism"
            isSelected={selected === 6}
            onClick={() => setSelected(6)}
          />
          <Tab
            title="Flagged Cancellation"
            icon="General.Flag"
            isSelected={selected === 7}
            onClick={() => setSelected(7)}
          />
        </Grid>
        {selected === 1 && (
          <>
            <Box display="flex" justifyContent="space-between" marginTop="15px">
              {rateData.map((item) => (
                <RateCard item={item} />
              ))}
            </Box>
            <Box display="flex" justifyContent="space-between" gap="20px">
              {adminReportData && (
                <>
                  <Box flex="1 1 0%">
                    <AllApplicationsChart
                      data={adminReportData.toJS().data}
                      onClickItem={(stage) => {
                        navigate('/property/applications');
                      }}
                    />
                  </Box>

                  <Box flex="1 1 0%">
                    <AppTypeChart
                      data={adminReportData.toJS().data}
                      onClickItem={(type) => {
                        navigate('/property/applications');
                      }}
                    />
                  </Box>
                </>
              )}
            </Box>
          </>
        )}
        {selected === 2 && (
          <>
            <h1>Applications</h1>
          </>
        )}
        {selected === 3 && (
          <>
            <h1>Policy</h1>
          </>
        )}
        {selected === 4 && (
          <>
            <h1>Claim</h1>
          </>
        )}
        {selected === 5 && (
          <>
            <h1>Invoice</h1>
          </>
        )}
        {selected === 6 && (
          <>
            <h1>Details</h1>
          </>
        )}
        {selected === 7 && (
          <>
            <h1>Cancellation</h1>
          </>
        )}
      </Box>
    </DashboardLayoutContainer>
  );
};
