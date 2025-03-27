import { Box, Typography } from '@mui/material';
import CertificateVerification from '../components/certificates/CertificateVerification';

export default function Home() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom align="center">
        Certificate Verification System
      </Typography>
      <CertificateVerification />
    </Box>
  );
}