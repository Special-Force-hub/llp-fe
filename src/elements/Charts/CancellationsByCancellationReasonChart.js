import { Box, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { CustomDonutChart, Typography, colors, IconGraphy, Avatar, styles } from '@leapeasy/ui-kit';

function createData(stageNumber, stage, app, percent, background, color) {
  return {
    stageNumber,
    stage,
    app,
    percent,
    background,
    color,
  };
}

export const CancellationsByCancellationReasonChart = ({ data }) => {
  const {
    accidentalCancelCount,
    feeCancelCount,
    cosignerCancelCount,
    verifyCancelCount,
    noresponseCancelCount,
    depositCancelCount,
    testCancelCount,
    otherCancelCount,
    cancelledCount,
  } = data;
  const cancelReasonColors = [
    colors.parisGreen[100],
    colors.purpleIrish[100],
    colors.warmBlue[100],
    colors.blue[600],
    colors.sunglow[100],
    colors.tomato[100],
    colors.magentaRed[100],
    colors.purple[100],
  ];

  const cancellationReasonList = [
    createData(
      1,
      'Accidental Application',
      accidentalCancelCount,
      accidentalCancelCount / cancelledCount,
      colors.parisGreen[50],
      colors.parisGreen[200],
    ),
    createData(
      2,
      'Cannot afford fee',
      feeCancelCount,
      feeCancelCount / cancelledCount,
      colors.purpleIrish[50],
      colors.purpleIrish[200],
    ),
    createData(
      3,
      'Found own cosigner',
      cosignerCancelCount,
      cosignerCancelCount / cancelledCount,
      colors.warmBlue[50],
      colors.warmBlue[200],
    ),
    createData(
      4,
      'Cannot Verify Documentation',
      verifyCancelCount,
      verifyCancelCount / cancelledCount,
      colors.blue[200],
      colors.blue[600],
    ),
    createData(
      5,
      'No Response',
      noresponseCancelCount,
      noresponseCancelCount / cancelledCount,
      colors.sunglow[50],
      colors.sunglow[200],
    ),
    createData(
      6,
      'Paid additional deposit',
      depositCancelCount,
      depositCancelCount / cancelledCount,
      colors.tomato[50],
      colors.tomato[200],
    ),
    createData(
      7,
      'Test Application',
      testCancelCount,
      testCancelCount / cancelledCount,
      colors.magentaRed[50],
      colors.magentaRed[200],
    ),
    createData(
      8,
      'Other',
      otherCancelCount,
      otherCancelCount / cancelledCount,
      colors.purple[100],
      colors.purple[600],
    ),
    createData(9, 'Total', cancelledCount, 1, '#F3F1F4', 'black'),
  ];

  return (
    <Box
      sx={{
        boxShadow: styles.boxShadow.sm,
        borderRadius: `${styles.borderRadius.large}px`,
        border: `1px solid ${colors.black[300]}`,
        width: '100%',
        padding: '16px',
        boxSizing: 'border-box',
      }}
      display="flex"
      flexDirection="column"
      gap="12px"
    >
      <Box display="flex" gap="16px">
        <Avatar size="large" iconImage={<IconGraphy icon="EditorLayout.AutoAwesomeMotion" />} />
        <Box>
          <Typography variant="h4" style={{ color: colors.purple[900], fontWeight: '400' }}>
            Cancellations by Cancellation Reason
          </Typography>

          <Typography variant="body3" style={{ color: colors.neutral[900], fontWeight: '400' }}>
            Breakdown of application cancellations by reason, showing the total number and
            percentage for each category.
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          background: 'rgba(249, 248, 249, 0.8)',
          border: `1px solid ${colors.purple[100]}`,
          borderRadius: '8px',
          padding: '16px',
          width: '100%',
          boxSizing: 'border-box',
        }}
        display="flex"
        gap="20px"
      >
        <Box
          sx={{
            flex: '1.8 1 0%',
            background: 'white',
            border: `1px solid ${colors.black[200]}`,
            borderRadius: `${styles.borderRadius.large}px`,
            boxSizing: 'border-box',
          }}
          display="flex"
          flexDirection="column"
          gap="24px"
        >
          <Table>
            <TableHead sx={{ background: '#F9F8F9' }}>
              <TableRow>
                <TableCell></TableCell>
                <TableCell variant="head" className="p-2">
                  Stage
                </TableCell>
                <TableCell variant="head" className="p-2">
                  #Apps
                </TableCell>
                <TableCell variant="head" className="p-2">
                  Total %
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cancellationReasonList.map((n, index) => [
                <TableRow key={n.id}>
                  <TableCell>
                    <Box
                      sx={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '4px',
                        background: n.background,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <Typography variant="small" style={{ fontWeight: '700', color: n.color }}>
                        {n.stageNumber}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="small" style={{ fontWeight: '500' }}>
                      {n.stage}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="small" style={{ fontWeight: '500' }}>
                      {n.app}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="small" style={{ fontWeight: '500' }}>
                      {n.stage !== 'Total' ? (n.percent * 100).toFixed(2) : 100}%
                    </Typography>
                  </TableCell>
                </TableRow>,
              ])}
            </TableBody>
          </Table>
        </Box>

        <Box
          sx={{
            flex: '1 1 0%',
            background: 'white',
            border: `1px solid ${colors.black[200]}`,
            borderRadius: `${styles.borderRadius.large}px`,
            padding: '20px',
            boxSizing: 'border-box',
          }}
          display="flex"
          justifyContent="center"
          flexDirection="column"
          gap="20px"
        >
          <CustomDonutChart
            chartWidth={250}
            chartHeight={250}
            data={cancellationReasonList
              .filter((reason) => reason.stage !== 'Total')
              .map((reason) => ({
                name: reason.stage,
                value: (reason.app / cancelledCount) * 100,
              }))}
            isPercentageValue={true}
            colors={cancelReasonColors}
            title=""
            description={''}
          />
        </Box>
      </Box>
    </Box>
  );
};
