import { Box } from '@mui/material';
import { Typography } from '@leapeasy/ui-kit';

export const DetailCard = ({}) => {
  return (
    <Box
      display={'flex'}
      flexWrap={'wrap'}
      borderRadius={2}
      backgroundColor="rgba(248, 244, 249, 0.48)"
      border={'1px solid rgba(248, 244, 249, 1)'}
    >
      <Box
        flexGrow={1}
        fontSize={12}
        fontWeight={500}
        marginY={3}
        borderRight={'1px solid rgba(232, 214, 235, 1)'}
        paddingX={2}
      >
        <Box width={'min-content'} margin={'auto'} whiteSpace={'nowrap'}>
          <Typography style={{ color: '#A39AA9', marginBottom: 8 }}>Account Name</Typography>
          <Typography style={{ color: '#2E0F40' }}>Shaun Ray Miles</Typography>
        </Box>
      </Box>
      <Box
        flexGrow={1}
        fontSize={12}
        fontWeight={500}
        marginY={3}
        borderRight={'1px solid rgba(232, 214, 235, 1)'}
        paddingX={2}
      >
        <Box width={'min-content'} margin={'auto'} whiteSpace={'nowrap'}>
          <Typography style={{ color: '#A39AA9', marginBottom: 8 }}>Stage</Typography>
          <Typography style={{ color: '#2E0F40' }}>05-Policy Issued</Typography>
        </Box>
      </Box>
      <Box
        flexGrow={1}
        fontSize={12}
        fontWeight={500}
        marginY={3}
        borderRight={'1px solid rgba(232, 214, 235, 1)'}
        paddingX={2}
      >
        <Box width={'min-content'} margin={'auto'} whiteSpace={'nowrap'}>
          <Typography style={{ color: '#A39AA9', marginBottom: 8 }}>Months Remaining</Typography>
          <Typography style={{ color: '#2E0F40' }}>14</Typography>
        </Box>
      </Box>
      <Box
        flexGrow={1}
        fontSize={12}
        fontWeight={500}
        marginY={3}
        borderRight={'1px solid rgba(232, 214, 235, 1)'}
        paddingX={2}
      >
        <Box width={'min-content'} margin={'auto'} whiteSpace={'nowrap'}>
          <Typography style={{ color: '#A39AA9', marginBottom: 8 }}>Active Lease</Typography>
          <Typography style={{ color: '#2E0F40' }}>True</Typography>
        </Box>
      </Box>
      <Box
        flexGrow={1}
        fontSize={12}
        fontWeight={500}
        marginY={3}
        borderRight={'1px solid rgba(232, 214, 235, 1)'}
        paddingX={2}
      >
        <Box width={'min-content'} margin={'auto'} whiteSpace={'nowrap'}>
          <Typography style={{ color: '#A39AA9', marginBottom: 8 }}>Application Type</Typography>
          <Typography style={{ color: '#2E0F40' }}>Rent Guaranty</Typography>
        </Box>
      </Box>
      <Box
        flexGrow={1}
        fontSize={12}
        fontWeight={500}
        marginY={3}
        borderRight={'1px solid rgba(232, 214, 235, 1)'}
        paddingX={2}
      >
        <Box width={'min-content'} margin={'auto'} whiteSpace={'nowrap'}>
          <Typography style={{ color: '#A39AA9', marginBottom: 8 }}>Landlord Name</Typography>
          <Typography style={{ color: '#2E0F40' }}>ROCO Real Estate</Typography>
        </Box>
      </Box>
      <Box flexGrow={1} fontSize={12} fontWeight={500} marginY={3} paddingX={2}>
        <Box width={'min-content'} margin={'auto'} whiteSpace={'nowrap'}>
          <Typography style={{ color: '#A39AA9', marginBottom: 8 }}>Created Date</Typography>
          <Typography style={{ color: '#2E0F40' }}>01/07/2024</Typography>
        </Box>
      </Box>
    </Box>
  );
};
