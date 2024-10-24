import { DashboardLayoutContainer } from 'components/Layouts/DashboardLayout';
import { Box } from '@mui/material';
import { Grid, TableBody, TableFooter, Avatar, IconGraphy, Button, Dropdown, Tab, Typography, colors, DropDownList, Input, Badge } from '@leapeasy/ui-kit';
import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getEmailAction } from 'store/actions/emailActions';
import { openDetails } from 'store/actions/uiActions';
import { getUserBuildingAction } from 'store/actions/userActions';
const TABS = [
  {
    title: 'All Mails',
    icon: 'Notifications.Email',
  },
  {
    title: 'Inbox',
    icon: 'Notifications.Inbox',
  },
  {
    title: 'Sent',
    icon: 'EditorLayout.Send',
  },

];


export const Email = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [tableData, setTableData] = useState([]);

  const [currentPage, setCurrentPage] = useState('all');

  const [filter, setFilter] = useState({
    options: {},
    searchText: '',
    searchPlaceholder: 'Search Building..',
  });
  const [selectedTab, setSelectedTab] = useState(0);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterOptions, setFilterOptions] = useState(filter.options);

  useEffect(() => {
    dispatch(getEmailAction());
  }, []);

  const emails = useSelector((state) => state.getIn(['email', 'data']));
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const userEmail = currentUser['email'];

  useEffect(() => {
    if (emails) {
      const emailData = [];
      emails.toJS().data.forEach((email) => {
        emailData.push([
          email.request_type,
          // email.request_status,
          email.accepter_email,
          email.accepter_role,
          email.requestor_email,
          email.requestor_role,
          email.requestor ? email.requestor.username : '',
          email.property.length,
          new Date(email.updatedAt).toISOString().slice(0, 10),
          // email.property,
          // email.decline_reason,
          email.request_status,
          "",
          email.id,
        ]);
      });
      const sortedData = emailData.sort((a, b) => new Date(b[4]) - new Date(a[4]));
      if (currentPage === 'all') {
        setTableData(sortedData);
      } else if (currentPage === 'sent') {
        setTableData(sortedData.filter((item) => item[5] === userEmail));
      } else if (currentPage === 'inbox') {
        setTableData(sortedData.filter((item) => item[3] === userEmail));
      }
    }
  }, [emails, currentPage]);

  const goDetailPage = (tableMeta) => {
    const selectedBuilding = emails.toJS().data.find(
      (email) => email.id === tableMeta[tableMeta.length - 1],
    );
    console.log("selectedBuilding", selectedBuilding);
    dispatch(getUserBuildingAction({ id: selectedBuilding.property }));

    if (selectedBuilding) {
      dispatch(
        openDetails({
          type: "email",
          data: selectedBuilding,
        })
      )
      navigate("/email/detail")
    }
  }
  const columns = [
    {
      name: 'Type',
      options: {
        flex: '40px 1 1',
        customBodyRenderer: (value) => (
          <Badge
            background="#F3F1F4"
            color={value === 'invite' ? 'purple' : 'tomato'}
            label="Invite"
            rounded
            textSize="medium"
          />
        ),
      },
      key: "type"
    },
    {
      name: 'From Email',
      options: {
        sort: true,

      },
      key: "from_email"
    },
    {
      name: 'To Role',
      options: {
        sort: true,
        customBodyRenderer: (value) =>
        (
          <Badge
            background="rgba(243, 241, 244, 1)"
            color={'tomato'}
            label={value}
            rounded
            textSize="medium"
          />
        ),
        key: "to_role"
      },
    },
    {
      name: 'To Email',
      options: {
        sort: true,
        flex: '225px 1 1',
      },
      key: "to_email"
    },
    {
      name: 'From Role',
      options: {
        customBodyRenderer: (value) =>
        (
          <Badge
            background="rgba(243, 241, 244, 1)"
            color={'tomato'}
            label={value}
            rounded
            textSize="medium"
          />
        ),
      },
      key: "from_role"
    },
    {
      name: 'Name',
      options: {

      },
      key: "name"
    },
    {
      name: 'N/Building',
      options: {

      },
      key: "n_building"
    },
    {
      name: 'Updated date',
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
      key: "updated_date"
    },
    {
      name: 'Status',
      options: {
        customBodyRenderer: (value) =>
        (
          <Badge
            background="rgba(243, 241, 244, 1)"
            color={'tomato'}
            label={value}
            rounded
            textSize="medium"
          />
        ),
      },
      key: "status"
    },
    {
      name: 'Action',
      options: {
        customBodyRenderer: (value) => (
          <Button variant='secondary' iconSuffix='EditorLayout.Send' >
            Send
          </Button>
        ),
      },
      key: "action"
    },
    {
      name: 'Detail',
      options: {
        flex: '20px 1 1',
        customBodyRenderer: (value, tableMeta) =>
          <IconGraphy icon='FileFolder.StickyNote2' style={{ color: '#702572' }}
            onClick={() => goDetailPage(tableMeta)}
          />,
      },
      key: "detail"
    },
    {
      name: '',
      options: {
        flex: '10px 1 1',
        customBodyRenderer: () => <IconGraphy icon='General.Delete' />,
      },
    },
  ];
  return (
    <DashboardLayoutContainer>
      <Box>
        <Box display="flex" alignItems="center" justifyContent="space-between" marginBottom="30px" height="32px">
          <Box display="flex" alignItems="center" gap="8px">
            <Typography
              variant='h3'
              style={{ fontWeight: '500', color: colors.purple[900] }}
            >
              All Mails
            </Typography>

            {/* {totalResult && ( */}
            <Typography
              variant='body2'
              style={{ fontWeight: '500', color: colors.neutral[900] }}
            >
              (1500 results)
            </Typography>
          </Box>
          {/* )} */}
          <Button
            iconPrefix="General.Add"
            onClick={() => { }}
            size="medium"
            style={{
              maxWidth: '220px'
            }}
          >
            Compose New Email
          </Button>
        </Box>
        <Grid>
          <Box display="flex" width="100%" justifyContent="space-between">
            <Box display="flex">
              {TABS.map((tab, index) => (
                <Tab
                  title={tab.title}
                  icon={tab.icon}
                  isSelected={selectedTab === index}
                  onClick={() => setSelectedTab(index)}
                />
              ))}
            </Box>
            <Box
              sx={{
                position: "relative",
                height: "32px",
                display: "flex",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "8px 16px",
                  boxSizing: "border-box",
                  gap: "8px",
                  cursor: "pointer",
                  border: `1px solid ${colors.purple[100]}`,
                  borderRadius: "8px",
                }}
                onClick={() => setFilterOpen(true)}
              >
                <Typography variant='cta-xs' style={{ fontWeight: '500' }}>
                  Filter
                </Typography>

                <IconGraphy
                  icon={filterOpen ? 'Arrow.ExpandLess' : 'Arrow.ExpandMore'}
                  width={8}
                  height={6}
                />
              </Box>

              <DropDownList
                open={filterOpen}
                setOpen={setFilterOpen}
                showSearch={false}
                style={{
                  minWidth: '326px',
                }}
                menuMaxHeight='unset'
                getMenuItems={() => {
                  return (
                    <Box padding="20px" gap="10px" display="flex" flexDirection="column">
                      <Typography
                        variant='body1'
                        style={{ fontWeight: '700', color: colors.purple[900] }}
                      >
                        Filter
                      </Typography>

                      <div style={{ border: `1px solid ${colors.purple[100]}` }} />

                      {columns
                        .filter((column) => column.options?.filter)
                        .map((col) => (
                          <Dropdown
                            key={col.key}
                            value={filterOptions[col.key]}
                            size='medium'
                            onChange={(e) =>
                              setFilterOptions({
                                ...filterOptions,
                                [col.key]: e.target.value,
                              })
                            }
                            options={col.options.filterOptions}
                            multiselect={col.options.multiselect}
                            placeholder='Select item'
                            label={col.name}
                            showSearch={false}
                            style={{
                              minWidth: '100%',
                            }}
                          />
                        ))}

                      <Box display="flex" gap="8px">
                        <Button
                          variant='tertiary'
                          onClick={() => setFilterOptions({})}
                        >
                          Reset
                        </Button>

                        <Button
                          variant='primary'
                          onClick={(e) => {
                            setFilter({
                              ...filter,
                              options: filterOptions,
                            });

                            setFilterOpen(false);
                            e.stopPropagation();
                          }}
                        >
                          Apply Filter
                        </Button>
                      </Box>
                    </Box>
                  );
                }}
              />
              <Input
                type='text'
                value={filter.searchText || ''}
                onChange={(e) =>
                  setFilter({ ...filter, searchText: e.target.value })
                }
                minWidth='unset'
                showCopy={false}
                placeholder={filter.searchPlaceholder}
                icon={
                  <IconGraphy
                    icon='BookmarkFilter.Search'
                    style={{
                      width: '12px',
                      height: '12px',
                      marginTop: '3px',
                    }}
                  />
                }
                showHelperMessage={false}
              />
              <Box sx={{
                marginLeft: "8px",
                cursor: "pointer",
                position: "relative",
                width: "32px",
                height: "32px",
                borderRadius: "4px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: `${colors.neutral[800]}`,
                "&:hover": {
                  background: `${colors.purple[600]}`,
                  color: "#fff",
                },
                "&:active": {
                  background: `${colors.purple[400]}`,
                },
              }}>
                <IconGraphy icon='EditorLayout.WidthNormal' />
              </Box>
              <Box sx={{
                marginLeft: "8px",
                cursor: "pointer",
                position: "relative",
                width: "32px",
                height: "32px",
                borderRadius: "4px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: `${colors.neutral[800]}`,
                "&:hover": {
                  background: `${colors.purple[600]}`,
                  color: "#fff",
                },
                "&:active": {
                  background: `${colors.purple[400]}`,
                },
              }}>
                <IconGraphy icon='MediaDevices.Print' />
              </Box>

              <Box sx={{
                marginLeft: "8px",
                cursor: "pointer",
                position: "relative",
                width: "32px",
                height: "32px",
                borderRadius: "4px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: `${colors.neutral[800]}`,
                "&:hover": {
                  background: `${colors.purple[600]}`,
                  color: "#fff",
                },
                "&:active": {
                  background: `${colors.purple[400]}`,
                },
              }}>
                <IconGraphy icon='Arrow.Download' />
              </Box>
            </Box>
          </Box>
        </Grid>
        <Box marginTop="20px">
          {selectedTab === 0 && (
            <TableBody
              data={tableData}
              allColumns={columns}
              visibleColumns={columns}
              overflowEllipsis={true}
              sortOptions={{}}
              onChangeSort={() => { }}
              onClickRow={() => { }}
            />
          )}
          {selectedTab === 1 && (
            <TableBody
              data={tableData}
              allColumns={columns}
              visibleColumns={columns}
              overflowEllipsis={true}
              sortOptions={{}}
              onChangeSort={() => { }}
              onClickRow={() => { }}
            />
          )}
          {selectedTab === 2 && (
            <TableBody
              data={tableData}
              allColumns={columns}
              visibleColumns={columns}
              overflowEllipsis={true}
              sortOptions={{}}
              onChangeSort={() => { }}
              onClickRow={() => { }}
            />
          )}
        </Box>
      </Box>
    </DashboardLayoutContainer>
  );
};
