import { Box } from '@mui/material';
import { Typography, colors } from '@leapeasy/ui-kit';

export const DetailsItem = ({ label, value, isLastItem = false }) => (
  <Box flexGrow={1} fontWeight={500} borderRight={!isLastItem && `1px solid ${colors.purple[200]}`}>
    <Box width="fit-content" margin="auto" whiteSpace="nowrap">
      <Typography variant="body3" style={{ color: colors.black[600], marginBottom: 8 }}>
        {label}
      </Typography>
      <Typography variant="body3" style={{ color: colors.purple[900] }}>
        {value}
      </Typography>
    </Box>
  </Box>
);
