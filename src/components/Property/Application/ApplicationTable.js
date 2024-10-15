import { IconGraphy, Table } from '@leapeasy/ui-kit';
import { Badge } from '@leapeasy/ui-kit';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getDemoData } from 'utils/helpers';
import { setDocTitleAction, setDocFileAction } from 'store/actions/documentActions';
import { useNavigate } from 'react-router-dom';

export const ApplicationTable = ({
  applications,
  filter,
  onChangeFilter,
  pagination,
  onChangePagination,
  sortOptions,
  onChangeSort,
  onClickApplication,
}) => {
  const [tableData, setTableData] = useState([]);
  const isDemo = useSelector((state) => state.getIn(['ui', 'demo']));
  const navigate = useNavigate();

  useEffect(() => {
    const data = [];
    if (applications) {
      applications.forEach((app) => {
        data.push([
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
        ]);
      });

      setTableData(data);
    }
  }, [applications, isDemo]);

  const goDetailPage = (tableMeta) => {
    const selectedApplication = applications.find(
      (application) => application.id === tableMeta[tableMeta.length - 1],
    );

    if (selectedApplication) {
      onClickApplication(selectedApplication);
    }
  };

  return (
    <Table
      columns={[
        {
          name: 'Stage',
          options: {
            flex: '125px 1 1',
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
              <Badge background="#F3F1F4" color="sunglow" label={value} rounded textSize="medium" />
            ),
          },
          key: 'stage',
        },
        {
          name: 'Type',
          flex: '62px 1 1',
          options: {
            sort: true,
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
            customBodyRenderer: (value) =>
              value && (
                <Badge
                  background="#F3F1F4"
                  color="warmBlue"
                  label={value}
                  rounded
                  textSize="medium"
                />
              ),
          },
          key: 'type',
        },
        {
          name: 'Building Name',
          options: {
            flex: '225px 1 1',
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
          key: 'name',
        },
        {
          name: 'Rent/M',
          key: 'rent',
        },
        {
          name: 'Create date',
          key: 'created_date',
        },
        {
          name: 'L/Start Date',
          options: {
            filter: true,
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
            customBodyRenderer: (_) => (
              <IconGraphy
                icon={'EditorLayout.MoreVert'}
                style={{ color: '#702572' }}
                onClick={() => {}}
              />
            ),
          },
          key: 'actions',
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
      title="Applications"
    />
  );
};
