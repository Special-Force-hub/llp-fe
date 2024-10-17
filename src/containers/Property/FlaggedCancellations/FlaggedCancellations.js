import { DashboardLayoutContainer } from 'components/Layouts/DashboardLayout';
import { Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPolicyCancelAction } from 'store/actions/propertyActions';
import { openDetails } from 'store/actions/uiActions';
import { FlaggedCancellationTable } from 'components/Tables/FlaggedCancellation';

export const FlaggedCancellations = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
        filter,
        offset: pagination.pageNumber * pagination.rowsPerPage,
        limit: pagination.rowsPerPage,
      }),
    );
  }, [filter, pagination]);

  const onClickCancelPolicies = useCallback((flaggedCancellation) => {
    // dispatch(
    //   openDetails({
    //     type: 'flagged-cancellation',
    //     data: flaggedCancellation,
    //   }),
    // );
  }, []);

  if (!flaggedCancellations) return <DashboardLayoutContainer />;

  const flaggedCancellationsJSON = flaggedCancellations.toJS();

  return (
    <DashboardLayoutContainer>
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
          onClickCancelPolicies={onClickCancelPolicies}
        />
      </Box>
    </DashboardLayoutContainer>
  );
};
