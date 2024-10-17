import { Box } from '@mui/material';
import { getDemoData } from 'utils/helpers';
import { DetailsItem } from 'elements/DetailsItem';

export const DetailCard = ({ application, isDemo }) => {
  return (
    <Box
      display="flex"
      flexWrap="wrap"
      borderRadius={2}
      py={2}
      backgroundColor="rgba(248, 244, 249, 0.48)"
      border="1px solid #F8F4F9"
    >
      <DetailsItem
        label="Account Name"
        value={isDemo ? application.tenant_1_name : getDemoData('tenant-name')}
      />
      <DetailsItem label="Stage" value={application.stage} />
      <DetailsItem label="Months Remaining" value={parseInt(application.months_remaining, 10)} />
      <DetailsItem label="Active Lease" value={application.active_lease} />
      <DetailsItem label="Application Type" value={application.app_type} />
      <DetailsItem
        label="Landlord Name"
        value={isDemo ? application.lanlord_account_name : getDemoData('landlord-name')}
      />
      <DetailsItem
        label="Created Date"
        value={new Date(application.sf_createdDate).toISOString().slice(0, 10)}
        isLastItem
      />
    </Box>
  );
};
