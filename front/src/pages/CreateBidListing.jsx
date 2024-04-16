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
  return (
    <Container>
        <Splash header="Create Bid Listing" subtext="Want users to be able to bid on your product? Enter the details below" />
        <Content>
            <BidForm />
        </Content>
    </Container>
  )
}

export default CreateBidListing