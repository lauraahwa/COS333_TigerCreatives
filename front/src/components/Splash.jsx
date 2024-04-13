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

const Header = styled.h1`
    position: absolute;
    top: 40%;
    bottom: 50%;
    left: 0;
    width: 100%;
    text-align: center;
    color: var(--text-color);
    margin: 0;
    font-weight: 500;
`

const Image = styled.img`
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: -1;
`

const Splash = ({ header }) => {
  return (
    <Container>
        <Header>{header}</Header>
        <Image src={splash} />
    </Container>
  )
}

export default Splash