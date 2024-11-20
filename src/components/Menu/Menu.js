// import React, { useState, useCallback, useEffect } from 'react';
// import { Box, Collapse } from '@mui/material';
// import { Typography, colors, IconGraphy } from '@leapeasy/ui-kit';
// import { useSelector, useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { openMenuItem } from 'store/actions/uiActions';

// const MenuItem = ({ data, isActive, hasChildren, level, onClick, collapsed, toggleparent}) => {
//   const fontWeight = isActive ? (hasChildren ? 500 : 600) : 400;
//   return (
//     <Box
//       component='li'
//       sx={{
//         cursor: 'pointer',
//         padding: '8px 12px',
//         borderRadius: '8px',
//         color: 'white',
//         display: 'flex',
//         gap: '12px',
//         alignItems: 'center',
//         opacity: level === 0 ? 1 : 0.75,
//         fontWeight: fontWeight,

//         ...((isActive || (collapsed && toggleparent))
//           ? {
//             color: colors.purple[900],
//             background: colors.black[100],
//             opacity: 1,
//             fontWeight: Math.min(fontWeight + 100, 600),
//           }
//           : {
//             '&:hover': {
//               color: colors.purple[900],
//               background: colors.black[100],
//               opacity: 0.75,
//               fontWeight: Math.min(fontWeight + 100, 600),
//             },
//           }),
//       }}
//       onClick={onClick}
//     >
//       {level === 0 && data.icon && (
//         <Box display="flex" alignItems="center" sx={{ opacity: 0.6 }}>
//           {typeof data.icon === 'string' ? <IconGraphy icon={data.icon} /> : data.icon}
//         </Box>
//       )}

//       <Typography
//         variant={level === 0 ? 'body1' : 'body3'}
//         style={{ flexGrow: 1, userSelect: 'none', opacity: collapsed ? 0 : 1, zIndex: collapsed ? -3 : 1, transition: 'all 0.4s ease', whiteSpace: 'nowrap', }}
//       >
//         {data.name}
//       </Typography>


//       {hasChildren && !collapsed && (
//         <Box display="flex" alignItems="center" sx={{ opacity: 0.6 }}>
//           <IconGraphy icon={isActive ? 'Arrow.ExpandLess' : 'Arrow.ExpandMore'} />
//         </Box>
//       )}
//     </Box>
//   );
// };

// const getMenuItems = (menuArray, role, level, selectedMenu, selectedParentMenu, onSelectMenu, collapsed) =>
//   menuArray.map((item) => {
//     switch (role) {
//       case 'admin':
//         if (item.key === 'delegation') {
//           return;
//         }
//         break;
//       case 'll':
//         if (
//           item.key === 'll' ||
//           item.key === 'request' ||
//           item.key === 'landlord-invite' ||
//           item.key === 'invite-new-user' ||
//           item.key === 'activelog'
//         ) {
//           return;
//         }
//         break;
//       case 'vp':
//         if (
//           item.key === 'll' ||
//           item.key === 'vp' ||
//           item.key === 'landlord-invite' ||
//           item.key === 'invite-new-user' ||
//           item.key === 'activelog'
//         ) {
//           return;
//         }
//         break;
//       case 'rm':
//         if (
//           item.key === 'll' ||
//           item.key === 'vp' ||
//           item.key === 'rm' ||
//           item.key === 'landlord-invite' ||
//           item.key === 'treeview' ||
//           item.key === 'invite-new-user' ||
//           item.key === 'activelog'
//         ) {
//           return;
//         }
//         break;
//       case 'pm':
//         if (
//           item.key === 'll' ||
//           item.key === 'vp' ||
//           item.key === 'rm' ||
//           item.key === 'pm' ||
//           item.key === 'delegation' ||
//           item.key === 'user' ||
//           item.key === 'report' ||
//           item.key === 'landlord-invite' ||
//           item.key === 'invite-new-user' ||
//           item.key === 'activelog'
//         ) {
//           return;
//         }
//         break;
//       default:
//         break;
//     }

