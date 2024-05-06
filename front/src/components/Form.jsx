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
    width: 50%;
    padding: 8px;
    border-radius: 5px;
    border: 1px solid var(--text-color);
    box-shadow: inset 0 1px 3px #ddd;
    justify-content: center;
    align-items: center;
  }

  label {
    margin-bottom: 5px;
    color: #666;
    font-size: 0.9rem;
  }
`

const StyledButton = styled(Button)`
  padding: 6px 17px;
  font-size: 1.2rem;
`

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin: 10px 0;
  user-select: none;
  cursor: pointer;
  font-size: 16px; // Adjust font size as needed

  // Checkbox styling
  input[type="checkbox"] {
    appearance: none;
    margin-right: 20px;
    width: 20px; // Custom width
    height: 20px; // Custom height
    border: 1px solid #ccc;
    border-radius: 3px; // Rounded corners for the checkbox
    position: relative;

    &:checked::after {
      content: '✓';
      position: absolute;
      top: 1px;
      left: 4px;
      color: green;
    }
  }
`

const Form = () => {
  const [formData, setFormData] = useState({
    itemName: '',
    itemDescription: '',
    itemPrice: '',
    isService: false,
    isAuction: false,
    endTime: '',
    startPrice: '',
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
      'is_auction': formData['isAuction'],
      'start_price': formData['startPrice'],
      'auction_end_time': formData['auctionEndDate']
    }

    if (listingData['is_auction']) {
      console.log("endtime " + listingData['auction_end_time'])
      listingData['auction_end_time'] = listingData['auction_end_time'].replace('T', ' ') + ':00';
      console.log("endtime " + listingData['auction_end_time'])
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

    try {
      postListingData();
      console.log(formData.startPrice)
       // resetting form data
      alert('Form submitted successfully!');
      setFormData({
        itemName: '',
        itemDescription: '',
        itemPrice: '',
        isService: false,
        isAuction: false,
        endTime: '',
        startPrice: ''
      });
    } catch (error) {
      console.error("Submission error:", error);
      alert('An error occurred during form submission. Please try again.');
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <p>Name of Product/Service:</p>
      <div>
        <input
          type="text"
          id="itemName"
          placeholder=" "
          name="itemName"
          value={formData.itemName}
          onChange={handleChange}
          required
        />
      </div>
      <p>Description of Product/Service:</p>
      <div>
        <textarea
          id="itemDescription"
          name="itemDescription"
          placeholder=" "
          value={formData.itemDescription}
          onChange={handleChange}
          required
        />
      </div>
      <p>Price ($USD):</p>
      <div>
        <input
          type="number"
          id="itemPrice"
          placeholder=" "
          name="itemPrice"
          value={formData.itemPrice}
          onChange={handleChange}
          required
        />
      </div>
      <p>Upload an Image:</p>
      <div>
        <input
          type="file"
          id="imageUpload"
          placeholder=" "
          name="image"
          onChange={handleFileChange}
          accept="image/*"
          required
        />
      </div>
      <CheckboxContainer>
      <label htmlFor="isService">Is this a service?</label>
      <input
        type="checkbox"
        id="isService"
        name="isService"
        checked={formData.isService}
        onChange={handleChange}
      />
      </CheckboxContainer>
      <CheckboxContainer>
      <label htmlFor="isAuction">Is this an auction?</label>
      <input
        type="checkbox"
        id="isAuction"
        name="isAuction"
        checked={formData.isAuction}
        onChange={handleChange}
      />
      </CheckboxContainer>

      {formData.isAuction && (
        <>
          <p>Auction Start Price ($USD):</p>
          <div>
            <input
              type="number"
              id="startPrice"
              placeholder=" "
              name="startPrice"
              value={formData.startPrice}
              onChange={handleChange}
              required
            />
          </div>
          <p>Input Auction End Date:</p>
          <div>
            <input
              type="datetime-local"
              id="auctionEndDate"
              placeholder="Auction End Date"
              name="auctionEndDate"
              value={formData.auctionEndDate}
              onChange={handleChange}
              required={formData.isAuction}
            />
          </div>
        </>
      )}
      <ButtonContainer>
        <StyledButton text="Submit"/>
      </ButtonContainer>
      <br></br>
    </StyledForm>
  );
}

export default Form;
