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
    Chip,
    IconButton,
    Button
} from '@mui/material';
import { Trash2, FileCheck, Upload } from 'lucide-react';
import UploadCertificate from '../components/certificates/UploadCertificate';

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
        <Box sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h4">Certificate Management</Typography>
                <Button
                    variant="contained"
                    startIcon={<Upload />}
                    onClick={() => setShowUpload(!showUpload)}
                >
                    Upload Certificate
                </Button>
            </Box>

            {showUpload && (
                <Box sx={{ mb: 3 }}>
                    <UploadCertificate
                        type="Online"
                        onUpload={(cert) => {
                            setCertificates(prev => [...prev, cert]);
                            setShowUpload(false);
                        }}
                    />
                </Box>
            )}

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Organization</TableCell>
                            <TableCell>Issue Date</TableCell>
                            <TableCell>Status</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {certificates.map((cert) => (
                            <TableRow key={cert._id}>
                                <TableCell>{cert.name}</TableCell>
                                <TableCell>{cert.organization}</TableCell>
                                <TableCell>{cert.issueDate}</TableCell>

                                <TableCell>
                                    <IconButton
                                        color="error"
                                        onClick={() => handleDelete(cert._id)}
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
    );
}
