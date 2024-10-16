import { DashboardLayoutContainer } from 'components/Layouts/DashboardLayout';
import { Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPolicyCancelAction } from 'store/actions/propertyActions';
import { openDetails } from 'store/actions/uiActions';
<<<<<<< HEAD
import { FlaggedCancellationTable } from 'components/Property/FlaggedCancellation';
=======
import { FlaggedCancellationTable } from 'components/Tables/FlaggedCancellation';
>>>>>>> dev

export const FlaggedCancellations = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [filter, setFilter] = useState({
    options: {},
    searchText: '',
<<<<<<< HEAD
    searchPlaceholder: 'Search Flagged Cancellations...',
=======
    searchPlaceholder: 'Search ...',
>>>>>>> dev
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

<<<<<<< HEAD
  const FlaggedCancellations = useSelector((state) => state.getIn(['property', 'policy-cancel']));
=======
  const flaggedCancellations = useSelector((state) => state.getIn(['property', 'policy-cancel']));
>>>>>>> dev

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
<<<<<<< HEAD

=======
>>>>>>> dev
    dispatch(
      openDetails({
        type: 'flagged-cancellation',
        data: FlaggedCancellation,
      }),
    );

    setTimeout(() => {
<<<<<<< HEAD
      console.log("/property/cancel-policies/detail");
=======
      console.log('/property/cancel-policies/detail');
>>>>>>> dev

      navigate('/property/cancel-policies/detail');
    });
  }, []);

<<<<<<< HEAD
  if (!FlaggedCancellations) return <DashboardLayoutContainer />;

  const FlaggedCancellationJSON = FlaggedCancellations.toJS();
=======
  if (!flaggedCancellations) return <DashboardLayoutContainer />;

  const flaggedCancellationsJSON = flaggedCancellations.toJS();
>>>>>>> dev

  return (
    <DashboardLayoutContainer>
      <Box>
        <FlaggedCancellationTable
<<<<<<< HEAD
          FlaggedCancellations={FlaggedCancellationJSON.data}
=======
          flaggedCancellations={flaggedCancellationsJSON.data}
>>>>>>> dev
          filter={filter}
          onChangeFilter={setFilter}
          pagination={{
            ...pagination,
<<<<<<< HEAD
            totalItems: FlaggedCancellationJSON.total,
            totalPages: Math.ceil(FlaggedCancellationJSON.total / pagination.rowsPerPage),
=======
            totalItems: flaggedCancellationsJSON.total,
            totalPages: Math.ceil(flaggedCancellationsJSON.total / pagination.rowsPerPage),
>>>>>>> dev
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
