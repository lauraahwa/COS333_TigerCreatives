import React, { useState, useCallback, useEffect } from 'react'
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

const Shop = () => {
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
    <Container>
        <Splash header="Shop" subtext="Want to browse stuff already made? This is the place."/>
        <GridContainer>
            <Grid data={listingsData} />
        </GridContainer>
        
    </Container>
    
  )
}

export default Shop