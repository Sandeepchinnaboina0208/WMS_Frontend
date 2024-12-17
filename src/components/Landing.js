import React from 'react';
import './Css/Home.css';

function Landing() {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay">
          <h1 className="hero-title">Unlock Your Potential with Industry-Driven Workshops</h1>
          <p className="hero-subtitle">Join hands-on workshops to gain practical skills and knowledge.</p>
          <a href="/workshops" className="hero-btn">Explore Workshops</a>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="section-title">Why Choose Our Workshops?</h2>
        <div className="features-grid">
          <div className="feature">
            <h3>Expert Instructors</h3>
            <p>Learn from experienced professionals in the field.</p>
          </div>
          <div className="feature">
            <h3>Hands-on Learning</h3>
            <p>Practice real-world skills with interactive sessions.</p>
          </div>
          <div className="feature">
            <h3>Certification</h3>
            <p>Receive industry-recognized certificates upon completion.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <h2 className="section-title">What Our Participants Say</h2>
        <div className="testimonial-card">
          <p>"This workshop gave me the skills I needed to advance my career!"</p>
          <span>- Alex J.</span>
        </div>
        <div className="testimonial-card">
          <p>"The instructors were fantastic and the sessions were incredibly engaging."</p>
          <span>- Maria R.</span>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section">
        <h2>Ready to Start Learning?</h2>
        <a href="/register" className="cta-btn">Sign Up Now</a>
      </section>
    </div>
  );
}

export default Landing;
