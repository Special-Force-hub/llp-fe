import { Box } from '@mui/material';
import {
  CustomBarChart,
  CustomDonutChart,
  Typography,
  colors,
  IconGraphy,
  Avatar,
  styles,
  Dropdown,
} from '@leapeasy/ui-kit';
import { useState } from 'react';

export const ClaimPaymentsChart = ({ data }) => {
  const [year, setYear] = useState(new Date().getFullYear());

  const monthlyAggregates = data.claimPaymentsByMonth;

  let closedClaims = 0;
  let openPendingPayment = 0;
  let other = 0;

  for (const aggregates of monthlyAggregates) {
    closedClaims +=
      aggregates.closed_partial_denial +
      aggregates.closed_duplicate +
      aggregates.closed_paid +
      aggregates.closed_denied +
      aggregates.closed_inactive +
      aggregates.closed_incident_only;

    openPendingPayment += aggregates.open_pending_payment;
    other +=
      aggregates.incident_only + aggregates.open_test_claim + aggregates.open_pending_decision;
  }

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
        <Avatar size="large" iconImage={<IconGraphy icon="FileFolder.Contract" />} />
        <Box>
          <Typography variant="h4" style={{ color: colors.purple[900], fontWeight: '400' }}>
            Claims Payments Issued
          </Typography>

          <Typography variant="body3" style={{ color: colors.neutral[900], fontWeight: '400' }}>
            Here is an overview of the claims payments issued, displaying monthly values and the
            total indemnity payments categorized by status.
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
                Claims value month over month
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
              total: colors.warmBlue[100],
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
            Total Indemnity Payments
          </Typography>

          <CustomDonutChart
            chartWidth={250}
            chartHeight={250}
            data={[
              {
                name: 'Closed - Claim Paid',
                value: closedClaims,
              },
              {
                name: 'Open - Pending Payment',
                value: openPendingPayment,
              },
              {
                name: 'Other',
                value: other,
              },
            ]}
            isPercentageValue={false}
            colors={[colors.tomato[100], colors.parisGreen[100], colors.black[500]]}
            title="Total Claim"
            description={Number(closedClaims + openPendingPayment + other).toLocaleString()}
          />
        </Box>
      </Box>
    </Box>
  );
};
