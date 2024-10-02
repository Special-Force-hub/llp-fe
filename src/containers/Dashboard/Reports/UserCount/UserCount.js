import { Box } from '@mui/material';
import { ReportCard } from 'elements/ReportCard';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

export const UserCount = ({ data }) => {
  const navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem('user'));
  const role = currentUser.role;

  const countByRoles = useMemo(() => {
    const counts = { admin: 0, ll: 0, rm: 0, pm: 0, vp: 0 };

    for (let i = 0; i < data.length; i++) {
      counts[data[i].role]++;
    }

    return counts;
  }, [data]);

  if (role === 'admin' || role === 'll' || role === 'vp' || role === 'rm') {
    return (
      <Box display="flex" justifyContent="space-between" gap="20px">
        {role === 'admin' && (
          <ReportCard
            title="Total Landlords"
            count={Number(countByRoles.ll).toLocaleString()}
            onClick={() => navigate('/user/landlord')}
          />
        )}

        {(role === 'admin' || role === 'll') && (
          <ReportCard
            title="Total Full Portfolio"
            count={Number(countByRoles.vp).toLocaleString()}
            onClick={() => navigate('/user/full-portfolio')}
          />
        )}

        {(role === 'admin' || role === 'll' || role === 'vp') && (
          <ReportCard
            title="Total Multi-Sites"
            count={Number(countByRoles.rm).toLocaleString()}
            onClick={() => navigate('/user/multi-site')}
          />
        )}

        <ReportCard
          title="Total Properties Managers"
          count={Number(countByRoles.pm).toLocaleString()}
          onClick={() => navigate('/user/property')}
        />
      </Box>
    );
  }

  return null;
};
