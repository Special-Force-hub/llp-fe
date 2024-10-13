import { Chart, ChartFooterChard, Typography, colors, IconGraphy } from '@leapeasy/ui-kit';
import { Box } from '@mui/material';

export const ExpiringPoliciesChart = ({ data, onClickItem }) => {
  return (
    <Chart
      variant="bar"
      data={[
        {
          name: '30 days',
          value: 2500,
        },
        {
          name: '60 days',
          value: 5000,
        },
        {
          name: '90 days',
          value: 7500,
        },
        {
          name: '120 days',
          value: 15000,
        },
      ]}
      colors={{
        value: colors.magentaRed[100],
      }}
      title="Expiring Policies"
      description="Here is an overview of policies expiring within the next 30,60, 90, and 120 days."
      chartWidth="100%"
      containerStyles={{ width: '100%' }}
      bodyStyles={{ background: 'white', border: 'none', boxShadow: 'unset' }}
      icon={<IconGraphy icon="FileFolder.RequestQuoteDollar" />}
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
            activeColor={colors.magentaRed[200]}
            title={
              <Box sx={{ px: 1, py: 2 }}>
                <IconGraphy
                  icon="FileFolder.PendingActions"
                  color={colors.magentaRed[200]}
                  style={{ width: '20px', height: '20px' }}
                />
              </Box>
            }
            content={
              <Box sx={{ display: 'flex', gap: '4px', flexDirection: 'column' }}>
                <Typography variant="h4" style={{ fontWeight: '500', color: colors.purple[900] }}>
                  79,605
                </Typography>

                <Typography
                  variant="small"
                  style={{ fontWeight: '500', color: colors.neutral[900] }}
                >
                  {'<'} 30 Days
                </Typography>
              </Box>
            }
            onClick={() => onClickItem('00 - Entrata')}
          />

          <ChartFooterChard
            backgroundColor="#F9F8F9"
            activeColor={colors.magentaRed[200]}
            title={
              <Box sx={{ px: 1, py: 2 }}>
                <IconGraphy
                  icon="FileFolder.PendingActions"
                  color={colors.magentaRed[200]}
                  style={{ width: '20px', height: '20px' }}
                />
              </Box>
            }
            content={
              <Box style={{ display: 'flex', gap: '4px', flexDirection: 'column' }}>
                <Typography variant="h4" style={{ fontWeight: '500', color: colors.purple[900] }}>
                  4,636
                </Typography>

                <Typography
                  variant="small"
                  style={{ fontWeight: '500', color: colors.purple[900] }}
                >
                  31 ~ 60 Days
                </Typography>
              </Box>
            }
            onClick={() => onClickItem('00 - Entrata')}
          />

          <ChartFooterChard
            backgroundColor="#F9F8F9"
            activeColor={colors.magentaRed[200]}
            title={
              <Box sx={{ px: 1, py: 2 }}>
                <IconGraphy
                  icon="FileFolder.PendingActions"
                  color={colors.magentaRed[200]}
                  style={{ width: '20px', height: '20px' }}
                />
              </Box>
            }
            content={
              <Box style={{ display: 'flex', gap: '4px', flexDirection: 'column' }}>
                <Typography variant="h4" style={{ fontWeight: '500', color: colors.purple[900] }}>
                  198,732
                </Typography>

                <Typography
                  variant="small"
                  style={{ fontWeight: '500', color: colors.neutral[900] }}
                >
                  61 ~ 90 Days
                </Typography>
              </Box>
            }
            onClick={() => onClickItem('00 - Entrata')}
          />

          <ChartFooterChard
            backgroundColor="#F9F8F9"
            activeColor={colors.magentaRed[200]}
            title={
              <Box sx={{ px: 1, py: 2 }}>
                <IconGraphy
                  icon="FileFolder.PendingActions"
                  color={colors.magentaRed[200]}
                  style={{ width: '20px', height: '20px' }}
                />
              </Box>
            }
            content={
              <Box style={{ display: 'flex', gap: '4px', flexDirection: 'column' }}>
                <Typography variant="h4" style={{ fontWeight: '500', color: colors.purple[900] }}>
                  198,732
                </Typography>

                <Typography
                  variant="small"
                  style={{ fontWeight: '500', color: colors.neutral[900] }}
                >
                  91 ~ 120 Days
                </Typography>
              </Box>
            }
            onClick={() => onClickItem('00 - Entrata')}
          />
        </Box>
      }
    />
  );
};
