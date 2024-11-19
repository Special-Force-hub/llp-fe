import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { DashboardLayoutContainer } from 'components/Layouts/DashboardLayout';
import { Box } from '@mui/material';
import {
  getFilteredDataAction,
  searchDBAction,
  getAppAction,
  setAppAction,
} from 'store/actions/propertyActions';
import { APP_STAGE, APP_TYPE } from 'data/constants/common_constants';

import { useNavigate } from 'react-router-dom';
import { ApplicationTable } from 'components/Tables/ApplicationTable';
import { openDetails } from 'store/actions/uiActions';
import { DatePickerInput, Dropdown, Loading } from '@leapeasy/ui-kit';

export const Applications = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [filter, setFilter] = useState({
    options: {},
    searchText: '',
    searchPlaceholder: 'Search Application..',
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

  // Dropdown filter varailbles
  const [selectedStage, setSelectedStage] = useState([]);
  const [selectedAppType, setSelectedAppType] = useState([]);
  const [selectedLeaseDate, setSelectedLeaseDate] = useState({
    startDate: null,
    endDate: null,
  })
  const [selectedTenantCount, setSelectedTenantCount] = useState([]);

  const applications = useSelector((state) => state.getIn(['property', 'application']));

  const handleDispatch = () => {
    dispatch(
      getAppAction({
        filter: {
          ...filter,
          selectedStage,
          selectedAppType,
          selectedLeaseDate,
          selectedTenantCount,
        },
        sortOptions,
        offset: pagination.pageNumber * pagination.rowsPerPage,
        limit: pagination.rowsPerPage,
      }),
    );
  }

  useEffect(() => {
    handleDispatch()
  }, [filter, pagination, sortOptions]);

  const onClickApplication = useCallback((application) => {
    dispatch(
      openDetails({
        type: 'application',
        data: application,
      }),
    );

    setTimeout(() => {
      navigate('/property/applications/detail');
    });
  }, []);

  const applicationsJSON = applications && applications.toJS();

  const resetFunc = () => {
    setSelectedStage([]);
    setSelectedAppType([]);
    setSelectedLeaseDate({
      startDate: null,
      endDate: null,
    })
    setSelectedTenantCount([]);
  }
  const applyFunc = () => {
    handleDispatch()
  }

  const STAGE = [
    {
      value: '00 - Entrata',
      text: 'Entrata',
    },
    {
      value: '01 - Tenant Evaluation',
      text: 'Tenant Evaluation',
    },
    {
      value: '02A - Final Review',
      text: 'Final Review',
    },
    {
      value: '02 - Document Verification and Onboarding',
      text: 'Verification & Onboarding',
    },
    {
      value: '04 - Agreement Signed',
      text: '4 Signed',
    },
    {
      value: '05 - Policy Issued',
      text: 'Policy Issued',
    },
    {
      value: '06 - Policy Declined',
      text: 'Policy Declined',
    },
    {
      value: 'Cancelled Application',
      text: 'Cancelled Application',
    },
    {
      value: 'Duplicate Application',
      text: 'Duplication Application',
    },
    {
      value: 'Policy Fully Refunded',
      text: 'Policy Fully Refuneded',
    },
  ]
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

  return (
    <DashboardLayoutContainer>
      {
        applications ? (
          <Box>
            <ApplicationTable
              applications={applicationsJSON.data}
              filter={filter}
              onChangeFilter={setFilter}
              pagination={{
                ...pagination,
                totalItems: applicationsJSON.total,
                totalPages: Math.ceil(applicationsJSON.total / pagination.rowsPerPage),
              }}
              dropFilter={{
                component : (
                  <DropFilterContainer>
                    <Dropdown
                      onChange={(e) => {
                        setSelectedStage(e.target.value);
                      }}
                      options={[...STAGE]}
                      value={selectedStage}
                      multiselect={true}
                      showSearch={false}
                      placeholder='Select item'
                      placeholderFlag={true}
                      label="Stage of Application"
                      style={{
                        width: '100%'
                      }}
                    />
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
                      options={[{value: '', text: 'None'}, ...new Array(4).fill('').map((_, index) => ({value: (index+1).toString(), text: (index+1).toString()}))]}
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
                  </DropFilterContainer>
                ),
                resetFunc: resetFunc,
                applyFunc: applyFunc
              }}
              onChangePagination={setPagination}
              sortOptions={sortOptions}
              onChangeSort={setSortOptions}
              onClickApplication={onClickApplication}
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