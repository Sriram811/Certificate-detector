import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { TextField, Button, Card, Typography, Link, Box, Snackbar, Alert, createTheme, ThemeProvider } from '@mui/material';
import { Lock as LockIcon } from '@mui/icons-material';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
  },
});

interface LoginProps {
  setLoggedIn: (value: boolean) => void;
  setIsAdmin: (value: boolean) => void;
}

export default function Login({ setLoggedIn, setIsAdmin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdminLogin, setIsAdminLogin] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const endpoint = isAdminLogin ? '/api/auth/admin/login' : '/api/auth/login';
      const response = await fetch(`https://certificate-detector-backend.onrender.com${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setShowSuccess(true);
        setLoggedIn(true);
        setIsAdmin(!!data.user.isAdmin);
        localStorage.setItem('user', JSON.stringify({
          ...data.user,
          isAdmin: !!data.user.isAdmin
        }));
        setTimeout(() => {
          if (data.user.isAdmin) {
            navigate('/admin');
          } else {
            navigate('/dashboard');
          }
        }, 1500); // Navigate after showing success message for 1.5 seconds
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (err) {
      console.error('Login failed:', err);
      alert('Login failed. Please try again.');
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Box
        component="form"
        onSubmit={handleLogin}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          minHeight: '100vh',
          pt: 8,
          perspective: '1000px',
          bgcolor: 'background.default',
        }}
      >
        <Card
          sx={{
            p: 4,
            maxWidth: 400,
            width: '100%',
            transform: 'rotateX(5deg)',
            transition: 'all 0.3s ease',
            boxShadow: '0 10px 20px rgba(0,0,0,0.4)',
            bgcolor: 'background.paper',
            '&:hover': {
              transform: 'rotateX(0deg) translateY(-10px)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
            }
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
            <LockIcon sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
            <Typography component="h1" variant="h5">
              {isAdminLogin ? 'Admin Login' : 'Sign in'}
            </Typography>
          </Box>
          <TextField
            fullWidth
            label="Email Address"
            margin="normal"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              '& .MuiInputBase-root': {
                transition: 'transform 0.2s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                }
              }
            }}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              '& .MuiInputBase-root': {
                transition: 'transform 0.2s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                }
              }
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              transform: 'translateZ(0)',
              transition: 'all 0.2s ease',
              backgroundColor: 'primary.main',
              '&:hover': {
                transform: 'translateY(-3px) scale(1.02)',
                boxShadow: '0 5px 15px rgba(144, 202, 249, 0.4)',
                backgroundColor: 'primary.dark',
              },
              '&:active': {
                transform: 'translateY(0) scale(0.98)',
              }
            }}
          >
            {isAdminLogin ? 'Admin Sign In' : 'Sign In'}
          </Button>
          <Box sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Link
              component="button"
              variant="body2"
              onClick={() => setIsAdminLogin(!isAdminLogin)}
            >
              {isAdminLogin ? 'Regular User Login' : 'Admin Login'}
            </Link>
            {!isAdminLogin ? (
              <Link component={RouterLink} to="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            ) : (
              <Link component={RouterLink} to="/admin-register" variant="body2">
                {"Need an admin account? Register"}
              </Link>
            )}
          </Box>
        </Card>
        <Snackbar
          open={showSuccess}
          autoHideDuration={1500}
          onClose={() => setShowSuccess(false)}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert
            severity="success"
            sx={{
              width: '100%',
              bgcolor: 'background.paper',
              color: 'primary.main'
            }}
          >
            Login successful!
          </Alert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  );
}