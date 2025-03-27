import { useState } from 'react';
import { Box, Button, Typography, Paper, Container, CircularProgress, Alert, Snackbar } from '@mui/material';
import { Upload, Shield } from 'lucide-react';

export default function CertificateVerification() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [certificateHash, setCertificateHash] = useState<string>('');
    const [isVerifying, setIsVerifying] = useState(false);
    const [alert, setAlert] = useState<{ message: string; type: 'success' | 'error' | null }>({
        message: '',
        type: null
    });
    const [certificateDetails, setCertificateDetails] = useState<{
        name: string;
        issueDate: string;
        course: string;
        grade: string;
    } | null>(null);

    const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setSelectedFile(file);
            setCertificateDetails(null); // Clear previous certificate details

            // Calculate hash when file is selected
            try {
                const buffer = await file.arrayBuffer();
                const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
                const hashArray = Array.from(new Uint8Array(hashBuffer));
                const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
                console.log('Generated hash:', hashHex); // Debug log
                setCertificateHash(hashHex);
            } catch (err) {
                console.error('Error calculating hash:', err);
                setAlert({
                    message: 'Error calculating certificate hash',
                    type: 'error'
                });
            }
        }
    };

    const handleVerify = async () => {
        if (!selectedFile || !certificateHash) return;

        setIsVerifying(true);
        try {
            console.log('Sending hash for verification:', certificateHash); // Debug log
            const response = await fetch('https://certificate-detector-backend.onrender.com/api/certificates/verify-upload', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    hash: certificateHash
                }),
            });

            const result = await response.json();
            console.log('Verification response:', result); // Debug log

            if (result.verified) {
                setAlert({
                    message: `Certificate verified successfully for ${result.details.name}`,
                    type: 'success'
                });
                setCertificateDetails(result.details);
            } else {
                setAlert({
                    message: result.message,
                    type: 'error'
                });
                setCertificateDetails(null);
            }

            setSelectedFile(null);
            setCertificateHash('');
        } catch (err) {
            setAlert({
                message: 'Verification failed. Please try again.',
                type: 'error'
            });
        } finally {
            setIsVerifying(false);
        }
    };

    return (
        <Container maxWidth="sm">

            <Paper
                elevation={3}
                sx={{
                    p: 20,
                    mt: 10,
                    borderRadius: 5,
                    backgroundColor: 'background.paper',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: 20
                    }
                }}
            >
                <Typography
                    variant="h5"
                    gutterBottom
                    align="center"
                    sx={{
                        fontWeight: 600,
                        color: 'primary.main',
                        mb: 3
                    }}
                >
                    Certificate Verification Portal
                </Typography>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 3
                }}>
                    <input
                        type="file"
                        id="certificate-upload"
                        style={{ display: 'none' }}
                        onChange={handleFileSelect}
                        accept="application/pdf"
                    />
                    <label htmlFor="certificate-upload">
                        <Button
                            variant="outlined"
                            component="span"
                            startIcon={<Upload size={16} />}
                            size="large"
                            fullWidth
                            sx={{
                                borderRadius: 2,
                                height: 56,
                                borderWidth: 2,

                                '&:hover': {
                                    borderWidth: 2,
                                    transition: 'all 0.3s ease-in-out',
                                    transitionDuration: '0.5s',

                                    fontWeight: 600,

                                    transform: 'translateY(-2px)'



                                }
                            }}
                        >
                            Upload Certificate
                        </Button>
                    </label>
                    {selectedFile && (
                        <Box sx={{ width: '100%', textAlign: 'center' }}>
                            <Typography
                                variant="body1"
                                sx={{
                                    color: 'success.main',
                                    fontWeight: 500,
                                    mb: 1
                                }}
                            >
                                ✓ {selectedFile.name}
                            </Typography>
                            {certificateHash && (
                                <Typography
                                    variant="body2"
                                    color="black"

                                    sx={{
                                        wordBreak: 'break-all',
                                        bgcolor: 'grey.50',
                                        p: 2,
                                        borderRadius: 1,
                                        fontFamily: 'monospace'
                                    }}
                                >
                                    {certificateHash}
                                </Typography>
                            )}
                            <Button
                                variant="contained"
                                startIcon={isVerifying ? <CircularProgress size={16} color="inherit" /> : <Shield size={16} />}
                                onClick={handleVerify}
                                size="large"
                                fullWidth
                                disabled={isVerifying}
                                sx={{
                                    mt: 2,
                                    height: 56,
                                    borderRadius: 2,
                                    textTransform: 'none',
                                    fontSize: '1.1rem'
                                }}
                            >
                                {isVerifying ? 'Verifying...' : 'Verify Certificate'}
                            </Button>
                        </Box>
                    )}
                </Box>
            </Paper>
            {certificateDetails && (
                <Paper
                    elevation={3}
                    sx={{
                        p: 4,
                        mt: 3,
                        borderRadius: 2,
                        backgroundColor: 'background.paper',
                        border: '2px solid',
                        borderColor: 'success.main'
                    }}
                >
                    <Typography
                        variant="h6"
                        gutterBottom
                        sx={{
                            color: 'success.main',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1
                        }}
                    >
                        <Shield size={20} />
                        Verified Certificate Details
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                        <Box sx={{ display: 'grid', gap: 2 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid', borderColor: 'divider', pb: 1 }}>
                                <Typography variant="body1" color="text.secondary">Name</Typography>
                                <Typography variant="body1" fontWeight="500">{certificateDetails.name}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid', borderColor: 'divider', pb: 1 }}>
                                <Typography variant="body1" color="text.secondary">Issue Date</Typography>
                                <Typography variant="body1" fontWeight="500">{new Date(certificateDetails.issueDate).toLocaleDateString()}</Typography>
                            </Box>

                        </Box>
                    </Box>
                </Paper>
            )}
            <Snackbar
                open={!!alert.type}
                autoHideDuration={6000}
                onClose={() => setAlert({ message: '', type: null })}
            >
                <Alert
                    severity={alert.type || undefined}
                    onClose={() => setAlert({ message: '', type: null })}
                    sx={{ width: '100%' }}
                >
                    {alert.message}
                </Alert>
            </Snackbar>
        </Container>
    );
}
