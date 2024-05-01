import React from 'react';
import styled from 'styled-components';
import { Splash, Form } from '@/components';
import { uploadImage, createListing } from '@/api/listingService';

const Container = styled.div'
    display: flex;
    flex-direction: row; 


const Content = styled.div'
    padding: 0 50px;
    flex: 3; 


const InfoSidebar = styled.div'
    background-color: #f4f4f4; 
    padding: 20px;
    flex: 1;
    border-left: 2px solid #ccc; 
    display: flex;
    flex-direction: column;
    justify-content: start;


const Heading = styled.h3'
    margin-top: 0;
    color: #333;


const Text = styled.p'
    color: #666;


const CreateListing = () => {
  return (
    <Container>
        <Splash header="Create" subtext="Want to sell something you made or a service you can do? This is the place." />
        <Content>
            <Form />
        </Content>
        <InfoSidebar>
            <Heading>Bidding Information</Heading>
            <Text>When you create a listing on TigerCreatives, you have the option to enable bidding. This allows you to set a starting bid and a bidding duration, turning your listing into an auction where buyers can compete to purchase your item or service.</Text>
            <Heading>Create Your Listing</Heading>
            <Text>Begin by describing your item or service clearly and uploading high-quality images.</Text>
            <Heading>Set a Starting Bid</Heading>
            <Text>Decide the minimum amount you are willing to accept for your item or service.</Text>
            <Heading>Choose the Duration</Heading>
            <Text>Select how long the auction will last. This can range from a few hours to several days, depending on how quickly you want to sell.</Text>
            <Heading>Publish Your Listing</Heading>
            <Text>Once your listing is live, buyers can start placing bids.</Text>
        </InfoSidebar>
    </Container>
  )
}

export default CreateListing;
