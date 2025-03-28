import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import AdminRegister from './components/auth/AdminRegister';
import Home from './pages/Home';
import Layout from './components/layout/Layout';
import Admin from './pages/Admin';
import Landing from './pages/Landing';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login setLoggedIn={setLoggedIn} setIsAdmin={setIsAdmin} />} />
          <Route
            path="/dashboard"
            element={
              <Layout>
                {loggedIn ? <Home /> : <Navigate to="/login" />}
              </Layout>
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/admin-register" element={<AdminRegister />} />
          <Route
            path="/admin"
            element={
              <Layout>
                {isAdmin ? <Admin /> : <Navigate to="/login" />}
              </Layout>
            }
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;