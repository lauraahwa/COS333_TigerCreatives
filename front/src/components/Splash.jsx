import React from 'react'
import styled from 'styled-components'
import splash from '@/assets/splash.jpg'

const Container = styled.div`
    position: relative;
    width: 100%;
    height: 316px;
    overflow: hidden;

    display: flex;
    justify-content: center;
    align-items: center;
`
const TextContainer = styled.div`
    position: absolute;
    top: 40%;
    bottom: 50%;
    left: 0;
    width: 100%;
    text-align: center;
    color: var(--text-color);
    margin: 0;

    display: flex;
    flex-direction: column;

    h1 {
      font-weight: 500;
      font-size: 1.5rem;
    }
    
    h2 {
      font-weight: 400;
      font-size: 1rem;
    }
`


const Image = styled.img`
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: -1;
`

const Splash = ({ header, subtext }) => {
  return (
    <Container>
      <TextContainer>
        <h1>{header}</h1>
        <h2>{subtext}</h2>
      </TextContainer>  
      <Image src={splash} />
    </Container>
  )
}

export default Splash