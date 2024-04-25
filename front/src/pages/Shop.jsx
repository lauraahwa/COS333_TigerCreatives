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

const SearchInput = styled.input`
    margin: 20px 100px;
    padding: 10px;
    font-size: 16px;
`

const Shop = () => {
  const [listingsData, setListingsData] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

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

  const filteredData = listingsData.filter(listing =>
    listing.title.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
    <Container>
        <Splash header="Shop" subtext="Want to browse stuff already made? This is the place."/>
        <SearchInput
          type="text"
          placeholder="Search items..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <GridContainer>
            <Grid data={filteredData} />
        </GridContainer>
        
    </Container>
    
  )
}

export default Shop