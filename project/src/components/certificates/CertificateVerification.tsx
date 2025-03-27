import { useState } from 'react';
import { Box, Button, Typography, Paper, Container } from '@mui/material';
import { Upload, Shield } from 'lucide-react';

export default function CertificateVerification() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [certificateHash, setCertificateHash] = useState<string>('');

    const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setSelectedFile(file);

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
                alert('Error calculating certificate hash');
            }
        }
    };

    const handleVerify = async () => {
        if (!selectedFile || !certificateHash) return;

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
                alert(`Certificate Verified!\n\nDetails:\nName: ${result.details.name}\nOrganization: ${result.details.organization}\nIssue Date: ${result.details.issueDate}\nStatus: ${result.details.status}`);
            } else {
                alert(result.message);
            }

            setSelectedFile(null);
            setCertificateHash('');
        } catch (err) {
            console.error('Verification failed:', err);
            alert('Verification failed. Please try again.');
        }
    };

    return (
        <Container maxWidth="sm">
            <Paper sx={{ p: 4, mt: 3 }}>
                <Typography variant="h6" gutterBottom align="center">
                    Upload Certificate to Verify
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
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
                        >
                            Upload Certificate
                        </Button>
                    </label>
                    {selectedFile && (
                        <>
                            <Typography variant="body1" color="textSecondary">
                                Selected file: {selectedFile.name}
                            </Typography>
                            {certificateHash && (
                                <Typography variant="body2" color="textSecondary" sx={{ wordBreak: 'break-all' }}>
                                    Certificate Hash: {certificateHash}
                                </Typography>
                            )}
                            <Button
                                variant="contained"
                                startIcon={<Shield size={16} />}
                                onClick={handleVerify}
                                size="large"
                                fullWidth
                            >
                                Verify Certificate
                            </Button>
                        </>
                    )}
                </Box>
            </Paper>
        </Container>
    );
}
