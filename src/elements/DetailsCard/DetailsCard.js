import { Box } from '@mui/material';
import { Typography, colors } from '@leapeasy/ui-kit';

export const DetailsCard = ({ title, value, width = '16.6%', direction = 'column' }) => (
  <Box
    sx={{
      background: '#F9F8F9',
      border: `1px solid ${colors.black[200]}`,
    }}
    boxSizing="border-box"
    flexShrink={1}
    width={width}
    padding="8px 12px"
    gap="4px"
    borderRadius="8px"
    display="flex"
    flexDirection={direction}
  >
    <Typography variant="body2" style={{ fontWeight: '600', color: colors.purple[900] }}>
      {value}
    </Typography>

    <Typography variant="body3" style={{ fontWeight: '500', color: colors.neutral[900] }}>
      {title}
    </Typography>
  </Box>
);
