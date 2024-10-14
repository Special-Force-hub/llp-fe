import { DashboardLayoutContainer } from 'components/Layouts/DashboardLayout';
import { Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import {
  getBuildingAction,
  // getFilteredDataAction,
  // setBuildingAction,
} from 'store/actions/propertyActions';
import { BuildingTable } from 'components/BuildingTable';

export const Buildings = (props) => {
  const dispatch = useDispatch();

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

  const buildings = useSelector((state) => state.getIn(['property', 'building']));

  useEffect(() => {
    dispatch(
      getBuildingAction({
        filter,
        offset: pagination.pageNumber * pagination.rowsPerPage,
        limit: pagination.rowsPerPage,
      }),
    );
  }, [filter, pagination]);

  if (!buildings) return <DashboardLayoutContainer />;

  const buildingsJSON = buildings.toJS();

  return (
    <DashboardLayoutContainer>
      <Box>
        <BuildingTable
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
        />
      </Box>
    </DashboardLayoutContainer>
  );
};
