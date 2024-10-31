import { DashboardLayoutContainer } from 'components/Layouts/DashboardLayout';
import { Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import React, { useCallback, useEffect, useState } from 'react';
import { getNotifFromAction } from 'store/actions/notifActions';
import { openDetails } from 'store/actions/uiActions';
import { NotificationFromTable } from 'components/Tables/NotificationTable';
import { useNavigate } from 'react-router-dom';


export const NotificationFrom = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [filter, setFilter] = useState({
    options: {},
    searchText: '',
    searchPlaceholder: 'Search Notification From'
  })

  const [sortOptions, setSortOptions] = useState({})
  const [pagination, setPagination] = useState({
    pageNumber: 0,
    rowsPerPage: 12,
    maxVisiblePageItems: 6,
    onUpdate: (value) => {
      if (value === -1) value = 0;
      setPagination((prev) => ({ ...prev, pageNumber: value }))
    },
    showPageNumberInput: 6
  })

  useEffect(() => {
    dispatch(
      getNotifFromAction({
        // filter,
        // offset: pagination.pageNumber * pagination.rowsPerPage,
        // limit: pagination.rowsPerPage,
      }),
    );
  }, [filter, pagination, dispatch]);

  const messages = useSelector((state) => state.getIn(['notification', 'msgFrom']));

  const onClickMessage = useCallback(

    (message) => {
      dispatch(
        openDetails({
          type: 'message',
          data: message,
        }),
      );

      setTimeout(() => {
        navigate('/notification/from/detail');
      });
    },
    [dispatch, navigate],
  );

  if (!messages) return <DashboardLayoutContainer />;

  const messagesJSON = messages.toJS();

  return (
    <DashboardLayoutContainer>
      <Box>
        <NotificationFromTable
          messages={messagesJSON.data}
          filter={filter}
          onChangeFilter={setFilter}
          pagination={{
            ...pagination,
            totalItems: messagesJSON.total,
            totalPages: Math.ceil(messagesJSON.total / pagination.rowsPerPage),
          }}
          onChangePagination={setPagination}
          sortOptions={sortOptions}
          onChangeSort={setSortOptions}
          onClickMessage={onClickMessage}
        />
      </Box>
    </DashboardLayoutContainer>
  );
};
