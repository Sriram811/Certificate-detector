import { Box, Typography, createTheme, ThemeProvider } from '@mui/material';
import CertificateVerification from '../components/certificates/CertificateVerification';

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

export default function Home() {
  return (
    <ThemeProvider theme={darkTheme}>
      <Box
        sx={{
          p: 3,
          minHeight: '100vh',
          bgcolor: 'white',
          color: 'text.primary',
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
            background: 'white',
            animation: 'pulse 8s ease-in-out infinite',
          },
          '@keyframes pulse': {
            '0%': { opacity: 0.5 },
            '50%': { opacity: 0.8 },
            '100%': { opacity: 0.5 },
          }
        }}
      >
        <Box
          sx={{
            position: 'relative',
            zIndex: 1,
            transform: 'translateZ(0)',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateZ(50px)',
            }
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            align="center"
            sx={{
              color: 'black',
              textShadow: 'rgba(249, 144, 144, 0.25) 0 30px 30px',
              fontSize: { xs: '2rem', md: '2.5rem' },
              fontWeight: 600,
              letterSpacing: '0.1em',
              animation: 'glow 3s ease-in-out infinite alternate',
              '@keyframes glow': {
                '0%': {
                  textShadow: '0 0 20px rgba(144, 202, 249, 0.3)',
                },
                '100%': {
                  textShadow: '0 0 30px rgba(144, 202, 249, 0.7)',
                }
              }
            }}
          >
            Certificate Verification System
          </Typography>
          <Box
            sx={{

              transform: 'perspective(1000px) rotateX(5deg)',
              transition: 'all 0.5s ease',
              '&:hover': {
                transform: 'perspective(1000px) rotateX(0deg) translateY(-10px)',
              }
            }}
          >
            <CertificateVerification />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}