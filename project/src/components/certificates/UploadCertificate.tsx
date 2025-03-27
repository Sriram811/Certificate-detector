import { useState } from 'react';
import { TextField, Button, Card, Typography, Box } from '@mui/material';
import { Upload } from 'lucide-react';

interface UploadCertificateProps {
  type: 'Online' | 'Offline';
  onUpload: (certificate: any) => void;
}

export default function UploadCertificate({ type, onUpload }: UploadCertificateProps) {
  const [formData, setFormData] = useState({
    name: '',
    issueDate: '',
    organization: '',
  });
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      alert('Please select a file');
      return;
    }

    const data = new FormData();
    data.append('file', file);
    data.append('name', formData.name);
    data.append('issueDate', formData.issueDate);
    data.append('organization', formData.organization);
    data.append('type', type);

    try {
      const response = await fetch('https://certificate-detector-backend.onrender.com/api/certificates/upload', {
        method: 'POST',
        body: data,
      });

      if (response.ok) {
        const certificate = await response.json();
        onUpload(certificate);
        setFormData({ name: '', issueDate: '', organization: '' });
        setFile(null);
      } else {
        const error = await response.json();
        alert(error.message);
      }
    } catch (err) {
      console.error('Upload failed:', err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Card sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Upload {type} Certificate
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <TextField
          fullWidth
          label="Certificate Name"
          name="name"
          margin="normal"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          label="Issue Date"
          name="issueDate"
          type="date"
          margin="normal"
          InputLabelProps={{ shrink: true }}
          value={formData.issueDate}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          label="Issuing Organization"
          name="organization"
          margin="normal"
          value={formData.organization}
          onChange={handleChange}
          required
        />
        <Box sx={{ mt: 2 }}>
          <input
            accept="application/pdf"
            style={{ display: 'none' }}
            id={`upload-file-${type}`}
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
          <label htmlFor={`upload-file-${type}`}>
            <Button
              variant="outlined"
              component="span"
              startIcon={<Upload size={16} />}
            >
              Select File
            </Button>
          </label>
          {file && (
            <Typography variant="body2" sx={{ mt: 1 }}>
              Selected: {file.name}
            </Typography>
          )}
        </Box>
        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 3 }}
          startIcon={<Upload size={16} />}
        >
          Upload Certificate
        </Button>
      </Box>
    </Card>
  );
}