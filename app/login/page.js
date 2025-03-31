"use client";
import { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Paper, Grid, FormControlLabel, Checkbox, Snackbar } from '@mui/material';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const result = await response.json();

    if (result.success) {
      setSnackbarMessage('Login Successful');
      setOpenSnackbar(true);
      window.location.href = '/logviewer';
    } else {
      setSnackbarMessage(result.message || 'Login Failed');
      setOpenSnackbar(true);
    }

    setLoading(false);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <Container
      component="main"
      maxWidth="100%"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        padding: 0,
        overflow: 'hidden',
        marginTop: '-25px',
        position: 'relative',
      }}
    >
      <Grid container component={Paper} elevation={6} sx={{ height: '80%', borderRadius: 2 }}>
        <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'linear-gradient(45deg, #6a11cb, #2575fc)', color: 'white' }}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h4" sx={{ marginBottom: 3 }}>
              Log Viewer
            </Typography>
            <Typography variant="h6">
              OSS Project
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 4 }}>
          <Box sx={{ width: '100%' }}>
            <Typography variant="h5" sx={{ marginBottom: 3, textAlign: 'center' }}>
              Login
            </Typography>
            {errorMessage && (
              <Typography color="error" sx={{ textAlign: 'center', marginBottom: 2 }}>
                {errorMessage}
              </Typography>
            )}
            <form onSubmit={handleSubmit}>
              <TextField
                label="Username"
                variant="outlined"
                fullWidth
                margin="normal"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                sx={{ marginBottom: 2 }}
              />
              <div style={{ position: 'relative' }}>
                <TextField
                  label="Password"
                  type={passwordVisible ? 'text' : 'password'}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  sx={{ marginBottom: 2 }}
                />
                <Button
                  type="button"
                  onClick={togglePasswordVisibility}
                  sx={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'transparent',
                    padding: 0,
                    minWidth: 'auto',
                    fontSize: '1.5rem',
                  }}
                >
                  {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                </Button>
              </div>
              <FormControlLabel
                control={<Checkbox checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />}
                label="Remember Me"
                sx={{ marginBottom: 2 }}
              />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={loading}
                sx={{
                  background: '#2575fc',
                  padding: '12px 0',
                  '&:hover': { backgroundColor: '#6a11cb' },
                }}
              >
                {loading ? 'Logging in...' : 'Login'}
              </Button>
            </form>
          </Box>
        </Grid>
      </Grid>

      {/* Snackbar สำหรับแสดงข้อความ Popup */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        message={snackbarMessage}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}  // กำหนดตำแหน่งที่ต้องการให้แสดงที่มุมซ้ายบน

      />
    </Container>
  );
}
