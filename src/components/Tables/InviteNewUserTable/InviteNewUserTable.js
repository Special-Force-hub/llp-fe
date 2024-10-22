import { IconGraphy, Table } from '@leapeasy/ui-kit';
import { Typography, Badge, Button, Avatar } from '@leapeasy/ui-kit';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getDemoData } from 'utils/helpers';
import { useNavigate } from 'react-router-dom';

export const InviteNewUserTable = ({
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
          image,
          isDemo ? getDemoData('landlord-name') : landlord.name,
          isDemo ? getDemoData('phone') : landlord.phone,
          isDemo ? getDemoData('primary-contact') : landlord.primary_contact,
          isDemo ? getDemoData('address') : address,
          isDemo ? getDemoData('email') : landlord.email_address,
          landlord.total_buildings ? landlord.total_buildings : 0,
          landlord.total_units ? landlord.total_units : 0,
          new Date(landlord.sf_createdDate).toISOString().slice(0, 10),
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

  const goInvitePage = () => {
    navigate("/user/invite-new-user/invite")
  }

  return (
    <Table
      columns={[
        {
          name: '',
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
            flex: '80px 1 1',
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
              <Button variant='secondary' iconSuffix='EditorLayout.Send' onClick={() => goInvitePage()}>
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
      title="Invite Users"
    />
  );
};
