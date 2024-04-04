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
            <Form onSubmit={handleLogin}>
                <input 
                    type="text" 
                    placeholder="Username" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                />
                <button type="submit">Login</button>
            </Form>
            <a href="https://example.com/cas/login">
                <button>CAS Login</button>
            </a>
        </Container>
    );
};
  
export default Login