//     //Toggle parent Select
//     let toggleparent=false;
//     if(item.child){
//       item.child.map((childMenu) => {
//         if(selectedMenu.indexOf(childMenu.key) !== -1) {
//           toggleparent=true;
//         }
//       })
//     } 
      
       
    

//     return (
//       <Box key={item.key} className='parentItem'>
//         <MenuItem
//           data={item}
//           isActive={item.key === selectedMenu}
//           hasChildren={Boolean(item.child)}
//           level={level}
//           onClick={() => onSelectMenu(item.key, item)}
//           collapsed={collapsed}
//           toggleparent={toggleparent}
//         />

//         {!collapsed && item.child && (
//           <Collapse
//             sx={{ pl: '32px', pt: '4px' }}
//             component="div"
//             in={item.key === selectedParentMenu}
//             timeout="auto"
//             unmountOnExit
//           >
//             {item.child.map((childMenu) => (

//               <MenuItem
//                 key={childMenu.key}
//                 data={childMenu}
//                 isActive={`${item.key}.${childMenu.key}` === selectedMenu}
//                 hasChildren={Boolean(childMenu.child)}
//                 onClick={() => onSelectMenu(`${item.key}.${childMenu.key}`, childMenu)}
//                 level={level + 1}
//               />
//             ))}
//           </Collapse>
//         )}
//         {
//           collapsed && item.child && (
//             <div className='submenu'>
//               {item.child.map((childMenu) => (

//                 <MenuItem
//                   key={childMenu.key}
//                   data={childMenu}
//                   isActive={`${item.key}.${childMenu.key}` === selectedMenu}
//                   hasChildren={Boolean(childMenu.child)}
//                   onClick={() => onSelectMenu(`${item.key}.${childMenu.key}`, childMenu)}
//                   level={level + 1}
//                 />

//               ))}
//             </div>
//           )
//         }
//       </Box>
//     );
//   });


// export const Menu = ({ data, collapsed }) => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const activeMenu = useSelector((state) => state.getIn(['ui', 'menuItem'])) || 'dashboard';

//   const [selectedParentMenu, setSelectedParentMenu] = useState();

//   useEffect(() => {
//     setSelectedParentMenu(
//       activeMenu.includes('.') ? activeMenu.slice(0, activeMenu.indexOf('.')) : null,
//     );
//   }, [activeMenu]);

//   const currentUser = JSON.parse(localStorage.getItem('user'));
//   const role = currentUser['role'];

//   const onSelectMenu = useCallback(
//     (menuKey, item) => {
//       if (item.isExternal) {
//         window.open(item.link, '_blank');
//         return;
//       }

//       if (Boolean(item.child)) {
//         setSelectedParentMenu((existing) => (existing === menuKey ? null : menuKey));
//       } else {
//         dispatch(openMenuItem(menuKey));

//         setTimeout(() => {
//           navigate(item.link);
//         });
//       }
//     },
//     [navigate],
//   );

//   return (
//     <Box display="flex" flexDirection="column" gap="12px">
//       {getMenuItems(data, role, 0, activeMenu, selectedParentMenu, onSelectMenu, collapsed)}
//     </Box>
//   );
// };
import React, { useState, useCallback, useEffect } from 'react';
import { Box, Collapse } from '@mui/material';
import { Typography, colors, IconGraphy } from '@leapeasy/ui-kit';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { openMenuItem } from 'store/actions/uiActions';

