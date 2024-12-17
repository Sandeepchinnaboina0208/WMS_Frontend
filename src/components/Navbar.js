import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../components/Context/Store';
import './Css/Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { store, logout } = useStore();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleDropdownChange = (event) => {
    const value = event.target.value;
    if (value === 'login') {
      navigate('/login');
    } else if (value === 'register') {
      navigate('/register');
    }
  };

  const handleDropdownChangeadmin = (event) => {
    const value = event.target.value;
    if (value === 'profile') {
      navigate('/profile');
    } else if (value === 'dashboard' && store.user.role === 'admin') {
      navigate('/admin');
    } else if (value === 'logout') {
      navigate('/');
      logout();
    }
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* Left Side Links */}
        <ul className="navbar-left">
          <li><a href="/home">Home</a></li>
          <li><a href="/workshops">Workshops</a></li>
        </ul>

        {/* Center Title/Logo */}
        <h1 className="navbar-logo">Workshop Management</h1>

        {/* Right Side Links */}
        <ul className="navbar-right">
          <li><a href="/contact">Contact</a></li>
          {store.isAuthenticated ? (
            <>
              <li>
                <select
                  name="loginRegisterDropdownadmin"
                  id="loginRegisterDropdownadmin"
                  onChange={handleDropdownChangeadmin}
                  defaultValue=""
                >
                  <option value="" disabled>Options</option>
                  {store.user.role === 'admin' && <option value="dashboard">Dashboard</option>}
                  <option value="profile">Profile</option>
                  <option value="logout">Logout</option>
                </select>
              </li>
            </>
          ) : (
            <>
              <li>
                <select
                  name="loginRegisterDropdown"
                  id="loginRegisterDropdown"
                  onChange={handleDropdownChange}
                  defaultValue=""
                >
                  <option value="" disabled>Login or Register</option>
                  <option value="login">Login</option>
                  <option value="register">Register</option>
                </select>
              </li>
            </>
          )}
        </ul>

        {/* Hamburger Icon for Mobile */}
        <div className="navbar-toggle" onClick={toggleMenu}>
          <span className="navbar-toggle-bar"></span>
          <span className="navbar-toggle-bar"></span>
          <span className="navbar-toggle-bar"></span>
        </div>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <div className="dropdown-menu">
            <ul>
              <li><a href="/home">Home</a></li>
              <li><a href="/workshops">Workshops</a></li>
              <li><a href="/contact">Contact</a></li>
              {store.isAuthenticated ? (
                <li><a href="/" onClick={logout}>Logout</a></li>
              ) : (
                <>
                  <li><a href="/login">Login</a></li>
                  <li><a href="/register">Register</a></li>
                </>
              )}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
