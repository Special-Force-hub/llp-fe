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

  return (
    <Box display="flex" flexDirection="column" gap="24px">
      <Box display="flex" justifyContent="space-between" gap="20px">
        <Box flex="1 1 0%">
          <AllApplicationsChart
            data={data}
            onClickItem={(stage) => {
              navigate('/property/applications');
            }}
          />
        </Box>

        <Box flex="1 1 0%">
          <AppTypeChart
            data={data}
            onClickItem={(type) => {
              navigate('/property/applications');
            }}
          />
        </Box>
      </Box>

      <AppPerformanceReview data={data} />
      <AppDistribution data={data} />
      <TotalClaimChart data={data} />
      <ClaimPaymentsChart data={data} />
      <ClaimFileStatusChart data={data} />

      <Box display="flex" justifyContent="space-between" gap="20px">
        <Box flex="1 1 0%">
          <ExpiringPoliciesChart data={data} onClickItem={() => navigate('/property/policies')} />
        </Box>

        <Box flex="1 1 0%">
          <CoverageChart data={data} />
        </Box>
      </Box>

      <GrossRentChart data={data} />
      <ApplicationVolume6MonthsChart data={data} />
      <ApplicationStageChart data={data} />
      <DeclinesByReasonChart data={data} />
      <CancellationsByCancellationReasonChart data={data} />
    </Box>
  );
};
