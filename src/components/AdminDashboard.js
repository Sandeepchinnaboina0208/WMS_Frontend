import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Css/style.css';

function AdminWorkshops() {
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [attendees, setAttendees] = useState([]); // For storing the list of attendees

  // Function to fetch workshops from the database
  const fetchWorkshops = async () => {
    try {
      const response = await axios.get('https://wmsserver-production.up.railway.app/workshops'); // Adjust URL as needed
      setWorkshops(response.data);
    } catch (err) {
      console.error("Error fetching workshops:", err);
      setError("Failed to load workshops. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkshops();
  }, []);

  const fetchAttendees = async (workshopId) => {
    try {
      const response = await axios.get(`https://wmsserver-production.up.railway.app/registrations/${workshopId}`);
      setAttendees(response.data); // Store attendees list in state
    } catch (err) {
      console.error("Error fetching attendees:", err);
    }
  };

  const deleteWorkshop = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this workshop?");
    
    if (isConfirmed) {
      try {
        await axios.delete(`https://wmsserver-production.up.railway.app/workshops/${id}`);
        setWorkshops(workshops.filter(workshop => workshop.id !== id));
        alert("Workshop deleted successfully.");
      } catch (err) {
        console.error(`Failed to delete workshop ${id}`, err);
        alert("Error deleting workshop. Please try again.");
      }
    }
  };

  const handleAttendanceClick = (workshopId) => {
    fetchAttendees(workshopId); // Fetch attendees for the selected workshop
    setShowModal(true); // Show the modal for attendees
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="admin-container">
      <header className="admin-header">
        <h1>WORKSHOPS</h1>
      </header>

      <div className="workshop-table-container">
        <table className="workshop-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Time</th>
              <th>Slots</th>
              <th>Delete Workshop</th>
              <th>Attendance</th>
            </tr>
          </thead>
          <tbody>
            {workshops.map((workshop) => (
              <tr key={workshop.id}>
                <td>{workshop.title}</td>
                <td>{workshop.description}</td>
                <td>{workshop.time}</td>
                <td>{workshop.availableSlots}</td>
                <td>
                  <button onClick={() => deleteWorkshop(workshop.id)} style={{ backgroundColor: "red", color: "white" }}>
                    Delete
                  </button>
                </td>
                <td>
                  <button onClick={() => handleAttendanceClick(workshop.id)}>
                    View Attendance
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Attendance */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Attendees for {attendees.length ? attendees[0].workshopTitle : ''}</h2>
            <ul>
              {attendees.map((attendee) => (
                <li key={attendee.id}>{attendee.name} ({attendee.email})</li>
              ))}
            </ul>
            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}

      <div className="create-workshop-btn-container">
        <a href="/uploadworkshop" className="create-workshop-btn" style={{ color: "white", textDecoration: "none" }}>
          Create New Workshop
        </a>
      </div>
    </div>
  );
}

export default AdminWorkshops;
