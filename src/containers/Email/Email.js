import { DashboardLayoutContainer } from 'components/Layouts/DashboardLayout';
import { Box } from '@mui/material';
import { Grid, TableBody, TableFooter, Avatar, IconGraphy, Button, Dropdown, Tab, Typography, colors, DropDownList, Input, Badge } from '@leapeasy/ui-kit';
import React, { useState, useEffect, useCallback } from 'react';
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
const columns = [
  {
    name: 'Type',
    options: {
      customBodyRenderer: (value) => (
        <Badge
          background="#F3F1F4"
          color={value === 'invite' ? 'purple' : 'tomato'}
          label="Invite"
          rounded
          textSize="medium"
        />
      ),
      flex: '40px 1 1',
    },
  },
  {
    name: 'From Email',
    options: {
      sort: true,
    },
  },
  {
    name: 'To Role',
    options: {
      sort: true,
    },
  },
  {
    name: 'To Email',
    options: {
      sort: true,
      flex: '225px 1 1',
    },
  },
  {
    name: 'From Role',
  },
  {
    name: 'Name',
  },
  {
    name: 'N/Building',
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
  },
  {
    name: 'Status',
    options: {

    },
  },
  {
    name: 'Action',
    options: {
    },
  },
  {
    name: 'Detail',
    options: {
      customBodyRenderer: () => <IconGraphy icon='FileFolder.StickyNote2' style={{ color: '#702572' }} />,
    },
  },
  {
    name: '',
    options: {
      customBodyRenderer: () => <IconGraphy icon='General.Delete' />,
    },
  },
];

const data = [
  [
    '',
    'Darlene Robert',
    '8502 Preston',
    'jackson.qwqw@example.com',
    '(307) 555-0133',
    '01/09/2024',
    54896,
    54896,
    '',
    '',
  ],
  [
    '',
    'Darlene Robert',
    '8502 Preston',
    'jackson.qwqw@example.com',
    '(307) 555-0133',
    '01/09/2024',
    54896,
    54896,
    '',
    '',
  ],
  [
    '',
    'Darlene Robert',
    '8502 Preston',
    'jackson.qwqw@example.com',
    '(307) 555-0133',
    '01/09/2024',
    54896,
    54896,
    '',
    '',
  ],
]

export const Email = () => {

  const [filter, setFilter] = useState({
    options: {},
    searchText: '',
    searchPlaceholder: 'Search Building..',
  });
  const [selectedTab, setSelectedTab] = useState(0);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterOptions, setFilterOptions] = useState(filter.options);
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
              data={data}
              allColumns={columns}
              visibleColumns={columns}
              overflowEllipsis={true}
              sortOptions={{}}
              onChangeSort={() => { }}
              onClickRow={() => { }}
            />
          )}
          {selectedTab === 1 && (
            <p>Inbox</p>
          )}
          {selectedTab === 2 && (
            <p>Sent</p>
          )}
        </Box>
      </Box>
    </DashboardLayoutContainer>
  );
};
