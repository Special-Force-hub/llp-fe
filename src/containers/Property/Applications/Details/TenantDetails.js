import { Box } from '@mui/material';
import { Typography, colors } from '@leapeasy/ui-kit';
import { getDemoData } from 'utils/helpers';
import { DetailsCard } from 'elements/DetailsCard';

export const TenantDetails = ({ application, isDemo }) => {
  return (
    <Box display="flex" flexDirection="column" gap="10px" padding="24px">
      <Typography variant="h4" style={{ color: colors.purple[900] }}>
        Tenant Information
      </Typography>

      <Box display="flex" gap="8px">
        <DetailsCard
          title="Tenant1"
          value={isDemo ? getDemoData('tenant-name') : application.tenant_1_name}
          width="20%"
        />
        <DetailsCard
          title="Tenant2"
          value={isDemo ? getDemoData('tenant-name') : application.tenant_2_name}
          width="20%"
        />
        <DetailsCard
          title="Tenant3"
          value={isDemo ? getDemoData('tenant-name') : application.tenant_3_name}
          width="20%"
        />
        <DetailsCard
          title="Tenant4"
          value={isDemo ? getDemoData('tenant-name') : application.tenant_4_name}
          width="20%"
        />
      </Box>

      <Box display="flex" gap="8px">
        <DetailsCard
          title="Tenant1 Portion of fees"
          value={
            '$' +
            (application.tenant_1_portion_fee
              ? parseFloat(application.tenant_1_portion_fee).toLocaleString('en-US')
              : 0)
          }
          width="20%"
        />

        <DetailsCard
          title="Tenant2 Portion of fees"
          value={
            (application.tenant_2_name &&
              '$' +
                (application.tenant_2_portion_fee
                  ? parseFloat(application.tenant_2_portion_fee).toLocaleString('en-US')
                  : 0)) ||
            ''
          }
          width="20%"
        />

        <DetailsCard
          title="Tenant3 Portion of fees"
          value={
            (application.tenant_3_name &&
              '$' +
                (application.tenant_3_portion_fee
                  ? parseFloat(application.tenant_3_portion_fee).toLocaleString('en-US')
                  : 0)) ||
            ''
          }
          width="20%"
        />

        <DetailsCard
          title="Tenant4 Portion of fees"
          value={
            (application.tenant_4_name &&
              '$' +
                (application.tenant_4_portion_fee
                  ? parseFloat(application.tenant_3_portion_fee).toLocaleString('en-US')
                  : 0)) ||
            ''
          }
          width="20%"
        />
      </Box>
    </Box>
  );
};
