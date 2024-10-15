import { DashboardLayoutContainer } from 'components/Layouts/DashboardLayout';
import { Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import {
  getPolicyAction,
  // getFilteredDataAction,
  // setBuildingAction,
} from 'store/actions/propertyActions';
import { PolicyTable } from 'components/property/PolicyTable';

export const Policies = (props) => {
  const dispatch = useDispatch();

  const [filter, setFilter] = useState({
    options: {},
    searchText: '',
    searchPlaceholder: 'Search Policy..',
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

  useEffect(() => {
    console.log('pagination: ', pagination);
  }, [pagination]);

  const policies = useSelector((state) => state.getIn(['property', 'policy']));

  useEffect(() => {
    dispatch(
      getPolicyAction({
        filter,
        offset: pagination.pageNumber * pagination.rowsPerPage,
        limit: pagination.rowsPerPage,
      }),
    );
  }, [filter, pagination]);

  if (!policies) return <DashboardLayoutContainer />;

  const policiesJSON = policies.toJS();

  return (
    <DashboardLayoutContainer>
      <Box>
        <PolicyTable
          policies={policiesJSON.data}
          filter={filter}
          onChangeFilter={setFilter}
          pagination={{
            ...pagination,
            totalItems: policiesJSON.total,
            totalPages: Math.ceil(policiesJSON.total / pagination.rowsPerPage),
          }}
          onChangePagination={setPagination}
          sortOptions={sortOptions}
          onChangeSort={setSortOptions}
        />
      </Box>
    </DashboardLayoutContainer>
  );
};
