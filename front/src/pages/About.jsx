import React from "react";
import Accordion from "../components/Accordion";

function About() {
  return (
    <div className="App">
      <Accordion
        title="What is TigerCreatives"
        content="<p>TigerCreatives is a platform for members of the Princeton community to list and purchase creative goods and services in a seamless fashion.</p>
        </br> 
        <p>From handmade jewelry to photography services, TigerCreatives aims to be Princetons go-to hub for artistry exchange. </p>
        </br> 
        <p>We are dedicated to enabling student creators to get the recognition they deserve in a hassle-free way, without the need to compete with full-time retailers on platforms like Etsy, or the complexities of creating their own websites.</p> 
        </br> 
        <p> Our platform reduces these barriers by focusing solely on the unique needs and talents within the Princeton community. Moreover, we want buyers and sellers to truly know each other, fostering a connection among appreciators of art. This community connection is facilitated through our profile-creation feature, which allows users to share more about themselves and engage directly with each other.</p> "
      />
      <Accordion
        title="How do I join TigerCreatives?"
        content="Simply sign up through our registration page through CAS to start buying or selling."
      />
      <Accordion
        title="What can I sell on TigerCreatives?"
        content="You can sell any creative goods or services, from artwork and handmade crafts to photography sessions and graphic design services."
      />
      <Accordion
        title="How does TigerCreatives differ from other platforms?"
        content="Unlike broader platforms like Etsy, TigerCreatives is specifically designed for the Princeton community, which ensures a more targeted and relevant audience for your creative works. We use a bidding structure similar to Ebay for users to buy and sell"
      />
    </div>
  );
}

export default About
