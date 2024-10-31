import { DashboardLayoutContainer } from 'components/Layouts/DashboardLayout';
import { Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import React, { useCallback, useEffect, useState } from 'react';
import { openDetails } from 'store/actions/uiActions';
import { InviteNewUserTable } from 'components/Tables/InviteNewUserTable';
import { getActiveLandlordAction } from 'store/actions/userActions';
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

  const landlords = useSelector((state) => state.getIn(['user', 'active_landlord']));

  const currentUser = JSON.parse(localStorage.getItem('user'));
  const currentUserRole = currentUser['role'];

  useEffect(() => {
    dispatch(
      getActiveLandlordAction({
        filter,
        pagination,
        sortOptions,
      }),
    );
  }, [filter, pagination, sortOptions, dispatch]);

  const onClickLandlord = useCallback(
    (ll) => {
      dispatch(
        openDetails({
          type: 'landlord',
          data: ll,
        }),
      );

      setTimeout(() => {
        navigate('/user/invite-new-user/detail');
      });
    },
    [dispatch, navigate],
  );

  if (!landlords) return <DashboardLayoutContainer />;

  const landlordsJSON = landlords.toJS();

  return (
    <DashboardLayoutContainer>
      <Box>
        <InviteNewUserTable
          // role={role}
          landlords={landlordsJSON.data}
          filter={filter}
          onChangeFilter={setFilter}
          pagination={{
            ...pagination,
            totalItems: landlordsJSON.total,
            totalPages: Math.ceil(landlordsJSON.total / pagination.rowsPerPage),
          }}
          onChangePagination={setPagination}
          sortOptions={sortOptions}
          onChangeSort={setSortOptions}
          onClickLandlord={onClickLandlord}
        />
      </Box>
    </DashboardLayoutContainer>
  );
};
