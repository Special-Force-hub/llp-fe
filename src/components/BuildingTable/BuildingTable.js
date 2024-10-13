import { IconGraphy, Table } from '@leapeasy/ui-kit'
import { Typography, Badge, Tooltip } from '@leapeasy/ui-kit'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getDemoData } from '../../utils/helpers';

export const BuildingTable = () => {
  const [tableData, setTableData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [paginatedData, setPaginatedData] = useState([]);

  const [myPagination, setMyPagination] = useState({
    totalItems: 0,
    pageNumber: 0,
    rowsPerPage: 12,
    maxVisiblePageItems: 6,
    onUpdate: value => {
      if (value === -1) value = 0;
      setMyPagination(prev => ({ ...prev, pageNumber: value }));
    },
    showPageNumberInput: 6,
    totalPages: 0,
  });

  const [myFilter, setMyFilter] = useState({
    options: {},
    searchText: '',
    searchPlaceholder: 'Search Building..'
  });

  const isDemo = useSelector((state) => state.getIn(['ui', 'demo']));
  const buildings = useSelector((state) => state.getIn(['property', 'building']));

  useEffect(() => {
    const data = [];
    if (buildings && !myFilter.searchText) {
      buildings.toJS().data.forEach((building) => {
        data.push([
          isDemo ? getDemoData('building-name') : building.name,
          building.building_type,
          isDemo ? getDemoData('phone') : building.phone,
          isDemo ? getDemoData('address') : building.billingStreet,
          isDemo ? getDemoData('email') : building.email_address,
          building.total_of_active_leap_units
            ? parseInt(building.total_of_active_leap_units, 10)
            : 0,
          building.student_housing,
          building.dispositioned.toString(),
          isDemo ? getDemoData('landlord-name') : building.landlord_name,
          ''
        ]);
      });
      setTableData(data);
      setFilteredData(data); // Initially, filteredData is the same as tableData
    }
  }, [buildings, isDemo]);

  useEffect(() => {
    const startIndex = myPagination.pageNumber * myPagination.rowsPerPage;
    const endIndex = startIndex + myPagination.rowsPerPage;
    setPaginatedData(filteredData.slice(startIndex, endIndex));
    setMyPagination(prev => ({
      ...prev,
      totalItems: filteredData.length,
      totalPages: Math.ceil(filteredData.length / myPagination.rowsPerPage)
    }));
  }, [myPagination.pageNumber, myPagination.rowsPerPage, filteredData]);

  return (
    <Table
      columns={[
        {
          name: 'Name',
          options: {
            sort: true
          }
        },
        {
          name: 'Building Type',
          options: {
            flex: '30px 1 1',
            filter: true,
            customBodyRenderer: value => (
              <Badge
                background="rgba(243, 241, 244, 1)"
                color={value ? "purple" : "tomato"}
                label={!value ? "undefined" : value == "Auto Enroll" ? "AE" : value == "Event Process" ? "EP" : "AE EP"}
                rounded
                textSize="medium"
              />
            ),
            filterOptions: [
              {
                text: 'Auto Enroll',
                value: "Auto Enroll"
              },
              {
                text: 'Event Process',
                value: "Event Process"
              },
              {
                text: 'Event Process;Auto Enroll',
                value: "Event Process;Auto Enroll"
              },
            ],
            sort: true
          }
        },
        {
          name: 'Phone Number',
          options: {
            sort: true
          }
        },
        {
          name: 'Address',
          options: {
            flex: '210px 1 1',
            sort: true,
          }
        },
        {
          name: 'Email Address',
          options: {
            flex: '210px 1 1',
            sort: true
          }
        },
        {
          name: 'Tot. Active Leap Units',
          options: {
            filter: false,
            sort: true,
            customBodyRender: (value) => (
              <Typography align="center" variant="body1">
                {value.toLocaleString('en-US')}
              </Typography>
            ),
          }
        },
        {
          name: 'Student Housing',
          options: {
            flex: "40px 1 1",
            filter: true,
            sort: true,
            customBodyRenderer: value => (
              <Badge
                background="rgba(243, 241, 244, 1)"
                color={value == "true" ? "parisGreen" : "tomato"}
                label={value}
                rounded
                textSize="medium"
              />
            ),
            filterOptions: [
              {
                text: 'true',
                value: "true"
              },
              {
                text: 'false',
                value: "false"
              }
            ]
          }
        },
        {
          name: 'Detail',
          options: {
            flex: "5px 1 1",
            sort: true,
            customBodyRenderer: () => (
              <IconGraphy icon={"FileFolder.Description"} style={{ color: '#702572' }} />
            )
          }
        },
      ]}
      data={paginatedData}
      filter={myFilter}
      onChangeFilter={value => {

        setMyFilter(value);

        const filteredData = tableData.filter(row => (
          row[1] == value.options["Building Type"] || row[6] == value.options["Student Housing"]
        ));
        setFilteredData(filteredData);
        setMyPagination((prev) => ({
          ...prev,
          pageNumber: 0,
        }));
      }}
      onChangeRowsPerPage={value => {
        console.log("pagination", value);

        setMyPagination({ ...myPagination, rowsPerPage: value });
      }}
      pagination={myPagination}
      rowsPerPageOptions={[12, 15, 20]}
      style={{ width: '100%' }}
      title="Buildings"
    />
  )
}