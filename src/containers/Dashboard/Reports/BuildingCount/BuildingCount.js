import { Box } from '@mui/material';
import { styles, colors, Typography, IconGraphy } from '@leapeasy/ui-kit';
import { useNavigate } from 'react-router-dom';
import { ReportCard } from 'elements/ReportCard';

export const BuildingCount = ({ data }) => {
  const navigate = useNavigate();

  return (
    <Box display="flex" justifyContent="space-between" gap="20px">
      <Box
        sx={{
          '&:hover': { opacity: 0.75 },
          cursor: 'pointer',
          borderRadius: `${styles.borderRadius.large}px`,
          border: `1px solid ${colors.black[300]}`,
          background: 'white',
          overflow: 'hidden',
          flex: '1 1 0%',
          padding: '16px',
        }}
        onClick={() => navigate('/property/buildings')}
      >
        <Box display="flex" gap="24px" alignItems="center">
          <Typography variant="body2" style={{ color: colors.neutral[900] }}>
            Total Buildings
          </Typography>

          <Box sx={{ flexGrow: 1 }} />
          <Typography variant="h3" style={{ fontWeight: '500', color: colors.purple[900] }}>
            {Number(data.totalBuildings).toLocaleString()}
          </Typography>
          <IconGraphy icon="Arrow.NorthEast" style={{ color: '#867B8D' }} />
        </Box>

        <Box display="flex" gap="24px" mt={1}>
          <ReportCard
            title="Entrata Integrated"
            count={Number(data.EPBuildings).toLocaleString()}
            onClick={() => navigate('/property/buildings')}
          />

          <ReportCard
            title="Guarantor Waiver"
            count={Number(data.AEBuidings).toLocaleString()}
            onClick={() => navigate('/property/buildings')}
          />
        </Box>
      </Box>

      <Box
        sx={{
          '&:hover': { opacity: 0.75 },
          cursor: 'pointer',
          borderRadius: `${styles.borderRadius.large}px`,
          border: `1px solid ${colors.black[300]}`,
          background: 'white',
          overflow: 'hidden',
          flex: '1 1 0%',
          padding: '16px',
        }}
        onClick={() => navigate('/property/applications')}
      >
        <Box display="flex" gap="24px" alignItems="center">
          <Typography variant="body2" style={{ color: colors.neutral[900] }}>
            Total Units
          </Typography>

          <Box sx={{ flexGrow: 1 }} />
          <Typography variant="h3" style={{ fontWeight: '500', color: colors.purple[900] }}>
            {Number(data.totalUnits).toLocaleString()}
          </Typography>
          <IconGraphy icon="Arrow.NorthEast" style={{ color: '#867B8D' }} />
        </Box>

        <Box display="flex" gap="24px" mt={1}>
          <ReportCard
            title="Active Units"
            count={Number(data.leapUnits).toLocaleString()}
            onClick={() => navigate('/property/applications')}
          />

          <ReportCard
            title="Inactive Units"
            count={Number(data.totalUnits - data.leapUnits).toLocaleString()}
            onClick={() => navigate('/property/applications')}
          />
        </Box>
      </Box>
    </Box>
  );
};
