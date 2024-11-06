import { IconGraphy, Avatar, Tooltip } from '@leapeasy/ui-kit';
import { Box } from '@mui/material';
import { useState, useContext } from 'react';
import styled from 'styled-components';

import { UserContext } from 'context/context';

const elem = document.documentElement;

export const Topbar = () => {

  const user = useContext(UserContext);

  const [fullScreen, setFullScreen] = useState(false);
  const currentUser = JSON.parse(localStorage.getItem('user'));

  const openFullScreen = () => {
    setFullScreen(true);
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      /* Firefox */
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      /* Chrome, Safari & Opera */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      /* IE/Edge */
      elem.msRequestFullscreen();
    }
  };

  const closeFullScreen = () => {
    setFullScreen(false);
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  };

  const getJobTitle = (role) => {
    if (role === 'admin') return 'Admin';
    if (role === 'll') return 'Landlord';
    if (role === 'vp') return 'Full Portfolio';
    if (role === 'rm') return 'Multi-Site';
    if (role === 'pm') return 'Property Manager';

    return role;
  };
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      sx={{ padding: '12px 32px', background: 'white' }}
    >
      {/** actions */}
      <Box display="flex">
        <TopBarContainer>
          <Tooltip
            placement="bottom"
            showCarot={false}
            title={'Show sidebar'}
            variant="contained"
          >
            <IconGraphy 
              icon={'EditorLayout.MenuOpen'}
              onClick={() => {
                user.setMenuOpenInMobile(true);
              }}
            />
          </Tooltip>

          <Tooltip
            placement="bottom"
            showCarot={false}
            title={fullScreen ? 'Exit Full Screen' : 'Full Screen'}
            variant="contained"
          >
            <IconGraphy
              icon={!fullScreen ? 'EditorLayout.Fullscreen' : 'EditorLayout.FullscreenExit'}
              width={16}
              height={16}
              forceColor={true}
              onClick={() => {
                fullScreen ? closeFullScreen() : openFullScreen();
              }}
            />
          </Tooltip>
        </TopBarContainer>
      </Box>

      {/** profile */}
      {currentUser && (
        <Box
          display="flex"
          alignItems="center"
          gap="16px"
          sx={{ '&:hover': { cursor: 'pointer', opacity: 0.9 } }}
        >
          <Box minWidth="120px">
            <Avatar
              size="large"
              title={currentUser.name}
              description={getJobTitle(currentUser.jobTitle || currentUser.role)}
              iconImage={<img src={currentUser.image} />}
              state="online"
            />
          </Box>

          <IconGraphy icon="Arrow.ExpandMore" style={{ color: '#867B8D' }} width={10} height={6} />
        </Box>
      )}
    </Box>
  );
};


const TopBarContainer = styled.div`
  color: #3C393D;
  cursor: pointer;

  display: flex;
  align-items: center;
  gap: 20px;
  /* &:hover: { opacity: 0.9 } */
  .sidebar-tooltip {
    border: 1px solid red;
  }

  @media screen and (min-width: 1280px) {
    & > div:nth-of-type(1) {
      display: none;
    }
  }
`