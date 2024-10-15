import { DashboardLayoutContainer } from 'components/Layouts/DashboardLayout';
import { Box } from '@mui/material';
import { Grid, IconGraphy, Tab, Typography, colors } from '@leapeasy/ui-kit';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import React, { useCallback, useEffect, useState } from 'react';

import {
  getAppAction,
  getClaimAction,
  getBuildingDelegationAction,
  getPolicyAction,
  getPolicyCancelAction,
  getBuildingInvoiceAction,
} from 'store/actions/propertyActions';

import { openDetails } from 'store/actions/uiActions';
import { DetailCard } from 'elements/ReportCard/DetailCard';
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

    // const buildingId = detailsJSON.data.building_id;

    // dispatch(getAppAction(buildingId));
    // dispatch(getClaimAction(buildingId));
    // dispatch(getBuildingDelegationAction(buildingId));
    // dispatch(getPolicyAction({ id: buildingId, role: 'building' }));
    // dispatch(getPolicyCancelAction({ id: buildingId, role: 'building' }));
    // dispatch(getBuildingInvoiceAction(buildingId));
  }, [onClickBack, details]);

  if (!detailsJSON) return <DashboardLayoutContainer />;

  const building = detailsJSON.data;
  return (
    <DashboardLayoutContainer>
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

      <DetailCard />

      <Box marginTop="20px">
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
    </DashboardLayoutContainer>
  );
};
