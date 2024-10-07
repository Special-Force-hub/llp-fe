import { Chart, ChartFooterChard, Typography, colors, IconGraphy } from '@leapeasy/ui-kit';

export const AppTypeChart = ({ data, onClickItem }) => {
  const sum = data.LDRCCount + data.LDRCount + data.RGCount + data.AECount;

  return (
    <Chart
      variant="pie"
      data={[
        {
          name: 'LDR Commercial',
          value: (data.LDRCCount / sum) * 100,
        },
        {
          name: 'LDR',
          value: (data.LDRCount / sum) * 100,
        },
        {
          name: 'Rent Guaranty',
          value: (data.RGCount / sum) * 100,
        },
        {
          name: 'Guarantor Waiver',
          value: (data.AECount / sum) * 100,
        },
      ]}
      containerStyles={{
        height: '100%',
      }}
      colors={[colors.tomato[200], colors.tomato[100], colors.tomato[75], colors.tomato[50]]}
      title="Expired Active Applications Type"
      description="Here is the detailed breakdown of expired active applications by type."
      icon={<IconGraphy icon="FileFolder.TextSnippet" />}
      footer={
        <div style={{ gap: '16px', width: '100%', display: 'flex', flexGrow: 1 }}>
          <div
            style={{
              gap: '12px',
              display: 'flex',
              flexDirection: 'column',
              flexGrow: 1,
            }}
          >
            <ChartFooterChard
              backgroundColor="#F9F8F9"
              activeColor={colors.tomato[200]}
              alignment="space-around"
              title={
                <Typography variant="h4" style={{ fontWeight: '500', color: colors.purple[900] }}>
                  {Number(data.LDRCCount).toLocaleString()}
                </Typography>
              }
              content={
                <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                  <Typography
                    variant="small"
                    style={{ fontWeight: '500', color: colors.neutral[900] }}
                  >
                    LDR Commercial
                  </Typography>
                </div>
              }
              onClick={() => onClickItem('LDR Commercial')}
              style={{ flex: '1 1 0%' }}
            />

            <ChartFooterChard
              backgroundColor="#F9F8F9"
              activeColor={colors.tomato[75]}
              alignment="space-around"
              title={
                <Typography variant="h4" style={{ fontWeight: '500', color: colors.purple[900] }}>
                  {Number(data.RGCount).toLocaleString()}
                </Typography>
              }
              content={
                <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                  <Typography
                    variant="small"
                    style={{ fontWeight: '500', color: colors.neutral[900] }}
                  >
                    Rent Guaranty
                  </Typography>
                </div>
              }
              onClick={() => onClickItem('Rent Guaranty')}
              style={{ flex: '1 1 0%' }}
            />
          </div>

          <div
            style={{
              gap: '12px',
              display: 'flex',
              flexDirection: 'column',
              flexGrow: 1,
            }}
          >
            <ChartFooterChard
              backgroundColor="#F9F8F9"
              activeColor={colors.tomato[100]}
              alignment="space-around"
              title={
                <Typography variant="h4" style={{ fontWeight: '500', color: colors.purple[900] }}>
                  {Number(data.LDRCount).toLocaleString()}
                </Typography>
              }
              content={
                <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                  <Typography
                    variant="small"
                    style={{ fontWeight: '500', color: colors.neutral[900] }}
                  >
                    LDR
                  </Typography>
                </div>
              }
              onClick={() => onClickItem('LDR')}
              style={{ flex: '1 1 0%' }}
            />

            <ChartFooterChard
              backgroundColor="#F9F8F9"
              activeColor={colors.tomato[50]}
              alignment="space-around"
              title={
                <Typography variant="h4" style={{ fontWeight: '500', color: colors.purple[900] }}>
                  {Number(data.AECount).toLocaleString()}
                </Typography>
              }
              content={
                <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                  <Typography
                    variant="small"
                    style={{ fontWeight: '500', color: colors.neutral[900] }}
                  >
                    Guaranty Waiver
                  </Typography>
                </div>
              }
              onClick={() => onClickItem('Auto Enroll')}
              style={{ flex: '1 1 0%' }}
            />
          </div>
        </div>
      }
    />
  );
};
