import React, { useState } from 'react'
import styled from 'styled-components'
import { useAuth } from '@/context/AuthContext'
import axios from 'axios'
import { Link } from 'react-router-dom'

import { useAuth0 } from "@auth0/auth0-react"

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
    const { loginWithRedirect } = useAuth0();
    // const { isSignedIn, signIn, signOut } = useAuth();

    // const configureAuth0() {
    //     const auth0Client = await createA
    // }

    const handleSubmit = async (event) => {
        // event.preventDefault()
        try {
            const response = await login();
            console.log(response)
            const token = response.access_token;
            localStorage.setItem('token', token)
            event.preventDefault();
            console.log(token)
            loginWithRedirect()
            // alert('Login successful')

        } catch (error) {
            alert('Login failed')
        }

    }

    return (
        <Container>
            <Link to='/profile'>
                <button onClick={() => loginWithRedirect()}>Login</button>
            </Link>
        </Container>
            // <a href='/index' class="cas-auth-button">Login with CAS</a> <button onClick={handleSubmit}>Login</button>
    );
};
  
export default Login