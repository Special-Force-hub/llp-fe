import { Box } from "@mui/material";
import { Typography, colors } from "@leapeasy/ui-kit";
import { DetailsItem } from 'elements/DetailsItem';

export const DetailEmailCard = ({ email }) => {
  return (
    <Box
      display={'flex'}
      flexWrap={'wrap'}
      borderRadius={2}
      py={2}
      backgroundColor="rgba(248, 244, 249, 0.48)"
      border="1px solid #F8F4F9"
    >
      <DetailsItem label="Email Type" value={email.request_type} />
      <DetailsItem label="From Email" value={email.accepter_email} />
      <DetailsItem
        label="From Role"
        value={email.accepter_role}
      />
      <DetailsItem
        label="To Email"
        value={email.requestor_email}
      />
      <DetailsItem
        label="To Role"
        value={email.requestor_role}
      />
      <DetailsItem
        label="Status"
        value={email.requestor.username}
      />
      <DetailsItem label="Created Date" value={new Date(email.updatedAt).toISOString().slice(0, 10)} />
      <DetailsItem
        label="Number of Building"
        value={email.property.length}
      />
      <DetailsItem label="Decline Reason:" value="--" isLastItem />
    </Box>
  )
}
