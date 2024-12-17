import React, { useState } from 'react';
import { TextField, Button, Typography, Link, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import './Css/style.css'; // Ensure this path is correct
import axios from 'axios';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null); // Clear previous error message
    setSuccess(null); // Clear previous success message

    // Input Validations
    if (name.trim() === '') {
      setError("Name is required.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setError("Password should be at least 6 characters long.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!role) {
      setError("Please select a role.");
      return;
    }

    try {
      const response = await axios.post('https://wmsserver-production.up.railway.app/register', {
        name,
        email,
        password,
        role
      });
      setSuccess("User registered successfully!");
      console.log(response.data);
    } catch (error) {
      console.error("Error creating user:", error);
      setError("An error occurred while creating the account. Please try again.");
    }
  };

  return (
    <div className="reg-Container">
      <div className="reg-bg-con">
        <Typography variant="h4" gutterBottom style={{color:"#ffc107",fontFamily:"Copperplate Gothic",fontWeight:"bold"}}>
          Register
        </Typography>
        <form className='reg-form' onSubmit={handleSubmit}>
          <TextField
            label="Name"
            type="text"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            label="Email"
            type="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            label="Confirm Password"
            type="password"
            fullWidth
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            margin="normal"
            required
          />

          {/* Role Selector */}
          <FormControl fullWidth margin="normal" required style={{backgroundColor:"white"}}>
            <InputLabel id="role-label">Role</InputLabel>
            <Select
              labelId="role-label"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              label="Role"
            >
              <MenuItem value="">
                <em>Select Role</em>
              </MenuItem>
              <MenuItem value="student">Student</MenuItem>
              <MenuItem value="instructor">Instructor</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </Select>
          </FormControl>

          <Button variant="contained" color="primary" type="submit" style={{ marginTop: '20px' }}>
            Register
          </Button>
        </form>

        {/* Display Error Message */}
        {error && (
          <Typography color="error" style={{ marginTop: '15px' }}>
            {error}
          </Typography>
        )}

        {/* Display Success Message */}
        {success && (
          <Typography style={{ color: 'green', marginTop: '15px' }}>
            {success}
          </Typography>
        )}

        {/* Login Link */}
        <Typography variant="body2" color="textSecondary" align="center" style={{ marginTop: '15px', color: 'white' }}>
          Already have an account?{' '}
          <Link href="/login" variant="body2" style={{ color: '#2196f3' }}>
            Login
          </Link>
        </Typography>
      </div>
    </div>
  );
}

export default Register;
