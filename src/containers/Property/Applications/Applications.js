import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DashboardLayoutContainer } from 'components/Layouts/DashboardLayout';
import { Box } from '@mui/material';
import {
  getFilteredDataAction,
  searchDBAction,
  getAppAction,
  setAppAction,
} from 'store/actions/propertyActions';
import { APP_STAGE, APP_TYPE } from 'data/constants/common_constants';
import { useNavigate } from 'react-router-dom';
import { ApplicationTable } from 'components/Tables/ApplicationTable';
import { openDetails } from 'store/actions/uiActions';

export const Applications = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [filter, setFilter] = useState({
    options: {},
    searchText: '',
    searchPlaceholder: 'Search Application..',
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

  const applications = useSelector((state) => state.getIn(['property', 'application']));

  useEffect(() => {
    dispatch(
      getAppAction({
        filter,
        offset: pagination.pageNumber * pagination.rowsPerPage,
        limit: pagination.rowsPerPage,
      }),
    );
  }, [filter, pagination]);

  const onClickApplication = useCallback((application) => {
    dispatch(
      openDetails({
        type: 'application',
        data: application,
      }),
    );

    setTimeout(() => {
      navigate('/property/applications/detail');
    });
  }, []);

  if (!applications) return <DashboardLayoutContainer />;

  const applicationsJSON = applications.toJS();

  return (
    <DashboardLayoutContainer>
      <Box>
        <ApplicationTable
          applications={applicationsJSON.data}
          filter={filter}
          onChangeFilter={setFilter}
          pagination={{
            ...pagination,
            totalItems: applicationsJSON.total,
            totalPages: Math.ceil(applicationsJSON.total / pagination.rowsPerPage),
          }}
          onChangePagination={setPagination}
          sortOptions={sortOptions}
          onChangeSort={setSortOptions}
          onClickApplication={onClickApplication}
        />
      </Box>
    </DashboardLayoutContainer>
  );
};
