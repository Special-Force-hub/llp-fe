import { AuthLayoutContainer } from 'components/Layouts/AuthLayout';
import { Typography, Button, IconGraphy, colors } from '@leapeasy/ui-kit';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const InviteResend = () => {
  const navigate = useNavigate();

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
            Invite Resend!
          </Typography>

          <Typography variant="body1" style={{ color: colors.neutral[900], fontWeight: 400 }}>
            Please check your email for the new invite.
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
