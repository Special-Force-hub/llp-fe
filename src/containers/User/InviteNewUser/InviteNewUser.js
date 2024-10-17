import { DashboardLayoutContainer } from 'components/Layouts/DashboardLayout';
import { Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import React, { useCallback, useEffect, useState } from 'react';
import { getInvitePropertyAction, inviteUserAction } from 'store/actions/inviteActions';
import { openDetails } from 'store/actions/uiActions';
import { InviteNewUserTable } from 'components/Tables/InviteNewUserTable';
import { useNavigate } from 'react-router-dom';

export const InviteNewUser = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [filter, setFilter] = useState({
    options: {},
    searchText: '',
    searchPlaceholder: 'Search Building..',
  });

  const [sortOptions, setSortOptions] = useState({});
  const [pagination, setPagination] = useState({
    pageNumber: 0,
    rowsPerPage: 12,
    maxVisiblePageItems: 6,
    onUpdate: (value) => {
      if (value === -1) value = 0;
      setPagination((prev) => ({ ...prev, pageNumber: value }));
    },
    showPageNumberInput: 6,
  });

  const [role, setRole] = useState('');

  const buildings = useSelector((state) => state.getIn(['invite', 'inviteProperty']));
  console.log("buildingsbuildings", buildings);

  const currentUser = JSON.parse(localStorage.getItem('user'));
  const currentUserRole = currentUser['role'];

  useEffect(() => {
    if (currentUserRole === 'rm') {
      setRole('pm');
      dispatch(getInvitePropertyAction({ inviteRole: 'pm' }));
    } else {
      dispatch(getInvitePropertyAction({ inviteRole: role }));
    }
  }, []);

  const onClickBuilding = useCallback(
    (building) => {
      dispatch(
        openDetails({
          type: 'building',
          data: building,
        }),
      );

      setTimeout(() => {
        navigate('/property/invite-new-user/detail');
      });
    },
    [dispatch, navigate],
  );

  if (!buildings) return <DashboardLayoutContainer />;

  const buildingsJSON = buildings.toJS();

  return (
    <DashboardLayoutContainer>
      <Box>
        <InviteNewUserTable
          role={role}
          buildings={buildingsJSON.data}
          filter={filter}
          onChangeFilter={setFilter}
          pagination={{
            ...pagination,
            totalItems: buildingsJSON.total,
            totalPages: Math.ceil(buildingsJSON.total / pagination.rowsPerPage),
          }}
          onChangePagination={setPagination}
          sortOptions={sortOptions}
          onChangeSort={setSortOptions}
          onClickBuilding={onClickBuilding}
        />
      </Box>
    </DashboardLayoutContainer>
  );
};
