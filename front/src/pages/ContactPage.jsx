import React from 'react';
import styled from 'styled-components';
import { Splash} from '@/components';
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
    align-items: flex-start;
    margin-top: 40px;
    margin-bottom: 40px;
`
const ContactList = styled.ul`
    list-style-type: none; 
`

const ContactListItem = styled.li`
    font-size: 17px;
`
const ContactListD = styled.li`
    font-size: 15px;
    margin-bottom: 30px;
    font-weight:  50; 
`

const LeftPanel = styled.div`
    padding: 20px;
    flex: 1; 
    min-width: 0; 
`
const RightPanel = styled.div`
    padding: 20px;
    flex: 0.8; 
    min-width: 0;
    text-align: center;
`

const Heading = styled.h3`
    text-align: center;
    margin-top: 0;
    color: #333;
    margin-bottom: 15px; 
    font-size: 30px;
`

const Text = styled.p`
    color: #333;
    margin: 30px 0;
    font-size: 20px;
`

const ContactPage = () => {
  return (
    <Container>
        <Splash header="Contact" subtext="Have any questions or feedback you want to ask or let us know?"  />
        <ContentArea>
            <LeftPanel>
                <Text>Check out our About page if you have any questions about who we are or how to use our site.</Text>
                
                <Text> For further inquiries of feedback, contact one of TigerCreatives' creators.</Text>
            </LeftPanel>
            <RightPanel>
                <Heading>Contact Details</Heading>
                <ContactList>
                    <ContactListItem>Jack O'Donnell</ContactListItem>
                    <ContactListD>jo9614@princeton.edu</ContactListD>
                    <ContactListItem>Laura Hwa</ContactListItem>
                    <ContactListD>laurah4@princeton.edu</ContactListD>
                    <ContactListItem>Divraj Singh</ContactListItem>
                    <ContactListD>ds7743@princeton.edu</ContactListD>
                    <ContactListItem>Christine Ao</ContactListItem>
                    <ContactListD>ca4655@princeton.edu</ContactListD>
                </ContactList>
            </RightPanel>
        </ContentArea>
    </Container>
  )
}
export default ContactPage;
