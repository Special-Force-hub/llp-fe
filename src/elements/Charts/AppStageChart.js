import { Chart, ChartFooterChard, Typography, colors, IconGraphy } from '@leapeasy/ui-kit';

export const AppStageChart = ({ data, onClickItem }) => {
  const sum =
    data.stage00 + data.stage02A + data.stage04 + data.stage05 + data.stage06 + data.cancelledCount;

  return (
    <Chart
      variant="pie"
      data={[
        {
          name: 'Stage00',
          value: (data.stage00 / sum) * 100,
        },
        {
          name: 'Stage01-02A',
          value: (data.stage02A / sum) * 100,
        },
        {
          name: 'Stage04',
          value: (data.stage04 / sum) * 100,
        },
        {
          name: 'Stage05',
          value: (data.stage05 / sum) * 100,
        },
        {
          name: 'Declined',
          value: (data.stage06 / sum) * 100,
        },
        {
          name: 'Cancelled',
          value: (data.cancelledCount / sum) * 100,
        },
      ]}
      colors={[
        colors.parisGreen[100],
        colors.purpleIrish[100],
        colors.warmBlue[100],
        colors.magentaRed[100],
        colors.sunglow[100],
        colors.tomato[100],
      ]}
      title="All Applications"
      description="Here is an overview of the current status of all applications."
      icon={<IconGraphy icon="FileFolder.TextSnippet" />}
      footer={
        <div style={{ gap: '16px', width: '100%', display: 'flex' }}>
          <div
            style={{
              gap: '8px',
              display: 'flex',
              flexDirection: 'column',
              flexGrow: 1,
            }}
          >
            <ChartFooterChard
              backgroundColor="#ECF9F4"
              activeColor={colors.parisGreen[100]}
              title={
                <Typography variant="h4" style={{ fontWeight: '500', color: colors.purple[900] }}>
                  {Number(data.stage00).toLocaleString()}
                </Typography>
              }
              content={
                <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                  <div
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '3px',
                      background: colors.parisGreen[100],
                    }}
                  />

                  <Typography
                    variant="small"
                    style={{ fontWeight: '500', color: colors.neutral[900] }}
                  >
                    Potential Apps - Stage 00
                  </Typography>
                </div>
              }
              onClick={() => onClickItem('00 - Entrata')}
            />

            <ChartFooterChard
              backgroundColor="#ECECFD"
              activeColor={'#4840E9'}
              title={
                <Typography variant="h4" style={{ fontWeight: '500', color: colors.purple[900] }}>
                  {Number(data.stage04).toLocaleString()}
                </Typography>
              }
              content={
                <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                  <div
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '3px',
                      background: '#4840E9',
                    }}
                  />

                  <Typography
                    variant="small"
                    style={{ fontWeight: '500', color: colors.neutral[900] }}
                  >
                    Pending Payment - Stage 04
                  </Typography>
                </div>
              }
              onClick={() => onClickItem('04 - Agreement Signed')}
            />

            <ChartFooterChard
              backgroundColor="#FFF6E5"
              activeColor="#FFC452"
              title={
                <Typography variant="h4" style={{ fontWeight: '500', color: colors.purple[900] }}>
                  {Number(data.stage06).toLocaleString()}
                </Typography>
              }
              content={
                <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                  <div
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '3px',
                      background: colors.parisGreen[100],
                    }}
                  />

                  <Typography variant="small" style={{ fontWeight: '500', color: '#FFC452' }}>
                    Declined Application
                  </Typography>
                </div>
              }
              onClick={() => onClickItem('06 - Policy Declined')}
            />
          </div>

          <div
            style={{
              gap: '8px',
              display: 'flex',
              flexDirection: 'column',
              flexGrow: 1,
            }}
          >
            <ChartFooterChard
              backgroundColor={colors.purpleIrish[25]}
              activeColor={colors.purpleIrish[100]}
              title={
                <Typography variant="h4" style={{ fontWeight: '500', color: colors.purple[900] }}>
                  {Number(data.stage02A).toLocaleString()}
                </Typography>
              }
              content={
                <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                  <div
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '3px',
                      background: colors.purpleIrish[100],
                    }}
                  />

                  <Typography
                    variant="small"
                    style={{ fontWeight: '500', color: colors.neutral[900] }}
                  >
                    Pending Apps - Stage 01-02A
                  </Typography>
                </div>
              }
              onClick={() => onClickItem('02A - Final Review')}
            />

            <ChartFooterChard
              backgroundColor="#FCF0F8"
              activeColor={'#E66FB7'}
              title={
                <Typography variant="h4" style={{ fontWeight: '500', color: colors.purple[900] }}>
                  {Number(data.stage05).toLocaleString()}
                </Typography>
              }
              content={
                <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                  <div
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '3px',
                      background: '#E66FB7',
                    }}
                  />

                  <Typography
                    variant="small"
                    style={{ fontWeight: '500', color: colors.neutral[900] }}
                  >
                    Policy Issue - Stage 05
                  </Typography>
                </div>
              }
              onClick={() => onClickItem('05 - Policy Issued')}
            />

            <ChartFooterChard
              backgroundColor="#FEF0ED"
              activeColor="#F66B4C"
              title={
                <Typography variant="h4" style={{ fontWeight: '500', color: colors.purple[900] }}>
                  {Number(data.cancelledCount).toLocaleString()}
                </Typography>
              }
              content={
                <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                  <div
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '3px',
                      background: '#F66B4C',
                    }}
                  />

                  <Typography
                    variant="small"
                    style={{ fontWeight: '500', color: colors.neutral[900] }}
                  >
                    Cancelled Application
                  </Typography>
                </div>
              }
              onClick={() => onClickItem('Cancelled Application')}
            />
          </div>
        </div>
      }
    />
  );
};
