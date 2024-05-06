import React from 'react'
import styled, { css } from 'styled-components'
import { Link as RouterLink } from 'react-router-dom';

const Container = styled.div`
    padding: ${props => props.row ? "62px 100px" : "0"};
    width: 100%;
    display: flex;
    background-color: var(--container-color);
    flex-direction: ${props => props.row ? "row" : "column"};
    justify-content: space-between;
`;

const Title = styled.h1`
    font-size: 24px;
    font-weight: 700;
`;

const Link = styled(RouterLink)`
    font-size: 16px;
    font-weight: 400;
    text-decoration: none;
    margin-right: 100px;

    &:hover {
        font-weight: 800;
    }
`;

const Footer = () => {
    return (
        <Container row>
        <Title>TigerCreatives</Title>
        <Link to='/contact'>Contact Us</Link>
        </Container>
    );
}

export default Footer