import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { TextField, Button, Card, Typography, Link, Box } from '@mui/material';
import { PersonAdd as PersonAddIcon } from '@mui/icons-material';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    try {
      const response = await fetch('https://certificate-detector-backend.onrender.com/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Registration successful!');
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
        bgcolor: '#121212',
        background: 'linear-gradient(45deg, #000000 30%, #424242 90%)',
      }}
    >
      <Card
        sx={{
          p: 4,
          maxWidth: 400,
          width: '100%',
          bgcolor: '#1E1E1E',
          boxShadow: '0 10px 20px rgba(0,0,0,0.4)',
          borderRadius: 2,
          transform: 'perspective(1000px) rotateX(0deg)',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'perspective(1000px) translateY(-5px)',
            boxShadow: '0 15px 30px rgba(0,0,0,0.6)',
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mb: 3
          }}
        >
          <PersonAddIcon
            sx={{
              fontSize: 40,
              color: '#90CAF9',
              mb: 2,
              filter: 'drop-shadow(0 0 10px rgba(144, 202, 249, 0.5))'
            }}
          />
          <Typography
            component="h1"
            variant="h5"
            sx={{
              color: 'white',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
            }}
          >
            Sign up
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
          sx={{
            '& .MuiOutlinedInput-root': {
              color: 'white',
              '& fieldset': {
                borderColor: 'rgba(144, 202, 249, 0.5)',
              },
              '&:hover fieldset': {
                borderColor: '#90CAF9',
              },
            },
            '& .MuiInputLabel-root': {
              color: '#90CAF9',
            },
          }}
        />

        <TextField
          fullWidth
          label="Email Address"
          name="email"
          margin="normal"
          autoComplete="email"
          value={formData.email}
          onChange={handleChange}
          sx={{
            '& .MuiOutlinedInput-root': {
              color: 'white',
              '& fieldset': {
                borderColor: 'rgba(144, 202, 249, 0.5)',
              },
              '&:hover fieldset': {
                borderColor: '#90CAF9',
              },
            },
            '& .MuiInputLabel-root': {
              color: '#90CAF9',
            },
          }}
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
          sx={{
            '& .MuiOutlinedInput-root': {
              color: 'white',
              '& fieldset': {
                borderColor: 'rgba(144, 202, 249, 0.5)',
              },
              '&:hover fieldset': {
                borderColor: '#90CAF9',
              },
            },
            '& .MuiInputLabel-root': {
              color: '#90CAF9',
            },
          }}
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
          sx={{
            '& .MuiOutlinedInput-root': {
              color: 'white',
              '& fieldset': {
                borderColor: 'rgba(144, 202, 249, 0.5)',
              },
              '&:hover fieldset': {
                borderColor: '#90CAF9',
              },
            },
            '& .MuiInputLabel-root': {
              color: '#90CAF9',
            },
          }}
        />

        <Button
          fullWidth
          variant="contained"
          sx={{
            mt: 3,
            mb: 2,
            bgcolor: '#90CAF9',
            color: '#000000',
            transform: 'translateZ(0)',
            transition: 'all 0.3s ease',
            '&:hover': {
              bgcolor: '#64B5F6',
              transform: 'translateZ(10px) scale(1.02)',
              boxShadow: '0 10px 20px rgba(0,0,0,0.4)',
            },
          }}
          onClick={handleRegister}
        >
          Sign Up
        </Button>

        <Box sx={{ textAlign: 'center' }}>
          <Link
            component={RouterLink}
            to="/"
            variant="body2"
            sx={{
              color: '#90CAF9',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              '&:hover': {
                color: '#64B5F6',
                textDecoration: 'underline',
              },
            }}
          >
            {"Already have an account? Sign In"}
          </Link>
        </Box>
      </Card>
    </Box>
  );
}