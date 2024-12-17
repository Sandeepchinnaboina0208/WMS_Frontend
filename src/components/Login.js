import React, { useState } from 'react';
import { TextField, Button, Typography, Link } from '@mui/material';
import './Css/style.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useStore } from './Context/Store';
import ReCAPTCHA from 'react-google-recaptcha';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [captchaValue, setCaptchaValue] = useState(null);
  const navigate = useNavigate();
  const { login } = useStore();

  const onCaptchaChange = (value) => {
    console.log("Captcha Token:", value); // Log the token
    setCaptchaValue(value); // Save the reCAPTCHA token
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!captchaValue) {
      setMessage('Please complete the CAPTCHA.');
      return;
    }

    try {
      // Send login request with email, password, and reCAPTCHA token
      const response = await axios.post('https://wmsserver-production.up.railway.app/login', {
        email,
        password,
        captcha: captchaValue,
      });
      if (response.status === 200) {
        const userDetails = response.data; 
        console.log(userDetails);// User details from the backend
        login(userDetails); // Save user details in context and localStorage
        setMessage("Login successful! Redirecting...");
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          setMessage("Invalid password. Please try again.");
        } else if (error.response.status === 404) {
          setMessage("User not found. Please check your email.");
        } else {
          setMessage("An error occurred. Please try again later.");
        }
      } else {
        console.error("Error during login:", error);
        setMessage("Unable to connect to the server.");
      }
    }
  };

  return (
    <div className="login-Container">
      <div className="bg-con1">
        <Typography
          variant="h4"
          gutterBottom
          style={{
            color: "#ffc107",
            fontFamily: "Copperplate Gothic",
            fontWeight: "bold",
          }}
        >
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
          />
          <ReCAPTCHA
            sitekey="6Lfd7ZQqAAAAAAHF6T-v44WsYEiOkJFcfOmiriPt" // Replace with your Site Key
            onChange={onCaptchaChange}
          />
          <Button variant="contained" color="primary" type="submit" style={{ marginTop: '10px' }}>
            Login
          </Button>
        </form>
        {message && (
          <Typography
            variant="body1"
            style={{
              color: message.includes("successful") ? "green" : "red",
              marginTop: '15px',
            }}
          >
            {message}
          </Typography>
        )}
        <Typography
          variant="body2"
          color="textSecondary"
          align="center"
          style={{ marginTop: '15px', color: "white" }}
        >
          Don't have an account?{' '}
          <Link href="/register" variant="body2">
            Sign Up
          </Link>
        </Typography>
      </div>
    </div>
  );
}

export default Login;
