import React from 'react';
import './Contact.css'; // Import the new CSS
import sunidhiImage from '../images/sunidhi.jpg'; // Import local image
import harshitaImage from '../images/harshita.jpg'; // Import local image
import tusharImage from '../images/tushar.jpg'; // Import local image
import tanishqImage from '../images/tanishq.jpg'; // Import local image

const Contact = () => {
  // Your team member data is perfectly fine
  const teamMembers = [
    {
      name: 'Sunidhi Sharma',
      role: 'Developer',
      imageUrl: sunidhiImage,
      bio: 'Sunidhi is the architect of this platform, dedicated to creating efficient and scalable solutions for a better campus experience. Her focus is on robust backend logic and seamless integration.'
    },
    {
      name: 'Harshita Sharma',
      role: 'Developer/Designer',
      imageUrl: harshitaImage,
      bio: 'Harshita designed the user-friendly interface, focusing on making the complaint process as intuitive and seamless as possible. She believes great design is about solving problems for people.'
    },
    {
      name: 'Tanishq Bhatia',
      role: 'Backend Developer',
      imageUrl: tanishqImage,
      bio: 'Tanishq ensures the system runs smoothly, managing the database and server-side logic with a focus on security and reliability. He is the guardian of our data and performance.'
    },
    {
      name: 'Tushar Chawla',
      role: 'Project Manager',
      imageUrl: tusharImage,
      bio: 'Tushar designed the user-friendly interface , oversees the project, ensuring that feedback is heard and that the system continually evolves to meet user needs. He connects the team with the community.'
    }
  ];

  return (
    <div className="contact-container">
      <header className="contact-header">
        <h1>Get In Touch</h1>
        <p>We're here to help and answer any question you might have.</p>
      </header>
      
      <div className="form-container">
        {/* This form is correctly configured for Web3Forms */}
        <form action="https://api.web3forms.com/submit" method="POST">
          {/* Ensure this access_key is the one you received in your email */}
          <input type="hidden" name="access_key" value="3bc34189-e9c2-4ab6-9767-c276647cce45" />
          <input type="text" placeholder="Your Name" name="name" required />
          <input type="email" placeholder="Your Email" name="email" required />
          <textarea placeholder="Your Message" name="message" required></textarea>
          <input type="submit" value="Send Message" />
        </form>
      </div>

      <h2 className="team-section-title">Meet Our Team</h2>

      {teamMembers.map((member, index) => (
        <div className="team-member-row" key={index}>
          <div className="team-member-image">
            <img src={member.imageUrl} alt={member.name} />
          </div>
          <div className="team-member-info">
            <h3>{member.name}</h3>
            <p className="role">{member.role}</p>
            <p>{member.bio}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Contact;