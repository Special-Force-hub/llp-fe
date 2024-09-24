import { useCallback, useState, useEffect, useRef } from 'react';
import { AuthLayoutContainer } from 'components/Layouts/AuthLayout';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, colors, Input, Button, Alert, IconGraphy } from '@leapeasy/ui-kit';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import validator from 'validator';
import { Otp } from './Otp';
import {
  getCaptchaStatus,
  refreshUser,
  logInStart,
  logOut,
  setError,
} from 'store/actions/authActions';
import ReCAPTCHA from 'react-google-recaptcha';

export const Login = () => {
  const dispatch = useDispatch();

  const requireCaptcha = useSelector((state) => state.getIn(['auth', 'requireCaptcha']));
  const loading = useSelector((state) => state.getIn(['auth', 'loading']));
  const error = useSelector((state) => state.getIn(['auth', 'error']));

  const token = localStorage.getItem('token');

  const userState = useSelector((state) => state.getIn(['auth', 'currentUser']));
  const currentUser = userState ? userState.toJS() : null;

  useEffect(() => {
    dispatch(setError(''));
    dispatch(getCaptchaStatus());
  }, []);

  const successMsg = useSelector((state) => state.getIn(['notification', 'successMsg']));

  const navigate = useNavigate();
  const captchaEl = useRef();
  const [captcha, setCaptcha] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isEmailValid = validator.isEmail(email);

  const onForgetPassword = useCallback(() => {
    navigate('/reset-password');
  }, []);

  const onClickLogin = useCallback(() => {
    const payload = {
      email: email,
      password: password,
      captcha_token: captcha,
    };

    dispatch(logInStart(payload));
  }, [email, password, captcha]);

  const onClickFindInvite = useCallback(() => {
    navigate('/lost-invite');
  }, []);

  useEffect(() => {
    if (successMsg !== 'loading') {
      if (captchaEl.current) {
        captchaEl.current.reset();
        setCaptcha('');
      }
    }
  }, [successMsg]);

  if (token && currentUser) {
    if (currentUser.require2FA && currentUser.mfaMethod) {
      return (
        <Otp
          target={{
            email: currentUser.email,
            phone: currentUser.phone,
            mfa_method: currentUser.mfaMethod,
          }}
          onSuccess={() => {
            dispatch(refreshUser());
          }}
          onBack={() => {
            dispatch(logOut());
          }}
        />
      );
    }
  }

  return (
    <AuthLayoutContainer>
      <Box gap="24px" display="flex" flexDirection="column">
        <Box>
          <Typography variant="h2" style={{ color: colors.purple[900], fontWeight: '500' }}>
            Login
          </Typography>

          <Typography variant="body1" style={{ color: colors.neutral[900], fontWeight: '400' }}>
            Please sign in to continue
          </Typography>
        </Box>

        <Box sx={{ border: '1px solid #F8F4F9', height: '0px' }} />

        <Box display="flex" flexDirection="column">
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

          <Input
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            minWidth="100%"
            fullWidth
            size="medium"
            icon={<IconGraphy icon="Security.Lock" />}
            showCopy={false}
            showHelperOnTyping={false}
          />

          {requireCaptcha && (
            <Box display="flex" justifyContent="flex-start" my={2}>
              <ReCAPTCHA
                ref={(e) => (captchaEl.current = e)}
                sitekey={'6LfBxuIpAAAAAANSty0dJjgR_zz0ZRknom5xSBNs'}
                onChange={(value) => {
                  setCaptcha(value);
                }}
              />
            </Box>
          )}
        </Box>

        {error && (
          <Alert
            type="error"
            variant="contained"
            showBorder
            description={error}
            showClose={false}
          />
        )}

        <Typography
          onClick={onForgetPassword}
          style={{
            alignSelf: 'flex-end',
            textDecoration: 'underline',
            cursor: 'pointer',
            width: 'fit-content',
            userSelect: 'none',
            color: colors.purple[700],
          }}
        >
          Forget your password?
        </Typography>

        <Button
          variant="primary"
          size="medium"
          onClick={onClickLogin}
          disabled={!email || !password || !isEmailValid || (requireCaptcha && !captcha) || loading}
          style={{ minWidth: '100%' }}
        >
          Log in
        </Button>

        <Alert
          type="warning"
          variant="contained"
          showBorder
          description="Lost your invitation?"
          showClose={false}
          cta={{
            label: 'Click here',
            onClick: onClickFindInvite,
          }}
        />
      </Box>
    </AuthLayoutContainer>
  );
};
