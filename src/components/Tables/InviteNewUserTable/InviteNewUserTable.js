import { IconGraphy, Table } from '@leapeasy/ui-kit';
import { Typography, Badge, Button } from '@leapeasy/ui-kit';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getDemoData } from 'utils/helpers';

export const InviteNewUserTable = ({
  role,
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
  console.log("buildingbuildingbuilding", buildings);

  useEffect(() => {
    const data = [];
    if (buildings) {
      buildings.forEach((building) => {
        data.push([
          building.name,
          building.building_type,
          building.phone,
          building.billingStreet,
          building.email_address,
          building.total_of_units,
          building.student_housing,
          building.dispositioned.toString(),
          building.landlord_name,
          building.building_id,
        ]);
      });
      setTableData(data);
    }
  }, [buildings, role]);

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
          name: '',
          options: {
            flex: "5px 1 1"
          },
          key: '',
        },
        {
          name: 'Name',
          key: 'name',
        },
        {
          name: 'Address',
          options: {
            flex: '210px 1 1',
            sort: true,
          },
          key: 'adress',
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
          name: 'Phone Number',
          key: 'phone_number',
        },
        {
          name: 'Create date',
          options: {
            flex: '40px 1 1',
          },
          key: 'create_date',
        },
        {
          name: 'Num.of Building',
          options: {
            sort: true,
          },
          key: 'building_number',
        },
        {
          name: 'Num.of Unit',
          options: {
            sort: true,
          },
          key: 'unit_number',
        },
        {
          name: 'Action',
          options: {
            sort: true,
            customBodyRenderer: (value) => (
              <Button variant='secondary' iconSuffix='EditorLayout.Send'>
                Send
              </Button>
            ),
          },
          key: 'action',
        },
        {
          name: '',
          options: {
            sort: true,
            customBodyRenderer: (value, tableMeta) => (
              <IconGraphy
                icon={'FileFolder.Description'}
                style={{ color: '#702572' }}
                onClick={() => goDetailPage(tableMeta)}
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
      title="Invite Users"
    />
  );
};
