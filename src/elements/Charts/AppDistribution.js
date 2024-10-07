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

export const AppDistribution = ({ data }) => {
  const total = data.stage00 + data.stage02 + data.stage02A + data.stage04 + data.stage05;

  const items = [
    {
      value: data.stage00,
      title: 'Tenant Evaluation / Application Received',
      label: 'Stage 00',
      color: colors.purpleIrish[100],
      backgroundOpacity: 0.3,
    },
    {
      value: data.stage02,
      title: 'Document Verification',
      label: 'Stage 02',
      color: colors.parisGreen[100],
      backgroundOpacity: 0.3,
    },
    {
      value: data.stage02A,
      title: 'Final Review',
      label: 'Stage 02A',
      color: colors.magentaRed[100],
      backgroundOpacity: 0.3,
    },
    {
      value: data.stage04,
      title: 'Payment',
      label: 'Stage 04',
      color: colors.warmBlue[100],
      backgroundOpacity: 0.3,
    },
    {
      value: data.stage05,
      title: 'Policy Issued',
      label: 'Stage 05',
      color: colors.tomato[100],
      backgroundOpacity: 0.3,
    },
  ];

  const monthlyAggregates =
    data.appStageCountsByMonth ||
    ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(
      (month) => ({
        year: 2024,
        month,
        stage00: 10,
        stage02: 20,
        stage02A: 30,
        stage04: 40,
        stage05: 50,
      }),
    );

  const [year, setYear] = useState(new Date().getFullYear());

  const yearList = [];
  for (
    let i = monthlyAggregates[0].year;
    i <= monthlyAggregates[monthlyAggregates.length - 1].year;
    i++
  ) {
    yearList.push(i);
  }

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
        <Avatar size="large" iconImage={<IconGraphy icon="EditorLayout.Dashboard" />} />
        <Box>
          <Typography variant="h4" style={{ color: colors.purple[900], fontWeight: '400' }}>
            Application Distribution
          </Typography>

          <Typography variant="body3" style={{ color: colors.neutral[900], fontWeight: '400' }}>
            Here is a detailed breakdown of the application distribution across various stages.
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
            flex: '1 1 0%',
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
          {items.map((item) => (
            <Box key={item.label} display="flex" flexDirection="column" gap="6px">
              <Box display="flex" justifyContent="space-between">
                <Box display="flex" gap="4px" alignItems="center">
                  <Box
                    sx={{
                      width: '6px',
                      height: '6px',
                      background: item.color,
                      borderRadius: '3px',
                    }}
                  />
                  <Typography variant="small" style={{ fontWeight: 500, color: '#A39AA9' }}>
                    {item.label}
                  </Typography>
                  <Box sx={{ width: '2px', height: '2px', background: '#A39AA9' }} />

                  <Typography variant="small" style={{ fontWeight: 500, color: colors.black[900] }}>
                    {item.title}
                  </Typography>
                </Box>

                <Typography variant="small" style={{ fontWeight: 500, color: colors.black[900] }}>
                  {Number(item.value).toLocaleString()}
                </Typography>
              </Box>

              <Box sx={{ height: '8px', width: '100%', position: 'relative' }}>
                <Box
                  sx={{
                    width: '100%',
                    height: '100%',
                    background: item.color,
                    opacity: item.backgroundOpacity,
                  }}
                />

                <Box
                  sx={{
                    position: 'absolute',
                    left: '0px',
                    top: '0px',
                    height: '100%',
                    width: `${(item.value / total) * 100}%`,
                    background: item.color,
                  }}
                />
              </Box>
            </Box>
          ))}
        </Box>

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
        >
          <Box display="flex" justifyContent="space-between" width="100%">
            <Box display="flex" gap="4px" flexDirection="column">
              <Typography variant="body1" style={{ fontWeight: '600', color: colors.purple[900] }}>
                Monthly
              </Typography>
              <Typography variant="body3" style={{ color: colors.neutral[900] }}>
                Please choose the year for which you would like to view monthly values.
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

          <Box sx={{ padding: '0px 20px', boxSizing: 'border-box' }}>
            <CustomBarChart
              chartWidth="100%"
              chartHeight={200}
              data={monthlyAggregates
                .filter((aggregate) => aggregate.year === year)
                .map((aggregate) => ({
                  ...aggregate,
                  name: aggregate.month,
                }))}
              colors={{
                stage00: colors.purpleIrish[100],
                stage02: colors.parisGreen[100],
                stage02A: colors.magentaRed[100],
                stage04: colors.warmBlue[100],
                stage05: colors.tomato[100],
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
