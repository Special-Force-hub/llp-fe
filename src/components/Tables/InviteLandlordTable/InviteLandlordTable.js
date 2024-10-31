import { IconGraphy, Table } from '@leapeasy/ui-kit';
import { Typography, Badge, Button, Avatar, Checkbox } from '@leapeasy/ui-kit';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getDemoData } from 'utils/helpers';
import { useNavigate } from 'react-router-dom';
import { name } from 'data/dummy/brand';

export const InviteLandlordTable = ({
  // role,
  landlords,
  filter,
  onChangeFilter,
  pagination,
  onChangePagination,
  sortOptions,
  onChangeSort,
  onClickLandlord,
}) => {
  const navigate = useNavigate();
  const [tableData, setTableData] = useState([]);
  const isDemo = useSelector((state) => state.getIn(['ui', 'demo']));

  useEffect(() => {
    const data = [];
    if (landlords) {
      landlords.forEach((landlord) => {
        const address =
          (landlord.billingStreet || '') +
          ' ' +
          (landlord.billingCity || '') +
          ' ' +
          (landlord.billingState || '') +
          ' ' +
          (landlord.billingPostalCode || '');
        const image = landlord.user ? landlord.user.image : null;
        data.push([
          '',
          image,
          isDemo ? getDemoData('landlord-name') : landlord.name,
          isDemo ? getDemoData('address') : address,
          isDemo ? getDemoData('email') : landlord.email_address,
          isDemo ? getDemoData('phone') : landlord.phone,
          new Date(landlord.sf_createdDate).toISOString().slice(0, 10),
          landlord.total_buildings ? landlord.total_buildings : 0,
          landlord.total_units ? landlord.total_units : 0,
          landlord.id,
        ]);
      });
      setTableData(data);
    }
  }, [landlords, isDemo]);

  const goDetailPage = (tableMeta) => {

    const selectedBuilding = landlords.find(
      (landlord) => landlord.id === tableMeta[tableMeta.length - 1],
    );

    if (selectedBuilding) {
      onClickLandlord(selectedBuilding);
    }
  };

  return (
    <Table
      columns={[
        {
          name: <Checkbox description="" indeterminate label="" onClick={() => { }} readonly />,
          options: {
            flex: '5px 1 1',
            sort: true,
            customBodyRenderer: (value) => <Checkbox description="" label="" onClick={() => { }} />,
          },
          key: '',
        },
        {
          name: 'Profile',
          options: {
            flex: "5px 1 1",
            customBodyRenderer: (value) => (
              <Avatar
                size="medium"
                iconImage={value ? <img src={value} /> : <IconGraphy icon="Users.User" />}
              />
            ),
          },
          key: 'avatar',
        },
        {
          name: 'Account Name',
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
          name: 'Email ',
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
            flex: '80px 1 1',
          },
          key: 'create_date',
        },
        {
          name: 'Num.of Building',
          options: {
            sort: true,
            filter: true,
            filterOptions: [
              {
                text: "1",
                value: "1"
              },
              {
                text: "2",
                value: "2"
              },
              {
                text: "3",
                value: "3"
              },
            ]
          },
          key: 'building_number',
        },
        {
          name: 'Num.of Unit',
          options: {
            sort: true,
            filter: true,
            filterOptions: [
              {
                text: "1",
                value: "1"
              },
              {
                text: "2",
                value: "2"
              },
              {
                text: "3",
                value: "3"
              },
            ]
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
            flex: '5px 1 1',
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
      title="Invite Landlord List"
    />
  );
};
