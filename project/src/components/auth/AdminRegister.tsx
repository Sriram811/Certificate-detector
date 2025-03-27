import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { TextField, Button, Card, Typography, Link, Box } from '@mui/material';
import { Shield } from 'lucide-react';

export default function AdminRegister() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    adminCode: '', // Admin registration code for security
  });

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    try {
      const response = await fetch('https://certificate-detector-backend.onrender.com/api/auth/admin/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          adminCode: formData.adminCode
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Admin registration successful!');
        navigate('/');
      } else {
        alert(data.message || 'Registration failed');
      }
    } catch (err) {
      console.error('Registration failed:', err);
      alert('Registration failed. Please try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh',
        pt: 8,
      }}
    >
      <Card sx={{ p: 4, maxWidth: 400, width: '100%' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
          <Shield size={40} style={{ marginBottom: '16px', color: '#1976d2' }} />
          <Typography component="h1" variant="h5">
            Admin Registration
          </Typography>
        </Box>
        <TextField
          fullWidth
          label="Full Name"
          name="name"
          margin="normal"
          autoComplete="name"
          autoFocus
          value={formData.name}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Email Address"
          name="email"
          margin="normal"
          autoComplete="email"
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Password"
          name="password"
          type="password"
          margin="normal"
          autoComplete="new-password"
          value={formData.password}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          margin="normal"
          autoComplete="new-password"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Admin Registration Code"
          name="adminCode"
          type="password"
          margin="normal"
          helperText="Enter the secure admin code provided by your organization"
          value={formData.adminCode}
          onChange={handleChange}
        />
        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={handleRegister}
        >
          Register as Admin
        </Button>
        <Box sx={{ textAlign: 'center' }}>
          <Link component={RouterLink} to="/" variant="body2">
            {"Back to Login"}
          </Link>
        </Box>
      </Card>
    </Box>
  );
}