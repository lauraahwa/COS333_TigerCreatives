import React, { useState } from 'react'
import styled from 'styled-components'
import { Container } from '../components'
import UserService from '../api/UserService'

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const Delete = () => {
    const [userId, setUserId] = useState('');

    const handleChange = (e) => {
      setUserId(e.target.value);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      await UserService.deleteUser(userId);
      // Reset form or give feedback
      setUserId('');
    };
  
    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <input name="user_id" value={userId} onChange={handleChange} placeholder="User ID" required />
                <button type="submit">Delete User</button>
            </Form>
        </Container>
    );
}
  

export default Delete