import React, { useState } from 'react';
import styled from 'styled-components'

const Profile = () => {
  const [profileData, setProfileData] = useState({
    name: '',
    venmoLink: '',
    bio: ''
  });


  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Profile Data:', profileData);
    alert('Profile created.');
  };

  return (
    <div>
      <h1>Edit Profile</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={profileData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="venmoLink">Venmo Link:</label>
          <input
            type="text"
            id="venmoLink"
            name="venmoLink"
            value={profileData.venmoLink}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="bio">Bio/Description:</label>
          <textarea
            id="bio"
            name="bio"
            value={profileData.bio}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
}

export default Profile;
