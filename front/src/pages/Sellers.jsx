import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Splash, Grid } from '@/components'

import { viewListings } from '@/api/listingService'

const Container = styled.div`
    display: flex;
    flex-direction: column;
`

const GridContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 100px;
    margin: 50px 0;
`

const Sellers = () => {
  const [listingsData, setListingsData] = useState([])

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const data = await viewListings('services');
        console.log("Data fetched", data);
        setListingsData(data);
      } catch (error) {
        console.error("Fetching listings error:", error);
      }
    };

    fetchListings();
  }, []);

  return (
    <Container>
        <Splash header="Sellers" subtext="Need something creative? This is the place."/>
        <GridContainer>
            <Grid data={listingsData}/>
        </GridContainer>
    </Container>
  )
}

export default Sellers