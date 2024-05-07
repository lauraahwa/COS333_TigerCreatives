import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useAuth } from '@/context/AuthContext'
import { Splash, ReviewForm } from '@/components';
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Grid, Button, ButtonContainer } from '@/components'

import { useAuth0 } from "@auth0/auth0-react"


const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Heading = styled.h2`
  margin-bottom: 20px;
  font-weight: 100;
  font-size: 30px;
  text-align: center;
`;

const Review = () => {
  return (
    <Container>
      <Splash header="Write a Review" subtext="Offer your feedback for this seller on the listing you purchased!"  />
      <ReviewForm />
    </Container>
  );
};
  
export default Review