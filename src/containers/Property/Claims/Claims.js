import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';

import { DashboardLayoutContainer } from 'components/Layouts/DashboardLayout';

import { getClaimAction } from 'store/actions/propertyActions';
import { openDetails } from 'store/actions/uiActions';

import { ClaimsTable } from './ClaimsTable';
import { JsonData } from './json';

export const Claims = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [filter, setFilter] = useState({
    options: {},
    searchText: '',
    searchPlaceholder: 'Search Claims..',
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

  const claims = useSelector((state) => state.getIn(['property', 'claim']));

  useEffect(() => {
    dispatch(
      getClaimAction(
        {
          filter,
          offset: pagination.pageNumber * pagination.rowsPerPage,
          limit: pagination.rowsPerPage,
        }
      ),
    );
  }, [filter, pagination]);

  const onClickClaim = useCallback((claim) => {
    dispatch(
      openDetails({
        type: 'claim',
        data: claim,
      }),
    );

    setTimeout(() => {
      navigate('/property/claims/detail');
    });
  }, []);

  if (!claims) return <DashboardLayoutContainer />;

  const claimsJSON = claims.toJS();

  return (
    <DashboardLayoutContainer>
      <Box>
        <ClaimsTable
          claims={JsonData.data}
          filter={filter}
          onChangeFilter={setFilter}
          pagination={{
            ...pagination,
            totalItems: claimsJSON.total,
            totalPages: Math.ceil(claimsJSON.total / pagination.rowsPerPage),
          }}
          onChangePagination={setPagination}
          sortOptions={sortOptions}
          onChangeSort={setSortOptions}
          onClickClaim={onClickClaim}
        />
      </Box>
    </DashboardLayoutContainer>
  );
};
