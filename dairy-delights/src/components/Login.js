
import React from 'react';
import { useNavigate} from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Alert } from '@mui/material';
import axios from 'axios';


export default function Login({ onLogin }) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [serverError, setServerError] = useState('');
  const navigate = useNavigate();
 

  const onSubmit = async (data) => {
    try {
      const response = await axios.get(`http://localhost:5000/SignUp?userName=${data.username}`);
      const user = response.data[0];
      
      if (user && user.password === data.password) {
        setServerError('');
        onLogin();
        // const redirectTo = location.state?.from || '/home';
        navigate('/home');
      } else {
        setServerError('Incorrect username or password');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setServerError('Error during login');
    }
  };

  return (
    <Container maxWidth="xs" style={{ marginTop: '50px', marginBottom: '50px' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: 'aliceblue',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        {serverError && <Alert severity="error">{serverError}</Alert>}
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            {...register('username', { required: 'Username is required' })}
            error={!!errors.username} 
            helperText={errors.username?.message}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            {...register('password', { required: 'Password is required' })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
        </form>
      </Box>
    </Container>
  );
}
