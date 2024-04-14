import React from 'react'
import styled, { css } from 'styled-components'

const Container = styled.div`
    padding: ${props => props.row ? "62px 100px" : "0 0"};
    width: 100%;
    justify-content: space-between;
    display: flex;
    flex-direction: ${props => props.row ? "row" : "column"};
`

const Vertical = styled.div`
    display: flex;
    flex-direction: column;
    gap: 70px;
`

const Title = styled.h1`
    font-size: 24px;
    font-weight: 700;

`

const Header = styled.h2`
    font-size: 16px;
    font-weight: 600;
`

const Link = styled.a`
    font-style: 16px;
    font-weight: 500;
    text-decoration: none;
`

const Footer = () => {
  return (
    <Container>
        <Container row="true">
            <Vertical>
                <Title>TigerCreatives</Title>
            </Vertical>
            <Vertical>
                <Header>Links</Header>
                <Link href="/">Home</Link>
                <Link href="/shop">Shop</Link>
                <Link href="/sellers">Sellers</Link>
                <Link href="/about">About</Link>
            </Vertical>
            <Vertical>
                <Header>Help</Header>
                <Link>Contact Us</Link>
            </Vertical>
        </Container>
    </Container>
  )
}

export default Footer