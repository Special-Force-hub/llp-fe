import { IconGraphy, Table } from '@leapeasy/ui-kit';
import { Typography, Badge, Tooltip } from '@leapeasy/ui-kit';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getDemoData } from 'utils/helpers';

export const ClaimsTable = ({
  claims,
  filter,
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
      console.log('data:', data);
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
            flex: '45px 1 1',
            customBodyRenderer: (value) => (
              <Badge
                background="rgba(243, 241, 244, 1)"
                color={(value != 'Closed' ? 'parisGreen' : 'tomato')}
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
            filter: true,
            customBodyRenderer: (value) => (
              <Badge
                background="rgba(243, 241, 244, 1)"
                color={value == 'Open - Pending Decision' ? 'sunglow' : 'neutral'}
                label={value}
                rounded
                textSize="medium"
              />
            ),
            filterOptions: [
              {
                text: 'N/A',
                value: '',
              },
              {
                text: 'Closed - Claim Denied',
                value: '',
              },
              {
                text: 'Closed - Claim Paid',
                value: '',
              },
              {
                text: 'Closed - Incident Only',
                value: '',
              },
              {
                text: 'Closed - Partial Denial',
                value: '',
              },
            ],
            sort: true,
          },
          key: 'claim_file_status',
        },
        {
          name: 'Claim Num.',
          options: {
            flex: '80px 1 1',
            
            sort: true,
            filter: true,
            filterOptions: [
              {
                text: '1',
                value: '',
              },
              {
                text: '2',
                value: '',
              },
            ],
          },
          key: 'claim_name',
        },
        {
          name: 'App. Type',
          options: {
            sort: true,
            flex: '80px 1 1',
            customBodyRenderer: (value) => (
              <Badge
                background="rgba(243, 241, 244, 1)"
                color='purpleIrish'
                label={value}
                rounded
                textSize="medium"
              />
            ),
            filter: true,
            filterOptions: [
              {
                text: '1',
                value: '',
              },
              {
                text: '2',
                value: '',
              },
            ],
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
            sort: true,
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
            sort: true,
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
          key: 'landlord',
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
