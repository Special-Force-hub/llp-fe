import { DashboardLayoutContainer } from 'components/Layouts/DashboardLayout';
import { Box, Grid } from '@mui/material';
import React, { useState } from 'react';
import { Tab, Typography, IconGraphy, colors } from '@leapeasy/ui-kit';
import { GetStarted } from './GetStarted';
import Document from './Docmentation/Document';
import { FeaturedVideo } from './FeaturedVideo';

const TABS = [
  { title: "Get started", icon: "General.RocketLaunch" },
  { title: "Documentation", icon: "FileFolder.StickyNote2" },
  { title: "Featured videos", icon: "MediaDevices.VideoLibrary" }
]

export const PortalGuide = () => {

  const [selectedTab, setSelectedTab] = useState(0);
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const userRole = currentUser['role'];

  return (
    <DashboardLayoutContainer>
      <Box>
        <Box marginBottom={"15px"}>
          <Typography
            variant='h3' style={{ fontWeight: '500', color: colors.purple[900] }}
          >
            Portal Guide
          </Typography>
        </Box>
        <Box display="flex">
          {
            TABS.map((tab, index) =>
              <Tab
                title={tab.title}
                icon={tab.icon}
                isSelected={selectedTab === index}
                onClick={() => setSelectedTab(index)}
              />
            )
          }
        </Box>
        <Box marginTop="20px">
          {selectedTab === 0 && <GetStarted />}
          {selectedTab === 1 && <Document userRole={userRole} />}
          {selectedTab === 2 && <FeaturedVideo userRole={userRole} />}
        </Box>
      </Box>
    </DashboardLayoutContainer>
  );
};
