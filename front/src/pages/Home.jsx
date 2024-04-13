import React, { useState } from 'react'
import styled from 'styled-components'
import UserService from '@/api/UserService'
import { Grid } from '@/components'

const Title = styled.div`

  display: flex;
  flex-direction: column;
  padding: 0 100px;
  margin-bottom: 44px;

  h1 {
    font-weight: 700;
    font-size: clamp(2rem, 9vw, 8rem);

    i {
      font-weight: 400;
    }
  }

  h2 {
    font-weight: 500;
    margin-top: -0.5rem;
    font-size: clamp(1rem, 3vw, 2rem);
  }
`
const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 100px;

`

const Header = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 41px;
`

const Home = () => {

  return (
    <>
      <Title>
        <h1>Tiger<i>Creatives</i></h1>
        <h2>buy, sell, create.</h2>
      </Title>
      <Container>
        <Header>Discover</Header>
        <Header>Products</Header>
        <Grid />
      </Container>
    </>
  );
}

export default Home