import React, { useState } from 'react'
import styled from 'styled-components'
import { Container } from '../components'
import UserService from '../api/UserService'

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        
        try {
            const response = await UserService.login(username, password);
            console.log(response.data);
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <Container>
            <a href='/index' class="cas-auth-button">Login with CAS</a> 
        </Container>
    );
};
  
export default Login