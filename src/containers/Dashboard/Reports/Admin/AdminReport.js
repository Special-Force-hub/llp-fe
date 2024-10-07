import { Box } from '@mui/material';
import { AppStageChart } from 'elements/Charts/AppStageChart';
import { AppTypeChart } from 'elements/Charts/AppTypeChart';
import { AppPerformanceReview } from 'elements/Charts/AppPerformanceReview';
import { AppDistribution } from 'elements/Charts/AppDistribution';
import { TotalClaimChart } from 'elements/Charts/TotalClaimChart';
import { ClaimPaymentsChart } from 'elements/Charts/ClaimPaymentsChart';
import { ClaimFileStatusChart } from 'elements/Charts/ClaimFileStatusChart';
import { useNavigate } from 'react-router-dom';

export const AdminReport = ({ data }) => {
  const navigate = useNavigate();

  return (
    <Box display="flex" flexDirection="column" gap="24px">
      <Box display="flex" justifyContent="space-between" gap="20px">
        <Box flex="1 1 0%">
          <AppStageChart
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
    </Box>
  );
};
