import React, { useState, useCallback, useEffect } from 'react';
import { Box, Collapse } from '@mui/material';
import { Typography, colors, IconGraphy } from '@leapeasy/ui-kit';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { openMenuItem } from 'store/actions/uiActions';

const MenuItem = ({ data, isActive, hasChildren, level, onClick }) => {
  const fontWeight = isActive ? (hasChildren ? 500 : 600) : 400;

  return (
    <Box
      sx={{
        cursor: 'pointer',
        padding: '8px 12px',
        borderRadius: '8px',
        color: 'white',

        display: 'flex',
        gap: '12px',
        alignItems: 'center',
        opacity: level === 0 ? 1 : 0.75,
        fontWeight: fontWeight,

        ...(isActive
          ? {
              color: colors.purple[900],
              background: colors.black[100],
              opacity: 1,
              fontWeight: Math.min(fontWeight + 100, 600),
            }
          : {
              '&:hover': {
                color: colors.purple[900],
                background: colors.black[100],
                opacity: 0.75,
                fontWeight: Math.min(fontWeight + 100, 600),
              },
            }),
      }}
      onClick={onClick}
    >
      {level === 0 && data.icon && (
        <Box display="flex" alignItems="center" sx={{ opacity: 0.6 }}>
          {typeof data.icon === 'string' ? <IconGraphy icon={data.icon} /> : data.icon}
        </Box>
      )}

      <Typography
        variant={level === 0 ? 'body1' : 'body3'}
        style={{ flexGrow: 1, userSelect: 'none' }}
      >
        {data.name}
      </Typography>

      {hasChildren && (
        <Box display="flex" alignItems="center" sx={{ opacity: 0.6 }}>
          <IconGraphy icon={isActive ? 'Arrow.ExpandLess' : 'Arrow.ExpandMore'} />
        </Box>
      )}
    </Box>
  );
};

const getMenuItems = (menuArray, role, level, selectedMenu, selectedParentMenu, onSelectMenu) =>
  menuArray.map((item) => {
    switch (role) {
      case 'admin':
        if (item.key === 'delegation') {
          return;
        }
        break;
      case 'll':
        if (
          item.key === 'll' ||
          item.key === 'request' ||
          item.key === 'landlord-invite' ||
          item.key === 'invite-new-user' ||
          item.key === 'activelog'
        ) {
          return;
        }
        break;
      case 'vp':
        if (
          item.key === 'll' ||
          item.key === 'vp' ||
          item.key === 'landlord-invite' ||
          item.key === 'invite-new-user' ||
          item.key === 'activelog'
        ) {
          return;
        }
        break;
      case 'rm':
        if (
          item.key === 'll' ||
          item.key === 'vp' ||
          item.key === 'rm' ||
          item.key === 'landlord-invite' ||
          item.key === 'treeview' ||
          item.key === 'invite-new-user' ||
          item.key === 'activelog'
        ) {
          return;
        }
        break;
      case 'pm':
        if (
          item.key === 'll' ||
          item.key === 'vp' ||
          item.key === 'rm' ||
          item.key === 'pm' ||
          item.key === 'delegation' ||
          item.key === 'user' ||
          item.key === 'report' ||
          item.key === 'landlord-invite' ||
          item.key === 'invite-new-user' ||
          item.key === 'activelog'
        ) {
          return;
        }
        break;
      default:
        break;
    }

    return (
      <Box key={item.key}>
        <MenuItem
          data={item}
          isActive={item.key === selectedMenu}
          hasChildren={Boolean(item.child)}
          level={level}
          onClick={() => onSelectMenu(item.key, item)}
        />

        {item.child && (
          <Collapse
            sx={{ pl: '32px', pt: '4px' }}
            component="div"
            in={item.key === selectedParentMenu}
            timeout="auto"
            unmountOnExit
          >
            {item.child.map((childMenu) => (
              <MenuItem
                key={childMenu.key}
                data={childMenu}
                isActive={`${item.key}.${childMenu.key}` === selectedMenu}
                hasChildren={Boolean(childMenu.child)}
                onClick={() => onSelectMenu(`${item.key}.${childMenu.key}`, childMenu)}
                level={level + 1}
              />
            ))}
          </Collapse>
        )}
      </Box>
    );
  });

export const Menu = ({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const activeMenu = useSelector((state) => state.getIn(['ui', 'menuItem'])) || 'dashboard';

  const [selectedParentMenu, setSelectedParentMenu] = useState();

  useEffect(() => {
    setSelectedParentMenu(
      activeMenu.includes('.') ? activeMenu.slice(0, activeMenu.indexOf('.')) : null,
    );
  }, [activeMenu]);

  const currentUser = JSON.parse(localStorage.getItem('user'));
  const role = currentUser['role'];

  const onSelectMenu = useCallback(
    (menuKey, item) => {
      if (item.isExternal) {
        window.open(item.link, '_blank');
        return;
      }

      if (Boolean(item.child)) {
        setSelectedParentMenu((existing) => (existing === menuKey ? null : menuKey));
      } else {
        dispatch(openMenuItem(menuKey));

        setTimeout(() => {
          navigate(item.link);
        });
      }
    },
    [navigate],
  );

  return (
    <Box display="flex" flexDirection="column" gap="12px">
      {getMenuItems(data, role, 0, activeMenu, selectedParentMenu, onSelectMenu)}
    </Box>
  );
};
