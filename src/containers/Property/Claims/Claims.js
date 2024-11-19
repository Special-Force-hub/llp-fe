import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';

import { DashboardLayoutContainer } from 'components/Layouts/DashboardLayout';

import { getClaimAction } from 'store/actions/propertyActions';
import { openDetails } from 'store/actions/uiActions';

import { ClaimTable } from 'components/Tables/ClaimTable';
import { Dropdown, Loading } from '@leapeasy/ui-kit';

export const Claims = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [filter, setFilter] = useState({
    options: {},
    searchText: '',
    searchPlaceholder: 'Search Claims..',
  });
  const [selectedFileStatus, setSelectedFileStatus] = useState([]);
  const [selectedAppType, setSelectedAppType] = useState([]);

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

  const claims = useSelector((state) => state.getIn(['property', 'claim']));

  const handleDispatch = () => {
    dispatch(
      getClaimAction({
        filter: {
          ...filter,
          selectedFileStatus,
          selectedAppType
        },
        offset: pagination.pageNumber * pagination.rowsPerPage,
        limit: pagination.rowsPerPage,
        sortOptions
      }),
    );
  }

  useEffect(() => {
    handleDispatch()
  }, [filter, pagination, sortOptions]);

  const onClickClaim = useCallback((claim) => {
    dispatch(
      openDetails({
        type: 'claim',
        data: claim,
      }),
    );

    setTimeout(() => {
      navigate('/property/claims/detail');
    });
  }, []);

  const claimsJSON = claims && claims.toJS();

  const applyFunc = () => {
    handleDispatch();
  }

  const resetFunc = () => {
    setSelectedFileStatus([]);
    setSelectedAppType([]);
  }


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

  const CLAIM_FILE_STATUS = [
    {
      value: "",
      text: 'N/A',
    },
    {
      value: 'Closed - Partial denial',
      text: 'Closed - Partial denial',
    },
    {
      value: 'Closed Claim - Duplicate',
      text: 'Closed Claim - Duplicate',
    },
    {
      value: 'Incident Only',
      text: 'Incident Only',
    },
    {
      value: 'Closed - Claim Paid',
      text: 'Closed - Claim Paid',
    },
    {
      value: 'Closed - Claim Denied',
      text: 'Closed - Claim Denied',
    },
    {
      value: 'Open Claim - Test Claim',
      text: 'Open Claim - Test Claim',
    },
    {
      value: 'Open - Pending Payment',
      text: 'Open - Pending Payment',
    },
    {
      value: 'Closed Claim - Inactive',
      text: 'Closed Claim - Inactive',
    },
    {
      value: 'Open - Pending Decision',
      text: 'Open - Pending Decision',
    },
    {
      value: 'Closed - Incident Only',
      text: 'Closed - Incident Only',
    },
  ]

  return (
    <DashboardLayoutContainer>
      {
        claims ? (
          <Box>
            <ClaimTable
              claims={claimsJSON.data}
              filter={filter}
              dropFilter={{
                component: (
                  <DropFilterContainer>
                    <Dropdown
                      onChange={(e) => {
                        setSelectedFileStatus(e.target.value);
                      }}
                      options={[...CLAIM_FILE_STATUS]}
                      value={selectedFileStatus}
                      multiselect={true}
                      showSearch={false}
                      placeholder={'Select item'}
                      placeholderFlag={true}
                      label={"File Status"}
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
                  </DropFilterContainer>
                ),
                applyFunc: applyFunc,
                resetFunc: resetFunc,
              }}
              onChangeFilter={setFilter}
              pagination={{
                ...pagination,
                totalItems: claimsJSON.total,
                totalPages: Math.ceil(claimsJSON.total / pagination.rowsPerPage),
              }}
              onChangePagination={setPagination}
              sortOptions={sortOptions}
              onChangeSort={setSortOptions}
              onClickClaim={onClickClaim}
            />
          </Box>
        ) : <Loading size={'large'} />
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
