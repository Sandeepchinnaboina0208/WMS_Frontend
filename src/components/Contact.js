import React from 'react';
import './Css/style.css'; // Import the CSS file

function AboutUs() {
  return (
    <div className="about-container">
      <div className="about-wrapper">
        <h1 className="about-heading">About Us</h1>
        
        {/* Mission Section */}
        <section className="about-section">
          <h2 className="section-title">Our Mission</h2>
          <p className="section-text">
            Our mission is to revolutionize how workshops are managed and conducted by creating an efficient, user-friendly platform that simplifies the entire process. We are committed to helping both organizers and participants achieve their goals through seamless, technology-driven solutions.
          </p>
        </section>
        
        {/* Values Section */}
        <section className="about-section">
          <h2 className="section-title">Our Values</h2>
          <p className="section-text">
            We believe in integrity, innovation, and collaboration. Our team works tirelessly to ensure that every client receives exceptional value and unmatched service.
          </p>
        </section>


        {/* Meet the Team Section */}
        <section className="about-section team-section">
          <h2 className="section-title">Meet the Team</h2>
          <div className="team-grid">
            {/* Example team member */}
            <div className="team-member">
              <a href='https://www.linkedin.com/in/kurapati-siva-karthik/' target="_blank" rel="noopener noreferrer"><svg style={{width:"35px"}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"/></svg></a>
              <h3 className="team-name">K.Siva Karthik</h3>
              <p className="team-role">2200031540</p>
            </div>
            <div className="team-member">
              <a href='https://www.linkedin.com/in/sandeep-chinnaboina-505329286/' target="_blank" rel="noopener noreferrer"><svg style={{width:"35px"}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"/></svg></a>
              <h3 className="team-name">Ch.Sandeep</h3>
              <p className="team-role">2200031527</p>
            </div>
            <div className="team-member">
              <a href='https://www.linkedin.com/in/abhiram-bhairavabhotla-0a5970289/' target="_blank" rel="noopener noreferrer"><svg style={{width:"35px"}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"/></svg></a>
              <h3 className="team-name">B.Abhiram</h3>
              <p className="team-role">2200031562</p>
            </div>
            {/* Add more team members as needed */}
          </div>
        </section>
      </div>
    </div>
  );
}

export default AboutUs;
