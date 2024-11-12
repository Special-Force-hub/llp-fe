import { Chart, ChartFooterChard, Typography, colors, IconGraphy } from '@leapeasy/ui-kit';
import { Box } from '@mui/material';

export const CoverageChart = ({ data, onClickItem }) => {
  const { RGCoverage, LDRCoverage } = data;

  return (
    <Chart
      variant="pie"
      data={[
        {
          name: 'Rent Guaranty',
          value: (RGCoverage / (RGCoverage + LDRCoverage)) * 100,
        },
        {
          name: 'LDR',
          value: (LDRCoverage / (RGCoverage + LDRCoverage)) * 100,
        },
      ]}
      colors={[colors.parisGreen[100], colors.parisGreen[50]]}
      title="Coverage"
      description="Here is an overview of coverage types and their respective proportions."
      icon={<IconGraphy icon="FileFolder.TextSnippet" />}
      footer={
        <Box
          sx={{
            gap: '16px',
            width: '100%',
            display: 'flex',
            '& > *': { flexGrow: 1 },
          }}
        >
          <ChartFooterChard
            backgroundColor="#F9F8F9"
            activeColor={colors.parisGreen[200]}
            title={
              <Box sx={{ px: 1, py: 2 }}>
                <IconGraphy
                  icon="Finance.AttachMoney"
                  color={colors.parisGreen[200]}
                  style={{ width: '20px', height: '20px' }}
                />
              </Box>
            }
            content={
              <Box sx={{ display: 'flex', gap: '4px', flexDirection: 'column' }}>
                <Typography variant="h4" style={{ fontWeight: '500', color: colors.purple[900] }}>
                  {Number(RGCoverage).toLocaleString()}
                </Typography>

                <Typography
                  variant="small"
                  style={{ fontWeight: '500', color: colors.neutral[900] }}
                >
                  Rent Guaranty
                </Typography>
              </Box>
            }
            // onClick={() => onClickItem('00 - Entrata')}
          />

          <ChartFooterChard
            backgroundColor="#F9F8F9"
            activeColor={colors.parisGreen[200]}
            title={
              <Box sx={{ px: 1, py: 2 }}>
                <IconGraphy
                  icon="Finance.AttachMoney"
                  color={colors.parisGreen[200]}
                  style={{ width: '20px', height: '20px' }}
                />
              </Box>
            }
            content={
              <Box sx={{ display: 'flex', gap: '4px', flexDirection: 'column' }}>
                <Typography variant="h4" style={{ fontWeight: '500', color: colors.purple[900] }}>
                  {Number(LDRCoverage).toLocaleString()}
                </Typography>

                <Typography
                  variant="small"
                  style={{ fontWeight: '500', color: colors.neutral[900] }}
                >
                  LDR
                </Typography>
              </Box>
            }
            onClick={() => onClickItem('04 - Agreement Signed')}
          />

          <ChartFooterChard
            backgroundColor="#F9F8F9"
            activeColor={colors.parisGreen[200]}
            title={
              <Box sx={{ px: 1, py: 2 }}>
                <IconGraphy
                  icon="Finance.AttachMoney"
                  color={colors.parisGreen[200]}
                  style={{ width: '20px', height: '20px' }}
                />
              </Box>
            }
            content={
              <Box sx={{ display: 'flex', gap: '4px', flexDirection: 'column' }}>
                <Typography variant="h4" style={{ fontWeight: '500', color: colors.purple[900] }}>
                  {Number(LDRCoverage + RGCoverage).toLocaleString()}
                </Typography>

                <Typography
                  variant="small"
                  style={{ fontWeight: '500', color: colors.neutral[900] }}
                >
                  RG + LDR
                </Typography>
              </Box>
            }
            onClick={() => onClickItem('06 - Policy Declined')}
          />
        </Box>
      }
    />
  );
};
