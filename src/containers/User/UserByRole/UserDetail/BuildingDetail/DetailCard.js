import { Box } from '@mui/material';
import { Typography, colors } from '@leapeasy/ui-kit';
import { getDemoData } from 'utils/helpers';
import { DetailsItem } from 'elements/DetailsItem';

export const DetailCard = ({ building, isDemo }) => {
  return (
    <Box
      display={'flex'}
      flexWrap={'wrap'}
      borderRadius={2}
      py={2}
      backgroundColor="rgba(248, 244, 249, 0.48)"
      border="1px solid #F8F4F9"
    >
      <DetailsItem label="Building Type" value={building.building_type.replace(/;/g, ', ')} />
      <DetailsItem label="Phone" value={isDemo ? getDemoData('phone') : building.phone} />
      <DetailsItem
        label="Billing Street"
        value={isDemo ? getDemoData('address-street') : building.billingStreet}
      />
      <DetailsItem
        label="Primary Contact"
        value={isDemo ? getDemoData('tenant-name') : building.primary_contact}
      />
      <DetailsItem
        label="Email Address"
        value={isDemo ? getDemoData('email') : building.email_address}
      />
      <DetailsItem
        label="Landlord Name"
        value={isDemo ? getDemoData('landlord-name') : building.landlord_name}
      />
      <DetailsItem label="Student Housing" value={building.student_housing ? 'Yes' : 'No'} />
      <DetailsItem
        label="Billing State"
        value={isDemo ? getDemoData('address-state') : building.billingState}
        isLastItem
      />
    </Box>
  );
};
