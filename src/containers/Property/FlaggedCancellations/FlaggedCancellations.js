import { DashboardLayoutContainer } from 'components/Layouts/DashboardLayout';
import { Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPolicyCancelAction } from 'store/actions/propertyActions';
import { openDetails } from 'store/actions/uiActions';
import { FlaggedCancellationTable } from 'components/Property/FlaggedCancellation';

export const FlaggedCancellations = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [filter, setFilter] = useState({
    options: {},
    searchText: '',
    searchPlaceholder: 'Search Flagged Cancellations...',
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

  const FlaggedCancellations = useSelector((state) => state.getIn(['property', 'policy-cancel']));

  useEffect(() => {
    dispatch(
      getPolicyCancelAction({
        filter,
        offset: pagination.pageNumber * pagination.rowsPerPage,
        limit: pagination.rowsPerPage,
      }),
    );
  }, [filter, pagination]);

  const onClickCancelPolicies = useCallback((FlaggedCancellation) => {

    dispatch(
      openDetails({
        type: 'flagged-cancellation',
        data: FlaggedCancellation,
      }),
    );

    setTimeout(() => {
      console.log("/property/cancel-policies/detail");

      navigate('/property/cancel-policies/detail');
    });
  }, []);

  if (!FlaggedCancellations) return <DashboardLayoutContainer />;

  const FlaggedCancellationJSON = FlaggedCancellations.toJS();

  return (
    <DashboardLayoutContainer>
      <Box>
        <FlaggedCancellationTable
          FlaggedCancellations={FlaggedCancellationJSON.data}
          filter={filter}
          onChangeFilter={setFilter}
          pagination={{
            ...pagination,
            totalItems: FlaggedCancellationJSON.total,
            totalPages: Math.ceil(FlaggedCancellationJSON.total / pagination.rowsPerPage),
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
