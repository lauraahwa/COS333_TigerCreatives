import React, { useState } from 'react'
import styled from 'styled-components'
import UserService from '../api/UserService'
import { Container } from '../components'

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const Home = () => {
  const [userData, setUserData] = useState({
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

    const response = await UserService.createUser(userData);
    console.log(response)
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <input name="first_name" value={userData.first_name} onChange={handleChange} placeholder="First Name" required />
        <input name="last_name" value={userData.last_name} onChange={handleChange} placeholder="Last Name" required />
        <input name="university" value={userData.university} onChange={handleChange} placeholder="University" required />
        <input name="email_address" value={userData.email_address} onChange={handleChange} placeholder="Email Address" required type="email" />
        <input name="age" value={userData.age} onChange={handleChange} placeholder="Age" required type="number" />
        <button type="submit">Create User</button>
      </Form>
    </Container>
  );
}

export default Home