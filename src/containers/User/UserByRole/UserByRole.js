import { DashboardLayoutContainer } from 'components/Layouts/DashboardLayout';
import { Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import React, { useCallback, useEffect, useState } from 'react';
import { getVPAction, getRMAction, getPMAction } from 'store/actions/userActions';
import { openDetails } from 'store/actions/uiActions';
import { UserTable } from 'components/Tables/UserTable';
import { useNavigate } from 'react-router-dom';

export const UserByRole = ({ role, title }) => {

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

  const users = useSelector((state) => state.getIn(['user', role]));

  useEffect(() => {
    switch (role) {
      case 'vp':
        dispatch(
          getVPAction({
            filter,
            offset: pagination.pageNumber * pagination.rowsPerPage,
            limit: pagination.rowsPerPage,
          }),
        );
        break;
      case 'll':
        break;
      case 'rm':
        dispatch(
          getRMAction({
            filter,
            offset: pagination.pageNumber * pagination.rowsPerPage,
            limit: pagination.rowsPerPage,
          }),
        );
        break;
      case 'pm':
        dispatch(
          getPMAction({
            filter,
            offset: pagination.pageNumber * pagination.rowsPerPage,
            limit: pagination.rowsPerPage,
          }),
        );
        break;
    }
  }, [filter, pagination, dispatch]);

  const onClickUser = useCallback(
    (user) => {
      dispatch(
        openDetails({
          type: 'user',
          data: user,
        }),
      );

      setTimeout(() => {
        navigate('/property/full-portfolio/detail');
      });
    },
    [dispatch, navigate],
  );

  if (!users) return <DashboardLayoutContainer />;

  const usersJSON = users.toJS();

  return (
    <DashboardLayoutContainer>
      <Box>
        <UserTable
          title={title}
          role={role}
          users={usersJSON.data}
          filter={filter}
          onChangeFilter={setFilter}
          pagination={{
            ...pagination,
            totalItems: usersJSON.total,
            totalPages: Math.ceil(usersJSON.total / pagination.rowsPerPage),
          }}
          onChangePagination={setPagination}
          sortOptions={sortOptions}
          onChangeSort={setSortOptions}
          onClickUser={onClickUser}
        />
      </Box>
    </DashboardLayoutContainer>
  );
};
