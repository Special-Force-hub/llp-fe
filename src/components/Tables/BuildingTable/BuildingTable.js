import { IconGraphy, Table } from '@leapeasy/ui-kit';
import { Typography, Badge } from '@leapeasy/ui-kit';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getDemoData } from 'utils/helpers';

export const BuildingTable = ({
  buildings,
  filter,
  onChangeFilter,
  pagination,
  onChangePagination,
  sortOptions,
  onChangeSort,
  onClickBuilding,
}) => {
  const [tableData, setTableData] = useState([]);
  const isDemo = useSelector((state) => state.getIn(['ui', 'demo']));

  useEffect(() => {
    const data = [];
    if (buildings) {
      buildings.forEach((building) => {
        data.push([
          isDemo ? getDemoData('building-name') : building.name,
          building.building_type,
          isDemo ? getDemoData('phone') : building.phone,
          isDemo ? getDemoData('address') : building.billingStreet,
          isDemo ? getDemoData('email') : building.email_address,
          building.total_of_active_leap_units
            ? parseInt(building.total_of_active_leap_units, 10)
            : 0,
          building.student_housing,
          building.dispositioned.toString(),
          isDemo ? getDemoData('landlord-name') : building.landlord_name,
          building.id,
        ]);
      });

      setTableData(data);
    }
  }, [buildings, isDemo]);

  const goDetailPage = (tableMeta) => {

    const selectedBuilding = buildings.find(
      (building) => building.id === tableMeta[tableMeta.length - 1],
    );

    if (selectedBuilding) {
      onClickBuilding(selectedBuilding);
    }
  };

  return (
    <Table
      columns={[
        {
          name: 'Name',
          options: {
            sort: true,
          },
          key: 'name',
        },
        {
          name: 'Building Type',
          options: {
            flex: '30px 1 1',
            filter: true,
            customBodyRenderer: (value) => (
              <Badge
                background="rgba(243, 241, 244, 1)"
                color={value ? 'purple' : 'tomato'}
                label={
                  !value
                    ? 'undefined'
                    : value === 'Auto Enroll'
                      ? 'AE'
                      : value === 'Event Process'
                        ? 'EP'
                        : 'AE EP'
                }
                rounded
                textSize="medium"
              />
            ),
            filterOptions: [
              {
                text: 'Auto Enroll',
                value: 'Auto Enroll',
              },
              {
                text: 'Event Process',
                value: 'Event Process',
              },
              {
                text: 'Event Process;Auto Enroll',
                value: 'Event Process;Auto Enroll',
              },
            ],
            sort: true,
          },
          key: 'building_type',
        },
        {
          name: 'Phone Number',
          options: {
            sort: true,
          },
          key: 'phone',
        },
        {
          name: 'Address',
          options: {
            flex: '210px 1 1',
            sort: true,
          },
          key: 'billingStreet',
        },
        {
          name: 'Email Address',
          options: {
            flex: '210px 1 1',
            sort: true,
          },
          key: 'email_address',
        },
        {
          name: 'Tot. Active Leap Units',
          options: {
            filter: false,
            sort: true,
            customBodyRender: (value) => (
              <Typography align="center" variant="body1">
                {value.toLocaleString('en-US')}
              </Typography>
            ),
          },
          key: 'total_of_active_leap_units',
        },
        {
          name: 'Student Housing',
          options: {
            flex: '40px 1 1',
            filter: true,
            sort: true,
            customBodyRenderer: (value) => (
              <Badge
                background="#F3F1F4"
                color={value === 'true' ? 'parisGreen' : 'tomato'}
                label={value}
                rounded
                textSize="medium"
              />
            ),
            filterOptions: [
              {
                text: 'true',
                value: 'true',
              },
              {
                text: 'false',
                value: 'false',
              },
            ],
          },
          key: 'student_housing',
        },
        {
          name: 'Detail',
          options: {
            flex: '5px 1 1',
            sort: true,
            customBodyRenderer: (value, tableMeta) => (
              <IconGraphy
                icon={'FileFolder.Description'}
                style={{ color: '#702572' }}
                // onClick={() => goDetailPage(tableMeta)}
              />
            ),
          },
          key: 'detail',
        },
      ]}
      data={tableData}
      filter={filter}
      onChangeFilter={onChangeFilter}
      onChangeRowsPerPage={(value) =>
        onChangePagination({
          ...pagination,
          rowsPerPage: value,
          pageNumber: 0,
        })
      }
      pagination={pagination}
      rowsPerPageOptions={[12, 15, 20]}
      sortOptions={sortOptions}
      onChangeSort={onChangeSort}
      style={{ width: '100%' }}
      title="Buildings"
    />
  );
};
