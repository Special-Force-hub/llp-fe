import { Box } from '@mui/material';
import { Typography, colors } from '@leapeasy/ui-kit';
import { getDemoData } from 'utils/helpers';
import { DetailsCard } from 'elements/DetailsCard';

export const RiderDetails = ({ application, isDemo }) => {
  return (
    <Box display="flex" flexDirection="column" gap="10px" padding="24px">
      <Typography variant="h4" style={{ color: colors.purple[900] }}>
        Rider Details
      </Typography>

      <Box display="flex" flexDirection="column" gap="8px">
        <Box display="flex" gap="8px">
          <DetailsCard title="Policy ID" value={application.rider_id} />
          <DetailsCard title="Bond Issue Date" value={application.issue_date} />
          <DetailsCard title="LDR Coverage" value={application.ldr_coverage} />
          <DetailsCard
            title="Total Coverage Amount"
            value={
              '$' +
              (application.total_coverage_amount
                ? parseFloat(application.total_coverage_amount).toLocaleString('en-US')
                : 0)
            }
          />
          <DetailsCard title="Revised Unit Number" value={application.revised_unit_number} />
          <DetailsCard title="Lease Start Date" value={application.lease_start_date} />
        </Box>

        <Box display="flex" gap="8px">
          <DetailsCard title="Lease End Date" value={application.lease_end_date} />
          <DetailsCard title="Coverage Start Date" value={application.coverage_start_date} />
          <DetailsCard title="Coverage End Date" value={application.coverage_end_date} />
          <DetailsCard
            title="Gross Monthly Rent"
            value={
              '$' +
              (application.gross_monthly_rent
                ? parseFloat(application.gross_monthly_rent).toLocaleString('en-US')
                : 0)
            }
          />
          <DetailsCard
            title="Gross Annual Rent"
            value={
              '$' +
              (application.gross_annual_rent
                ? parseFloat(application.gross_annual_rent).toLocaleString('en-US')
                : 0)
            }
          />
          <DetailsCard
            title="Total Number of Tenants"
            value={
              application.total_number_of_tenants
                ? parseInt(application.total_number_of_tenants, 10).toLocaleString('en-US')
                : 0
            }
          />
        </Box>

        <Box display="flex" gap="8px">
          <DetailsCard
            title="Damage Coverage"
            value={
              '$' +
              (application.damages_premium
                ? parseFloat(application.damages_premium).toLocaleString('en-US')
                : 0)
            }
          />
          <DetailsCard
            title="Landlord Account"
            value={isDemo ? getDemoData('landlord-name') : application.lanlord_account_name}
          />
          <DetailsCard
            title="Building Account"
            value={isDemo ? getDemoData('building-name') : application.apartment_building_name}
          />
          <DetailsCard
            title="Coverage Requested /mo"
            value={parseInt(application.coverage_amount_requested_months, 10)}
          />

          <Box width="16.6%" flexShrink={1} />
          <Box width="16.6%" flexShrink={1} />
        </Box>
      </Box>
    </Box>
  );
};
