import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useStore } from "./Context/Store"; // Import the Store context
import "./Css/style.css";

function Workshop() {
  const { workshopId } = useParams();
  const { store } = useStore(); // Access global store context
  const { user } = store; // Extract the user from the store

  const [workshop, setWorkshop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [registrationStatus, setRegistrationStatus] = useState("");

  useEffect(() => {
    const fetchWorkshop = async () => {
      try {
        const response = await axios.get(`https://wmsserver-production.up.railway.app/workshop/${workshopId}`);
        setWorkshop(response.data);
      } catch (error) {
        console.error("Error fetching workshop:", error);
        setError("Workshop not found or server error.");
      } finally {
        setLoading(false);
      }
    };

    fetchWorkshop();
  }, [workshopId]);

  const handleRegisterClick = () => {
    if (store.isAuthenticated && user) {
      setIsModalOpen(true); // Open the modal if the user is authenticated
    } else {
      alert("Please log in to register for a workshop.");
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleRegistrationConfirm = async () => {
    try {
      const response = await axios.post(
        `https://wmsserver-production.up.railway.app/registerworkshop/${workshopId}/register/${user.id}`
      );
      setRegistrationStatus(response.data || "Successfully registered!");
    } catch (error) {
      console.error("Error during registration:", error);
      setRegistrationStatus("Registration failed. Please try again.");
    } finally {
      setIsModalOpen(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const descriptionList = workshop.description.split(",") || [];
  const benefitsList = workshop.benefits.split(",") || [];

  return (
    <div className="workshop-container">
      <header className="workshop-header">
        <h1>{workshop.title}</h1>
      </header>
      <div className="wshp-card-container">
        <div className="workshop-card row">
          <div className="workshop-info col-6">
            <h2>By {workshop.company}</h2>
            <h3>Instructor: {workshop.instructor}</h3>
            <h3>Description</h3>
            <ul>
              {descriptionList.map((item, index) => (
                <li key={index}>{item.trim()}</li>
              ))}
            </ul>
            <h3>Benefits</h3>
            <ul>
              {benefitsList.map((item, index) => (
                <li key={index}>{item.trim()}</li>
              ))}
            </ul>
          </div>
          <div className="workshop-image col-6">
            <img src={workshop.image} alt={`${workshop.title} Logo`} />
            <p style={{color:"white"}}>
              Available Slots: {workshop.availableSlots} | {workshop.date} | {workshop.time}
            </p>
            <button className="workshop-btn" onClick={handleRegisterClick}>
              Register
            </button>
          </div>
        </div>
      </div>

      {/* Registration Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Confirm Registration</h3>
            <p>
              <strong>Workshop:</strong> {workshop.title}
            </p>
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <div className="modal-actions">
              <button onClick={handleRegistrationConfirm}>Confirm</button>
              <button onClick={handleModalClose}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Registration Status */}
      {registrationStatus && <p className="registration-status">{registrationStatus}</p>}
    </div>
  );
}

export default Workshop;
