import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Css/style.css';

function Workshops() {
  const [workshops, setWorkshops] = useState([]); // All workshops fetched from the API
  const [filteredWorkshops, setFilteredWorkshops] = useState([]); // Filtered workshops for display
  const [searchQuery, setSearchQuery] = useState(''); // Search query
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch workshops from the backend API
    axios.get('https://wmsserver-production.up.railway.app/workshops')
      .then(response => {
        setWorkshops(response.data); // Set all workshops data
        setFilteredWorkshops(response.data); // Initially, display all workshops
      })
      .catch(error => {
        console.error("There was an error fetching workshops!", error);
      });
  }, []);

  // Handle search input change
  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter workshops based on the search query
    const filtered = workshops.filter(workshop =>
      workshop.title.toLowerCase().includes(query) || // Match title
      workshop.description.toLowerCase().includes(query) // Match description
    );
    setFilteredWorkshops(filtered);
  };

  // Redirect function when a user clicks on a workshop
  const handleWorkshopClick = (workshopId) => {
    navigate(`/workshop/${workshopId}`);
  };

  return (
    <div className='container-fluid bg-wshp'>
      <div className='row'>
        <Typography variant="h3" className="wsheading col-12" style={{ fontFamily: 'Copperplate Gothic', fontWeight: "bold" }}>
          Available Workshops
        </Typography>
      </div>

      {/* Search Input */}
      <div className="row search-row">
        <input
          type="text"
          placeholder="Search workshops..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-input col-12"
          style={{ padding: '10px', marginBottom: '20px', fontSize: '1rem', borderRadius: '5px' }}
        />
      </div>

      {/* Workshop Cards */}
      <div className='row wshp-container'>
        {filteredWorkshops.length > 0 ? (
          filteredWorkshops.map((workshop) => (
            <div key={workshop.id}
              className='wsp-card col-12 col-sm-6 col-md-4 col-lg-3'
              onClick={() => handleWorkshopClick(workshop.id)}
              style={{ cursor: 'pointer' }}
            >
              <h1 className='wsp-head'>{workshop.title}</h1>
              <p className='wsp-status'>
                {workshop.availableSlots > 0 ? `Available: ${workshop.availableSlots}` : 'REGISTRATIONS CLOSED'}
              </p>
              <div style={{ textAlign: "center" }}>
                <button className='wsp-btn'>
                  {workshop.availableSlots > 0 ? 'Register' : 'Notify'}
                </button>
              </div>
            </div>
          ))
        ) : (
          <Typography variant="h6" className="no-results-message" style={{ textAlign: 'center', marginTop: '20px' }}>
            No workshops found for "{searchQuery}"
          </Typography>
        )}
      </div>
    </div>
  );
}

export default Workshops;
