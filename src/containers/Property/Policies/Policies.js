import { DashboardLayoutContainer } from 'components/Layouts/DashboardLayout';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Box } from '@mui/material';
import {
  getPolicyAction,
  // getFilteredDataAction,
  // setBuildingAction,
} from 'store/actions/propertyActions';
import { PolicyTable } from 'components/Tables/PolicyTable';
import { Dropdown, DatePickerInput, Loading } from '@leapeasy/ui-kit';

export const Policies = (props) => {
  const dispatch = useDispatch();
  const [selectedAppType, setSelectedAppType] = useState([]);
  const [selectedLeaseDate, setSelectedLeaseDate] = useState({
    startDate: null,
    endDate: null,
  })
  const [selectedTenantCount, setSelectedTenantCount] = useState([]);
  const [activeLease, setActiveLease] = useState([]);
  const [filter, setFilter] = useState({
    options: {},
    searchText: '',
    searchPlaceholder: 'Search Policy..',
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

  const handleDispatch = () => {
    dispatch(
      getPolicyAction({
        filter: {
          ...filter,
          selectedAppType,
          selectedLeaseDate,
          selectedTenantCount,
          activeLease,
        },
        offset: pagination.pageNumber * pagination.rowsPerPage,
        limit: pagination.rowsPerPage,
        sortOptions,
      }),
    );
  }

  useEffect(() => {
    handleDispatch()
  }, [filter, pagination, sortOptions]);


  const policies = useSelector((state) => state.getIn(['property', 'policy']));
  const policiesJSON = policies && policies.toJS();
  const APPTYPE = [
    {
      text: 'Guarantor Waiver Program',
      value: ''
    },
    {
      text: 'Event Process',
      value: 'Auto Enroll'
    },
    {
      text: 'LDR',
      value: 'LDR'
    },
    {
      text: 'LDR Commercial',
      value: 'LDR Commercial'
    },
    {
      text: 'Rent Guaranty',
      value: 'Rent Guaranty'
    }
  ]

  const resetFunc = () => {
    setSelectedAppType([]);
    setSelectedLeaseDate({
      startDate: null,
      endDate: null,
    })
    setSelectedTenantCount([]);
    setActiveLease([]);
  }
  const applyFunc = () => {
    handleDispatch()
  }


  return (
    <DashboardLayoutContainer>
      {
        policies ? (
          <Box>
            <PolicyTable
              policies={policiesJSON.data}
              filter={filter}
              onChangeFilter={setFilter}
              pagination={{
                ...pagination,
                totalItems: policiesJSON.total,
                totalPages: Math.ceil(policiesJSON.total / pagination.rowsPerPage),
              }}
              dropFilter={{
                component: (
                  <DropFilterContainer>
                    <Dropdown
                      onChange={(e) => {
                        setSelectedAppType(e.target.value);
                      }}
                      options={[...APPTYPE]}
                      value={selectedAppType}
                      multiselect={true}
                      showSearch={false}
                      placeholder='Select item'
                      placeholderFlag={true}
                      label="Application Type"
                      style={{
                        width: '100%'
                      }}
                    />

                    <RangeDatePickerContainer>
                      <DatePickerInput
                        label={'Lease State Date'}
                        size='small'
                        value={selectedLeaseDate.startDate}
                        maxDate={selectedLeaseDate.endDate}
                        onChange={(date) => {
                          setSelectedLeaseDate((prev) => ({
                            ...prev,
                            startDate: date.target.value,
                          }));
                        }}
                      />
                      <DatePickerInput
                        label={'Lease End Date'}
                        size='small'
                        value={selectedLeaseDate.endDate}
                        minDate={selectedLeaseDate.startDate}
                        onChange={(date) => {
                          setSelectedLeaseDate((prev) => ({
                            ...prev,
                            endDate: date.target.value,
                          }))
                        }}
                      />
                    </RangeDatePickerContainer>

                    <Dropdown
                      onChange={(e) => {
                        setSelectedTenantCount(e.target.value)
                      }}
                      options={[{ value: '', text: 'None' }, ...new Array(4).fill('').map((_, index) => ({ value: (index + 1).toString(), text: (index + 1).toString() }))]}
                      value={selectedTenantCount}
                      multiselect={true}
                      showSearch={false}
                      placeholder=''
                      placeholderFlag={false}
                      label="Total Tenant"
                      style={{
                        width: '100%'
                      }}
                    />
                    <Dropdown
                      onChange={(e) => {
                        setActiveLease(e.target.value)
                      }}
                      options={[
                        {
                          text: 'False',
                          value: 'false'
                        },
                        {
                          text: 'True',
                          value: 'true'
                        },
                      ]}
                      value={activeLease}
                      multiselect={true}
                      showSearch={false}
                      placeholder=''
                      label="Actice Lease"
                      style={{
                        width: '100%'
                      }}
                    />
                  </DropFilterContainer>
                ),
                resetFunc: resetFunc,
                applyFunc: applyFunc
              }}
              onChangePagination={setPagination}
              sortOptions={sortOptions}
              onChangeSort={setSortOptions}
              onClickPolicy={() => { }}
            />
          </Box>
        ) : (
          <Loading size={'large'} label={''} />
        )
      }
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
  * {
    box-sizing: border-box;
  }
  & > div {
    width: 50% !important;
  }

  .ui-kit-input-body {
    width: 60%;
  }
`