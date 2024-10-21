import React, { useCallback, useEffect, useState } from "react";
import { DashboardLayoutContainer } from "components/Layouts/DashboardLayout";
import { Box } from "@mui/material";
import { Grid, IconGraphy, Tab, Typography, colors, Table, Badge } from '@leapeasy/ui-kit';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { openDetails } from "store/actions/uiActions";
import { DetailCard } from "./DetailCard";

export const UserDetail = ({ route }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [tableData, setTableData] = useState([]);
  const [filter, setFilter] = useState({
    options: {},
    searchText: '',
    searchPlaceholder: 'Search Building..',
  });
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
  const buildings = useSelector((state) => state.getIn(['property', 'building']));
  const buildingsJSON = buildings ? buildings.toJS().data : null;
  const isDemo = useSelector((state) => state.getIn(['ui', 'demo']));
  const details = useSelector((state) => state.getIn(['ui', 'details'])) || null;
  const detailsJSON = details ? details.toJS() : null;

  const onClickBack = useCallback(() => {
    dispatch(openDetails(null));

    setTimeout(() => {
      navigate(-1);
    });
  }, []);

  const goDetailPage = (tableMeta) => {
    console.log("buildingsbuildings", buildingsJSON);

    const selectedBuilding = buildingsJSON.find(
      (building) => building.id === tableMeta[tableMeta.length - 1],
    );
    console.log("selectedBuilding", selectedBuilding);

    dispatch(
      openDetails({
        type: 'building',
        data: selectedBuilding,
      }),
    );
    navigate(`/user/${route}/detail/buildingDetail`);
  }

  useEffect(() => {
    const data = [];
    if (buildings) {
      buildings.toJS().data.forEach((building) => {
        data.push([
          building.name,
          building.building_type,
          building.phone,
          building.billingStreet,
          building.email_address,
          building.total_of_units,
          building.student_housing,
          building.dispositioned.toString(),
          building.id,
        ]);
      });
    }
    setTableData(data);
  }, [buildings]);

  useEffect(() => {
    const detailsJSON = details ? details.toJS() : null;
    if (!details || detailsJSON.type !== 'user') {
      onClickBack();
      return;
    }
    // dispatch(getBuildingDelegationAction(buildingId));
    // dispatch(getBuildingInvoiceAction(buildingId));
  }, [onClickBack, details]);

  if (!detailsJSON) return <DashboardLayoutContainer />;

  const user = detailsJSON.data;

  console.log("useruser", user);

  return (
    <DashboardLayoutContainer shouldShowCard={false}>
      <Box
        padding="24px"
        gap="10px"
        display="flex"
        flexDirection="column"
        border="1px solid #EAEAEA"
        sx={{ background: 'white' }}
        borderRadius="12px"
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '15px',
          }}
        >
          <Box sx={{ cursor: 'pointer', '&:hover': { opacity: 0.75 } }}>
            <IconGraphy icon="Arrow.ArrowBack" onClick={onClickBack} />
          </Box>
          <Typography
            variant="h3"
            style={{ color: colors.purple[900], fontWeight: '500', padding: '5px 5px 5px 15px' }}
          >
            {user.accepter.username}
          </Typography>
        </Box>
        <DetailCard user={user} isDemo={isDemo} />
      </Box>
      <Table
        columns={[
          {
            name: 'Name',
            options: {
              sort: true,
            },
            key: 'name',
          },
          {
            name: 'Building Type',
            options: {
              flex: '30px 1 1',
              filter: true,
              customBodyRenderer: (value) => (
                <Badge
                  background="rgba(243, 241, 244, 1)"
                  color={value ? 'purple' : 'tomato'}
                  label={
                    !value
                      ? 'undefined'
                      : value === 'Auto Enroll'
                        ? 'AE'
                        : value === 'Event Process'
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
            key: 'building_type',
          },
          {
            name: 'Phone Number',
            options: {
              sort: true,
            },
            key: 'phone',
          },
          {
            name: 'Address',
            options: {
              flex: '210px 1 1',
              sort: true,
            },
            key: 'billingStreet',
          },
          {
            name: 'Email Address',
            options: {
              flex: '210px 1 1',
              sort: true,
            },
            key: 'email_address',
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
            },
            key: 'total_of_active_leap_units',
          },
          {
            name: 'Student Housing',
            options: {
              flex: '40px 1 1',
              filter: true,
              sort: true,
              customBodyRenderer: (value) => (
                <Badge
                  background="#F3F1F4"
                  color={value === 'true' ? 'parisGreen' : 'tomato'}
                  label={value}
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
            key: 'student_housing',
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
        ]}
        data={tableData}
        filter={filter}
        onChangeFilter={setFilter}
        onChangeRowsPerPage={(value) =>
          setPagination({
            ...pagination,
            rowsPerPage: value,
            pageNumber: 0,
          })
        }
        pagination={pagination}
        rowsPerPageOptions={[12, 15, 20]}
        sortOptions={sortOptions}
        onChangeSort={setSortOptions}
        style={{ width: '100%' }}
        title="Buildings"
      />
    </DashboardLayoutContainer>
  )
}