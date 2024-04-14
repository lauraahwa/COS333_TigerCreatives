import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { viewListings } from '@/api/listingService'
import { Grid, Button, ButtonContainer } from '@/components'

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

  justify-content: center;
  align-items: center;

`

const Header = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 41px;
`

const Banner = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: var(--container-color);

  padding: 78px 100px;
  margin-top: 130px;

  h1 {
    font-weight: 700;
    font-size: 4rem;
  }

  h2 {
    font-weight: 500;
    font-size: 2.5rem;
    margin-bottom: 30px;
  }
`

const Home = () => {
  const [listingsData, setListingsData] = useState([])

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const data = await viewListings('items');
        console.log("Data fetched", data);
        setListingsData(data);
      } catch (error) {
        console.error("Fetching listings error:", error);
      }
    };

    fetchListings();
  }, []);

  return (
    <>
      <Title>
        <h1>Tiger<i>Creatives</i></h1>
        <h2>buy, sell, create.</h2>
      </Title>
      <Container>
        <Header>Discover</Header>
        <Header>Products</Header>
        <Grid isLanding={true} data={listingsData}/>
        <ButtonContainer>
          <a href="/shop">
            <Button text="show more" />
          </a>
        </ButtonContainer>

      </Container>
      <Banner>
          <h1>Are you a creative?</h1>
          <h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </h2>
          <Button text="get started" />
      </Banner>
    </>
  );
}

export default Home