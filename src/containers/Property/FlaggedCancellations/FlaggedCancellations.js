import React, { useCallback, useEffect, useState } from 'react';
import { DashboardLayoutContainer } from 'components/Layouts/DashboardLayout';
import { Box } from '@mui/material';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown } from '@leapeasy/ui-kit';
import { useNavigate } from 'react-router-dom';
import { getPolicyCancelAction } from 'store/actions/propertyActions';
import { openDetails } from 'store/actions/uiActions';
import { FlaggedCancellationTable } from 'components/Tables/FlaggedCancellation';

export const FlaggedCancellations = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [filter, setFilter] = useState({
    options: {},
    searchText: '',
    searchPlaceholder: 'Search ...',
  });
  const [selectedFlg, setSelectedFlg] = useState([]);
  const [selectedAppType, setSelectedAppType] = useState([]);
  const [selectedPolicyStatus, setSelectedPolicyStatus] = useState([]);

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

  const flaggedCancellations = useSelector((state) => state.getIn(['property', 'policy-cancel']));

  useEffect(() => {
    dispatch(
      getPolicyCancelAction({
        filter: {
          ...filter,
          selectedLeaseDate: {},
          selectedFlg,
          selectedAppType,
          selectedPolicyStatus
        },
        offset: pagination.pageNumber * pagination.rowsPerPage,
        limit: pagination.rowsPerPage,
      }),
    );
  }, [filter, pagination, sortOptions]);

  const POLICYFLAG = [
    {
      text: "None",
      value: ''
    },
    {
      text: "Green",
      value: 'green'
    },
    {
      text: "Red",
      value: 'red'
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
  const POLICY_STATUS = [
    {
      text: "Active",
      value: "FALSE",
    },
    {
      text: "Cancelled",
      value: "TRUE",
    },
  ]

  const onClickCancelPolicies = useCallback((flaggedCancellation) => {
    // dispatch(
    //   openDetails({
    //     type: 'flagged-cancellation',
    //     data: flaggedCancellation,
    //   }),
    // );
  }, []);

  const applyFunc = () => {

  }
  const resetFunc = () => {

  }

  if (!flaggedCancellations) return <DashboardLayoutContainer />;

  const flaggedCancellationsJSON = flaggedCancellations.toJS();

  return (
    <DashboardLayoutContainer>
      <Box>
        <FlaggedCancellationTable
          flaggedCancellations={flaggedCancellationsJSON.data}
          filter={filter}
          onChangeFilter={setFilter}
          pagination={{
            ...pagination,
            totalItems: flaggedCancellationsJSON.total,
            totalPages: Math.ceil(flaggedCancellationsJSON.total / pagination.rowsPerPage),
          }}
          dropFilter={{
            component: (
              <DropFilterContainer>
                <Dropdown
                  onChange={(e) => {
                    setSelectedFlg(e.target.value);
                  }}
                  options={[...POLICYFLAG]}
                  value={selectedFlg}
                  multiselect={true}
                  showSearch={false}
                  placeholder='All Flags'
                  placeholderFlag={false}
                  label="Flags"
                  style={{
                    width: '100%'
                  }}
                />

                <Dropdown
                  onChange={(e) => {
                    setSelectedPolicyStatus(e.target.value);
                  }}
                  options={[...POLICY_STATUS]}
                  value={selectedPolicyStatus}
                  multiselect={true}
                  showSearch={false}
                  placeholder='All Types'
                  placeholderFlag={false}
                  label="Policy Status"
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
                  placeholder='All Types'
                  placeholderFlag={true}
                  label="Application Type"
                  style={{
                    width: '100%'
                  }}
                />
              </DropFilterContainer>
            ),
            applyFunc: applyFunc,
            resetFunc: resetFunc
          }}
          onChangePagination={setPagination}
          sortOptions={sortOptions}
          onChangeSort={setSortOptions}
          onClickCancelPolicies={onClickCancelPolicies}
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
