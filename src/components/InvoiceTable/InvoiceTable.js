import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { IconGraphy, Table } from '@leapeasy/ui-kit';
import { Typography, Badge, DatePickerInput } from '@leapeasy/ui-kit';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getDemoData } from 'utils/helpers';

export const InvoiceTable = ({
  invoices,
  filter,
  dropFilter,
  onChangeFilter,
  pagination,
  onChangePagination,
  sortOptions,
  onChangeSort,
}) => {
  const [tableData, setTableData] = useState([]);
  const isDemo = useSelector((state) => state.getIn(['ui', 'demo']));

  useEffect(() => {
    const data = [];
    if (invoices) { 
      const schedule_date = invoices.schedule_date;
      invoices.invoiceData.forEach((invoice) => {
        let update_status = null;
        if (new Date(invoice.createdAt) > new Date(new Date(schedule_date) - 86400000)) {
          update_status = 'New';
        } else if (
          new Date(invoice.lastUpdatedTime) > new Date(new Date(schedule_date) - 86400000)
        ) {
          update_status = 'Update';
        }
        console.log(schedule_date, invoice.createdAt, invoice.lastUpdatedTime, update_status)
        let dispute_status = null;
        if (invoice.dispute) {
          dispute_status = 'dispute';
          if (invoice.dispute[invoice.dispute.length - 1].total_amount !== invoice.total_amount) {
            dispute_status = 'updated';
          }
        }
        data.push([
          isDemo ? getDemoData('invoice-number') : invoice.doc_number,
          invoice.balance == 0 ? true : false,
          invoice.invoice_status,
          isDemo ? getDemoData('landlord-name') : invoice.sf_landlord_name,
          isDemo ? getDemoData('building-name') : invoice.sf_building_name,
          invoice.total_amount,
          invoice.balance,
          invoice.due_date,
          invoice.lastUpdatedTime,
          update_status,
          dispute_status,
          invoice.invoice_link,
          '',
        ]);
      });
      setTableData(data);
    }
  }, [invoices, isDemo]);

  const goDetailPage = (tableMeta) => {

  };

  return (
    <Table
      
      data={tableData}
      filter={filter}
      dropFilter={dropFilter}
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
      title="Invoice"
      columns={[
        {
          name: 'Invoice Num.',
          options: {
            flex: '15px 1 1',
            sort: true,
          },
          key: 'invoice_id',
        },
        {
          name: 'Payment',
          options: {
            flex: '15px 1 1',
            customBodyRenderer: (value) => (
              <Badge
                color={'magentaRed'}
                label={value == true ? 'Paid' : 'Unpaid'}
                rounded
                textSize="medium"
              />
            ),
          },
          key: 'payment_status',
        },
        {
          name: 'Status',
          options: {
            flex: '15px 1 1',
            filter: true,
            customBodyRenderer: (value) => (
              <Badge color={'neutral'} label={value} rounded textSize="medium" />
            ),
          },
          key: 'invoice status',
        },
        {
          name: 'Landlord Name',
          options: {
            flex: '120px 1 1',
            sort: true,
          },
          key: 'sf_landlord_name',
        },
        {
          name: 'Building Name',
          options: {
            flex: '20px 1 1',
            sort: true,
          },
          key: 'sf_building_name',
        },
        {
          name: 'Total Amount',
          options: {
            flex: '15px 1 1',
            sort: true,
          },
          key: 'total_amount',
        },
        {
          name: 'Balance',
          options: {
            flex: '15px 1 1',
            sort: true,
          },
          key: 'balance',
        },
        {
          name: 'Due Date',
          options: {
            flex: '30px 1 1',
            sort: true,
          },
          key: 'due_date',
        },
        {
          name: 'Last Updated Time',
          options: {
            sort: true,
          },
          key: 'lastUpdatedTime',
        },
        {
          name: 'Update Status',
          options: {
            flex: '20px 1 1',
            filter: true,
            customBodyRenderer: (value) => {
              if (value) {
                return <Badge color={'warmBlue'} label={value} rounded textSize="medium" />
              } else <></>
            },
          },
          key: 'update_status',
        },
        {
          name: 'Disputed',
          options: {
            flex: '15px 1 1',
            filter: true,
            customBodyRenderer: (value) => (
              <Badge
                color={'parisGreen'}
                label={value == 'dispute' ? 'True' : 'False'}
                rounded
                textSize="medium"
              />
            ),
          },
          key: 'disputed',
        },
        {
          name: <IconContainer><IconGraphy icon={'EditorLayout.Link'} style={{ color: '#702572' }} /></IconContainer>,
          options: {
            flex: '0px 1 1',
            customBodyRenderer: (value, tableMeta) => 
              <IconContainer>
                {
                  value ? (
                    <a href={value} target="blank">
                      <IconGraphy
                        icon={'Arrow.NorthEast'}
                        style={{ color: '#702572' }}
                        onClick={() => goDetailPage(tableMeta)}
                      />
                    </a>
                  ) : (
                    <IconGraphy
                      icon={'Arrow.NorthEast'}
                      style={{ color: '#702572' }}
                      onClick={() => goDetailPage(tableMeta)}
                    />
                  )
                }
              </IconContainer>
          },
          key: 'link',
        },
        {
          name: 'Detail',
          options: {
            flex: '5px 1 1',
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
    />
  );
};


const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;