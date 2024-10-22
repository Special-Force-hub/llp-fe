import { DashboardLayoutContainer } from 'components/Layouts/DashboardLayout';
import { Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import React, { useCallback, useEffect, useState } from 'react';
import { getActiveLandlordAction } from 'store/actions/userActions';
import { useNavigate } from 'react-router-dom';
import { LandlordTable } from 'components/Tables/LandlordTable';
import { openDetails } from 'store/actions/uiActions';

export const Landlord = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [filter, setFilter] = useState({
    options: {},
    searchText: '',
    searchPlaceholder: 'Search Landlord...',
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

  const landlords = useSelector((state) => state.getIn(['user', 'active_landlord']));

  useEffect(() => {
    dispatch(
      getActiveLandlordAction({
        filter,
        pagination,
        sortOptions,
      }),
    );
  }, [filter, pagination, sortOptions, dispatch]);

  const onClickLandlord = useCallback(
    (ll) => {
      console.log('landlord', ll);
      dispatch(
        openDetails({
          type: 'landlord',
          data: ll,
        }),
      );

      setTimeout(() => {
        navigate('/user/landlord/detail');
      });
    },
    [dispatch, navigate],
  );

  if (!landlords) return <DashboardLayoutContainer />;

  const landlordsJSON = landlords.toJS();

  return (
    <DashboardLayoutContainer>
      <Box>
        <LandlordTable
          landlords={landlordsJSON.data}
          filter={filter}
          onChangeFilter={setFilter}
          pagination={{
            ...pagination,
            totalItems: landlordsJSON.total || landlordsJSON.data.length,
            totalPages: Math.ceil(
              (landlordsJSON.total || landlordsJSON.data.length) / pagination.rowsPerPage,
            ),
          }}
          onChangePagination={setPagination}
          sortOptions={sortOptions}
          onChangeSort={setSortOptions}
          onClickLandlord={onClickLandlord}
        />
      </Box>
    </DashboardLayoutContainer>
  );
};
