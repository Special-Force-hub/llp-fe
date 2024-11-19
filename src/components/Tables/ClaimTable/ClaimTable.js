import { IconGraphy, Table } from '@leapeasy/ui-kit';
import { Typography, Badge, Tooltip } from '@leapeasy/ui-kit';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Box } from '@mui/material';
import { getDemoData } from 'utils/helpers';

const BADGE_CLAIM_FILE_STATUS = [
  {
    value: "",
    badge: 'Open',
  },
  {
    value: 'Closed - Partial denial',
    badge: 'Closed',
  },
  {
    value: 'Closed Claim - Duplicate',
    badge: 'Duplicated',
  },
  {
    value: 'Incident Only',
    badge: 'Incident Only',
  },
  {
    value: 'Closed - Claim Paid',
    badge: 'Paid',
  },
  {
    value: 'Closed - Claim Denied',
    badge: 'Denied',
  },
  {
    value: 'Open Claim - Test Claim',
    badge: 'Test',
  },
  {
    value: 'Open - Pending Payment',
    badge: 'Pending',
  },
  {
    value: 'Closed Claim - Inactive',
    badge: 'Inactive',
  },
  {
    value: 'Open - Pending Decision',
    badge: 'Pending',
  },
  {
    value: 'Closed - Incident Only',
    badge: '',
  },
]

const APP_TYPES = [
  {
    value: '',
    label: 'GWP',
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

export const ClaimTable = ({
  claims,
  filter,
  dropFilter,
  onChangeFilter,
  pagination,
  onChangePagination,
  sortOptions,
  onChangeSort,
  onClickClaim,
}) => {
  const [tableData, setTableData] = useState([]);
  const isDemo = useSelector((state) => state.getIn(['ui', 'demo']));

  useEffect(() => {
    const data = [];
    if (claims) {
      claims.forEach((claim) => {
        data.push([
          claim.claim_status,
          claim.claim_file_status,
          claim.claim_name,
          claim.app_type,
          isDemo ? getDemoData('rider-id') : claim.rider_id,
          isDemo ? getDemoData('account-name') : claim.account_name,
          isDemo ? getDemoData('tenant-name') : claim.tenant1,
          claim.monthly_rent ? parseFloat(claim.monthly_rent) : 0,
          claim.rider_damage_coverage_amount ? parseFloat(claim.rider_damage_coverage_amount) : 0,
          claim.total_indemnity_payments ? parseFloat(claim.total_indemnity_payments) : 0,
          claim.bond_issue_date,
          isDemo ? getDemoData('landlord-name') : claim.landlord_name,
          '',
        ]);
      });
      setTableData(data);
    }
  }, [claims, isDemo]);

  const goDetailPage = (tableMeta) => {
    const selectedClaim = claims.find((claim) => claim.id === tableMeta[tableMeta.length - 1]);

    if (selectedClaim) {
      onClickClaim(selectedClaim);
    }
  };

  return (
    <Table
      columns={[
        {
          name: 'Status',
          options: {
            flex: '85px 1 1',
            customBodyRenderer: (value) => (
              <Badge
                background="rgba(243, 241, 244, 1)"
                color={value != 'Closed' ? 'parisGreen' : 'tomato'}
                label={value}
                rounded
                textSize="medium"
              />
            ),
          },
          key: 'claim_status',
        },
        {
          name: 'File Status',
          options: {
            flex: '120px 1 1',
            filter: true,
            customBodyRenderer: (value) => (
              <Box textAlign="center">
                <Badge
                  background="#F3F1F4"
                  color={value == 'Open - Pending Decision' ? 'sunglow' : 'neutral'}
                  label={BADGE_CLAIM_FILE_STATUS.filter((item) => item.value === value)[0].badge}
                  rounded
                  textSize="medium"
                />
              </Box>
            ),
          },
          key: 'claim_file_status',
        },
        {
          name: 'Claim Num.',
          options: {
            flex: '80px 1 1',
            sort: true,
          },
          key: 'claim_name',
        },
        {
          name: 'AppType',
          options: {
            flex: '80px 1 1',
            customBodyRenderer: (value) => (
              <Box textAlign="center">
                <Badge
                  background="rgba(243, 241, 244, 1)"
                  color="purpleIrish"
                  label={APP_TYPES.filter((item) => item.value === value)[0].label}
                  rounded
                  textSize="medium"
                />
              </Box>
            ),
          },
          key: 'app_type',
        },
        {
          name: 'Policy ID',
          options: {
            sort: true,
          },
          key: 'rider_id',
        },
        {
          name: 'Account',
          options: {
            filter: false,
            customBodyRender: (value) => (
              <Typography align="center" variant="body1">
                {value}
              </Typography>
            ),
          },
          key: 'account_name',
        },
        {
          name: 'Tenant',
          options: {
            sort: true,
            filterOptions: [
              {
                text: 'true',
                value: 'true',
              },
              {
                text: 'false',
                value: 'false',
              },
            ],
          },
          key: 'tenant1',
        },
        {
          name: 'Rent/M',
          options: {
            customBodyRender: (value) => (
              <Typography align="center" variant="body1">
                {value}
              </Typography>
            ),
          },
          key: 'monthly_rent',
        },
        {
          name: 'T.Coverage',
          options: {
            sort: true,
          },
          key: 'rider_damage_coverage_amount',
        },
        {
          name: 'T.Indemnity',
          options: {
            sort: true,
          },
          key: 'total_indemnity_payments',
        },
        {
          name: 'B.Issue Date',
          options: {
            sort: true,
          },
          key: 'bond_issue_date',
        },
        {
          name: 'Landlord ',
          options: {
            sort: true,
          },
          key: 'landlord_name',
        },
        {
          name: '',
          options: {
            flex: '40px 1 1',
            sort: true,
            customBodyRenderer: (value, tableMeta) => (
              <IconGraphy
                icon={'FileFolder.Description'}
                style={{ color: '#702572' }}
                onClick={() => goDetailPage(tableMeta)}
              />
            ),
          },
          key: '',
        },
      ]}
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
      title="Claims"
    />
  );
};
