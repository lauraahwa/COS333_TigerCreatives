import React from 'react';
import styled from 'styled-components';
import { Splash, Form } from '@/components';
import { uploadImage, createListing } from '@/api/listingService';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 50px;
`

const ContentArea = styled.div`
    display: flex;
    flex-direction: row;
    padding: 0 50px;
    align-items: flex-start; // Ensure vertical alignment at the top
`

const Content = styled.div`
    padding: 20px;
    flex: 3;
    min-width: 0; // Fixes potential overflow issues with flex children
`

const InfoSidebar = styled.div`
    background-color: #f4f4f4;
    padding: 20px;
    flex: 1;
    border-left: 2px solid #ccc;
    display: flex;
    flex-direction: column;
    justify-content: start;
`

const Heading = styled.h3`
    margin-top: 0;
    color: #333;
`

const Text = styled.p`
    color: #666;
    margin: 10px 0;
`

const BiddingInfoContainer = styled.div`
    display: flex;
    flex-direction: row; // Display content in rows
    flex-wrap: wrap; // Allow wrapping if there's not enough space
    gap: 10px; // Spacing between elements
`

const InfoSection = styled.div`
    flex: 1 1 100%; // Each info section takes full width of its container
`

const CreateListing = () => {
  return (
    <Container>
        <Splash header="Create" subtext="Want to sell something you made or a service you can do? This is the place." />
        <ContentArea>
            <Content>
                <Form />
            </Content>
            <InfoSidebar>
                <Heading>Bidding Information</Heading>
                <BiddingInfoContainer>
                    <InfoSection>
                        <Text>When you create a listing on TigerCreatives, you have the option to enable bidding. This allows you to set a starting bid and specify when the bidding for your item will end. This turns your listing into an auction where buyers can compete to purchase your item or service.</Text>
                    </InfoSection>
                    <InfoSection>
                        <Text>Begin by describing your item or service clearly and uploading high-quality images.</Text>
                    </InfoSection>
                    <InfoSection>
                        <Text>Decide the minimum amount you are willing to accept for your item or service.</Text>
                    </InfoSection>
                    <InfoSection>
                        <Text>Select how long the auction will last. This can range from a few hours to several days, depending on how quickly you want to sell.</Text>
                    </InfoSection>
                    <InfoSection>
                        <Text>Once your listing is live, buyers can start placing bids. Each bid needs to be at least $0.50 higher than the last.</Text>
                    </InfoSection>
                </BiddingInfoContainer>
            </InfoSidebar>
        </ContentArea>
    </Container>
  )
}

export default CreateListing;
