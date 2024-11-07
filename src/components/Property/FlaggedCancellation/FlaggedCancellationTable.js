import { IconGraphy, Table } from '@leapeasy/ui-kit';
import { Typography, Badge, Tooltip, Checkbox } from '@leapeasy/ui-kit';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getDemoData } from 'utils/helpers';

export const FlaggedCancellationTable = ({
  FlaggedCancellations,
  filter,
  onChangeFilter,
  pagination,
  onChangePagination,
  sortOptions,
  onChangeSort,
  onClickCancelPolicies,
}) => {
  const [tableData, setTableData] = useState([]);
  const isDemo = useSelector((state) => state.getIn(['ui', 'demo']));

  useEffect(() => {
    const data = [];
    if (FlaggedCancellations) {
      FlaggedCancellations.forEach((FlaggedCancellation) => {
        data.push([
          '',
          FlaggedCancellation.policy_flag || '',
          FlaggedCancellation.is_cancelled ? 'Cancelled' : 'Active',
          isDemo ? getDemoData('rider-id') : FlaggedCancellation.rider_id,
          isDemo ? getDemoData('tenant-name') : FlaggedCancellation.tenant_1_name,
          isDemo ? getDemoData('building-name') : FlaggedCancellation.apartment_building_name,
          FlaggedCancellation.coverage_start_date,
          FlaggedCancellation.coverage_end_date,
          FlaggedCancellation.app_type,
          FlaggedCancellation.id
          // FlaggedCancellation.is_cancelled,
        ]);
      });

      setTableData(data);
    }
  }, [FlaggedCancellations, isDemo]);

  const goDetailPage = (tableMeta) => {

    const selectedFlaggedCancellation = FlaggedCancellations.find(
      (FlaggedCancellation) => FlaggedCancellation.id === tableMeta[tableMeta.length - 1],
    );

    if (selectedFlaggedCancellation) {

      onClickCancelPolicies(selectedFlaggedCancellation);
    }
  };

  return (
    <Table
      columns={[
        {
          name:
            <Checkbox
              description=""
              indeterminate
              label=""
              onClick={() => { }}
              readonly
            />,
          options: {
            flex: "5px 1 1",
            sort: true,
            customBodyRenderer: (value) => (
              <Checkbox
                description=""
                label=""
                onClick={() => { }}
              />
            ),
          },
          key: '',
        },
        {
          name: 'Flag',
          options: {
            flex: '120px 1 1',
            filter: true,
            customBodyRenderer: (value) => (
              <Badge
                background="rgba(243, 241, 244, 1)"
                color="neutral"
                label={value == "green" ? "Possible Claim" : "Possible Cancellation"}
                rounded
                textSize="medium"
              />
            ),
            sort: true,
          },
          key: 'flag',
        },
        {
          name: 'Policy Status',
          options: {
            flex: '30px 1 1',
            filter: true,
            customBodyRenderer: (value) => (
              <Badge
                background="rgba(243, 241, 244, 1)"
                color={value == "Cancelled" ? 'magentaRed' : 'parisGreen'}
                label={value}
                rounded
                textSize="medium"
              />
            ),
            sort: true,
          },
          key: 'policy_status',
        },
        {
          name: 'Rider ID',
          options: {
            sort: true,
          },
          key: 'rider_id',
        },
        {
          name: 'Tenant Name',
          options: {
            sort: true,
          },
          key: 'tenant_name',
        },
        {
          name: 'Building Name',
          options: {
            filter: false,
            sort: true,
            customBodyRender: (value) => (
              <Typography align="center" variant="body1">
                {value.toLocaleString('en-US')}
              </Typography>
            ),
          },
          key: 'building_name',
        },
        {
          name: 'Covera/Start Date',
          options: {
            flex: '60px 1 1',
            sort: true,
            customBodyRenderer: (value, tableMeta) => (
              <Typography align="center" variant="body2">
                {value.toLocaleString('en-US')}
              </Typography>
            ),
          },
          key: 'start_date',
        },
        {
          name: 'Covera/End Date',
          options: {
            flex: '60px 1 1',
            sort: true,
            customBodyRenderer: (value, tableMeta) => (
              <Typography align="center" variant="body2">
                {value.toLocaleString('en-US')}
              </Typography>
            ),
          },
          key: 'end_date',
        },
        {
          name: 'Building Type',
          options: {
            flex: '40px 1 1',
            sort: true,
            filter: true,
            customBodyRenderer: (value) => (
              <Badge
                background="#F3F1F4"
                color={value == 'LDR Commercial' ? 'purple' : 'tomato'}
                label={value == 'LDR Commercial' ? 'LDR-C' : 'AE'}
                rounded
                textSize="medium"
              />
            ),
          },
          key: 'building_type',
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
          key: 'end_date',
        },
        {
          name: '',
          options: {
            flex: '5px 1 1',
            sort: true,
            customBodyRenderer: (value, tableMeta) => (
              <IconGraphy
                icon={'EditorLayout.MoreVert'}
                style={{ color: '#702572' }}
              // onClick={() => goDetailPage(tableMeta)}
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
      title="Flagged Cancellations"
    />
  );
};