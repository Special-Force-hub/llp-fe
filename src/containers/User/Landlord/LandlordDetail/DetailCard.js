import { Box } from '@mui/material';
import { Typography, colors, Avatar, IconGraphy } from '@leapeasy/ui-kit';
import { getDemoData } from 'utils/helpers';
import { DetailItem } from './DetailItem';

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
      <Box flexGrow={1} fontWeight={500} borderRight={`1px solid ${colors.purple[200]}`}>
        <Box width="fit-content" marginLeft="20px" paddingTop="2px" whiteSpace="nowrap">
          <Avatar
            size="x-large"
            // iconImage={user.accepter.image ? <img src={user.accepter.image} /> : <IconGraphy icon="Users.User" />}
            iconImage={<IconGraphy icon="Users.User" />}
          />
        </Box>
        <Box width="fit-content" marginLeft="20px" paddingTop="15px" whiteSpace="nowrap">
          <Typography variant="body3" style={{ color: colors.black[600], marginBottom: 8 }}>
            Name
          </Typography>
          <Typography variant="body3" style={{ color: colors.purple[900] }}>
            {building.name}
          </Typography>
        </Box>
        <Box width="fit-content" marginLeft="20px" paddingTop="15px" whiteSpace="nowrap">
          <Typography variant="body3" style={{ color: colors.black[600], marginBottom: 8 }}>
            Account Name
          </Typography>
          <Typography variant="body3" style={{ color: colors.purple[900] }}>
            Test Account
          </Typography>
        </Box>
      </Box>
      <DetailItem label={["Job Title", "Account Type", "Number of Building"]} value={["landlord", "landlord", "12"]} />
      <DetailItem label={["Phone Number", "Email Address", "Primary Contact"]} value={["610-921-0812", "landlord", "12"]} />
      <DetailItem label={["Billing Country", "Billing Postal Code", "Billing State"]} value={["Norman", "landlord", "12"]} />
      <DetailItem label={["Billing Street", "Created Date", "Number of Units"]} value={["232 Buttonwood", "2024-06-04", "12"]} isLastItem />
    </Box>
  );
};
