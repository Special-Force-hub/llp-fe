import { Box } from '@mui/material';
import {
  CustomBarChart,
  Typography,
  colors,
  IconGraphy,
  Avatar,
  styles,
  Dropdown,
} from '@leapeasy/ui-kit';
import { useState } from 'react';

export const GrossRentChart = ({ data }) => {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());

  const yearList = [];
  for (let i = 2017; i <= now.getFullYear(); i++) {
    yearList.push(i);
  }

  const reportData = data.monthRentData[year];

  return (
    <Box
      sx={{
        boxShadow: styles.boxShadow.sm,
        borderRadius: `${styles.borderRadius.large}px`,
        border: `1px solid ${colors.black[300]}`,
        width: '100%',
        padding: '16px',
        boxSizing: 'border-box',
      }}
      display="flex"
      flexDirection="column"
      gap="12px"
    >
      <Box display="flex" gap="16px">
        <Avatar size="large" iconImage={<IconGraphy icon="FileFolder.Contract" />} />
        <Box>
          <Typography variant="h4" style={{ color: colors.purple[900], fontWeight: '400' }}>
            Gross Rent Supported by Leap
          </Typography>

          <Typography variant="body3" style={{ color: colors.neutral[900], fontWeight: '400' }}>
            Monthly and yearly trends of gross rent supported by Leap.
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          background: '#f9f8f9',
          border: `1px solid ${colors.purple[100]}`,
          borderRadius: '8px',
          padding: '16px',
          width: '100%',
          boxSizing: 'border-box',
        }}
        display="flex"
        gap="20px"
      >
        <Box
          sx={{
            flex: '1.8 1 0%',
            background: 'white',
            border: `1px solid ${colors.black[200]}`,
            borderRadius: `${styles.borderRadius.large}px`,
            padding: '20px',
            boxSizing: 'border-box',
          }}
          display="flex"
          flexDirection="column"
          gap="24px"
        >
          <Box display="flex" justifyContent="space-between" width="100%">
            <Box display="flex" gap="4px" flexDirection="column">
              <Typography variant="body1" style={{ fontWeight: '600', color: colors.purple[900] }}>
                Monthly
              </Typography>
              <Typography variant="body3" style={{ color: colors.neutral[900] }}>
                Monitor annual Gross Rent trends.
              </Typography>
            </Box>

            <Dropdown
              value={year}
              size="medium"
              onChange={(e) => setYear(e.target.value)}
              options={yearList.map((year) => ({
                text: year.toString(),
                value: year,
              }))}
              multiselect={false}
              placeholder="Select item"
              showSearch={false}
              icon={<IconGraphy icon="TimeDate.CalendarMonth" />}
              iconVisible={true}
              label="Year"
            />
          </Box>

          <CustomBarChart
            chartWidth="100%"
            chartHeight={200}
            data={reportData}
            colors={{
              Rent: colors.purpleIrish[100],
            }}
          />
        </Box>

        <Box
          sx={{
            flex: '1 1 0%',
            background: 'white',
            border: `1px solid ${colors.black[200]}`,
            borderRadius: `${styles.borderRadius.large}px`,
            padding: '20px',
            boxSizing: 'border-box',
          }}
          display="flex"
          justifyContent="center"
          flexDirection="column"
          gap="20px"
        >
          <Typography variant="body1" style={{ fontWeight: '600' }}>
            Yearly
          </Typography>

          <CustomBarChart
            chartWidth="100%"
            chartHeight={200}
            data={data.yearRentData}
            colors={{
              Rent: colors.purpleIrish[100],
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};
