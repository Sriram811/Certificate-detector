import { Card, CardContent, Typography, Button, Grid, Box } from '@mui/material';
import { Download, X, Shield, Upload } from 'lucide-react';
import CertificateVerification from './CertificateVerification';

interface Certificate {
  _id: string;
  name: string;
  organization: string;
  issueDate: string;
  status: string;
  filePath: string;
  verified: boolean;
}

interface CertificateListProps {
  certificates: Certificate[];
  onRemove: (id: string) => void;
}

export default function CertificateList({ certificates, onRemove }: CertificateListProps) {
  const handleVerify = async (certId: string) => {
    try {
      const response = await fetch(`https://certificate-detector-backend.onrender.com/api/certificates/verify/${certId}`, {
        method: 'POST'
      });

      const result = await response.json();
      alert(result.message);
    } catch (err) {
      console.error('Verification failed:', err);
      alert('Verification failed. Please try again.');
    }
  };

  return (
    <Box sx={{ mt: 4 }}>

      <Typography variant="h5" sx={{ mb: 3 }}>
        Certificates
      </Typography>
      <CertificateVerification />
      <Grid container spacing={3}>
        {certificates.map((cert) => (
          <Grid item xs={12} md={6} lg={4} key={cert._id}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {cert.name}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  Issued by: {cert.organization}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  Date: {cert.issueDate}
                </Typography>
                <Typography
                  color={cert.status === 'Original' ? 'success.main' : 'error.main'}
                  gutterBottom
                >
                  Status: {cert.status}
                </Typography>
                <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                  <Button
                    variant="outlined"
                    startIcon={<Shield size={16} />}
                    color={cert.verified ? "success" : "warning"}
                    onClick={() => handleVerify(cert._id)}
                  >
                    Verify
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<Download size={16} />}
                    href={cert.filePath}
                    target="_blank"
                  >
                    Download
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    startIcon={<X size={16} />}
                    onClick={async () => {
                      try {
                        const response = await fetch(`https://certificate-detector-backend.onrender.com/api/certificates/${cert._id}`, {
                          method: 'DELETE',
                        });

                        if (response.ok) {
                          onRemove(cert._id);
                        } else {
                          const error = await response.json();
                          alert(error.message);
                        }
                      } catch (err) {
                        console.error('Failed to remove certificate:', err);
                      }
                    }}
                  >
                    Remove
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}