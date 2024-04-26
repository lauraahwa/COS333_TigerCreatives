import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import { Button, ButtonContainer } from '@/components'
import { uploadImage, createListing } from '@/api/listingService';

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

const Form = () => {
  const [formData, setFormData] = useState({
    itemName: '',
    itemDescription: '',
    itemPrice: '',
    isService: false,
    isAuction: false,
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
      'is_service': formData['isService'],
      'is_auction': formData['isAuction']
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
    const { name, type } = event.target;
    const value = type === "checkbox" ? event.target.checked : event.target.value;
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
          type="file"
          id="imageUpload"
          placeholder="Image"
          name="image"
          onChange={handleFileChange}
          accept="image/*"
          required
        />
      </div>
      <div>
        <label htmlFor="isService">Is this a service?</label>
        <input
          type="checkbox"
          id="isService"
          name="isService"
          checked={formData.isService}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="isAuction">Is this an auction?</label>
        <input
          type="checkbox"
          id="isAuction"
          name="isAuction"
          checked={formData.isAuction}
          onChange={handleChange}
        />
      </div>
      <ButtonContainer>
        <StyledButton text="Submit"/>
      </ButtonContainer>
      
    </StyledForm>
  );
}

export default Form;
