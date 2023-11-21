import React from 'react';
//import Image1 from './img2.jpeg'; 


const Frontpage = () => { 
  const frontstyle={
    textAlign: 'center'
  }

  const headingStyle = {
    color: '#333',
    textDecoration: 'underline',
  };

  /*const imgStyle = {
    width: '40%',
    borderRadius: '5px',
    boxShadow: '2px 2px 5px #888888',
  };*/
  const aboutusStyle = {
    border: '2px solid #333',
    padding: '20px',
    margin: '0 auto', 
    maxWidth: '600px', 
  };

  const about2= {
    textDecoration: 'underline',
  }

  return (
    <div style={frontstyle}className="welcome">
      <h1 style={headingStyle}>Welcome to House Rental Management</h1>
      <br></br>
      <div className='aboutus'style={aboutusStyle}>
      <h2 style={about2}>About Us</h2>
      <h4 textAlign='center'>Welcome to our website, where we facilitate effortless connections between homeowners and renters in the realm of property rentals. Our platform simplifies house hunting by offering a tailored property search experience. Renters can filter properties based on their preferences, book appointments directly with owners, and explore verified listings. Transparency is our priority – our review and rating system ensures credible experiences for both homeowners and renters. Join us and discover your ideal rental home or showcase your property to genuine, quality renters. Experience convenience, transparency, and reliability in rental management today.</h4>
      <br></br>
      <br></br>
      <h3>Contact Us</h3>
      <h3>Email: houserental@gmail.com</h3>
      <h3>Phone: 9876543210</h3>
      </div>
    </div>
  );
};

export default Frontpage;
