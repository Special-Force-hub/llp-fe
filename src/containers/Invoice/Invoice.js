import { DashboardLayoutContainer } from 'components/Layouts/DashboardLayout';
import { Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import {
  getInvoiceListAction,
  // getFilteredDataAction,
  // setInvoiceAction,
} from 'store/actions/invoiceActions';
import { InvoiceTable } from 'components/InvoiceTable';

export const Invoice = (props) => {
  const dispatch = useDispatch();

  const [filter, setFilter] = useState({
    options: {},
    searchText: '',
    searchPlaceholder: 'Search Invoice..',
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

  const invoices = useSelector((state) => state.getIn(['invoice', 'invoiceData']));
  useEffect(() => {
    dispatch(
      getInvoiceListAction({
        filter,
        offset: pagination.pageNumber * pagination.rowsPerPage,
        limit: pagination.rowsPerPage,
      }),
    );
  }, [filter, pagination]);

  if (!invoices) return <DashboardLayoutContainer />;

  // const invoicesJSON = invoices.toJS();
  const invoicesJSON = { invoiceData : [
    {
      "invoice_status": "Viewed",
      "sf_landlord_name": "The Promise Homes Company",
      "sf_building_name": "PHGA1220",
      "doc_number": "28181",
      "total_amount": "29.92",
      "balance": "29.92",
      "due_date": "2024-10-22",
      "invoice_link": "https://connect.intuit.com/portal/app/CommerceNetwork/view/scs-v1-3ac006284d35470196b67b3e642d30c6f35572f782094b408134bc1dc06332a9dc6ee1d18e94fa3806b98c1bcbe4463?locale=en_US&cta=v3invoicelink",
      "createdAt": "2024-10-08T07:26:24.525Z",
      "lastUpdatedTime": "2024-10-07T17:40:32-07:00",
      "dispute": null,
      "notes": ""
    },
    {
      "invoice_status": "Sent",
      "sf_landlord_name": "The Promise Homes Company",
      "sf_building_name": "PHGA1216",
      "doc_number": "28180",
      "total_amount": "43.33",
      "balance": "43.33",
      "due_date": "2024-10-22",
      "invoice_link": "https://connect.intuit.com/portal/app/CommerceNetwork/view/scs-v1-12db6dcc8c654168aa6a69c1609d7a7186f01029a384b5b9c476ae1254003fbbc58d04437f64a6ba36c2f8f0dcef976?locale=en_US&cta=v3invoicelink",
      "createdAt": "2024-10-08T07:26:24.525Z",
      "lastUpdatedTime": "2024-10-07T17:40:29-07:00",
      "dispute": null,
      "notes": ""
    }
  ],
  auth_token: {},
  schedule_date: '2024-10-08T08:47:26.191Z' 
}
  console.log('invoicesJSON', invoicesJSON);


  return (
    <DashboardLayoutContainer>
      <Box>
        <InvoiceTable
          invoices={invoicesJSON}
          filter={filter}
          onChangeFilter={setFilter}
          pagination={{
            ...pagination,
            totalItems: invoicesJSON.invoiceData.length,
            totalPages: Math.ceil(invoicesJSON.invoiceData.length / pagination.rowsPerPage),
          }}
          onChangePagination={setPagination}
          sortOptions={sortOptions}
          onChangeSort={setSortOptions}
        />
        {/* <div>heeeeey</div> */}
      </Box>
    </DashboardLayoutContainer>
  );
};
