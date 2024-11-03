
import React from 'react';
import { useForm } from 'react-hook-form';
import {useState} from 'react'
import { TextField, Button, Container, Box, Typography, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Signup() {
  const {register, handleSubmit, watch, formState: { errors }, setError,} = useForm();
  const [serverError, setServerError] = useState('');
  const navigate = useNavigate();

  const onSubmit = (data) => {
    // Check if username already exists
    axios.get(`http://localhost:5000/SignUp?userName=${data.userName}`)
      .then(response => {
        if (response.data.length > 0) {
          setError('userName', {
            type: 'manual',
            message: 'Username already taken',
          });
        } else {
          // Submit data to the backend
          axios.post('http://localhost:5000/SignUp', data)
            .then(response => {
              console.log('Signup successful:', response.data);
              navigate('/login'); // Redirect to login page after successful signup
            })
            .catch(error => {
              console.error('Error during signup:', error);
              setServerError('Error during signup');
            });
        }
      })
      .catch(error => {
        console.error('Error checking username:', error);
        setServerError('Error checking username');
      });
  };

  return (
    <Container maxWidth="sm" >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)',
          marginTop: '50px',
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Signup
        </Typography>
        {serverError && <Alert severity="error">{serverError}</Alert>}
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="User Name"
            {...register('userName', { required: 'User name is required' })}
            error={!!errors.userName}
            helperText={errors.userName?.message}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email"
            type="email"
            {...register('email', { required: 'Email is required' })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            {...register('password', { required: 'Password is required' })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Confirm Password"
            type="password"
            {...register('confirmPassword', {
              required: 'Confirm password is required',
              validate: (value) => value === watch('password') || 'Passwords do not match',
            })}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
        </form>
      </Box>
    </Container>
  );
}
