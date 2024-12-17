import React from 'react';
import { useStore } from './Context/Store'; // Import the store context
import './Css/style.css'; // Assuming your CSS file includes the palette

function Profile() {
  const { store } = useStore();

  if (!store.isAuthenticated) {
    return (
      <div className="unauthenticated-container">
        <h2 className="unauthenticated-message">
          Please log in to view your profile.
        </h2>
        <div className="login-button-container">
          <a href="/login" className="login-button">
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div style={{backgroundColor:"#1e1612",minHeight:'100vh'}}>
      <div className="profile-container">
        <h2 className="profile-heading">Your Profile</h2>
        <div className="profile-details">
          <p>
            <strong className="profile-label">Name:</strong> {store.user.name}
          </p>
          <p>
            <strong className="profile-label">Email:</strong> {store.user.email}
          </p>
          <p>
            <strong className="profile-label">Role:</strong> {store.user.role}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
