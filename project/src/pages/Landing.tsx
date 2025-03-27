import { Box, Button, Container, Typography, Avatar, Grid } from '@mui/material';
import { Shield, FileCheck, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { keyframes } from '@emotion/react';

const floatAnimation = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(10deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`;

const glowAnimation = keyframes`
  0% { box-shadow: 0 0 10px #90CAF9, 0 0 20px #90CAF9; }
  50% { box-shadow: 0 0 20px #90CAF9, 0 0 40px #90CAF9; }
  100% { box-shadow: 0 0 10px #90CAF9, 0 0 20px #90CAF9; }
`;

const rotateAnimation = keyframes`
  0% { transform: perspective(1000px) rotateY(0deg); }
  100% { transform: perspective(1000px) rotateY(360deg); }
`;

const pulseGlow = keyframes`
  0% { text-shadow: 0 0 10px #90CAF9, 0 0 20px #90CAF9; }
  50% { text-shadow: 0 0 20px #90CAF9, 0 0 40px #90CAF9, 0 0 60px #90CAF9; }
  100% { text-shadow: 0 0 10px #90CAF9, 0 0 20px #90CAF9; }
`;

const floatTeam = keyframes`
  0% { transform: translateY(0px) translateZ(0) rotateX(0deg); }
  50% { transform: translateY(-10px) translateZ(50px) rotateX(10deg); }
  100% { transform: translateY(0px) translateZ(0) rotateX(0deg); }
`;

const glowTeam = keyframes`
  0% { text-shadow: 0 0 10px #90CAF9, 0 0 20px #90CAF9; }
  50% { text-shadow: 0 0 30px #90CAF9, 0 0 40px #90CAF9, 0 0 50px #90CAF9; }
  100% { text-shadow: 0 0 10px #90CAF9, 0 0 20px #90CAF9; }
`;

export default function Landing() {
    const navigate = useNavigate();

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#000000' }}>
            {/* Hero Section */}
            <Box
                sx={{
                    background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)',
                    position: 'relative',
                    py: 15,
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'radial-gradient(circle at 50% 50%, rgba(144, 202, 249, 0.15) 0%, transparent 60%)',
                        animation: `${glowAnimation} 4s ease-in-out infinite`,
                        pointerEvents: 'none',
                    }
                }}
            >
                <Container maxWidth="md">
                    <motion.div
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1 }}
                    >
                        <FileCheck
                            size={80}
                            style={{
                                color: '#90CAF9',
                                filter: 'drop-shadow(0 0 15px rgba(144, 202, 249, 0.5))',
                                animation: `${floatAnimation} 6s ease-in-out infinite`,
                                marginBottom: '2rem',
                            }}
                        />
                    </motion.div>
                    <Typography
                        variant="h2"
                        component={motion.h2}
                        initial={{ y: -50 }}
                        animate={{
                            y: 0,
                            rotateX: [0, 10, 0],
                            scale: [1, 1.02, 1]
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            repeatType: "reverse"
                        }}
                        gutterBottom
                        fontWeight="bold"
                        sx={{
                            color: '#90CAF9',
                            textAlign: 'center',
                            textShadow: '0 0 20px rgba(144, 202, 249, 0.5)',
                            animation: `${pulseGlow} 3s infinite`,
                            transform: 'translateZ(50px)',
                            filter: 'drop-shadow(0 0 30px rgba(144, 202, 249, 0.3))'
                        }}
                    >
                        BlockChain Based Academic Certificate Verificator
                    </Typography>
                    <Typography
                        variant="h5"
                        sx={{
                            mb: 4,
                            opacity: 0.9,
                            textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
                        }}
                    >
                        Secure, Fast, and Reliable Document Authentication
                    </Typography>
                    <Box sx={{
                        mt: 4,
                        display: 'flex',
                        justifyContent: 'center',
                        gap: 3,
                        perspective: '1000px'
                    }}>
                        <motion.div
                            whileHover={{ scale: 1.1, rotateY: 15 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Button
                                variant="contained"
                                size="large"
                                sx={{
                                    bgcolor: '#90CAF9',
                                    color: '#000000',
                                    padding: '12px 30px',
                                    fontSize: '1.1rem',
                                    transform: 'translateZ(20px)',
                                    transition: 'all 0.3s ease',
                                    background: 'linear-gradient(45deg, #90CAF9 30%, #64B5F6 90%)',
                                    boxShadow: '0 0 20px rgba(144, 202, 249, 0.5)',
                                    '&:hover': {
                                        bgcolor: '#64B5F6',
                                        boxShadow: '0 0 30px rgba(144, 202, 249, 0.8)',
                                    },
                                }}
                                onClick={() => navigate('/register')}
                            >
                                Get Started
                            </Button>
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.1, rotateY: -15 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Button
                                variant="outlined"
                                size="large"
                                sx={{
                                    padding: '12px 30px',
                                    fontSize: '1.1rem',
                                    color: '#90CAF9',
                                    borderColor: '#90CAF9',
                                    borderWidth: '2px',
                                    transform: 'translateZ(20px)',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        borderColor: '#64B5F6',
                                        boxShadow: '0 0 30px rgba(144, 202, 249, 0.4)',
                                        bgcolor: 'rgba(144, 202, 249, 0.1)',
                                    },
                                }}
                                onClick={() => navigate('/login')}
                            >
                                Login
                            </Button>
                        </motion.div>
                    </Box>
                </Container>
            </Box>

            {/* Features Section with 3D effect */}
            <Container maxWidth="lg" sx={{ py: 8 }}>
                <Box sx={{ textAlign: 'center', mb: 8 }}>
                    <Typography
                        variant="h4"
                        gutterBottom
                        color='white'
                        fontWeight="medium"
                        sx={{
                            textShadow: '2px 2px 4px rgba(38, 148, 130, 0.2)',
                            transform: 'perspective(1000px) translateZ(20px)',
                            transition: 'transform 0.3s ease'
                        }}
                    >
                        Why Choose Our Platform?
                    </Typography>
                </Box>
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' },
                        gap: 4,
                    }}
                >
                    <FeatureCard
                        icon={<Shield size={32} />}
                        title="Secure Verification"
                        description="Advanced cryptographic algorithms ensure tamper-proof certificate verification"

                    />
                    <FeatureCard
                        icon={<Lock size={32} />}
                        title="Data Privacy"
                        description="Your certificates and data are protected with industry-standard security"
                    />
                    <FeatureCard
                        icon={<FileCheck size={32} />}
                        title="Instant Results"
                        description="Get real-time verification results with detailed certificate information"
                    />
                </Box>
            </Container>

            {/* Admin Preview Section */}
            <Container maxWidth="lg" sx={{ py: 8 }}>
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <Box sx={{
                        bgcolor: 'rgba(30, 30, 30, 0.9)',
                        borderRadius: '20px',
                        p: 4,
                        border: '1px solid rgba(144, 202, 249, 0.2)',
                        backdropFilter: 'blur(10px)',
                        position: 'relative',
                        overflow: 'hidden',
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'linear-gradient(45deg, rgba(144, 202, 249, 0.1) 0%, transparent 100%)',
                            transform: 'translateY(100%)',
                            transition: 'transform 0.5s ease',
                        },
                        '&:hover::before': {
                            transform: 'translateY(0)',
                        }
                    }}>
                        <Typography
                            variant="h4"
                            align="center"
                            gutterBottom
                            sx={{
                                color: '#90CAF9',
                                textShadow: '0 0 10px rgba(144, 202, 249, 0.5)',
                                mb: 4
                            }}
                        >
                            Administrator Dashboard
                        </Typography>
                        <Grid container spacing={3} alignItems="center">
                            <Grid item xs={12} md={6}>
                                <Box sx={{ p: 2 }}>
                                    <Typography variant="h6" color="white" gutterBottom>
                                        Powerful Admin Features
                                    </Typography>
                                    <Typography variant="body1" color="#B0B0B0" paragraph>
                                        • Manage user certificates and verifications
                                    </Typography>
                                    <Typography variant="body1" color="#B0B0B0" paragraph>
                                        • Real-time analytics and reporting
                                    </Typography>
                                    <Typography variant="body1" color="#B0B0B0" paragraph>
                                        • Advanced security controls
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        sx={{
                                            mt: 2,
                                            bgcolor: '#90CAF9',
                                            '&:hover': {
                                                bgcolor: '#64B5F6',
                                            }
                                        }}
                                        onClick={() => navigate('/admin')}
                                    >
                                        Access Admin Panel
                                    </Button>
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <motion.div
                                    animate={{
                                        rotateY: 360,
                                    }}
                                    transition={{
                                        duration: 20,
                                        repeat: Infinity,
                                        ease: "linear"
                                    }}
                                >
                                    <Shield
                                        size={200}
                                        style={{
                                            color: '#90CAF9',
                                            filter: 'drop-shadow(0 0 20px rgba(144, 202, 249, 0.5))',
                                            margin: 'auto',
                                            display: 'block'
                                        }}
                                    />
                                </motion.div>
                            </Grid>
                        </Grid>
                    </Box>
                </motion.div>
            </Container>

            {/* Team Section */}
            <Container maxWidth="lg" sx={{ py: 8, mb: 4 }}>
                <Box sx={{ position: 'relative', mb: 8, perspective: '1000px' }}>
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <Typography
                            variant="h3"
                            align="center"
                            sx={{
                                color: '#90CAF9',
                                fontWeight: 'bold',
                                position: 'relative',
                                animation: `${floatTeam} 3s ease-in-out infinite, ${glowTeam} 2s infinite`,
                                transform: 'translateZ(50px)',
                                textTransform: 'uppercase',
                                letterSpacing: '4px',
                                '&::before': {
                                    content: '""',
                                    position: 'absolute',
                                    top: '120%',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    width: '150px',
                                    height: '4px',
                                    background: 'linear-gradient(90deg, transparent, #90CAF9, transparent)',
                                    borderRadius: '2px'
                                }
                            }}
                        >
                            Role Modelers
                        </Typography>
                        <Typography
                            variant="h6"
                            align="center"
                            sx={{
                                color: '#64B5F6',
                                mt: 2,
                                opacity: 0.8,
                                fontWeight: 'light',
                                letterSpacing: '2px'
                            }}
                        >
                            The Innovation Team
                        </Typography>
                    </motion.div>
                </Box>
                <Grid container spacing={6} justifyContent="center">
                    {teamMembers.map((member) => (
                        <Grid item key={member.name} xs={12} sm={6} md={3}>
                            <TeamMemberCard {...member} />
                        </Grid>
                    ))}
                </Grid>
            </Container>

            {/* Footer */}
            <Box
                sx={{
                    bgcolor: '#90caf91a',
                    py: 4,
                    mt: 8,
                }}
            >

            </Box>
        </Box>
    );
}

function FeatureCard({ icon, title, description, sx }: {
    icon: React.ReactNode;
    title: string;
    description: string;
    sx?: any;
}) {
    return (
        <Box
            sx={{
                p: 4,
                textAlign: 'center',
                borderRadius: 2,
                bgcolor: '#1E1E1E',
                color: 'white',
                boxShadow: '0 10px 20px rgba(0,0,0,0.3)',
                transform: 'perspective(1000px) rotateY(0deg)',
                transition: 'all 0.3s ease',
                '&:hover': {
                    transform: 'perspective(1000px) rotateY(5deg) translateY(-5px)',
                    boxShadow: '0 15px 30px rgba(0,0,0,0.4)',
                    bgcolor: '#252525',
                },
            }}
        >
            <Box sx={{ color: '#90CAF9', mb: 2 }}>{icon}</Box>
            <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>
                {title}
            </Typography>
            <Typography variant="body1" sx={{ color: '#B0B0B0' }}>
                {description}
            </Typography>
        </Box>
    );
}

const teamMembers = [
    {
        name: "Sanjitha",
        role: "Team Coordinator",
        image: "/avatar1.jpg", // Add your image paths
        description: "Frontend Developer "
    },
    {
        name: "Sasiprabha",
        role: "Hackathon Finialist",
        image: "/avatar2.jpg",
        description: "AI & Web3 Developer"
    },
    {
        name: "Sriram",
        role: "Communicator",
        image: "/avatar3.jpg",
        description: "Creation Innovator in Frontend"
    },
    {
        name: "Vinitha",
        role: "Hackathon Finialist",
        image: "/avatar4.jpg",
        description: "Interface Desiger"
    }
];

function TeamMemberCard({ name, role, image, description }: {
    name: string;
    role: string;
    image: string;
    description: string;
}) {
    return (
        <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            whileHover={{
                scale: 1.05,
                rotateY: 15,
                translateZ: 50
            }}
        >
            <Box
                sx={{
                    position: 'relative',
                    textAlign: 'center',
                    p: 4,
                    borderRadius: '20px',
                    bgcolor: 'rgba(30, 30, 30, 0.9)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(144, 202, 249, 0.2)',
                    overflow: 'hidden',
                    transition: 'all 0.5s ease',
                    transformStyle: 'preserve-3d',
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'linear-gradient(45deg, rgba(144, 202, 249, 0.1) 0%, transparent 100%)',
                        transform: 'translateY(100%) translateZ(-1px)',
                        transition: 'transform 0.5s ease',
                    },
                    '&:hover': {
                        '&::before': {
                            transform: 'translateY(0) translateZ(-1px)',
                        },
                        boxShadow: '0 0 30px rgba(144, 202, 249, 0.3)',
                        '& .team-avatar': {
                            transform: 'scale(1.1) rotate(5deg) translateZ(20px)',
                        },
                        '& .team-name': {
                            transform: 'translateZ(30px)',
                            textShadow: '0 0 20px rgba(144, 202, 249, 0.8)',
                        }
                    }
                }}
            >
                <Avatar
                    src={image}
                    className="team-avatar"
                    sx={{
                        width: 150,
                        height: 150,
                        margin: '0 auto',
                        mb: 3,
                        border: '4px solid #90CAF9',
                        boxShadow: '0 0 20px rgba(144, 202, 249, 0.5)',
                        transition: 'transform 0.5s ease',
                    }}
                />
                <Typography
                    className="team-name"
                    variant="h5"
                    sx={{
                        color: '#90CAF9',
                        fontWeight: 'bold',
                        textShadow: '0 0 10px rgba(144, 202, 249, 0.5)',
                        mb: 1,
                        transition: 'all 0.5s ease',
                    }}
                >
                    {name}
                </Typography>
                <Typography
                    variant="subtitle1"
                    sx={{
                        color: '#fff',
                        mb: 2,
                        fontWeight: 500,
                        transform: 'translateZ(20px)'
                    }}
                >
                    {role}
                </Typography>
                <Typography
                    variant="body2"
                    sx={{
                        color: '#B0B0B0',
                        lineHeight: 1.6,
                        transform: 'translateZ(10px)'
                    }}
                >
                    {description}
                </Typography>
            </Box>
        </motion.div>
    );
}
