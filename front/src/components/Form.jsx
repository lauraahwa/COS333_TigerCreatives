import React, { useState } from 'react';
import styled from 'styled-components'
import { Button, ButtonContainer } from '@/components'

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
    console.log('Form Data:', formData);
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
      <ButtonContainer>
        <StyledButton text="Submit"/>
      </ButtonContainer>
      
    </StyledForm>
  );
}

export default Form;
