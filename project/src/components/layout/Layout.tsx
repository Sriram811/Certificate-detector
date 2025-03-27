import { Box, AppBar, Toolbar, Typography, Container, Button } from '@mui/material';
import { FileCheck, Shield, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static">
        <Toolbar>
          <FileCheck size={24} style={{ marginRight: '12px' }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Certificate Verification System
          </Typography>
          {user.isAdmin && (
            <>
              <Button
                color="inherit"
                startIcon={<Shield size={16} />}
                onClick={() => navigate('/admin')}
              >
                Admin Panel
              </Button>
              <Button
                color="inherit"
                startIcon={<LogOut size={16} />}
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Container component="main" sx={{ mt: 4, mb: 4, flex: 1 }}>
        {children}
      </Container>
    </Box>
  );
}