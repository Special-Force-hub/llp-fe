import { Box } from '@mui/material';
import { Typography, colors } from '@leapeasy/ui-kit';
import { getDemoData } from 'utils/helpers';
import { DetailsItem } from 'elements/DetailsItem';

export const DetailCard = ({ application, isDemo }) => {
  return (
    <Box
      display={'flex'}
      flexWrap={'wrap'}
      borderRadius={2}
      py={2}
      backgroundColor="rgba(248, 244, 249, 0.48)"
      border="1px solid #F8F4F9"
    >
      <DetailsItem
        label="Building Type"
        value={(application.building_type || '').replace(/;/g, ', ')}
      />
      <DetailsItem label="Phone" value={isDemo ? getDemoData('phone') : application.phone} />
      <DetailsItem
        label="Billing Street"
        value={isDemo ? getDemoData('address-street') : application.billingStreet}
      />
      <DetailsItem
        label="Primary Contact"
        value={isDemo ? getDemoData('tenant-name') : application.primary_contact}
      />
      <DetailsItem
        label="Email Address"
        value={isDemo ? getDemoData('email') : application.email_address}
      />
      <DetailsItem
        label="Landlord Name"
        value={isDemo ? getDemoData('landlord-name') : application.landlord_name}
      />
      <DetailsItem label="Student Housing" value={application.student_housing ? 'Yes' : 'No'} />
      <DetailsItem
        label="Billing State"
        value={isDemo ? getDemoData('address-state') : application.billingState}
        isLastItem
      />
    </Box>
  );
};
