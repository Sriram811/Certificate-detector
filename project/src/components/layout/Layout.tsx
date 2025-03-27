import { Box, AppBar, Toolbar, Typography, Container, Button } from '@mui/material';
import { FileCheck, Shield, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { keyframes } from '@emotion/react';

const float = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`;

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
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      perspective: '1000px'
    }}>
      <AppBar
        component={motion.div}
        initial={{ rotateX: -90 }}
        animate={{ rotateX: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        position="static"
        sx={{
          bgcolor: 'black',
          background: 'linear-gradient(45deg, #000000 30%, #424242 90%)',
          boxShadow: '0 8px 16px rgba(0,0,0,0.3)'
        }}
      >
        <Toolbar>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <FileCheck size={24} style={{ marginRight: '12px', color: '#fff' }} />
          </motion.div>

          <Typography
            component={motion.div}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            variant="h6"
            sx={{
              flexGrow: 1,
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              fontWeight: 'bold'
            }}
          >
            Certificate Verification System
          </Typography>

          {user.isAdmin && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Button
                color="inherit"
                startIcon={<Shield size={16} />}
                onClick={() => navigate('/admin')}
                sx={{
                  '&:hover': {
                    transform: 'scale(1.05)',
                    transition: 'transform 0.2s'
                  }
                }}
              >
                Admin Panel
              </Button>
              <Button
                color="inherit"
                startIcon={<LogOut size={16} />}
                onClick={handleLogout}
                sx={{
                  '&:hover': {
                    transform: 'scale(1.05)',
                    transition: 'transform 0.2s'
                  }
                }}
              >
                Logout
              </Button>
            </motion.div>
          )}
        </Toolbar>
      </AppBar>

      <Container
        component={motion.main}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        sx={{
          mt: 4,
          mb: 4,
          flex: 1,
          backdropFilter: 'blur(8px)',
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
        }}
      >
        {children}
      </Container>
    </Box>
  );
}