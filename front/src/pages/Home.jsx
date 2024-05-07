import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { viewListings, viewSortedAuctions } from "@/api/listingService";
import { Grid, Button, ButtonContainer } from "@/components";
import { Link } from 'react-router-dom';

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
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 100px;

  justify-content: center;
  align-items: center;
`;

const Header = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  margin-top: 40px;
  margin-bottom: 40px;
`;

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
    font-size: clamp(1.5rem, 4vw, 8rem);
    margin-bottom: 1rem;

    i {
      font-weight: 400;
    }
  }

  h2 {
    font-weight: 500;
    margin-top: -0.5rem;
    margin-bottom: 1.5rem;
    font-size: clamp(1rem, 2vw, 2rem);
  }
  
  .button-container {
    display: flex;
    justify-content: center;
    width: 100%;
  }
`

const WhiteDivider = styled.div`
  height: 150px;
  background-color: white;
`;

const HorizontalLine = styled.hr`
  border: none;
  border-top: 4px solid ${({ color }) => color || '#403c3c'};
  width: ${({ width }) => width || '100%'};
  margin-top: 70px;
`;

const Home = () => {
  const [listingsData, setListingsData] = useState([]);
  const [auctionsData, setAuctionsData] = useState([]);
  const [servicesData, setServicesData] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const data = await viewListings("items");
        console.log("Data fetched", data);
        setListingsData(data.slice(0, 4));
      } catch (error) {
        console.error("Fetching listings error:", error);
      }
    };
    const fetchSortedAuctions = async () => {
      try {
        const data = await viewSortedAuctions();
        console.log("auctions data fetched", data);
        setAuctionsData(data.slice(0, 4));
      } catch (error) {
        console.error("Fetching auctions error", error);
      }
    };
    const fetchServices = async () => {
      try {
        const data = await viewListings('services');
        console.log("services data fetched", data);
        setServicesData(data.slice(0,4));
      } catch (error) {
        console.error("Fetching services error:", error);
      }
    };

    fetchListings();
    fetchSortedAuctions();
    fetchServices();
  }, []);


  return (
    <>
      <Title>
        <h1>
          Tiger<i>Creatives</i>
        </h1>
        <h2>buy, sell, create.</h2>
      </Title>
      <HorizontalLine />
      <Container>
        <Header>Discover: Active Auctions</Header>
        <Grid isLanding={false} data={auctionsData} />
      </Container>
      <HorizontalLine />
      <Container>
        <Header>Products</Header>
        <Grid isLanding={true} data={listingsData} />
        <ButtonContainer>
          <a href="/shop">
            <Button text="Show More" />
          </a>
        </ButtonContainer>
      </Container>
      <HorizontalLine />
      <Container>
        <Header>Services</Header>
        <Grid isLanding={true} data={servicesData} />
        <ButtonContainer>
          <a href="/services">
            <Button text="Show More" />
          </a>
        </ButtonContainer>
      </Container>
      <HorizontalLine />
      <Banner>
        <h1>Want a creative item or service? <br /></h1>
        <h2>
          Purchase something that your peers have thoughtfully <br />
          offered to share with the Princeton community!<br />
          We hope you'll find the sort of artistry that suits you. <br /> {" "}
        </h2>
        <Link to='/profile' style={{ textDecoration: 'none' }}>
                <Button text="Login / Sign Up" style={{ width: '200px' }} onClick={() => loginWithRedirect()} />
        </Link>
      </Banner>
      <Banner>
        <h1>Are you a creator? <br /></h1>
        <h2>
          Share your craft with members of the Princeton community!<br />
          We're here to encourage your artistry, connect you to appreciators
          of creativity, <br /> and be your go-to platform for celebrating
          what you do best.<br /> {" "}
        </h2>
        <Link to='/profile' style={{ textDecoration: 'none', marginRight: '15px' }}>
                <Button text="Login / Sign Up" style={{ width: '200px' }} onClick={() => loginWithRedirect()} /> 
              </Link>
      </Banner>
      <WhiteDivider />
    </>
  );
};

export default Home
