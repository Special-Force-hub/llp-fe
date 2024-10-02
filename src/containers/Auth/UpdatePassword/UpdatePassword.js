import { useDispatch, useSelector } from 'react-redux';
import { AuthLayoutContainer } from 'components/Layouts/AuthLayout';
import { useNavigate } from 'react-router-dom';
import { Typography, Input, Button, IconGraphy, colors, styles, Alert } from '@leapeasy/ui-kit';
import { logOut, setError, updateAuth } from 'store/actions/authActions';
import { useState, useEffect, useCallback } from 'react';
import { Box } from '@mui/material';
import { validatePassword } from 'utils/validations';

export const UpdatePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loading = useSelector((state) => state.getIn(['auth', 'loading']));
  const error = useSelector((state) => state.getIn(['auth', 'error']));

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [valid, setValid] = useState({
    newPassword: false,
    confirmPassword: false,
  });

  useEffect(() => {
    dispatch(setError(''));

    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, []);

  const onClickSubmit = useCallback(() => {
    dispatch(updateAuth({ old_pwd: oldPassword, new_pwd: newPassword }));
  }, [oldPassword, newPassword]);

  const passwordNotMatch = newPassword !== confirmPassword;

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
          dispatch(logOut());

          setTimeout(() => {
            navigate('/login');
          });
        }}
      >
        <IconGraphy icon="Arrow.ArrowBack" width={11} height={11} />
        Back to Log in
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
          label="Old Password"
          value={oldPassword}
          onChange={(e) => {
            setOldPassword(e.target.value);
          }}
          type="password"
          minWidth="100%"
          fullWidth
          size="medium"
          icon={<IconGraphy icon="Security.Lock" />}
          showCopy={false}
          showHelperOnTyping={false}
        />

        <Input
          label="New Password"
          value={newPassword}
          onChange={(e) => {
            setNewPassword(e.target.value);
            setValid({
              ...valid,
              newPassword: validatePassword(e.target.value),
            });
          }}
          type="password"
          minWidth="100%"
          fullWidth
          size="medium"
          icon={<IconGraphy icon="Security.Lock" />}
          errorType={
            newPassword && !valid.newPassword ? 'error' : newPassword ? 'success' : undefined
          }
          helperMessage={
            newPassword && !valid.newPassword
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
          errorType={
            confirmPassword && passwordNotMatch ? 'error' : confirmPassword ? 'success' : undefined
          }
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
          !oldPassword ||
          !newPassword ||
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
