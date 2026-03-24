import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/authcontext';
import { useNavigate } from 'react-router-dom';
import loginIllustration from '../assests/login-sidebar.png';
import logo from '../assests/loginlogo.jpeg';
import  BASE_URL  from "../utils/apiConfig";
// Material UI imports
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Paper,
  InputAdornment,
  IconButton,
  Alert,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, {
        email,
        password,
      });

      if (response.data.success) {
        login(response.data.user);
        localStorage.setItem('token', response.data.token);

        if (response.data.user.role === 'admin') {
          navigate('/admin-dashboard');
        } else {
          navigate('/employee-dashboard');
        }
      }
    } catch (error) {
      setError(
        error.response?.data?.error ||
        error.message ||
        'Server Error'
      );
    }
  };

  return (
    <Grid
      container
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexWrap: 'nowrap', // ✅ prevents stacking on inspect
        '@media (max-width:768px)': {
          flexWrap: 'wrap', // ✅ stack on actual mobile
        },
      }}
    >
      {/* Left section */}
      <Grid
        item
        sx={{
          width: { xs: '100%', md: '95%' },
          backgroundColor: '#f9fafb',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          p: 4,
          minHeight: '100vh',
        }}
      >
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Hi, Welcome back
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Manage your team efficiently with ease.
        </Typography>

        <Box
          component="img"
          src={loginIllustration}
          alt="Login Illustration"
          sx={{ width: '70%', mt: 3, maxWidth: 380 }}
        />
      </Grid>

      {/* Right section */}
      <Grid
        item
        component={Paper}
        elevation={0}
        square
        sx={{
          width: { xs: '100%', md: '65%' },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          px: { xs: 3, md: 6 },
          minHeight: '100vh',
        }}
      >
        <Box sx={{ width: '100%', maxWidth: 400, textAlign: 'center' }}>
          {/* --- Logo at the top --- */}
          <Box
            component="img"
            src={logo}
            alt="EMS Logo"
            sx={{
              width: 210,
              maxWidth: '70%',
              height: 'auto',
              mb: 3,
              mx: 'auto',
              display: 'block',
            }}
          />

          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Sign in to your account
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              variant="outlined"
              required
            />

            <TextField
              fullWidth
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              variant="outlined"
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              fullWidth
              variant="contained"
              type="submit"
              sx={{
                textTransform: 'none',
                fontWeight: 'bold',
                borderRadius: 2,
                py: 1.4,
                mt: 2,
                background: 'linear-gradient(135deg, #00bfa5 0%, #43a047 50%, #00796b 100%)',
                boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                transition: '0.3s',
                '&:hover': {
                  background: 'linear-gradient(135deg, #00c9a7 0%, #4caf50 50%, #00897b 100%)',
                  boxShadow: '0 6px 20px rgba(0,0,0,0.25)',
                  transform: 'translateY(-2px)',
                },
              }}
            >
              Sign in
            </Button>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;
