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

  const invoicesJSON = invoices.toJS();

  return (
    <DashboardLayoutContainer>
      <Box>
        <InvoiceTable
          invoices={invoicesJSON.invoiceData}
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
      </Box>
    </DashboardLayoutContainer>
  );
};
