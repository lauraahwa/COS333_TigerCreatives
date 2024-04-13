import React, { useState } from 'react';
import styled from 'styled-components'

function Form() {
  const [formData, setFormData] = useState({
    itemName: '',
    itemDescription: '',
    itemPrice: '',
    proposedPrice: ''
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
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="itemName">Item Name:</label>
        <input
          type="text"
          id="itemName"
          name="itemName"
          value={formData.itemName}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="itemDescription">Item Description:</label>
        <textarea
          id="itemDescription"
          name="itemDescription"
          value={formData.itemDescription}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="itemPrice">Item Price ($):</label>
        <input
          type="number"
          id="itemPrice"
          name="itemPrice"
          value={formData.itemPrice}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="proposedPrice">Proposed Price ($):</label>
        <input
          type="number"
          id="proposedPrice"
          name="proposedPrice"
          value={formData.proposedPrice}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default Form;
