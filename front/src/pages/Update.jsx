import React, {useState} from 'react'
import { Container } from '../components'
import styled from 'styled-components'
import UserService from '../api/UserService'

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const Update = () => {
    const [userData, setUserData] = useState({
        user_id: '',
        first_name: '',
        last_name: '',
        university: '',
        email_address: '',
        age: '',
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({ ...prevData, [name]: value }));
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        const { user_id, ...updateData } = userData;
        await UserService.updateUser(user_id, updateData);
        // Reset form or give feedback
      };
    
      return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <input name="user_id" value={userData.user_id} onChange={handleChange} placeholder="User ID" required />
                <input name="first_name" value={userData.first_name} onChange={handleChange} placeholder="First Name" />
                <input name="last_name" value={userData.last_name} onChange={handleChange} placeholder="Last Name" />
                <input name="university" value={userData.university} onChange={handleChange} placeholder="University" />
                <input name="email_address" value={userData.email_address} onChange={handleChange} placeholder="Email Address" type="email" />
                <input name="age" value={userData.age} onChange={handleChange} placeholder="Age" type="number" />
                <button type="submit">Update User</button>
            </Form>
        </Container>
      );
    }

export default Update