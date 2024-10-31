import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { User } from './users.js';
import { DashboardPage, PropertyPage, UserPage, InviteUserPage, LandlordInvitePage, EmailPage } from './Pages.js';
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
      style={{ flexGrow: 1 }}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}
const CustomTabs = styled(Tabs)({
  backgroundColor: '#F9F8F9',
  borderRadius: '10px',
  padding: 12,
  width: '173px',
  minWidth: '173px',
  '& .MuiTabs-indicator': {
    transition: 'none',
    display: 'none',
  },
});
const CustomTab = styled((props) => <Tab disableRipple {...props} />)(({ theme }) => ({
  color: '#2E0F40',
  borderRadius: 8,
  height: 40,
  width: 173,
  minHeight: '40px',
  marginBottom: '8px',
  alignItems: 'flex-start',
  textAlign: 'left',
  textTransform: 'none',
  fontSize: 14,
  '&:hover': {
    color: '#90388B',
  },
  '&.Mui-selected': {
    color: '#FFFFFF',
    backgroundColor: '#702572',
  },
  '&.Mui-focusVisible': {
    color: '#FFFFFF',
    backgroundColor: '#702572',
  },
}));

export default function Document({ userRole }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        <CustomTabs
          orientation="vertical"
          // variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
        >
          <CustomTab label="User Access" {...a11yProps(0)} />
          <CustomTab label="Dashboard Page" {...a11yProps(1)} />
          <CustomTab label="Property Page" {...a11yProps(2)} />
          <CustomTab label="User Page" {...a11yProps(3)} />
          <CustomTab label="Invite New User" {...a11yProps(4)} />
          <CustomTab label="Landlord Invite" {...a11yProps(5)} />
          <CustomTab label="Email Page" {...a11yProps(6)} />
          {/* <CustomTab label="Notfication Page" {...a11yProps(7)} />
          <CustomTab label="Invoice page" {...a11yProps(8)} /> */}
        </CustomTabs>
        <TabPanel value={value} index={0}>
          <User userRole={userRole} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <DashboardPage />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <PropertyPage />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <UserPage />
        </TabPanel>
        <TabPanel value={value} index={4}>
          <InviteUserPage />
        </TabPanel>
        <TabPanel value={value} index={5}>
          <LandlordInvitePage />
        </TabPanel>
        <TabPanel value={value} index={6}>
          <EmailPage />
        </TabPanel>
        {/* <TabPanel value={value} index={7}>
          <UserPage />
        </TabPanel>
        <TabPanel value={value} index={8}>
          <UserPage />
        </TabPanel> */}
      </Box>
    </Box>
  );
}
