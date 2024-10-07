import { Box } from '@mui/material';
import { styles, colors, Typography, IconGraphy } from '@leapeasy/ui-kit';

export const ReportCard = ({ onClick, title, count }) => {
  return (
    <Box
      sx={{
        '&:hover': { opacity: 0.75 },
        cursor: 'pointer',
        borderRadius: `${styles.borderRadius.large}px`,
        border: `1px solid ${colors.black[300]}`,
        background: 'white',
        overflow: 'hidden',
        flex: '1 1 0%',
      }}
      onClick={onClick}
    >
      <Box padding="8px 16px">
        <Typography variant="body2" style={{ color: colors.neutral[900] }}>
          {title}
        </Typography>
      </Box>

      <Box
        sx={{
          background: '#F9F8F9',
          border: `1px solid ${colors.black[300]}`,
          borderRadius: `${styles.borderRadius.large}px`,
          padding: '16px 16px',
        }}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h3" style={{ color: colors.purple[900], fontWeight: '500' }}>
          {count}
        </Typography>

        <IconGraphy icon="Arrow.NorthEast" style={{ color: '#867B8D' }} />
      </Box>
    </Box>
  );
};
