import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayoutContainer } from 'components/Layouts/DashboardLayout';
import { Box, Grid } from '@mui/material';
import { IconGraphy, Typography, colors } from '@leapeasy/ui-kit';
import { DetailCard } from './DetailCard';
import { useDispatch, useSelector } from 'react-redux';

export const ApplicationDetail = (props) => {
  const navigate = useNavigate();

  const isDemo = useSelector((state) => state.getIn(['ui', 'demo']));

  return (
    <DashboardLayoutContainer>
      <Box>
        <Box
          sx={{
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            marginBottom: '15px',
          }}
          onClick={() => navigate(-1)}
        >
          <IconGraphy icon="Arrow.ArrowBack" />
          <Typography
            variant="h3"
            style={{ color: colors.purple[900], fontWeight: '500', padding: '5px 5px 5px 15px' }}
          >
            Shaun Ray Miles
          </Typography>
        </Box>

        <Box
          sx={{
            marginBottom: '10px',
            padding: '24px',
            borderRadius: `12px`,
            background: 'white',
            border: `1px solid ${colors.black[300]}`,
          }}
        >
          <DetailCard application={{}} isDemo={true} />
        </Box>

        <Box
          sx={{
            margin: '',
            padding: '24px',
            borderRadius: `12px`,
            background: 'white',
            border: `1px solid ${colors.black[300]}`,
          }}
        >
          <Box color={'#2E0F40'} fontSize={20} fontWeight={400} marginBottom={2}>
            <Typography>Rider Details</Typography>
          </Box>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
            {Array.from(Array(16)).map((_, index) => (
              <Grid item xs={6} sm={4} md={3} xl={2} key={index}>
                <Box backgroundColor="#F9F8F9" borderRadius={1} padding={'8px 12px'}>
                  <Typography
                    style={{ color: '#2E0F40', marginBottom: 8, fontWeight: 600, fontSize: 14 }}
                  >
                    LEAP-2855173
                  </Typography>
                  <Typography style={{ color: '#6A5E71', fontSize: 12 }}>Policy ID</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box
          sx={{
            marginTop: '10px',
            padding: '24px',
            borderRadius: `12px`,
            background: 'white',
            border: `1px solid ${colors.black[300]}`,
          }}
        >
          <Box color={'#2E0F40'} fontSize={20} fontWeight={400} marginBottom={2}>
            <Typography>Tenant Information</Typography>
          </Box>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
            {Array.from(Array(5)).map((_, index) => (
              <Grid item xs={6} sm={4} md={3} xl={2.4} key={index}>
                <Box backgroundColor="#F9F8F9" borderRadius={1} padding={'8px 12px'}>
                  <Typography
                    style={{ color: '#2E0F40', marginBottom: 8, fontWeight: 600, fontSize: 14 }}
                  >
                    Alex
                  </Typography>
                  <Typography style={{ color: '#6A5E71', fontSize: 12 }}>Tenant Name</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </DashboardLayoutContainer>
  );
};
