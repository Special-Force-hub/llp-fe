import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { PolicyTable } from 'components/Tables/PolicyTable';
import { getPolicyAction } from 'store/actions/propertyActions';

export const PolicyTab = ({ building }) => {
  const dispatch = useDispatch();

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

  useEffect(() => {
    dispatch(
      getPolicyAction({
        filter,
        offset: pagination.pageNumber * pagination.rowsPerPage,
        limit: pagination.rowsPerPage,

        role: 'building',
        id: building.building_id,
      }),
    );
  }, [dispatch, building.building_id, filter, pagination]);

  const policies = useSelector((state) => state.getIn(['property', 'policy']));

  if (!policies) return null;

  const policiesJSON = policies.toJS();
  return (
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
        shouldShowBuildingName={false}
        onClickPolicy={() => {}}
      />
    </Box>
  );
};
