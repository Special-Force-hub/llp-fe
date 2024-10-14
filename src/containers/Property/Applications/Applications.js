import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DashboardLayoutContainer } from 'components/Layouts/DashboardLayout';
import { Box } from '@mui/material';
import { Table, Badge } from '@leapeasy/ui-kit';
import { fullWidth } from 'validator/lib/isFullWidth';
import {
  getFilteredDataAction,
  searchDBAction,
  getAppAction,
  setAppAction,
} from 'store/actions/propertyActions';
import { setDocTitleAction, setDocFileAction } from 'store/actions/documentActions';

import { getDemoData } from 'utils/helpers';
import { APP_STAGE, APP_TYPE } from 'data/constants/common_constants';
export const Applications = (props) => {
  const { filter, filterId, dataType } = props;

  const [anchorEl, setAnchorEl] = useState(null);
  const [rowData, setRowData] = useState(null);
  const [tableData, setTableData] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [quickType, setQuickType] = useState(null);
  const [claimData, setClaimData] = useState(null);
  const [quickData, setQuickData] = useState(null);
  const [documentData, setDocumentData] = useState(null);
  const [docTitle, setDocumentTitle] = useState(null);
  const [searchText, setSearchText] = useState(null);
  const [searchType, setSearchType] = useState('clear');
  const isDemo = useSelector((state) => state.getIn(['ui', 'demo']));

  const dispatch = useDispatch();

  const applications = useSelector((state) => state.getIn(['property', 'application']));

  // useEffect(() => {
  //   const data = [];
  //   if (applications) {
  //     applications.toJS().data.forEach((app) => {
  //       data.push([
  //         // app.stage,
  //         <Badge
  //           background="#F3F1F4"
  //           color="sunglow"
  //           label={app.stage}
  //           rounded
  //           textSize="medium"
  //         />,
  //         <Badge
  //           background="#F3F1F4"
  //           color="warmBlue"
  //           label={app.app_type}
  //           rounded
  //           textSize="medium"
  //         />,
  //         // app.app_type,
  //         isDemo ? getDemoData('building-name') : app.apartment_building_name,
  //         isDemo ? getDemoData('rider-id') : app.rider_id,
  //         isDemo ? getDemoData('tenant-name') : app.tenant_1_name,
  //         app.gross_monthly_rent ? parseFloat(app.gross_monthly_rent) : 0,
  //         new Date(app.sf_createdDate).toISOString().slice(0, 10),
  //         // app.risk_class,
  //         app.lease_start_date,
  //         app.lease_end_date,
  //         // app.active_lease,
  //         <Badge
  //           background="#F3F1F4"
  //           color="parisGreen"
  //           label={app.active_lease}
  //           rounded
  //           textSize="medium"
  //         />,
  //         app.total_number_of_tenants,
  //         app.stage,
  //       ]);
  //     });
  //     setTableData(data);
  //   }
  // }, [applications, isDemo]);
  useEffect(() => {
    const data = [];
    if (applications) {
      const appData = applications.toJS().data || [];
      appData.forEach((app) => {
        data.push([
          <Badge
            background="#F3F1F4"
            color="sunglow"
            label={app.stage}
            rounded
            textSize="medium"
          />,
          <Badge
            background="#F3F1F4"
            color="warmBlue"
            label={app.app_type}
            rounded
            textSize="medium"
          />,
          isDemo ? getDemoData('building-name') : app.apartment_building_name,
          isDemo ? getDemoData('rider-id') : app.rider_id,
          isDemo ? getDemoData('tenant-name') : app.tenant_1_name,
          app.gross_monthly_rent ? '$' + parseFloat(app.gross_monthly_rent) : 0,
          new Date(app.sf_createdDate).toISOString().slice(0, 10),
          app.lease_start_date,
          app.lease_end_date,
          <Badge
            background="#F3F1F4"
            color="parisGreen"
            label={app.active_lease}
            rounded
            textSize="medium"
          />,
          app.total_number_of_tenants,
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="5" r="2" fill="#8E3C96" />
            <circle cx="12" cy="12" r="2" fill="#8E3C96" />
            <circle cx="12" cy="19" r="2" fill="#8E3C96" />
          </svg>,
        ]);
      });
      setTableData(data);
    }
  }, [applications, isDemo]);

  useEffect(() => {
    if (filter) {
      let filterData;
      if (filter === 'Potential Apps - Stage 00') {
        filterData = { stage: [APP_STAGE.Stage00] };
      } else if (filter === 'Pending Apps Stages 01-02A') {
        filterData = { stage: [APP_STAGE.Stage01, APP_STAGE.Stage02, APP_STAGE.Stage02A] };
      } else if (filter === 'Pending Payment - Stage 04') {
        filterData = { stage: [APP_STAGE.Stage04] };
      } else if (filter === 'Policy Issued - Stage 05') {
        filterData = { stage: [APP_STAGE.Stage05] };
      } else if (filter === 'Declined Application') {
        filterData = { stage: [APP_STAGE.Stage06] };
      } else if (filter === 'Cancelled Application') {
        filterData = { stage: [APP_STAGE.Cancelled] };
      } else if (filter === 'Guarantor Waiver') {
        filterData = { app_type: [APP_TYPE.AE] };
      } else if (filter === 'Rent Guaranty') {
        filterData = { app_type: [APP_TYPE.RG] };
      } else if (filter === 'LDR') {
        filterData = { app_type: [APP_TYPE.LDR] };
      } else if (filter === 'LDR Commercial') {
        filterData = { app_type: [APP_TYPE.LDRC] };
      }
      dispatch(setAppAction(null));
      dispatch(
        getFilteredDataAction({
          filterData,
          title: 'application',
          filterId,
          dataType,
        }),
      );
    } else {
      dispatch(getAppAction());
    }
  }, []);

  const handleQuickButton = (event, value) => {
    setQuickType(value);
    setAnchorEl(event.currentTarget);
  };

  const handleQuickData = (cellMeta) => {
    setQuickData(applications.toJS().data[cellMeta.dataIndex]);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleRowClick = (dataIndex) => {
    setRowData(applications.toJS().data[dataIndex]);
  };

  // const handleFilterSubmit = (applyFilters) => {
  //   const filterList = applyFilters();
  //   const columns = [
  //     'stage',
  //     'app_type',
  //     'rider_id',
  //     'name',
  //     'gross_monthly_rent',
  //     'gross_annual_rent',
  //     'lease_start_date',
  //     'lease_end_date',
  //     'active_lease',
  //     'total_number_of_tenants',
  //   ];
  //   const filterData = {};
  //   filterList.map((item, index) => {
  //     if (item.length !== 0) {
  //       filterData[columns[index]] = item;
  //     }
  //   });
  //   dispatch(getFilteredDataAction({ filterData, title: 'application' }));
  // };
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to the first page whenever rows per page changes
  };

  // Get the current slice of data for the table
  const paginatedData = tableData
    ? tableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    : [];
  const handleClaimData = () => {
    setClaimData(quickData);
    handleMenuClose();
  };

  const handleSearchText = (e) => {
    setSearchText(e.target.value);
  };
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (searchType === 'clear') {
        setSearchType('search');
        dispatch(
          searchDBAction({
            text: searchText,
            label: 'application',
          }),
        );
      } else {
        setSearchText('');
        setSearchType('clear');
        dispatch(
          searchDBAction({
            text: '',
            label: 'application',
          }),
        );
      }
    }
  };

  const handleDBSearch = () => {
    if (searchType === 'clear') {
      setSearchType('search');
      dispatch(
        searchDBAction({
          text: searchText,
          label: 'application',
        }),
      );
    } else {
      setSearchText('');
      setSearchType('clear');
      dispatch(
        searchDBAction({
          text: '',
          label: 'application',
        }),
      );
    }
  };

  const handleDocument = (title) => {
    dispatch(setDocTitleAction(null));
    dispatch(setDocFileAction(null));
    setDocumentTitle(title);
    if (quickType.includes('02')) {
      setDocumentData({ docData: quickData.missing_docs });
    } else {
      setDocumentData(quickData.app_id);
    }
    handleMenuClose();
  };

  return (
    <DashboardLayoutContainer>
      <Box>
        <Table
          columns={[
            {
              name: 'Stage',
              options: {
                // customBodyRenderer: () => { },
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
              },
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
              },
            },
            {
              name: 'Building Name',
              options: {
                flex: '225px 1 1',
                sort: true,
              },
            },
            {
              name: 'Policy ID',
              options: {
                sort: true,
              },
            },
            {
              name: 'Name',
            },
            {
              name: 'Rent/M',
            },
            {
              name: 'Create date',
            },
            {
              name: 'L/Start Date',
            },
            {
              name: 'L/End Date',
            },
            {
              name: 'L/Active',
            },
            {
              name: 'Tenants',
              options: {
                flex: '40px 1 1',
              },
            },
            {
              name: 'Detail',
              options: {
                flex: '30px 1 1',
              },
            },
            {
              name: '',
              options: {
                flex: '30px 1 1',
              },
            },
          ]}
          data={paginatedData}
          filter={{
            options: {},
            searchPlaceholder: 'Search Building..',
          }}
          onChangeFilter={() => {}}
          onChangeRowsPerPage={handleRowsPerPageChange}
          onClickRow={() => {}}
          overflowEllipsis={false}
          pagination={{
            currentPage: page,
            maxVisiblePageItems: 6,
            onUpdate: handlePageChange,
            pageNumber: page,
            rowsPerPage,
            showPageNumberInput: true,
            totalItems: tableData ? tableData.length : 0,
            totalPages: Math.ceil((tableData ? tableData.length : 0) / rowsPerPage),
          }}
          rowsPerPageOptions={[10, 15, 20]}
          style={{ width: '100%' }}
          title="Applications"
        ></Table>
      </Box>
    </DashboardLayoutContainer>
  );
};
