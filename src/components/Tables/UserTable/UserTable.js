import { IconGraphy, Table } from '@leapeasy/ui-kit';
import { Typography, Badge, Avatar } from '@leapeasy/ui-kit';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getDemoData } from 'utils/helpers';
import { getUserBuildingAction } from 'store/actions/userActions';
import { useDispatch } from 'react-redux';

export const UserTable = ({
  title,
  role,
  users,
  filter,
  onChangeFilter,
  pagination,
  onChangePagination,
  sortOptions,
  onChangeSort,
  onClickUser,
}) => {
  const dispatch = useDispatch();
  const [tableData, setTableData] = useState([]);
  const isDemo = useSelector((state) => state.getIn(['ui', 'demo']));

  useEffect(() => {
    const data = [];
    if (users) {
      users.forEach((user) => {
        data.push([
          isDemo ? null : user.accepter.image,
          isDemo ? getDemoData('username') : user.accepter.username,
          isDemo ? getDemoData('phone') : user.accepter.phone,
          user.accepter.job_title,
          isDemo ? getDemoData('email') : user.accepter_email,
          user.property.length,
          new Date(user.createdAt).toISOString().slice(0, 10),
          user.id
        ]);
      });

      setTableData(data);
    }
  }, [users, isDemo]);

  const goDetailPage = (tableMeta) => {
    const selectedUser = users.find((user) => user.id === tableMeta[tableMeta.length - 1]);

    dispatch(getUserBuildingAction({ id: selectedUser.property }));
    if (selectedUser) {
      onClickUser(selectedUser);
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
          name: 'Name',
          options: {
            sort: true,
          },
          key: 'name',
        },
        {
          name: 'Phone Number',
          options: {
            sort: true,
          },
          key: 'phone_number',
        },
        {
          name: 'Job Title',
          options: {
            flex: '210px 1 1',
            sort: true,
          },
          key: 'job_title',
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
          name: 'Num of Building',
          options: {
            sort: true,
            customBodyRender: (value) => (
              <Typography align="center" variant="body1">
                {value.toLocaleString('en-US')}
              </Typography>
            ),
          },
          key: 'num_of_building',
        },
        {
          name: 'Invited Date',
          options: {},
          key: 'invited_date',
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
            customBodyRenderer: (value, tableMeta) => (
              <IconGraphy icon={'EditorLayout.Colorize'} style={{ color: '#702572' }} />
            ),
          },
          key: '',
        },
        {
          name: '',
          options: {
            flex: '5px 1 1',
            customBodyRenderer: (value, tableMeta) => (
              <IconGraphy icon={'General.Delete'} style={{ color: '#702572' }} />
            ),
          },
          key: '',
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
      title={title}
    />
  );
};
