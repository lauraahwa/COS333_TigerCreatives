import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import { Button, ButtonContainer } from '@/components'
import { uploadImage, createBidListing } from '@/api/listingService';

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

const BidForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    itemName: '',
    itemDescription: '',
    itemPrice: '',
    itemBidTime: '',
  });
  const [photo, setPhoto] = useState(null)

  useEffect(() => {
    console.log("photo" + photo)
  }, [photo])

  const postListingData = async () => {
    const listingData = {
      'title': formData['itemName'],
      'description': formData['itemDescription'],
      'price': formData['itemPrice'],
      'bidTime': formData['itemBidTime'],
    }

    try {
      const imageResponse = await uploadImage({'image': photo})
      const url = imageResponse['url']
      // const url = "http://res.cloudinary.com/dabidf33e/image/upload/Picture_%24b53214d9-9132-4570-b06e-ccef7db9ebfe"
      console.log("imageResponse URL: " + url)

      listingData['image_url'] = url
      const response = await createListing(listingData)
      console.log(response)
    } catch (error) {
      console.error("Something failed here", error)
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = (event) => {
    setPhoto(event.target.files[0])
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form Data:', formData);
    postListingData();
    alert('Form submitted.');
    onSubmit(formData);
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <div>
        <input
          type="text" 
          id="itemName"
          placeholder="Name"
          name="itemName"
          value={formData.itemName}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <textarea
          id="itemDescription"
          name="itemDescription"
          placeholder="Description"
          value={formData.itemDescription}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <input
          type="number"
          id="itemPrice"
          placeholder="Price"
          name="itemPrice"
          value={formData.itemPrice}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <input
          type="number"
          id="itemBidTime"
          placeholder="BidTime"
          name="itemBidTime"
          value={formData.itemBidTime}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <input
          type="file"
          id="imageUpload"
          placeholder="Image"
          name="image"
          onChange={handleFileChange}
          accept="image/*"
          required
        />
      </div>
      <ButtonContainer>
        <StyledButton text="Submit"/>
      </ButtonContainer>
      
    </StyledForm>
  );
}

export default BidForm;