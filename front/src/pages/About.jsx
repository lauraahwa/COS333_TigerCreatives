import React from "react";
import Accordion from "../components/Accordion";
import { Splash} from '@/components';
import styled from 'styled-components';

const WhiteDivider = styled.div`
  height: 10px;
  background-color: white;
`;

const StyledAccordion = styled(Accordion)`
  font-size: 4em;
`;

const CenteredPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 50%;
`;


function About() {
  return (
    <div className = "App">
    <Splash header="About" subtext="Have any questions? We've got answers!"  />
    <WhiteDivider />
    <CenteredPage>
    <Container>
      <StyledAccordion
        title="What is TigerCreatives?"
        content={`<p>TigerCreatives is a platform for members of the Princeton community to list and purchase creative goods and services in a seamless fashion.</p>
          <br/>
          <p>From handmade jewelry to photography services, TigerCreatives aims to be Princeton's go-to hub for artistry exchange.</p>
          <br/>
          <p>We are dedicated to enabling student creators to get the recognition they deserve in a hassle-free way, without needing to compete with full-time retailers or create their own websites.</p>
          <br/>
          <p>Our platform reduces these barriers by focusing on the unique needs and talents within the Princeton community. We also want buyers and sellers to connect and know each other through virtual correspondence, fostering creative connections. Our profile-creation feature allows users to share more about themselves and engage directly with each other.</p>`
        }
      />
      <StyledAccordion
        title="Why TigerCreatives?"
        content={`<p>Currently, Princeton students have access to commercial, public-facing sites for creatives like Etsy or can create their own websites to market their goods and services.</p>
          <br/>
          <p>TigerCreatives is dedicated to being Princeton's go-to hub for artistry exchange. Our members can avoid competing with full-time retailers and avoid hidden costs.</p>
          <br/>
          <p>Our platform reduces these barriers by focusing on the unique needs and talents within the Princeton community. Moreover, TigerCreatives supports a bidding functionality similar to eBay's, allowing buyers and sellers to naturally reach a fair price for goods and services.</p>`
        }
      />
      <StyledAccordion
        title="What happens after I purchase an item/service?"
        content={`<p>After purchasing an item or service, an automated email will be sent to both the buyer and seller with transaction details. They can then determine the best payment method (Venmo, Zelle, Cash, etc.) and arrange delivery or performance.</p>`}
      />
      <StyledAccordion
        title="How does bidding on items/services work?"
        content={`<p><strong>For Buyers:</strong></p>
          <p>Once an auction is live, buyers can bid on items they're interested in purchasing. The first bidder must place a bid at least $0.50 greater than the starting price. Subsequent bids must be at least $0.50 higher than the previous bid. Bids are rounded to the nearest cent, and bids can't be placed on expired auctions.</p>
          <br/>
          <p><strong>For Sellers:</strong></p>
          <p>When starting an auction, sellers provide a 'Price' and 'Auction Start Price'. Only the 'Auction Start Price' is used for the auction. If no bids have been placed when the auction ends, the listing will be removed once the 'Process Auction' button is clicked. You will receive an automated email alerting you of this. Sellers can re-upload their listing as a new auction or set a fixed price. Editing the auction end date is a feature our team is working on.</p>`
        }
      />
      <StyledAccordion
        title="What are TigerCreatives’ guidelines for buyers/sellers?"
        content={`<p>TigerCreatives relies on users to maintain appropriate listings and conduct. Sellers should focus on listings that contain a creative or artistic element. Buyers shouldn't bid on items they don't intend to purchase, and transactions should be settled responsibly.</p>`}
      />
      <StyledAccordion
        title="How does the search function work?"
        content={`<p>Currently, our search function queries listings based on their titles. We plan to add more search features, such as searching by category, seller name, and general seller info. Stay tuned!</p>`}
      />
      <StyledAccordion
        title="I found a bug. I have feedback to offer. I have a more specific question. What should I do?"
        content={`<p>We're working to improve the site and welcome your feedback! Click on the words 'Contact Us' in the footer to send us an email.</p>`}
      />
      <StyledAccordion
        title="Who built TigerCreatives?"
        content={`<p>TigerCreatives was built as a Spring 2024 COS333 final project by Jack O'Donnell, Laura Hwa, Divraj Singh, and Christine Ao.</p>`}
      />
      </Container>
      </CenteredPage>
      <WhiteDivider />
    </div>
  );
}
export default About;
