import { DashboardLayoutContainer } from 'components/Layouts/DashboardLayout';
import { Box } from '@mui/material';
import { Grid, IconGraphy, Tab, Typography, colors } from '@leapeasy/ui-kit';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import React, { useCallback, useEffect, useState } from 'react';

import {
  getBuildingDelegationAction,
  getBuildingInvoiceAction,
} from 'store/actions/propertyActions';

import { openDetails } from 'store/actions/uiActions';
import { DetailCard } from './DetailCard';
import {
  ReportTab,
  ApplicationTab,
  PolicyTab,
  ClaimTab,
  InvoiceTab,
  CancellationsTab,
  DetailsTab,
} from './Tabs';

const TABS = [
  {
    title: 'Report',
    icon: 'General.Report',
  },
  {
    title: 'Applications',
    icon: 'HomePlaces.MapsHomeWork',
  },
  {
    title: 'Policy',
    icon: 'FileFolder.FindInPage',
  },
  {
    title: 'Claim',
    icon: 'HomePlaces.Gite',
  },
  {
    title: 'Invoice',
    icon: 'FileFolder.Receipt',
  },
  {
    title: 'Details',
    icon: 'FileFolder.Plagiarism',
  },
  {
    title: 'Flagged Cancellation',
    icon: 'General.Flag',
  },
];

export const BuildingDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedTab, setSelectedTab] = useState(0);

  const isDemo = useSelector((state) => state.getIn(['ui', 'demo']));
  const details = useSelector((state) => state.getIn(['ui', 'details'])) || null;
  const detailsJSON = details ? details.toJS() : null;

  const onClickBack = useCallback(() => {
    dispatch(openDetails(null));

    setTimeout(() => {
      navigate('/property/buildings');
    });
  }, []);

  useEffect(() => {
    const detailsJSON = details ? details.toJS() : null;
    if (!details || detailsJSON.type !== 'building') {
      onClickBack();
      return;
    }

    // dispatch(getBuildingDelegationAction(buildingId));
    // dispatch(getBuildingInvoiceAction(buildingId));
  }, [onClickBack, details]);

  if (!detailsJSON) return <DashboardLayoutContainer />;

  const building = detailsJSON.data;
  return (
    <DashboardLayoutContainer shouldShowCard={false}>
      <Box
        padding="24px"
        gap="10px"
        display="flex"
        flexDirection="column"
        border="1px solid #EAEAEA"
        sx={{ background: 'white' }}
        borderRadius="12px"
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '15px',
          }}
        >
          <Box sx={{ cursor: 'pointer', '&:hover': { opacity: 0.75 } }}>
            <IconGraphy icon="Arrow.ArrowBack" onClick={onClickBack} />
          </Box>
          <Typography
            variant="h3"
            style={{ color: colors.purple[900], fontWeight: '500', padding: '5px 5px 5px 15px' }}
          >
            {building.name}
          </Typography>
        </Box>

        <DetailCard building={building} isDemo={isDemo} />
      </Box>

      <Box
        padding="24px 12px"
        borderRadius="12px"
        border="1px solid #EAEAEA"
        mt={1}
        sx={{ background: 'white' }}
      >
        <Grid>
          {TABS.map((tab, index) => (
            <Tab
              title={tab.title}
              icon={tab.icon}
              isSelected={selectedTab === index}
              onClick={() => setSelectedTab(index)}
            />
          ))}
        </Grid>

        <Box marginTop="20px">
          {selectedTab === 0 && (
            <ReportTab building={building} onNavigateToApplications={() => setSelectedTab(1)} />
          )}
          {selectedTab === 1 && <ApplicationTab building={building} />}
          {selectedTab === 2 && <PolicyTab building={building} />}
          {selectedTab === 3 && <ClaimTab building={building} />}
          {selectedTab === 4 && <InvoiceTab building={building} />}
          {selectedTab === 5 && <DetailsTab building={building} />}
          {selectedTab === 6 && <CancellationsTab building={building} />}
        </Box>
      </Box>
    </DashboardLayoutContainer>
  );
};
