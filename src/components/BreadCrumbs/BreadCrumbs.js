import { Box } from '@mui/material';
import { BreadCrumbs as BreadCrumbsComponent } from '@leapeasy/ui-kit';
import { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { primaryMenu, secondaryMenu } from 'data/ui/menu';
import { useNavigate } from 'react-router-dom';

const getMenuItems = (menuKey) => {
  const parentMenu = menuKey.includes('.') ? menuKey.slice(0, menuKey.indexOf('.')) : null;

  const parentItem =
    primaryMenu.find((menu) => menu.key === (parentMenu || menuKey)) ||
    secondaryMenu.find((menu) => menu.key === (parentMenu || menuKey));

  if (parentItem.key === menuKey || !parentItem.child) {
    return [parentItem];
  }

  const childItem = parentItem.child.find(
    (childItem) => `${parentItem.key}.${childItem.key}` === menuKey,
  );
  return [{ ...parentItem, icon: null }, childItem];
};

export const BreadCrumbs = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const activeMenu = useSelector((state) => state.getIn(['ui', 'menuItem'])) || 'dashboard';

  const menuItems = useMemo(() => getMenuItems(activeMenu), [activeMenu]);
  const currentItem = menuItems.length ? menuItems[menuItems.length - 1].name : null;

  const onClickItem = (item) => {
    if (item === menuItems[0] || item === menuItems[menuItems.length - 1]) return;

    navigate(item.link);
    // dispatch();
  };

  return (
    <Box sx={{ py: 1, px: 3 }}>
      <BreadCrumbsComponent items={menuItems} currentItem={currentItem} onClickItem={onClickItem} />
    </Box>
  );
};
