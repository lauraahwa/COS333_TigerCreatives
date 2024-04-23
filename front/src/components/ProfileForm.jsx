import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components'
import { Button, ButtonContainer } from '@/components'
import { uploadImage, createBidListing } from '@/api/listingService';
import { ProfileInfo } from '@/components';

const StyledForm = styled.form`
  margin-top: 80px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  input, textarea {
    display: flex;
    border-radius: 10px;
    padding: 2px 10px;
    justify-content: center;
    align-items: center;
    border: 1px solid var(--text-color);
  }
`

const StyledButton = styled(Button)`
  padding: 6px 17px;
  font-size: 0.9rem;
`
const ProfileForm = ({ updateProfileData, initialProfileData }) => {
  const [formData, setFormData] = useState({
    username: initialProfileData ? initialProfileData.username: '',
    userType: initialProfileData ? initialProfileData.userType: '',
    bio: initialProfileData ? initialProfileData.bio: '',
  });
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    if (initialProfileData) {
      setFormData({
        username: initialProfileData.username || '',
        userType: initialProfileData.userType || '',
        bio: initialProfileData.bio || '',
      });
    }
  }, [initialProfileData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (event) => {
    setPhoto(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    console.log('Test');
    event.preventDefault();

    try {
      const imageResponse = await uploadImage({ image: photo });
      const imageUrl = imageResponse.url;

       const updatedProfileData = { 
        ...initialProfileData,
        profilePicture: imageUrl,
        username: formData.username,
        userType: formData.userType,
        bio: formData.bio,
      };

      updateProfileData(updatedProfileData);
      //reset after submission
      setFormData({
        username: '',
        userType: '',
        bio: '',
      });
      setPhoto(null);

      alert('Congrats! You just updated your profile.');
    } catch (error) {
      console.error('Error:', error);
      alert('Error while trying to update profile. Please try again.');
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <div>
        <input
          type="file"
          id="profilePicture"
          name="profilePicture"
          onChange={handleFileChange}
          accept="image/*"
          required
        />
      </div>
      <div>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <select
          id="userType"
          name="userType"
          value={formData.userType}
          onChange={handleChange}
          required
        >
          <option value="">Select user type</option>
          <option value="buyer">Buyer</option>
          <option value="seller">Seller</option>
          <option value="buyer + seller">Buyer + Seller</option>
        </select>
      </div>
      <div>
        <textarea
          id="bio"
          name="bio"
          placeholder="Bio"
          value={formData.bio}
          onChange={handleChange}
          required
        />
      </div>
      <ButtonContainer>
        <StyledButton text="Submit" />
      </ButtonContainer>
    </StyledForm>
  );
};

export default ProfileForm; 