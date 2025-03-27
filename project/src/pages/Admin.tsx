import { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    Button,
    createTheme,
    ThemeProvider
} from '@mui/material';
import { Trash2, Upload } from 'lucide-react';
import UploadCertificate from '../components/certificates/UploadCertificate';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#90caf9',
        },
        background: {
            default: '#000000',
            paper: '#111111',
        },
    },
});

interface Certificate {
    _id: string;
    name: string;
    organization: string;
    issueDate: string;
    status: string;
    verified: boolean;
}

export default function Admin() {
    const [certificates, setCertificates] = useState<Certificate[]>([]);
    const [showUpload, setShowUpload] = useState(false);

    useEffect(() => {
        fetchCertificates();
    }, []);

    const fetchCertificates = async () => {
        try {
            const response = await fetch('http://localhost:5004/api/certificates');
            if (response.ok) {
                const data = await response.json();
                setCertificates(data);
            }
        } catch (err) {
            console.error('Error fetching certificates:', err);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            console.log('Deleting certificate with ID:', id);

            // Remove credentials and simplify the request
            const response = await fetch(`http://localhost:5004/api/certificates/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
                // Removed credentials: 'include' as it might cause CORS issues
            });

            console.log('Delete response status:', response.status);

            if (response.ok) {
                setCertificates(prev => prev.filter(cert => cert._id !== id));
                console.log('Certificate deleted successfully');
                alert('Certificate deleted successfully');
            } else {
                const errorText = await response.text();
                console.error('Failed to delete certificate:', response.status, errorText);
                alert(`Failed to delete certificate: ${response.status} - ${errorText || 'Unknown error'}`);
            }
        } catch (err) {
            console.error('Error deleting certificate:', err);
            alert(`Network error - Please check if the server is running`);
        }
    };

    return (
        <ThemeProvider theme={darkTheme}>
            <Box sx={{
                minHeight: '100vh',
                bgcolor: 'white',
                perspective: '1500px',
                overflow: 'hidden',
                position: 'relative',
                p: 3,
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'white',
                    animation: 'pulse 8s ease-in-out infinite',
                },
                '@keyframes pulse': {
                    '0%': { opacity: 0.5 },
                    '50%': { opacity: 0.8 },
                    '100%': { opacity: 0.5 },
                }
            }}>
                <Box sx={{
                    position: 'relative',
                    zIndex: 1,
                    animation: 'fadeIn 0.5s ease-out',
                    '@keyframes fadeIn': {
                        from: { opacity: 0, transform: 'translateY(20px)' },
                        to: { opacity: 1, transform: 'translateY(0)' }
                    }
                }}>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        mb: 3,
                        alignItems: 'center'
                    }}>
                        <Typography
                            variant="h4"
                            sx={{
                                color: 'primary.main',
                                textShadow: '0 0 20px rgba(144, 202, 249, 0.3)',
                                animation: 'glow 3s ease-in-out infinite alternate',
                                '@keyframes glow': {
                                    '0%': { textShadow: '0 0 20px rgba(144, 202, 249, 0.3)' },
                                    '100%': { textShadow: '0 0 30px rgba(144, 202, 249, 0.7)' }
                                }
                            }}
                        >
                            Certificate Management
                        </Typography>
                        <Button
                            variant="contained"
                            startIcon={<Upload />}
                            onClick={() => setShowUpload(!showUpload)}
                            sx={{
                                background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                                transform: 'translateZ(0)',
                                transition: 'all 0.2s ease',
                                '&:hover': {
                                    transform: 'translateY(-3px) scale(1.02)',
                                    boxShadow: '0 5px 15px rgba(144, 202, 249, 0.4)',
                                },
                                '&:active': {
                                    transform: 'translateY(0) scale(0.98)',
                                }
                            }}
                        >
                            Upload Certificate
                        </Button>
                    </Box>

                    {showUpload && (
                        <Box sx={{
                            mb: 3,
                            transform: 'translateZ(0)',
                            animation: 'slideDown 0.3s ease-out',
                            '@keyframes slideDown': {
                                from: { opacity: 0, transform: 'translateY(-20px)' },
                                to: { opacity: 1, transform: 'translateY(0)' }
                            }
                        }}>
                            <UploadCertificate
                                type="Online"
                                onUpload={(cert) => {
                                    setCertificates(prev => [...prev, cert]);
                                    setShowUpload(false);
                                }}
                            />
                        </Box>
                    )}

                    <TableContainer
                        component={Paper}
                        sx={{
                            bgcolor: 'background.paper',
                            borderRadius: 2,
                            transform: 'rotateX(5deg)',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 10px 30px rgba(144, 202, 249, 0.2)',
                            '&:hover': {
                                transform: 'rotateX(0deg) translateY(-10px)',
                                boxShadow: '0 20px 40px rgba(144, 202, 249, 0.3)',
                            }
                        }}
                    >
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ color: 'primary.light', fontWeight: 'bold' }}>Name</TableCell>
                                    <TableCell sx={{ color: 'primary.light', fontWeight: 'bold' }}>Organization</TableCell>
                                    <TableCell sx={{ color: 'primary.light', fontWeight: 'bold' }}>Issue Date</TableCell>
                                    <TableCell sx={{ color: 'primary.light', fontWeight: 'bold' }}>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {certificates.map((cert) => (
                                    <TableRow
                                        key={cert._id}
                                        sx={{
                                            transition: 'all 0.2s ease',
                                            '&:hover': {
                                                bgcolor: 'rgba(144, 202, 249, 0.08)',
                                                transform: 'translateX(5px)',
                                            }
                                        }}
                                    >
                                        <TableCell>{cert.name}</TableCell>
                                        <TableCell>{cert.organization}</TableCell>
                                        <TableCell>{cert.issueDate}</TableCell>
                                        <TableCell>
                                            <IconButton
                                                color="error"
                                                onClick={() => handleDelete(cert._id)}
                                                sx={{
                                                    transition: 'all 0.2s ease',
                                                    '&:hover': {
                                                        transform: 'scale(1.1)',
                                                        color: '#ff4444'
                                                    }
                                                }}
                                            >
                                                <Trash2 size={16} />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Box>
        </ThemeProvider>
    );
}
