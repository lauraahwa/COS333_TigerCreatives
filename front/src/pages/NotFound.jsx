import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Splash, Button } from '@/components'; // Import Button here

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

// Existing TextContainer styling
const TextContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 0 100px;
  margin: 50px 0;

  h1 {
    font-weight: 400;
    font-size: 2.5rem;
    line-height: 2.3rem;
  }

  h2 {
    margin-top: 10px;
    font-weight: 400;
    font-size: 1.5rem;
    color: var(--subtext-color);
  }

  p {
    width: 90%;
  }
`;

// Container for the button
const ButtonContainer = styled.div`
  margin-top: 20px;
`;

const NotFound = () => {
  return (
    <Container>
      <Splash header="Page Not Found"  />
      <TextContainer>
        <h1>It seems the page you were looking for does not exist or has been moved.</h1>
        <ButtonContainer>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Button text="Return to Homepage" style={{ width: '200px' }} />
          </Link>
        </ButtonContainer>
      </TextContainer>
    </Container>
  );
};

export default NotFound;
