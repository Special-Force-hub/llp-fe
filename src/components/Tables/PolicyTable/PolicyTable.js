import { useNavigate } from 'react-router-dom';
import { IconGraphy, Table } from '@leapeasy/ui-kit';
import { Typography, Badge } from '@leapeasy/ui-kit';
import { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { getDemoData } from 'utils/helpers';

export const PolicyTable = ({
  policies,
  filter,
  onChangeFilter,
  pagination,
  onChangePagination,
  sortOptions,
  onChangeSort,
  onClickPolicy,
  shouldShowBuildingName = true,
}) => {
  const [tableData, setTableData] = useState([]);
  const isDemo = useSelector((state) => state.getIn(['ui', 'demo']));

  useEffect(() => {
    const data = [];
    if (policies) {
      policies.forEach((policy) => {
        const record = [
          policy.stage,
          policy.app_type,
          isDemo ? getDemoData('building-name') : policy.apartment_building_name,
          isDemo ? getDemoData('rider-id') : policy.rider_id,
          isDemo ? getDemoData('tenant-name') : policy.tenant_1_name,
          policy.gross_monthly_rent ? parseFloat(policy.gross_monthly_rent) : 0,
          new Date(policy.sf_createdDate).toISOString().slice(0, 10),
          policy.lease_start_date,
          policy.lease_end_date,
          policy.active_lease,
          policy.total_number_of_tenants,
          policy.stage,
          policy.id,
        ];

        if (!shouldShowBuildingName) {
          record.splice(2, 1);
        }

        data.push(record);
      });

      setTableData(data);
    }
  }, [policies, isDemo, shouldShowBuildingName]);

  const goDetailPage = (tableMeta) => {
    const selectedPolicy = policies.find((policy) => policy.id === tableMeta[tableMeta.length - 1]);

    if (selectedPolicy) {
      onClickPolicy(selectedPolicy);
    }
  };

  const columns = useMemo(() => {
    const columns = [
      {
        name: 'Stage',
        options: {
          flex: '40px 1 1',
          customBodyRenderer: (value) => (
            <Badge
              color={value ? 'sunglow' : 'tomato'}
              label={!value ? 'undefined' : '2 issued'}
              rounded
              textSize="medium"
            />
          ),
          sort: true,
        },
        key: 'stage',
      },
      {
        name: 'A. Type',
        options: {
          flex: '30px 1 1',
          filter: true,
          customBodyRenderer: (value) => (
            <Badge
              color={value ? 'purpleIrish' : 'tomato'}
              label={
                !value
                  ? 'undefined'
                  : value == 'Auto Enroll'
                    ? 'AE'
                    : value == 'Event Process'
                      ? 'EP'
                      : 'AE EP'
              }
              rounded
              textSize="medium"
            />
          ),

          filterOptions: [
            {
              text: 'Auto Enroll',
              value: 'Auto Enroll',
            },
            {
              text: 'Event Process',
              value: 'Event Process',
            },
            {
              text: 'Event Process;Auto Enroll',
              value: 'Event Process;Auto Enroll',
            },
          ],
          sort: true,
        },
        key: 'app_type',
      },
      {
        name: 'Building Name',
        options: {
          sort: true,
        },
        key: 'building_name',
      },
      {
        name: 'Policy ID',
        options: {
          sort: true,
        },
        key: 'rider_id',
      },
      {
        name: 'Name',
        options: {
          sort: true,
        },
        key: 'tenant_name',
      },
      {
        name: 'Rent /M',
        options: {
          flex: '15px 1 1',
          sort: true,
          customBodyRenderer: (value) => (
            <Typography align="center" variant="body2">
              ${value.toLocaleString('en-US')}
            </Typography>
          ),
        },
        key: 'monthly_rent',
      },
      {
        name: 'Create date',
        options: {
          flex: '80px 1 1',
          sort: true,
        },
        key: 'create_date',
      },
      {
        name: 'L/Start Date',
        options: {
          flex: '80px 1 1',
          sort: true,
        },
        key: 'lease_start_date',
      },
      {
        name: 'L/End Date',
        options: {
          flex: '80px 1 1',
          sort: true,
        },
        key: 'lease_end_date',
      },
      {
        name: 'Active/L',
        options: {
          flex: '30px 1 1',
          filter: true,
          sort: true,
          customBodyRenderer: (value) => (
            <Badge
              // background="#F3F1F4"
              color={value == 'true' ? 'parisGreen' : 'tomato'}
              label={value == 'true' ? 'True' : 'False'}
              rounded
              textSize="medium"
            />
          ),
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
        key: 'active_lease',
      },
      {
        name: 'Tenant',
        options: {
          flex: '30px 1 1',
          sort: true,
          filter: true,
          filterOptions: [
            {
              text: "1",
              value: "1"
            },
            {
              text: "2",
              value: "2"
            },
            {
              text: "3",
              value: "3"
            },
          ]
        },
        key: 'total_number_of_tenants',
      },
      {
        name: 'Detail',
        options: {
          flex: '5px 1 1',
          sort: true,
          customBodyRenderer: (value, tableMeta) => (
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
          flex: '5px 1 1',
          sort: true,
          customBodyRenderer: () => (
            <IconGraphy
              icon={'EditorLayout.MoreVert'}
              style={{ color: '#702572', text_align: 'center' }}
            />
          ),
        },
        key: 'more',
      },
    ];

    if (!shouldShowBuildingName) {
      columns.splice(2, 1);
    }

    return columns;
  }, [shouldShowBuildingName]);

  return (
    <Table
      columns={columns}
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
      title="Policies"
    />
  );
};
