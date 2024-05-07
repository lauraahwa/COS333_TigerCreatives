import React from 'react';
import styled from 'styled-components';
import { Splash, Form } from '@/components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;

const ContentArea = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0 50px;
  align-items: flex-start;
`;

const Content = styled.div`
  flex: 2; 
  padding: 20px;
`;

const InfoSidebar = styled.div`
  flex: 1; // Sidebar takes the remaining space
  background-color: #f4f4f4;
  padding: 20px;
  margin-top: 110px; // Adjust to lower the box
  margin-left: -220px; // Adjust to move left
  border-left: 2px solid #ccc;
  border-right: 2px solid #ccc;
  border-top: 2px solid #ccc;
  border-bottom: 2px solid #ccc;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: relative; 
`;

const Heading = styled.h3`
  margin-top: 0;
  color: #333;
`;

const Text = styled.p`
  color: #666;
  margin: 10px 0;
`;

const InfoSection = styled.div`
  margin-bottom: 15px;
`;

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
            <InfoSection>
              <Text>
                When you create a listing on TigerCreatives, you have the option to enable bidding. This allows you to set a starting bid and specify when the bidding will end. Buyers can then compete to purchase your item or service.
              </Text>
            </InfoSection>
            <InfoSection>
              <Text>
                For an auction listing, you will find fields for ‘Price’ and ‘Auction Start Price’. Only the ‘Auction Start Price’ will be considered for your auction listing.
              </Text>
            </InfoSection>
            <InfoSection>
              <Text>
                Begin by describing your item or service clearly and uploading high-quality images.
              </Text>
            </InfoSection>
            <InfoSection>
              <Text>
                Decide the minimum amount you are willing to accept for your item or service.
              </Text>
            </InfoSection>
            <InfoSection>
              <Text>
                Select how long the auction will last. This can range from a few hours to several days, depending on how quickly you want to sell. Your auction expiry must be at least 2 minutes beyond the time that you're placing the listing.
              </Text>
            </InfoSection>
            <InfoSection>
              <Text>
                Once your listing is live, buyers can start placing bids starting from $0.50 more than your start price. Each subsequent bid will be at least $0.50 higher than the last.
              </Text>
            </InfoSection>
          </InfoSidebar>
        </ContentArea>
      </Container>
    );
  };
  
  export default CreateListing;