const MenuItem = ({ data, isActive, hasChildren, level, onClick, collapsed, toggleparent }) => {
  const fontWeight = isActive ? (hasChildren ? 500 : 600) : 400;
  return (
    <Box
      component='li'
      sx={{
        cursor: 'pointer',
        padding: '8px 12px',
        borderRadius: '8px',
        color: 'white',
        display: 'flex',
        gap: '12px',
        alignItems: 'center',
        position: 'relative',
        opacity: level === 0 ? 1 : 0.75,
        fontWeight: fontWeight,
        flexGrow: 1,

        ...((isActive || (collapsed && toggleparent))
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
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick();
      }}
    >
      {level === 0 && data.icon && (
        <Box display="flex" alignItems="center" sx={{ opacity: 0.6 }}>
          {typeof data.icon === 'string' ? <IconGraphy icon={data.icon} /> : data.icon}
        </Box>
      )}

      <Typography
        variant={level === 0 ? 'body1' : 'body3'}
        style={{ flexGrow: 1, userSelect: 'none', opacity: collapsed ? 0 : 1, zIndex: collapsed ? -3 : 1, transition: 'all 0.4s ease', whiteSpace: 'nowrap', }}
      >
        {data.name}
      </Typography>


      {hasChildren && !collapsed && (
        <Box display="flex" alignItems="center" sx={{ opacity: 0.6 }}>
          <IconGraphy icon={isActive ? 'Arrow.ExpandLess' : 'Arrow.ExpandMore'} />
        </Box>
      )}
    </Box>
  );
};

const getMenuItems = (menuArray, role, level, selectedMenu, selectedParentMenu, onSelectMenu, collapsed) =>
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

    //Toggle parent Select
    let toggleparent = false;
    if (item.child) {
      item.child.map((childMenu) => {
        if (selectedMenu.indexOf(childMenu.key) !== -1) {
          toggleparent = true;
        }
      })
    }

    return (
      <Box key={item.key} className='parentItem'>
        <MenuItem
          data={item}
          isActive={item.key === selectedMenu}
          hasChildren={Boolean(item.child)}
          level={level}
          onClick={() => onSelectMenu(item.key, item)}
          collapsed={collapsed}
          toggleparent={toggleparent}
        />

        {!collapsed && item.child && (
          <Collapse
            sx={{ pl: '32px', pt: '4px', position: 'relative' }}
            component="div"
            in={item.key === selectedParentMenu}
            timeout="auto"
            unmountOnExit
          >
            <Box
              sx={{
                position: 'absolute',
                left: '18px',
                top: 0,
                bottom: '26px',
                width: '2px',
                background: 'none',
                opacity: '0.1',
              }}
            />
            {item.child.map((childMenu, index) => (
              <Box
                key={childMenu.key}
                display="flex"
                alignItems="center"
                sx={{ gap: '0' }}
              >
                <svg width="25" height="40">
                  {index === item.child.length - 1 ? (
                    <path
                      d="M13 11 L13 0 M13 11 Q13 21 23 21"
                      stroke="#F3F3F3"
                      opacity={0.2}
                      strokeWidth="1"
                      fill="none"
                    />
                  ) : (
                    <path
                      d="M13 40 L13 0 M13 11 Q13 21 23 21"
                      stroke="#F3F3F3"
                      opacity={0.2}
                      strokeWidth="1"
                      fill="none"
                    />
                  )}
                </svg>

                <MenuItem
                  data={childMenu}
                  isActive={`${item.key}.${childMenu.key}` === selectedMenu}
                  hasChildren={Boolean(childMenu.child)}
                  onClick={() => onSelectMenu(`${item.key}.${childMenu.key}`, childMenu, true)}
                  level={level + 1}
                />
              </Box>
              
            ))}
          </Collapse>
        )}
        {
          collapsed && item.child && (
            <div className='submenu'>
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
            </div>
          )
        }
      </Box>
    );
  });


export const Menu = ({ data, collapsed }) => {
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
    (menuKey, item, isChild) => {
      if (item.isExternal) {
        window.open(item.link, '_blank');
        return;
      }

      if (Boolean(item.child) && !isChild) {
        setSelectedParentMenu((existing) => (existing === menuKey ? null : menuKey));
      } else if (!Boolean(item.child)) {
        let f = 0;
        f = menuKey.includes('.') ? 0 : 1;
        if (!isChild && f == 0) {
          setSelectedParentMenu(menuKey);
        }
        navigate(item.link);
      }
    },
    [navigate],
  );

  return (
    <Box display="flex" flexDirection="column" gap="12px">
      {getMenuItems(data, role, 0, activeMenu, selectedParentMenu, onSelectMenu, collapsed)}
    </Box>
  );
};
