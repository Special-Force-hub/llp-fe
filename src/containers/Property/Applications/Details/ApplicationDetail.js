import React, { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayoutContainer } from 'components/Layouts/DashboardLayout';
import { Box } from '@mui/material';
import { IconGraphy, Typography, colors } from '@leapeasy/ui-kit';
import { DetailCard } from './DetailCard';
import { RiderDetails } from './RiderDetails';
import { TenantDetails } from './TenantDetails';
import { useDispatch, useSelector } from 'react-redux';
import { openDetails } from 'store/actions/uiActions';

export const ApplicationDetail = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isDemo = useSelector((state) => state.getIn(['ui', 'demo']));
  const details = useSelector((state) => state.getIn(['ui', 'details'])) || null;
  const detailsJSON = details ? details.toJS() : null;

  const onClickBack = useCallback(() => {
    dispatch(openDetails(null));

    setTimeout(() => {
      navigate('/property/applications');
    });
  }, []);

  useEffect(() => {
    const detailsJSON = details ? details.toJS() : null;
    if (!details || detailsJSON.type !== 'application') {
      onClickBack();
      return;
    }
  }, [onClickBack, details]);

  if (!detailsJSON) return <DashboardLayoutContainer />;

  const application = detailsJSON.data;

  return (
    <DashboardLayoutContainer shouldShowCard={false}>
      <Box
        padding="24px"
        gap="10px"
        display="flex"
        flexDirection="column"
        border="1px solid #EAEAEA"
        sx={{ background: 'white' }}
        borderRadius="12px"
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '16px',
          }}
        >
          <Box sx={{ cursor: 'pointer', '&:hover': { opacity: 0.75 } }}>
            <IconGraphy icon="Arrow.ArrowBack" onClick={onClickBack} />
          </Box>
          <Typography
            variant="h3"
            style={{ color: colors.purple[900], fontWeight: '500', padding: '5px 5px 5px 15px' }}
          >
            {application.name}
          </Typography>
        </Box>

        <DetailCard application={application} isDemo={isDemo} />
      </Box>

      <Box borderRadius="12px" sx={{ border: '1px solid #EAEAEA', background: 'white' }} mt={1}>
        <RiderDetails application={application} isDemo={isDemo} />
      </Box>

      <Box borderRadius="12px" sx={{ border: '1px solid #EAEAEA', background: 'white' }} mt={1}>
        <TenantDetails application={application} isDemo={isDemo} />
      </Box>
    </DashboardLayoutContainer>
  );
};
