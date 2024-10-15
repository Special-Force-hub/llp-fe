import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { getAppAction } from 'store/actions/propertyActions';
import { ApplicationTable } from 'components/Property/ApplicationTable';

export const ApplicationTab = ({ building }) => {
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
    dispatch(getAppAction({
      buildingId: building.building_id,
      filter,
      offset: pagination.pageNumber * pagination.rowsPerPage,
      limit: pagination.rowsPerPage,
    }));
  }, [dispatch, building.building_id, filter, pagination]);

  const applications = useSelector((state) => state.getIn(['property', 'application']));

  if (!applications) return null;

  const applicationsJSON = applications.toJS();
  return (
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
        shouldShowBuildingName={false}
        onClickApplication={() => {}}
      />
    </Box>
  );
};
