import { AuthLayoutContainer } from 'components/Layouts/AuthLayout';
import { Typography, Input, Button, IconGraphy, colors, styles } from '@leapeasy/ui-kit';
import { Box } from '@mui/material';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { setResetResult } from 'store/actions/authActions';
import { useDispatch } from 'react-redux';

export const CheckEmail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onClickResend = useCallback((e) => {
    dispatch(setResetResult(''));
    e.preventDefault();
  }, []);

  return (
    <AuthLayoutContainer showGrayLogo>
      <Box display="flex" flexDirection="column" gap="24px">
        <Box
          sx={{
            width: 128,
            height: 128,
            borderRadius: '50%',
            background: colors.purple[100],
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <IconGraphy
            icon="Notifications.MarkMailRead"
            width={63}
            height={54}
            style={{ color: colors.purple[700] }}
          />
        </Box>

        <Box display="flex" flexDirection="column" gap="12px">
          <Typography variant="h2" style={{ fontWeight: 500, color: colors.purple[900] }}>
            Check your email for reset password
          </Typography>

          <Typography variant="body1" style={{ color: colors.neutral[900], fontWeight: '400' }}>
            If you haven't received an email within 5 minutes, check your spam folder or{' '}
            <a href="/" onClick={onClickResend}>
              click here
            </a>{' '}
            to resend.
          </Typography>
        </Box>

        <Box sx={{ border: '1px solid #F8F4F9', height: '0px' }} />

        <Button
          variant="primary"
          size="medium"
          onClick={() => {
            navigate('/login');
          }}
          style={{ minWidth: '100%' }}
        >
          Back to Log in
        </Button>
      </Box>
    </AuthLayoutContainer>
  );
};
