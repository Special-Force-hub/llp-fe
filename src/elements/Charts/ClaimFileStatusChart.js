import { Chart, ChartFooterChard, Typography, colors, IconGraphy } from '@leapeasy/ui-kit';

const claimFileStatuses = {
  open_test_claim: 'Open Claim - Test Claim',
  open_pending_decision: 'Open - Pending Decision',
  open_pending_payment: 'Open - Pending Payment',
  closed_denied: 'Closed - Claim Denied',
  closed_paid: 'Closed - Claim Paid',
  closed_incident_only: 'Closed - Incident Only',
  closed_partial_denial: 'Closed - Partial Denial',
  closed_duplicate: 'Closed Claim - Duplicate',
  closed_inactive: 'Closed Claim - Inactive',
  incident_only: 'Incident Only',
};

export const ClaimFileStatusChart = ({ data, onClickItem }) => {
  const monthlyAggregates =
    data.claimCountsByMonth ||
    ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(
      (month) => ({
        year: 2024,
        month,
        total: 10,
        closed_partial_denial: 1,
        closed_duplicate: 2,
        incident_only: 1,
        closed_paid: 2,
        open_test_claim: 1,
        closed_denied: 2,
        open_pending_payment: 1,
        closed_inactive: 0,
        open_pending_decision: 0,
        closed_incident_only: 0,
      }),
    );

  const totalClaims = {};
  let sum = 0;

  for (const aggregate of monthlyAggregates) {
    for (let key in claimFileStatuses) {
      if (!totalClaims[key]) {
        totalClaims[key] = 0;
      }

      totalClaims[key] += aggregate[key];
      sum += aggregate[key];
    }
  }

  return (
    <Chart
      variant="pie"
      data={Object.keys(totalClaims).map((statusKey) => ({
        name: claimFileStatuses[statusKey],
        value: (totalClaims[statusKey] / sum) * 100,
      }))}
      colors={[
        colors.parisGreen[100],
        colors.purpleIrish[100],
        colors.warmBlue[100],
        colors.magentaRed[100],
        colors.sunglow[100],
        colors.tomato[100],
        colors.tomato[200],
        colors.sunglow[200],
        colors.warmBlue[200],
        colors.magentaRed[200],
      ]}
      chartWidth={500}
      title="Claim File Status"
      description="This section provides a comprehensive breakdown of claims file status, showing the distribution across various categories."
      icon={<IconGraphy icon="FileFolder.Description" />}
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
                  {Number(totalClaims.open_test_claim).toLocaleString()}
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
                    Open Claim - Test Claim
                  </Typography>
                </div>
              }
              onClick={() => onClickItem('00 - Entrata')}
            />

            <ChartFooterChard
              backgroundColor={colors.tomato[25]}
              activeColor={colors.tomato[100]}
              title={
                <Typography variant="h4" style={{ fontWeight: '500', color: colors.purple[900] }}>
                  {Number(totalClaims.closed_incident_only).toLocaleString()}
                </Typography>
              }
              content={
                <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                  <div
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '3px',
                      background: colors.tomato[100],
                    }}
                  />

                  <Typography
                    variant="small"
                    style={{ fontWeight: '500', color: colors.neutral[900] }}
                  >
                    Closed - Incident Only
                  </Typography>
                </div>
              }
              onClick={() => onClickItem('04 - Agreement Signed')}
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
                    Open - Pending Decision
                  </Typography>
                </div>
              }
              onClick={() => onClickItem('02A - Final Review')}
            />

            <ChartFooterChard
              backgroundColor={colors.parisGreen[25]}
              activeColor={colors.parisGreen[100]}
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
                      background: colors.parisGreen[100],
                    }}
                  />

                  <Typography
                    variant="small"
                    style={{ fontWeight: '500', color: colors.neutral[900] }}
                  >
                    Closed - Partial Denial
                  </Typography>
                </div>
              }
              onClick={() => onClickItem('05 - Policy Issued')}
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
              backgroundColor={colors.warmBlue[25]}
              activeColor={colors.warmBlue[100]}
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
                      background: colors.warmBlue[100],
                    }}
                  />

                  <Typography
                    variant="small"
                    style={{ fontWeight: '500', color: colors.neutral[900] }}
                  >
                    Open - Pending Payment
                  </Typography>
                </div>
              }
              onClick={() => onClickItem('00 - Entrata')}
            />

            <ChartFooterChard
              backgroundColor={colors.sunglow[50]}
              activeColor={colors.sunglow[100]}
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
                      background: colors.sunglow[100],
                    }}
                  />

                  <Typography
                    variant="small"
                    style={{ fontWeight: '500', color: colors.neutral[900] }}
                  >
                    Closed Claim - Duplicate
                  </Typography>
                </div>
              }
              onClick={() => onClickItem('04 - Agreement Signed')}
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
              backgroundColor={colors.magentaRed[25]}
              activeColor={colors.magentaRed[100]}
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
                      background: colors.magentaRed[100],
                    }}
                  />

                  <Typography
                    variant="small"
                    style={{ fontWeight: '500', color: colors.neutral[900] }}
                  >
                    Closed - Claim Denied
                  </Typography>
                </div>
              }
              onClick={() => onClickItem('02A - Final Review')}
            />

            <ChartFooterChard
              backgroundColor={colors.warmBlue[50]}
              activeColor={colors.warmBlue[100]}
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
                      background: colors.warmBlue[100],
                    }}
                  />

                  <Typography
                    variant="small"
                    style={{ fontWeight: '500', color: colors.neutral[900] }}
                  >
                    Closed Claim Inactive
                  </Typography>
                </div>
              }
              onClick={() => onClickItem('05 - Policy Issued')}
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
              backgroundColor={colors.sunglow[25]}
              activeColor={colors.sunglow[100]}
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
                      background: colors.sunglow[100],
                    }}
                  />

                  <Typography
                    variant="small"
                    style={{ fontWeight: '500', color: colors.neutral[900] }}
                  >
                    Closed - Claim Paid
                  </Typography>
                </div>
              }
              onClick={() => onClickItem('02A - Final Review')}
            />

            <ChartFooterChard
              backgroundColor={colors.magentaRed[50]}
              activeColor={colors.magentaRed[100]}
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
                      background: colors.magentaRed[100],
                    }}
                  />

                  <Typography
                    variant="small"
                    style={{ fontWeight: '500', color: colors.neutral[900] }}
                  >
                    Incident Only
                  </Typography>
                </div>
              }
              onClick={() => onClickItem('05 - Policy Issued')}
            />
          </div>
        </div>
      }
      labelColumnCount={2}
    />
  );
};
