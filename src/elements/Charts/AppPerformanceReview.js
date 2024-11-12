import { Box } from '@mui/material';
import styled from 'styled-components';
import {
  CustomBarChart,
  CustomDonutChart,
  Typography,
  colors,
  IconGraphy,
  Avatar,
  styles,
} from '@leapeasy/ui-kit';

const AggregationByCategory = ({ category, count, avatar }) => (
  <Box gap="8px" display="flex" alignItems="center">
    {avatar}

    <Box>
      <Typography variant="body3" style={{ color: colors.black[900], fontWeight: '600' }}>
        {Number(count).toLocaleString()}
      </Typography>
      <Typography variant="small" style={{ color: colors.neutral[900], fontWeight: '500' }}>
        {category}
      </Typography>
    </Box>
  </Box>
);

export const AppPerformanceReview = ({ data }) => {
  const sum =
    data.declinedCount +
    data.cancelledCount +
    data.approvedCount +
    data.stage01 +
    data.stage02 +
    data.stage02A +
    data.stage04;

  return (
    <AppPerformanceReviewContainer
      boxShadow={styles.boxShadow.sm}
      borderRadius={`${styles.borderRadius.large}px`}
      border={`1px solid ${colors.black[300]}`}

    >
      <Box display="flex" gap="16px">
        <Avatar size="large" iconImage={<IconGraphy icon="Chart.TableChartView" />} />
        <Box>
          <Typography variant="h4" style={{ color: colors.purple[900], fontWeight: '400' }}>
            Total Application Performance Review
          </Typography>

          <Typography variant="body3" style={{ color: colors.neutral[900], fontWeight: '400' }}>
            Here is an overview of the performance of all applications, categorized by their status.
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          background: '#f9f8f9',
          border: `1px solid ${colors.purple[100]}`,
          borderRadius: '8px',
          padding: '16px',
          width: '100%',
          boxSizing: 'border-box',
        }}
        display="flex"
        gap="20px"
      >
        {/* First graph */}
        <Box
          sx={{
            flex: '1.8 1 0%',
            background: 'white',
            border: `1px solid ${colors.black[200]}`,
            borderRadius: `${styles.borderRadius.large}px`,
            padding: '20px',
            boxSizing: 'border-box',
          }}
          display="flex"
          flexDirection="column"
          gap="24px"
        >
          <Box padding="0px 20px" display="flex" justifyContent="space-between">
            <AggregationByCategory
              count={data.declinedCount}
              category="Declined"
              avatar={
                <Avatar
                  size="medium"
                  iconImage={<IconGraphy icon="FileFolder.ContentWarning" />}
                  bgColor="#FFF6E5"
                  color="#FFC452"
                />
              }
            />
            <AggregationByCategory
              count={data.cancelledCount}
              category="Cancelled"
              avatar={
                <Avatar
                  size="medium"
                  iconImage={<IconGraphy icon="FileFolder.ContentCancel" />}
                  bgColor="#FEF0ED"
                  color="#F66B4C"
                />
              }
            />
            <AggregationByCategory
              count={data.approvedCount}
              category="Approved - Policy Issued"
              avatar={
                <Avatar
                  size="medium"
                  iconImage={<IconGraphy icon="FileFolder.Inventory" />}
                  bgColor="#ECF9F4"
                  color="#46C891"
                />
              }
            />
            <AggregationByCategory
              count={data.stage01 + data.stage02 + data.stage02A + data.stage04}
              category="Pending Applications"
              avatar={
                <Avatar
                  size="medium"
                  iconImage={<IconGraphy icon="FileFolder.ContentPasteSearch" />}
                  color="#64209A"
                  bgColor="#EFE8F5"
                />
              }
            />
          </Box>
          <CustomBarChart
            chartWidth="100%"
            chartHeight={200}
            data={data.appChartData2}
            colors={{
              Pending: '#64209A',
              Approved: '#46C891',
              Declined: '#FFC452',
              Cancelled: '#F66B4C',
            }}
          />
        </Box>
        {/* second graph */}
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
          alignItems="center"
          justifyContent="center"
        >
          <CustomDonutChart
            chartWidth={200}
            chartHeight={200}
            data={[
              {
                name: 'Stage01-04',
                value: ((data.stage01 + data.stage02 + data.stage02A + data.stage04) / sum) * 100,
              },
              {
                name: 'Approved',
                value: (data.approvedCount / sum) * 100,
              },
              {
                name: 'Declined',
                value: (data.declinedCount / sum) * 100,
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
            title="Total application"
            description={Number(data.totalCount).toLocaleString()}
          />
        </Box>
      </Box>
    </AppPerformanceReviewContainer>
  );
};


const AppPerformanceReviewContainer = styled.div`
  width: 100%;
  padding: 16px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 12px;
  box-shadow: ${(props) => props.boxShadow};
  border-radius: ${(props => props.borderRadius)};
  border: ${(props) => props.border};
  @media screen and (max-width: ${({theme}) => theme.sm}) {
    & > div:nth-of-type(2) {
      padding: 0;
    }
  }

  & > div:nth-of-type(2) {
    @media screen and (max-width: ${({theme}) => theme.lg}) {
      flex-direction: column;
    }
    & > div:nth-of-type(1) {
      @media screen and (max-width: ${({theme}) => theme.md}) {
        & > div:nth-of-type(1) {
          display: grid;
          grid-template-columns: auto auto;
          gap: 20px;
          & > div {
            width: 100%;
          }
        }
      }

      @media screen and (max-width: ${({theme}) => theme.sm}) {
        padding: 10px;
        & > div:nth-of-type(1) {
          display: flex;
          flex-direction: column;
          gap: 10px;
          & > div {
            width: 100%;
          }
        }
      }
    }

    & > div:nth-of-type(2) {
      @media screen and (max-width: ${({theme}) => theme.sm}) {
        & > div {
          flex-direction: column;
        }
      }
    }
  }
`