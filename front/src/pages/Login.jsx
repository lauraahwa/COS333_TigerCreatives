import React, { useState } from 'react'
import styled from 'styled-components'
import { useAuth } from '@/context/AuthContext'
import { login } from '@/api/userService'
import axios from 'axios'

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 100px;

`

const Login = () => {
    const { isSignedIn, signIn, signOut } = useAuth();

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            const response = await login();
            const token = response.access_token;
            localStorage.setItem('token', token)
            event.preventDefault();
            console.log(token)
            signIn()
            alert('Login successful')
        } catch (error) {
            alert('Login failed')
        }
    }

    return (
        <Container>
            <a onClick={handleSubmit} href='/'>Login</a>
        </Container>
            // <a href='/index' class="cas-auth-button">Login with CAS</a> 
    );
};
  
export default Login