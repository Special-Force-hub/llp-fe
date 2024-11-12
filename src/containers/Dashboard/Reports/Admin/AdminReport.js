import React from 'react';
import styled from 'styled-components';
import { Box } from '@mui/material';
import { AllApplicationsChart } from 'elements/Charts/AllApplicationsChart';
import { AppTypeChart } from 'elements/Charts/AppTypeChart';
import { AppPerformanceReview } from 'elements/Charts/AppPerformanceReview';
import { AppDistribution } from 'elements/Charts/AppDistribution';
import { TotalClaimChart } from 'elements/Charts/TotalClaimChart';
import { ClaimPaymentsChart } from 'elements/Charts/ClaimPaymentsChart';
import { ClaimFileStatusChart } from 'elements/Charts/ClaimFileStatusChart';
import { GrossRentChart } from 'elements/Charts/GrossRentChart';
import { ApplicationVolume6MonthsChart } from 'elements/Charts/ApplicationVolume6MonthsChart';
import { ApplicationStageChart } from 'elements/Charts/ApplicationStageChart';
import { DeclinesByReasonChart } from 'elements/Charts/DeclinesByReasonChart';
import { CancellationsByCancellationReasonChart } from 'elements/Charts/CancellationsByCancellationReasonChart';
import { ExpiringPoliciesChart } from 'elements/Charts/ExpiringPoliciesChart';
import { CoverageChart } from 'elements/Charts/CoverageChart';
import { useNavigate } from 'react-router-dom';

export const AdminReport = ({ data }) => {
  const navigate = useNavigate();

  console.log({data})

  return (
    <Box display="flex" flexDirection="column" gap="24px">
      <Type1ChartContainer>
        <PirChartContainer flex="1 1 0%">
          <AllApplicationsChart
            data={data}
            onClickItem={(stage) => {
              navigate('/property/applications');
            }}
          />
        </PirChartContainer>
        <PirChartContainer flex="1 1 0%">
          <AppTypeChart
            data={data}
            onClickItem={(type) => {
              navigate('/property/applications');
            }}
          />
        </PirChartContainer>
      </Type1ChartContainer>

      <AppPerformanceReview data={data} />
      <AppDistribution data={data} />
      {
        data.claimCountsByMonth && 
          <React.Fragment>
            <TotalClaimChart data={data} />
            {/* <ClaimPaymentsChart data={data} />
            <ClaimFileStatusChart data={data} /> */}
          </React.Fragment>
      }

      <Type2ChartContainer>
        <Box flex="1 1 0%">
          <ExpiringPoliciesChart data={data} onClickItem={() => navigate('/property/policies')} />
        </Box>

        <Box flex="1 1 0%">
          <CoverageChart data={data} />
        </Box>
      </Type2ChartContainer>

      {/* <GrossRentChart data={data} /> */}
      {/* <ApplicationVolume6MonthsChart data={data} />
      <ApplicationStageChart data={data} />
      <DeclinesByReasonChart data={data} />
      <CancellationsByCancellationReasonChart data={data} /> */}
    </Box>
  );
};

const Type1ChartContainer = styled(Box)`
  display: flex;
  justify-content: space-between;
  gap: 20px;

  @media screen and (max-width: ${({ theme }) => theme['lg']}) {
    flex-direction: column;
  }
`

export const PirChartContainer = styled.div`
  flex: 1;
  & > div {
    & > div:nth-of-type(2) {
      @media screen and (max-width: ${({ theme }) => theme['md']}) {
        padding: 16px 6px !important;
        & > div {
          flex-direction: column !important;
          & > div:nth-of-type(2) {
            width: 100%;
            * {
              box-sizing: border-box;
            }
          }
        }
      }
    }

    & > div:nth-of-type(3) {
      @media screen and (max-width: ${({ theme }) => theme['md']}) {
        flex-direction: column;
      }
    }
  }
`

export const Type2ChartContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;

  @media screen and (max-width: ${({ theme }) => theme['xl']}) {
    flex-direction: column;
  }

  & > div:nth-of-type(1) {
    & > div {
      & > div:nth-of-type(3) {
        @media screen and (max-width: ${({ theme }) => theme['md']}) {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }

        @media screen and (max-width: ${({ theme }) => theme['sm']}) {
          grid-template-columns: repeat(1, 1fr);
        }
      }
    }
  }

  & > div:nth-of-type(2) {
    & > div {

      & > div:nth-of-type(2) {
        @media screen and (max-width: ${({ theme }) => theme['sm']}) {
          padding: 16px 6px !important;
        }
        & > div {
          @media screen and (max-width: ${({ theme }) => theme['sm']}) {
            flex-direction: column;
            * {
              box-sizing: border-box;
            }
            & > div:nth-of-type(2) {
              width: 100%;
            }
          }
        }
      }
      & > div:nth-of-type(3) {
        @media screen and (max-width: ${({ theme }) => theme['md']}) {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }

        @media screen and (max-width: ${({ theme }) => theme['sm']}) {
          grid-template-columns: repeat(1, 1fr);
        }
      }
    }
  }
`