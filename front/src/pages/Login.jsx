import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useAuth } from '@/context/AuthContext'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Grid, Button, ButtonContainer } from '@/components'

import { useAuth0 } from "@auth0/auth0-react"

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const Banner = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: right;
  text-align:  right;
  background-color: var(--container-color);

  padding: 78px 100px;

  h1 {
    font-weight: 700;
    font-size: clamp(1.5rem, 4vw, 8rem);

    i {
      font-weight: 400;
    }
  }

  h2 {
    font-weight: 500;
    margin-top: -0.5rem;
    font-size: clamp(1rem, 2vw, 2rem);
    }
  
  .button-container {
    display: flex;
    justify-content: flex-end;
    width: 100%; 
  }
`
const TextContainer = styled.div`
    margin-top: 20px; 
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 100px;
    margin-bottom: 100px;

    h1 {
        font-weight: 700;
        font-size: clamp(1.5rem, 4vw, 8rem);
        margin-top: 40px;
    
        i {
          font-weight: 400;
        }
      }
    
    h2 {
        font-weight: 500;
        margin-top: -0.5rem;
        font-size: clamp(1rem, 2vw, 2rem);
    }

    .upper-text,
    .lower-text {
    display: flex;
    align-items: center;
    margin-bottom: 40px;
}

`


const Login = () => {
    const { loginWithRedirect } = useAuth0();
    // const { isSignedIn, signIn, signOut } = useAuth();

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
        <>
          <Banner>
            <h1>Want to support student creatives?</h1>
            <h2>Browse creative goods and services or create an account to make a purchase!</h2>
            <TextContainer></TextContainer>
            <TextContainer className="button-container">
                <Link to='/profile' style={{ textDecoration: 'none', marginRight: '15px' }}>
                    <Button text="Sign Up" style={{ width: '200px' }} onClick={() => loginWithRedirect()} /> 
                </Link>
                <Link to='/shop' style={{ textDecoration: 'none', marginRight: '15px' }}>
                    <Button text="Browse Goods" style={{ width: '200px' }} />
                </Link>
                <Link to='/services' style={{ textDecoration: 'none' }}>
                    <Button text="Browse Services" style={{ width: '200px' }} />
                </Link>
            </TextContainer>
            <TextContainer></TextContainer>
          </Banner>
          <Container>
          <TextContainer></TextContainer>
            <h1>Are you a creative?</h1>
            <h2>Get started by creating an account and upload your first listing. </h2>
            <TextContainer></TextContainer>
            <Link to='/profile' style={{ textDecoration: 'none' }}>
                <Button text="Login/Sign Up" style={{ width: '200px' }} onClick={() => loginWithRedirect()} />
            </Link>
          </Container>
        </>
    );
};
  
export default Login