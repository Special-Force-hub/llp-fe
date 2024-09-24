import { useSelector, useDispatch } from 'react-redux';
import { AuthLayoutContainer } from 'components/Layouts/AuthLayout';
import { Typography, Input, Button, IconGraphy, colors, styles, Alert } from '@leapeasy/ui-kit';
import { Box } from '@mui/material';
import { useCallback, useState, useEffect } from 'react';
import { findInviteDataAction } from 'store/actions/authActions';
import { useNavigate } from 'react-router-dom';
import { setError, setInviteData } from 'store/actions/authActions';
import { InviteResend } from './InviteResend';
import validator from 'validator';

export const LostInvite = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const loading = useSelector((state) => state.getIn(['auth', 'loading']));
  const error = useSelector((state) => state.getIn(['auth', 'error']));
  const inviteData = useSelector((state) => state.getIn(['auth', 'inviteData']));

  const isEmailValid = validator.isEmail(email);

  useEffect(() => {
    dispatch(setError(''));
    dispatch(setInviteData(null));
  }, []);

  const onClickResend = useCallback(() => {
    dispatch(findInviteDataAction({ email }));
  }, [email]);

  if (inviteData) {
    return <InviteResend />;
  }

  return (
    <AuthLayoutContainer showGrayLogo>
      <Button
        variant="tertiary"
        style={{
          width: 'fit-content',
          paddingLeft: '12px',
          paddingRight: '12px',
        }}
        onClick={() => {
          navigate('/login');
        }}
      >
        <IconGraphy icon="Arrow.ArrowBack" width={11} height={11} />
        Back
      </Button>

      <Box
        sx={{
          mt: `${styles.spacing.space10}px`,
          flexDirection: 'column',
          display: 'flex',
          gap: '24px',
          mb: '8px',
        }}
      >
        <Box>
          <Typography variant="h2" style={{ color: colors.purple[900], fontWeight: '500' }}>
            Find your invite
          </Typography>

          <Typography variant="body1" style={{ color: colors.neutral[900], fontWeight: '400' }}>
            Enter your email to resend your invitation
          </Typography>
        </Box>

        <Box sx={{ border: '1px solid #F8F4F9', height: '0px' }} />

        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          minWidth="100%"
          label="Email"
          fullWidth
          size="medium"
          icon={<IconGraphy icon="Notifications.Email" />}
          errorType={!email || isEmailValid ? 'none' : 'error'}
          helperMessage={!isEmailValid && email ? 'Please enter a valid email' : ''}
          showCopy={false}
          showHelperOnTyping={false}
        />
      </Box>

      {error && (
        <Box sx={{ mb: '16px' }}>
          <Alert
            type="error"
            variant="contained"
            showBorder
            description={error}
            showClose={false}
          />
        </Box>
      )}

      <Button
        variant="primary"
        size="medium"
        onClick={onClickResend}
        style={{ minWidth: '100%' }}
        disabled={loading || !email || !isEmailValid}
      >
        Send Invitation
      </Button>
    </AuthLayoutContainer>
  );
};
