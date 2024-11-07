import { Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { getPolicyCancelAction } from 'store/actions/propertyActions';
import { FlaggedCancellationTable } from 'components/Tables/FlaggedCancellation';

export const CancellationsTab = ({ building }) => {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState({
    options: {},
    searchText: '',
    searchPlaceholder: 'Search ...',
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

  const flaggedCancellations = useSelector((state) => state.getIn(['property', 'policy-cancel']));

  useEffect(() => {
    dispatch(
      getPolicyCancelAction({
        buildingId: building.building_id,
        filter,
        offset: pagination.pageNumber * pagination.rowsPerPage,
        limit: pagination.rowsPerPage,
      }),
    );
  }, [filter, pagination, building]);

  if (!flaggedCancellations) return null;

  const flaggedCancellationsJSON = flaggedCancellations.toJS();

  return (
    <Box>
      <FlaggedCancellationTable
        flaggedCancellations={flaggedCancellationsJSON.data}
        filter={filter}
        onChangeFilter={setFilter}
        pagination={{
          ...pagination,
          totalItems: flaggedCancellationsJSON.total,
          totalPages: Math.ceil(flaggedCancellationsJSON.total / pagination.rowsPerPage),
        }}
        onChangePagination={setPagination}
        sortOptions={sortOptions}
        onChangeSort={setSortOptions}
        onClickCancelPolicies={() => {}}
      />
    </Box>
  );
};