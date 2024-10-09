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

export const ApplicationVolume6MonthsChart = ({ data }) => {
  const sixMonths = data.sixmonthApp;

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
        <Avatar size="large" iconImage={<IconGraphy icon="Chart.SsidChart" />} />
        <Box>
          <Typography variant="h4" style={{ color: colors.purple[900], fontWeight: '400' }}>
            Activity Overview
          </Typography>

          <Typography variant="body3" style={{ color: colors.neutral[900], fontWeight: '400' }}>
            Overview of applications and policies issued volume over the past 6 months.
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
          <Box display="flex" gap="4px" flexDirection="column">
            <Typography variant="body1" style={{ fontWeight: '600', color: colors.purple[900] }}>
              Applications Volume 6 months
            </Typography>
            <Typography variant="body3" style={{ color: colors.neutral[900] }}>
              Monthly application volumes over the past 6 months.
            </Typography>
          </Box>

          <CustomBarChart
            chartWidth="100%"
            chartHeight={200}
            data={sixMonths}
            colors={{
              Application: colors.purpleIrish[100],
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
          <Box display="flex" gap="4px" flexDirection="column">
            <Typography variant="body1" style={{ fontWeight: '600', color: colors.purple[900] }}>
              Policies Issued last 6 months
            </Typography>
            <Typography variant="body3" style={{ color: colors.neutral[900] }}>
              Monthly policies issued over the past 6 months.
            </Typography>
          </Box>

          <CustomBarChart
            chartWidth="100%"
            chartHeight={200}
            data={data.appChartData2.slice(
              new Date().getMonth() - 5,
              new Date().getMonth() + 1,
            )}
            colors={{
              Approved: colors.tomato[100],
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};
