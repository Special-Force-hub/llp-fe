import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { colors, Typography } from '@leapeasy/ui-kit';
import { Box } from '@mui/material';

const RateCard = ({ title, value }) => (
  <Box
    display="flex"
    gap="8px"
    sx={{ background: colors.blue[100], borderRadius: '8px', padding: '12px' }}
    alignItems="center"
    flexGrow={1}
  >
    <Typography variant="body2" style={{ color: colors.blue[600], fontWeight: '600' }}>
      {value}
    </Typography>

    <Box sx={{ border: `1px solid ${colors.blue[300]}`, flexGrow: 1, height: '0px' }} />

    <Typography variant="body3" style={{ color: colors.neutral[900], fontWeight: '500' }}>
      {title}
    </Typography>
  </Box>
);

const SummaryCard = ({ title, value }) => (
  <Box
    sx={{
      background: '#F9F8F9', border: `1px solid ${colors.black[200]}`
    }}
    boxSizing="border-box"
    width="25%"
    flexShrink={1}
    padding="12px"
    gap="8px"
    borderRadius="8px"
    display="flex"
    justifyContent="space-between"
  >
    <Typography variant="body2" style={{ fontWeight: '600', color: colors.purple[900] }}>
      {value}
    </Typography>

    <Typography variant="body3" style={{ fontWeight: '500', color: '#A39AA9' }}>
      {title}
    </Typography>
  </Box>
);

export const DetailsTab = ({ building }) => {
  return (
    <Box>
      <Box display="flex" flexDirection="column" sx={{ padding: '0px 24px', gap: '4px' }}>
        <Box display="flex" flexDirection="column" padding="16px 0px" gap="12px">
          <Typography variant="body1" style={{ color: colors.purple[900], fontWeight: '600' }}>
            Building Level Occupancy Rates
          </Typography>

          <Box display="flex" gap="8px">
            <RateCard title="Total # of Units" value={building.total_of_units} />
            <RateCard title="Total # Leap Active Units" value={building.total_of_active_leap_units} />
            <RateCard title="Leap % Total Inventory" value={building.leap_of_total_inventory} />
            <RateCard title="Estimated App. Decline Rate" value={building.estimated_applicant_decline_rate} />
          </Box>
        </Box>

        <Box sx={{ border: `1px solid ${colors.black[200]}` }} />

        <Box
          display="flex"
          flexDirection="column"
          padding="16px 0px"
          gap="12px"
        >
          <Typography variant="body1" style={{ color: colors.purple[900], fontWeight: '600' }}>
            Building Summary Data
          </Typography>

          <Box display="flex" gap="8px" flexDirection="column">
            <Box display="flex" gap="8px">
              <SummaryCard title="Last App. Date" value={building.last_application_date} />
              <SummaryCard title="Total # of Applications" value={building.total_of_applications} />
              <SummaryCard title="Total # of Decisioned App" value={building.total_of_decisioned_app} />
              <SummaryCard title="Building Approval Rate" value={building.building_approval_rate} />
            </Box>

            <Box display="flex" gap="8px">
              <SummaryCard title="Total # of Cancelled Apps." value={building.total_of_cancelled_applications} />
              <SummaryCard title="Building Approved to Issue" value={building.building_approved_to_issue_rate} />
              <SummaryCard title="Total # of Approved Apps" value={building.total_of_approved_app} />
              <SummaryCard title="Total # of Issued Policies" value={building.total_of_issued_policies} />
            </Box>

            <Box display="flex" gap="8px">
              <SummaryCard title="Total # of Declined App" value={building.total_of_declined_applications} />
              <SummaryCard title="Cancellation Rate" value={building.cancellation_percentage} />
              <SummaryCard title="Declined Rate" value={building.decline_percentage} />
              <Box flexShrink={1} width="25%" />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
