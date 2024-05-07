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
    <div className="App">
      <Splash header="About" subtext="Have any questions? We've got answers!"  />
      <WhiteDivider />
      <CenteredPage>
      <Container>
        <StyledAccordion
          title="What is TigerCreatives?"
          content="<p>TigerCreatives is a platform for members of the Princeton community to list and purchase creative goods and services in a seamless fashion.</p>
          </br>
          <p>From handmade jewelry to photography services, TigerCreatives aims to be Princetons go-to hub for artistry exchange. </p>
          </br> 
          <p>We are dedicated to enabling student creators to get the recognition they deserve in a hassle-free way, without the need to compete with full-time retailers on platforms like Etsy, or the complexities of creating their own websites.</p> 
          </br> 
          <p> Our platform reduces these barriers by focusing solely on the unique needs and talents within the Princeton community. Moreover, we want buyers and sellers to truly know each other, fostering a connection among appreciators of art. This community connection is facilitated through our profile-creation feature, which allows users to share more about themselves and engage directly with each other.</p> "
          />
        <StyledAccordion
          title="What can I sell on TigerCreatives?"
          content="<p>You can sell any creative goods or services, from artwork and handmade crafts to photography sessions and graphic design services.</p>"
        />
        <StyledAccordion
          title="What can I sell on TigerCreatives?"
          content="<p>You can sell any creative goods or services, from artwork and handmade crafts to photography sessions and graphic design services.</p>"
        />
        <StyledAccordion
          title="How does TigerCreatives differ from other platforms?"
          content="<p>Unlike broader platforms like Etsy, TigerCreatives is specifically designed for the Princeton community, which ensures a more targeted and relevant audience for your creative works. We use a bidding structure similar to Ebay for users to buy and sell.</p>"
        />
      </Container>
      </CenteredPage>
      <WhiteDivider />
    </div>
  );
}

export default About
