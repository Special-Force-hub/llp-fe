import { IconGraphy, Table, Typography, Badge } from '@leapeasy/ui-kit';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getDemoData } from 'utils/helpers';

export const NotificationFromTable = ({
  messages,
  filter,
  onChangeFilter,
  pagination,
  onChangePagination,
  sortOptions,
  onChangeSort,
  onClickMessage
}) => {

  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    if (messages) {
      const msgData = [];
      messages.forEach((message) => {
        msgData.push([
          message.requestor_email,
          message.requestor_role,
          message.accepter_email,
          message.accepter_role,
          message.property.length,
          new Date(message.updatedAt).toISOString().slice(0, 10),
          message.request_type,
          message.request_status,
          message.id,
        ]);
      });
      const sortedData = msgData.sort((a, b) => new Date(b[4]) - new Date(a[4]));
      setTableData(sortedData);
    }
  }, [messages]);

  const goDetailPage = (tableMeta) => {

    const selectedMessage = messages.find(
      (message) => message.id === tableMeta[tableMeta.length - 1],
    );

    if (selectedMessage) {
      onClickMessage(selectedMessage);
    }
  };

  return (
    <Table
      columns={[
        {
          name: 'To Email',
          options: {
            // flex: '10px 1 1',
            sort: true,
          },
          key: 'to_email',
        },
        {
          name: 'To Role',
          options: {
            flex: '40px 1 1',
            filter: true,
            customBodyRenderer: (value) => (
              <Badge
                background="rgba(243, 241, 244, 1)"
                color={value == "ll" ? 'warmBlue' : value == "vp" ? 'tomato' : value == "rm" ? "purpleIrish" : "magentaRed"}
                label={value == "ll" ? 'Landlord' : value == "vp" ? 'Full Portfolio' : value == "rm" ? "Multi-Site" : "Property"}
                rounded
                textSize="medium"
              />
            ),
            filterOptions: [
            ],
            sort: true,
          },
          key: 'to_role',
        },
        {
          name: 'From Email',
          options: {
            sort: true,
          },
          key: 'from_email',
        },
        {
          name: 'From Role',
          options: {
            flex: '40px 1 1',
            customBodyRenderer: (value) => (
              <Badge
                background="#F3F1F4"
                color={value == "ll" ? 'warmBlue' : value == "vp" ? 'tomato' : value == "rm" ? "purpleIrish" : "magentaRed"}
                label={value == "ll" ? 'Landlord' : value == "vp" ? 'Full Portfolio' : value == "rm" ? "Multi-Site" : "Property"}
                rounded
                textSize="medium"
              />
            ),
            sort: true,
          },
          key: 'from_role',
        },
        {
          name: 'Num. of Property',
          options: {
            // flex: '210px 1 1',
            sort: true,
          },
          key: 'numberofproperty',
        },
        {
          name: 'Date',
          options: {
            // flex: '40px 1 1',
          },
          key: 'date',
        },
        {
          name: 'Invite Type',
          options: {
            flex: '40px 1 1',
            customBodyRenderer: (value) => (
              <Badge
                background="#F3F1F4"
                color={"purple"}
                label={value}
                rounded
                textSize="medium"
              />
            ),
          },
          key: 'invite_type',
        },
        {
          name: 'Status',
          options: {
            flex: '40px 1 1',
            customBodyRenderer: (value) => (
              <Badge
                background="#F3F1F4"
                color={value == "accepted" ? "parisGreen" : "sunglow"}
                label={value}
                rounded
                textSize="medium"
              />
            ),
          },
          key: 'invite_type',
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
                onClick={() => goDetailPage(tableMeta)}
              />
            ),
          },
          key: 'detail',
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
      title="Notification"
    />
  )
}