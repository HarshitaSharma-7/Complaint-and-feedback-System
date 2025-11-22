import React from 'react';
import './About.css'; // Import the new CSS file

const About = () => (
  <div className="about-container">
    <header className="about-header">
      <h1>About Our System</h1>
      <p>A seamless platform for effective communication and issue resolution.</p>
    </header>

    <div className="about-features">
      {/* Feature Card 1: Our Mission */}
      <div className="feature-card">
        <div className="icon">🚀</div>
        <h3>Our Mission</h3>
        <p>To provide a transparent, efficient, and user-friendly platform that bridges the communication gap between students and the institution's administration, ensuring that every concern is heard and addressed in a timely manner.</p>
      </div>

      {/* Feature Card 2: How It Works */}
      <div className="feature-card">
        <div className="icon">⚙️</div>
        <h3>How It Works</h3>
        <p>Students can submit complaints categorized by area (Hostel or Academic). These are then routed directly to the appropriate authority—the Warden for hostel issues and Teachers/Faculty for academic concerns—who can then review and resolve them.</p>
      </div>

      {/* Feature Card 3: Our Vision */}
      <div className="feature-card">
        <div className="icon">💡</div>
        <h3>Our Vision</h3>
        <p>We envision a campus environment where feedback is encouraged and valued, leading to continuous improvement and a stronger, more connected institutional community. Our system is a tool to foster that positive change.</p>
      </div>
    </div>
  </div>
);

export default About;