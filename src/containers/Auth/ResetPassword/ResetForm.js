import { useDispatch, useSelector } from 'react-redux';
import { AuthLayoutContainer } from 'components/Layouts/AuthLayout';
import { Typography, Input, Button, IconGraphy, colors, styles, Alert } from '@leapeasy/ui-kit';
import { Box } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { setResetResult, resetPasswordAction, setError } from 'store/actions/authActions';
import { validatePassword } from 'utils/validations';

export const ResetForm = () => {
  const { token } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loading = useSelector((state) => state.getIn(['auth', 'loading']));
  const resetResult = useSelector((state) => state.getIn(['auth', 'resetResult']));
  const error = useSelector((state) => state.getIn(['auth', 'error']));

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [valid, setValid] = useState({
    password: false,
    confirmPassword: false,
  });

  useEffect(() => {
    dispatch(setResetResult(''));
    dispatch(setError(''));
  }, []);

  const onClickSubmit = useCallback(() => {
    dispatch(resetPasswordAction({ password, token }));
  }, [password, token]);

  useEffect(() => {
    if (resetResult === 'success') {
      navigate('/login');
    }
  }, [resetResult]);

  const passwordNotMatch = password !== confirmPassword;

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
        Back to Login
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
            Reset your password
          </Typography>

          <Typography variant="body1" style={{ color: colors.neutral[900], fontWeight: '400' }}>
            Enter your new password below to reset it
          </Typography>
        </Box>

        <Box sx={{ border: '1px solid #F8F4F9', height: '0px' }} />

        <Input
          label="New Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setValid({
              ...valid,
              password: validatePassword(e.target.value),
            });
          }}
          type="password"
          minWidth="100%"
          fullWidth
          size="medium"
          icon={<IconGraphy icon="Security.Lock" />}
          errorType={password && !valid.password ? 'error' : 'success'}
          helperMessage={
            password && !valid.password
              ? 'Must contain 1 number, 1 special character, and at lease 8 characters'
              : ''
          }
          showCopy={false}
          showHelperOnTyping={false}
        />

        <Input
          label="Confirm Password"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            setValid({
              ...valid,
              confirmPassword: validatePassword(e.target.value),
            });
          }}
          type="password"
          minWidth="100%"
          fullWidth
          size="medium"
          icon={<IconGraphy icon="Security.Lock" />}
          errorType={confirmPassword && passwordNotMatch ? 'error' : 'success'}
          helperMessage={confirmPassword && passwordNotMatch ? 'Password not match' : ''}
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
        onClick={onClickSubmit}
        style={{ minWidth: '100%' }}
        disabled={
          loading ||
          !password ||
          !confirmPassword ||
          !valid.password ||
          !valid.confirmPassword ||
          passwordNotMatch
        }
      >
        Submit
      </Button>
    </AuthLayoutContainer>
  );
};
