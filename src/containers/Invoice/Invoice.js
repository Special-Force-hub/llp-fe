import { DashboardLayoutContainer } from 'components/Layouts/DashboardLayout';
import styled from 'styled-components';
import { Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import {
  getInvoiceListAction,
  // getFilteredDataAction,
  // setInvoiceAction,
} from 'store/actions/invoiceActions';
import { InvoiceTable } from 'components/InvoiceTable';
import { DatePickerInput, Dropdown } from '@leapeasy/ui-kit';

export const Invoice = (props) => {
  const dispatch = useDispatch();

  const [filter, setFilter] = useState({
    options: {},
    searchText: '',
    searchPlaceholder: 'Search Invoice..',
  });
  const [selectedPayment, setSelectedPayment] = useState([]);
  const [selectedInvoiceStatus, setSelectedInvoiceStatus] = useState([])
  const [selectedDueDate, setSelectedDueDate] = useState();
  const [selectedUpdateStatus, setSelectedUpdateStatus] = useState([])
  const [selectedDisputed, setSelectedDisputed] = useState([]);

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
  
  const handleDispatch = () => {
    dispatch(
      getInvoiceListAction({
        filter: {
          ...filter,
          selectedPayment,
          selectedInvoiceStatus,
          selectedDueDate,
          selectedUpdateStatus,
          selectedDisputed
        },
        offset: pagination.pageNumber * pagination.rowsPerPage,
        limit: pagination.rowsPerPage,
        sortOptions,
      }),
    );
  }

  const invoices = useSelector((state) => state.getIn(['invoice', 'invoiceData']));
  useEffect(() => {
    setPagination((prev) => ({ ...prev, pageNumber: 0 }));
  }, [filter])
  useEffect(() => {
    handleDispatch()
  }, [filter, pagination, sortOptions]);

  const applyFunc = () => {
    handleDispatch()
  }

  const resetFunc = () => {
    setSelectedPayment([]);
    setSelectedInvoiceStatus([])
    setSelectedDueDate();
    setSelectedUpdateStatus([])
    setSelectedDisputed([]);
  }

  if (!invoices) return <DashboardLayoutContainer />;

  const invoicesJSON = invoices.toJS();

  return (
    <DashboardLayoutContainer>
      <Box>
        <InvoiceTable
          invoices={invoicesJSON}
          filter={filter}
          dropFilter={{
            component: (
              <DropFilterContainer>
                <Dropdown
                  onChange={(e) => {
                    setSelectedPayment(e.target.value);
                  }}
                  options={[
                    {
                      text: "Paid",
                      value: "1"
                    },
                    {
                      text: "Unpaid ",
                      value: "-1"
                    },
                  ]}
                  value={selectedPayment}
                  multiselect={true}
                  showSearch={false}
                  placeholder='All Status'
                  label="Payment"
                  style={{
                    width: '100%'
                  }}
                />

                <Dropdown
                  onChange={(e) => {
                    setSelectedInvoiceStatus(e.target.value);
                  }}
                  options={[
                    {
                      text: "Paid",
                      value: "Paid"
                    },
                    {
                      text: "Viewed",
                      value: "Viewed"
                    },
                    {
                      text: "Sent",
                      value: "Sent"
                    },
                  ]}
                  value={selectedInvoiceStatus}
                  multiselect={true}
                  showSearch={false}
                  placeholder='All Type'
                  label="Invoice Status"
                  style={{
                    width: '100%'
                  }}
                />
                <RangeDatePickerContainer>
                  <DatePickerInput
                    label={'Due date'}
                    size='small'
                    value={selectedDueDate}
                    onChange={(date) => {
                      setSelectedDueDate(date.target.value)
                    }}
                  />
                </RangeDatePickerContainer>
                <Dropdown
                  onChange={(e) => {
                    setSelectedUpdateStatus(e.target.value);
                  }}
                  options={[
                    {
                      text: "N/A",
                      value: ""
                    },
                    {
                      text: "New",
                      value: "New"
                    },
                    {
                      text: "Update",
                      value: "Update"
                    },
                  ]}
                  value={selectedUpdateStatus}
                  multiselect={true}
                  showSearch={false}
                  placeholder='All Status'
                  label="Update Status"
                  style={{
                    width: '100%'
                  }}
                />
                <Dropdown
                  onChange={(e) => {
                    setSelectedDisputed(e.target.value);
                  }}
                  options={[
                    {
                      text: "N/A",
                      value: ""
                    },
                    {
                      text: "dispute",
                      value: "dispute"
                    },
                    {
                      text: "updated",
                      value: "updated"
                    },
                  ]}
                  value={selectedDisputed}
                  multiselect={true}
                  showSearch={false}
                  placeholder='All'
                  label="Disputed"
                  style={{
                    width: '100%'
                  }}
                />
              </DropFilterContainer>
            ),
            applyFunc: applyFunc,
            resetFunc: resetFunc,
          }}
          onChangeFilter={setFilter}
          pagination={{
            ...pagination,
            totalItems: invoicesJSON.total,
            totalPages: Math.ceil(invoicesJSON.total / pagination.rowsPerPage),
          }}
          onChangePagination={setPagination}
          sortOptions={sortOptions}
          onChangeSort={setSortOptions}
        />
      </Box>
    </DashboardLayoutContainer>
  );
};

const DropFilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  * {
    box-sizing: border-box;
  }
`;

const RangeDatePickerContainer = styled.div`
  display: flex;
  max-width: 100%;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  width: 100%;
  * {
    box-sizing: border-box;
  }
  & > div {
    width: 100% !important;
  }
  
  .ui-kit-input-body {
    width: 278px;
  }
`