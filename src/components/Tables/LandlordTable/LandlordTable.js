import { IconGraphy, Table } from '@leapeasy/ui-kit';
import { Typography, Avatar } from '@leapeasy/ui-kit';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getDemoData } from 'utils/helpers';

export const LandlordTable = ({
  landlords,
  filter,
  onChangeFilter,
  pagination,
  onChangePagination,
  sortOptions,
  onChangeSort,
  onClickLandlord,
}) => {
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
          isDemo ? getDemoData('primary-contact') : landlord.primary_contact,
          isDemo ? getDemoData('address') : address,
          isDemo ? getDemoData('email') : landlord.email_address,
          isDemo ? getDemoData('phone') : landlord.phone,
          new Date(landlord.sf_createdDate).toISOString().slice(0, 10),
          landlord.total_buildings ? landlord.total_buildings : 0,
          landlord.total_units ? landlord.total_units : 0,
          landlord.id,
          landlord.id,
        ]);
      });

      setTableData(data);
    }
  }, [landlords, isDemo]);

  const goDetailPage = (tableMeta) => {
    const selectedLandlord = landlords.find((ll) => ll.id === tableMeta[tableMeta.length - 1]);

    if (selectedLandlord) {
      onClickLandlord(selectedLandlord);
    }
  };

  return (
    <Table
      columns={[
        {
          name: '',
          options: {
            flex: '5px 1 1',
            customBodyRenderer: (value) => (
              <Avatar
                size="medium"
                iconImage={value ? <img src={value} /> : <IconGraphy icon="Users.User" />}
              />
            ),
          },
          key: 'image',
        },
        {
          name: 'Landlord Name',
          options: {
            sort: true,
          },
          key: 'landlord_name',
        },
        {
          name: 'Primary Contact',
          options: {
            sort: true,
          },
          key: 'primary_contact',
        },
        {
          name: 'Address',
          options: {
            flex: '210px 1 1',
            sort: true,
          },
          key: 'address',
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
          options: {
            sort: true,
          },
          key: 'phone',
        },
        {
          name: 'Create date',
          options: {},
          key: 'create_date',
        },
        {
          name: 'No. of Building',
          options: {
            flex: '5px 1 1',
          },
          key: 'number_of_buildings',
        },
        {
          name: 'N/Units',
          options: {
            flex: '5px 1 1',
          },
          key: 'number_of_units',
        },
        {
          name: 'Details',
          options: {
            flex: '5px 1 1',
            customBodyRenderer: (value, tableMeta) => (
              <IconGraphy
                icon={'FileFolder.Description'}
                style={{ color: '#702572' }}
                onClick={() => goDetailPage(tableMeta)}
              />
            ),
          },
          key: 'details',
        },
        {
          name: '',
          options: {
            flex: '5px 1 1',
          },
          key: 'actions',
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
      title="Landlord"
    />
  );
};
