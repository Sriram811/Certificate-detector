import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { TextField, Button, Card, Typography, Link, Box, createTheme, ThemeProvider } from '@mui/material';
import { Shield } from 'lucide-react';

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
    <ThemeProvider theme={darkTheme}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          minHeight: '100vh',
          pt: 8,
          bgcolor: 'background.default',
          perspective: '1500px',
          overflow: 'hidden',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at center, #000000 0%, #0a0a0a 100%)',
            animation: 'pulse 8s ease-in-out infinite',
          },
          '@keyframes pulse': {
            '0%': { opacity: 0.5 },
            '50%': { opacity: 0.8 },
            '100%': { opacity: 0.5 },
          }
        }}
      >
        <Card
          sx={{
            p: 4,
            maxWidth: 400,
            width: '100%',
            bgcolor: 'background.paper',
            transform: 'rotateX(5deg)',
            transition: 'all 0.3s ease',
            boxShadow: '0 10px 30px rgba(144, 202, 249, 0.2)',
            '&:hover': {
              transform: 'rotateX(0deg) translateY(-10px)',
              boxShadow: '0 20px 40px rgba(144, 202, 249, 0.3)',
            }
          }}
        >
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mb: 3,
            animation: 'fadeIn 0.5s ease-out'
          }}>
            <Shield
              size={40}
              style={{
                marginBottom: '16px',
                color: '#90caf9',
                animation: 'float 3s ease-in-out infinite'
              }}
            />
            <Typography
              component="h1"
              variant="h5"
              sx={{
                color: 'primary.main',
                textShadow: '0 0 20px rgba(144, 202, 249, 0.3)',
                animation: 'glow 3s ease-in-out infinite alternate'
              }}
            >
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
            sx={{
              '& .MuiInputBase-root': {
                transition: 'transform 0.2s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                }
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'rgba(144, 202, 249, 0.2)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(144, 202, 249, 0.4)',
                }
              }
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
              '& .MuiInputBase-root': {
                transition: 'transform 0.2s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                }
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'rgba(144, 202, 249, 0.2)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(144, 202, 249, 0.4)',
                }
              }
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
              '& .MuiInputBase-root': {
                transition: 'transform 0.2s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                }
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'rgba(144, 202, 249, 0.2)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(144, 202, 249, 0.4)',
                }
              }
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
              '& .MuiInputBase-root': {
                transition: 'transform 0.2s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                }
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'rgba(144, 202, 249, 0.2)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(144, 202, 249, 0.4)',
                }
              }
            }}
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
            sx={{
              '& .MuiInputBase-root': {
                transition: 'transform 0.2s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                }
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'rgba(144, 202, 249, 0.2)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(144, 202, 249, 0.4)',
                }
              }
            }}
          />
          <Button
            fullWidth
            variant="contained"
            onClick={handleRegister}
            sx={{
              mt: 3,
              mb: 2,
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
            Register as Admin
          </Button>
          <Box sx={{
            textAlign: 'center',
            '& a': {
              color: 'primary.main',
              transition: 'all 0.2s ease',
              '&:hover': {
                textShadow: '0 0 8px rgba(144, 202, 249, 0.6)',
              }
            }
          }}>
            <Link component={RouterLink} to="/" variant="body2">
              {"Back to Login"}
            </Link>
          </Box>
        </Card>
      </Box>

      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          @keyframes glow {
            0% { text-shadow: 0 0 20px rgba(144, 202, 249, 0.3); }
            100% { text-shadow: 0 0 30px rgba(144, 202, 249, 0.7); }
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </ThemeProvider>
  );
}