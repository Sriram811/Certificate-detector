import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { TextField, Button, Card, Typography, Link, Box } from '@mui/material';
import { Lock as LockIcon } from '@mui/icons-material';

interface LoginProps {
  setLoggedIn: (value: boolean) => void;
  setIsAdmin: (value: boolean) => void;
}

export default function Login({ setLoggedIn, setIsAdmin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdminLogin, setIsAdminLogin] = useState(false);
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
        setLoggedIn(true);
        setIsAdmin(!!data.user.isAdmin);
        localStorage.setItem('user', JSON.stringify({
          ...data.user,
          isAdmin: !!data.user.isAdmin
        }));
        if (data.user.isAdmin) {
          navigate('/admin');
        }
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (err) {
      console.error('Login failed:', err);
      alert('Login failed. Please try again.');
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleLogin}
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
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          margin="normal"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
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
    </Box>
  );
}