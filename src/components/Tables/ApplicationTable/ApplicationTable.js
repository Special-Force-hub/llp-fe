import { IconGraphy, Loading, Table } from '@leapeasy/ui-kit';
import { Badge } from '@leapeasy/ui-kit';
import React, { useState, useEffect, useMemo, useReducer } from 'react';
import { useSelector } from 'react-redux';
import { getDemoData } from 'utils/helpers';
import { Box } from '@mui/material';
import styled from 'styled-components';
import { setDocTitleAction, setDocFileAction } from 'store/actions/documentActions';
import { call } from 'redux-saga/effects';

export const ApplicationTable = ({
  applications,
  filter,
  dropFilter,
  onChangeFilter,
  pagination,
  onChangePagination,
  sortOptions,
  onChangeSort,
  onClickApplication,
  shouldShowBuildingName = true,
}) => {
  const [tableData, setTableData] = useState([]);
  const isDemo = useSelector((state) => state.getIn(['ui', 'demo']));
  const [flgRow, setFlgRow] = useState(-1);

  useEffect(() => {
    const data = [];
    if (applications) {
      applications.forEach((app) => {
        const record = [
          app.stage,
          app.app_type,
          isDemo ? getDemoData('building-name') : app.apartment_building_name,
          isDemo ? getDemoData('rider-id') : app.rider_id,
          isDemo ? getDemoData('tenant-name') : app.tenant_1_name,
          app.gross_monthly_rent ? '$' + parseFloat(app.gross_monthly_rent) : 0,
          new Date(app.sf_createdDate).toISOString().slice(0, 10),
          app.lease_start_date,
          app.lease_end_date,
          app.active_lease,
          app.total_number_of_tenants,
          '',
          app.id,
        ];
        if (!shouldShowBuildingName) {
          record.splice(2, 1);
        }
        data.push(record);
      });
      setTableData(data);
    }
  }, [applications, isDemo, shouldShowBuildingName]);

  const goDetailPage = (tableMeta) => {
    const selectedApplication = applications.find(
      (application) => application.id === tableMeta[tableMeta.length - 1],
    );

    if (selectedApplication) {
      onClickApplication(selectedApplication);
    }
  };
  
  useEffect(() => {
    console.log("tableData: ", tableData)
  }, tableData)

  useEffect(() => {
    window.addEventListener('click', (e) => {
      if (e.target && e.target.className && typeof e.target.className === 'string') {
        if (!e.target.className.includes('actions')) {
          setFlgRow(-1)
        }
      }
    })
  }, [])

  const APP_TYPES = [
    {
      value: '',
      label: 'Null',
    },
    {
      value: 'Auto Enroll',
      label: 'AE'
    },
    {
      value: 'LDR',
      label: 'LDR'
    },
    {
      value: 'LDR Commercial',
      label: 'LDR-C'
    },
    {
      value: 'Rent Guaranty',
      label: 'RG'
    }
  ]

  const STAGE = [
    {
      value: '00 - Entrata',
      label: '0 Entra',
    },
    {
      value: '01 - Tenant Evaluation',
      label: '1 Eva',
    },
    {
      value: '02A - Final Review',
      label: '2A FR',
    },
    {
      value: '02 - Document Verification and Onboarding',
      label: '2 Onboard',
    },
    {
      value: '04 - Agreement Signed',
      label: '4 Signed',
    },
    {
      value: '05 - Policy Issued',
      label: '5 Issued',
    },
    {
      value: '06 - Policy Declined',
      label: '6 Declined',
    },
    {
      value: 'Cancelled Application',
      label: '6 Cancelled',
    },
    {
      value: 'Duplicate Application',
      label: '7 Duplicate',
    },
    {
      value: 'Policy Fully Refunded',
      label: 'Refunded',
    },
  ]


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
      title="Applications"

      columns={[
        {
          name: 'Stage',
          options: {
            flex: '140px 1 1',
            filter: true,
            filterOptions: [
              {
                text: '1',
                value: 1,
              },
              {
                text: '2',
                value: 2,
              },
            ],
            customBodyRenderer: (value) => (
              <Box textAlign="center">
                <Badge background="#F3F1F4" color="sunglow" label={STAGE.filter(stage => stage.value === value)[0].label} rounded textSize="medium" />
              </Box>
            ),
          },
          key: 'stage',
        },
        {
          name: 'Type',
          flex: '42px 1 1',
          options: {
            customBodyRenderer: (value) =>
              value && (
                <Box textAlign="center">
                  <Badge
                    background="#F3F1F4"
                    color="warmBlue"
                    label={APP_TYPES.filter(app => app.value === value)[0].label}
                    rounded
                    textSize="medium"
                  />
                </Box>
              ),
          },
          key: 'type',
        },
        {
          name: 'Building Name',
          options: {
            flex: '180px 1 1',
            sort: true,
          },
          key: 'apartment_building_name',
        },
        {
          name: 'Policy ID',
          options: {
            flex: '110px 1 1',
            sort: true,
          },
          key: 'rider_id',
        },
        {
          name: 'Name',
          key: 'name',
          options: {
            sort: true
          },
        },
        {
          name: 'Rent/M',
          key: 'rent',
          options: {},
        },
        {
          name: 'Create date',
          key: 'sf_createdDate',
          options: {
            sort: true
          },
        },
        {
          name: 'L/Start Date',
          options: {
            filter: true,
            sort: true,
            filterOptions: [
              {
                date: '1',
                value: 1,
              },
              {
                text: '2',
                value: 2,
              },
            ],
          },
          key: 'lease_start_date',
        },
        {
          name: 'L/End Date',
          options: {
            filter: true,
            sort: true,
            filterOptions: [
              {
                text: '1',
                value: 1,
              },
              {
                text: '2',
                value: 2,
              },
            ],
          },
          key: 'lease_end_date',
        },
        {
          name: 'L/Active',
          options: {
            filter: false,
            filterOptions: [],
            customBodyRenderer: (value) => (
              <Badge
                background="#F3F1F4"
                color="parisGreen"
                label={value}
                rounded
                textSize="medium"
              />
            ),
          },
          key: 'active_lease',
        },
        {
          name: 'Tenants',
          options: {
            flex: '40px 1 1',
            filter: true,
            filterOptions: [
              {
                text: '1',
                value: 1,
              },
              {
                text: '2',
                value: 2,
              },
            ],
          },
          key: 'tenants',
        },
        {
          name: 'Detail',
          options: {
            flex: '57px 1 1',
            sort: false,
            customBodyRenderer: (_, tableMeta) => (
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
            flex: '57px 1 1',
            sort: true,
            customBodyRenderer: (row, data) => (
              <React.Fragment>
                <DetailContainer className='actions' onClick={() => {
                  setFlgRow(row);
                }}>
                  <IconGraphy
                    icon={'EditorLayout.MoreVert'}
                    style={{ color: '#702572' }}

                  />
                </DetailContainer>
                {
                  flgRow === row && (
                    <TdDiv>
                      <div>
                        <IconGraphy icon='FileFolder.EditDocument' />
                        <span>File a claim</span>
                      </div>

                      <div>
                        <IconGraphy icon='FileFolder.SimCardDownload' />
                        <span>Download Insurance</span>
                      </div>
                    </TdDiv>
                  )
                }
              </React.Fragment>
            )
          },
          key: 'actions',
        },
      ]}
    />
  );
};


const TdDiv = styled.div`
  position: absolute;
  width: 220px;
  top: 0%;
  right: 60px;
  padding: 8px;
  border-radius: 12px;
  z-index: 1;
  background-color: white;
  box-shadow: 0px 1px 3px 0px #5A5E6B1A;

  display: flex;
  flex-direction: column;
  gap: 8px;
  color: #2E0F40;
  font-size: 14px;
  font-weight: 500 !important;
  * {
    box-sizing: border-box;
  }
  & > div {
    padding: 10px 4px;
    width: 100%;
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 10px;
  }

  & > div:hover {
    background-color: #f9f8f9;
  }

`

const DetailContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`