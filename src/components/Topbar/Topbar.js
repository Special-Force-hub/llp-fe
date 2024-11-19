import { IconGraphy, Avatar, Tooltip } from '@leapeasy/ui-kit';
import styled from 'styled-components';
import { Box } from '@mui/material';
import { useState, useContext } from 'react';
import { useSelector } from 'react-redux';

// Context
import { UserContext } from 'context/context';

const elem = document.documentElement;

export const Topbar = () => {

  const collapsed = useSelector((state) => state.getIn(['ui', 'collapsed']));
  const userContext = useContext(UserContext);

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
      sx={{ padding: '12px 32px', 
            background: 'white', 
            paddingLeft: {md: '32px'}, 
            paddingLeft: (collapsed? '64px' : '32px'),
            transition: 'all 0.5s ease',
          }}
    >
      {/** actions */}
      <Box display="flex">

        <IconContainer>
          <Tooltip
            placement="bottom"
            showCarot={false}
            title={fullScreen ? 'Exit Full Screen' : 'Full Screen'}
            variant="contained"
          >
            <div
              onClick={() => {
                fullScreen ? closeFullScreen() : openFullScreen();
              }}
            >
              <IconGraphy
                icon={!fullScreen ? 'EditorLayout.Fullscreen' : 'EditorLayout.FullscreenExit'}
                width={16}
                height={16}
                forceColor={true}
              />
            </div>
          </Tooltip>

          <Tooltip
            placement="bottom"
            showCarot={false}
            title={'Show sidebar'}
            variant="contained"
          >
            <div
              onClick={() => userContext.setMenuOpenInMobile(!userContext.menuOpenInMobile)} 
            >
              <IconGraphy
                icon={'EditorLayout.MenuOpen'}
              />
            </div>
          </Tooltip>
        </IconContainer>
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

const IconContainer = styled.div`
  color: #3C393D;
  cursor: pointer;
  &:hover { opacity: 0.9 };
  display: flex;
  align-items: center;
  gap: 20px;
  justify-content: center;

  & > div:nth-of-type(2) {
    display: none;
    @media screen and (max-width: ${(props) => props.theme['2xl']}) {
      display: block;
    }
  }
`