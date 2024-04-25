import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Splash, BidForm } from '@/components'
import { uploadImage, createBidListing } from '@/api/listingService'


const Container = styled.div`
   display: flex;
   flex-direction: column;
`


const Content = styled.div`
   padding: 0 100px;
   display: flex;
   flex-direction: column;
`




const CreateBidListing = () => {
  const [bidData, setBidData] = useState(null);

  const handleBidSubmit = (data) => {
    setBidData(data);
  };

 return (
   <Container>
       <Splash header="Create Bid Listing" subtext="Want users to be able to bid on your product? Enter the details below" />
       <Content>
           <BidForm onSubmit={handleBidSubmit}/>
           {bidData && (
          <div>
            <h2>New Item For Bid:</h2>
            <p>Item Name: {bidData.itemName}</p>
            <p>Description: {bidData.itemDescription}</p>
            <p>Price: {bidData.itemPrice}</p>
            <p>Bid Time: {bidData.itemDescription}</p>
          </div>
        )}
       </Content>
   </Container>
 )
}


export default CreateBidListing
