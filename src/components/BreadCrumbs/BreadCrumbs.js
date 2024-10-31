import { Box } from '@mui/material';
import { BreadCrumbs as BreadCrumbsComponent } from '@leapeasy/ui-kit';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { primaryMenu, secondaryMenu } from 'data/ui/menu';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { openDetails } from 'store/actions/uiActions';

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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const activeMenu = useSelector((state) => state.getIn(['ui', 'menuItem'])) || 'dashboard';

  const details = useSelector((state) => state.getIn(['ui', 'details'])) || null;
  const detailsJSON = details ? details.toJS() : null;

  const detailsItem = useMemo(() => {
    if (!detailsJSON) return null;

    switch (detailsJSON.type) {
      case 'building':
      case 'application':
      case 'policy':
      case 'flagged-cancellation':
        return {
          name: detailsJSON.data.name,
        };

      case 'claim':
        return {
          name: detailsJSON.data.claim_name,
        };

      case 'invoice':
        return {
          name: detailsJSON.data.doc_number,
        };
      case "landlord":
        return {
          name: detailsJSON.name
        }
      case "user":
        return {
          name: detailsJSON.accepter && detailsJSON.accepter.username,
        };
      case "email":
        return {
          name: detailsJSON.requestor && detailsJSON.requestor.username,
        };
      case "message":
        return {
          name: "Notification Title placeholder",
        };
    }

    return null;
  }, [detailsJSON]);

  const menuItems = useMemo(() => getMenuItems(activeMenu), [activeMenu]);
  const currentItem = menuItems.length ? menuItems[menuItems.length - 1].name : null;

  const onClickItem = (item) => {
    if (
      item === menuItems[0] ||
      (item === menuItems[menuItems.length - 1] && !detailsItem) ||
      item === detailsItem
    ) {
      return;
    }

    dispatch(openDetails(null));
    setTimeout(() => {
      navigate(item.link);
    });
  };

  return (
    <Box sx={{ py: 1, px: 3 }}>
      {(detailsJSON && (
        <BreadCrumbsComponent
          items={[...menuItems, detailsItem]}
          currentItem={detailsItem.name}
          onClickItem={onClickItem}
        />
      )) || (
          <BreadCrumbsComponent
            items={menuItems}
            currentItem={currentItem}
            onClickItem={onClickItem}
          />
        )}
    </Box>
  );
};
