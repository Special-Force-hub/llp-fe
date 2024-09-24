import { AuthLayoutContainer } from 'components/Layouts/AuthLayout';
import { Typography, Button, IconGraphy, colors, Input } from '@leapeasy/ui-kit';
import { Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useState, useEffect, useRef } from 'react';
import { verify2FACode, mfaUpdateResult, send2FACode } from 'store/actions/authActions';

export const Otp = ({ target, onBack, onSuccess }) => {
  const dispatch = useDispatch();

  const [key, setKey] = useState(0);
  const loading = useSelector((state) => state.getIn(['auth', 'loading']));
  const mfaVerification = useSelector((state) => state.getIn(['auth', 'mfaVerification']));
  const [error, setError] = useState(false);

  const timerValue = useRef(60 * 5);
  const timerIdRef = useRef(null);
  const [, setTick] = useState(0);

  useEffect(() => {
    setKey((key) => key + 1);
    setError(false);
    const clock = () => {
      timerValue.current = timerValue.current - 1;
      setTick((tick) => tick + 1);

      if (timerValue.current > 0) {
        timerIdRef.current = setTimeout(clock, 1000);
      }
    };

    if (!timerIdRef.current && timerValue.current > 0) {
      timerIdRef.current = setTimeout(clock, 1000);
    }
  }, []);

  useEffect(() => {
    if (mfaVerification === 'success') {
      dispatch(mfaUpdateResult('none'));
      onSuccess();
    } else if (mfaVerification === 'failed') {
      setError(true);
    }
  }, [mfaVerification]);

  const onResendCode = useCallback(() => {
    setKey((key) => key + 1);
    timerValue.current = 60 * 5;

    dispatch(send2FACode(target));
  }, []);

  const onChangeOtp = (value) => {
    if (value.length === 6) {
      setError(false);
      dispatch(verify2FACode({ ...target, code: value }));
      dispatch(mfaUpdateResult('none'));
    }
  };

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
            icon={
              target.mfa_method === 'email'
                ? 'Notifications.MarkMailRead'
                : target.mfa_method === 'sms'
                  ? 'Notification.MarkChatUnread'
                  : 'MediaDevices.Phone'
            }
            width={63}
            height={54}
            style={{ color: colors.purple[700] }}
          />
        </Box>

        <Box display="flex" flexDirection="column" gap="12px">
          <Typography variant="h2" style={{ color: colors.purple[900], fontWeight: 500 }}>
            We've sent you a code
          </Typography>

          <Typography
            variant="body1"
            style={{
              color: colors.neutral[900],
              fontWeight: 400,
              display: 'flex',
              gap: '4px',
            }}
          >
            The code was sent to you via
            <Typography style={{ color: colors.purple[900], fontWeight: '500' }}>
              {target.mfa_method}
            </Typography>
            at
            <Typography style={{ color: colors.purple[900], fontWeight: '500' }}>
              {target.mfa_method === 'email' ? target.email : target.phone}
            </Typography>
          </Typography>
        </Box>

        <Box sx={{ border: '1px solid #F8F4F9', height: '0px' }} />

        <Box display="flex" justifyContent="center">
          <Input
            key={key}
            onChange={(e) => onChangeOtp(e.target.value)}
            type="otp"
            fullWidth
            size="medium"
            otpLength={6}
            helperMessage={error ? 'The code you entered is wrong.' : ''}
            errorType={error ? 'error' : 'none'}
            showHelperMessage
          />
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'row',
            gap: '16px',
            mt: 2,
          }}
        >
          <Button
            size="medium"
            variant="tertiary"
            onClick={() => onBack()}
            style={{ flexShrink: 2 }}
          >
            Back
          </Button>

          <Button
            variant="primary"
            size="medium"
            onClick={onResendCode}
            style={{ flexShrink: 1 }}
            disabled={loading}
          >
            Resend code
            {timerValue.current &&
              ` in ${Math.floor(timerValue.current / 60)}:${timerValue.current % 60}`}
          </Button>
        </Box>
      </Box>
    </AuthLayoutContainer>
  );
};
