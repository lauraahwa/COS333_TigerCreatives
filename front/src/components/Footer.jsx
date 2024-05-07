import React from 'react'
import styled, { css } from 'styled-components'
import { Link as RouterLink } from 'react-router-dom';

const Container = styled.div`
    padding: 62px 100px;
    width: 100%;
    display: flex;
    background-color: var(--container-color);
    flex-direction: row;
    justify-content: space-between;
`;

const TitleLink = styled(RouterLink)`
    font-size: 24px;
    font-weight: 700;
    text-decoration: none;
    color: inherit;

    &:hover {
        font-weight: 800;
    }
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
        <Container>
        <TitleLink to='/'>TigerCreatives</TitleLink>
        <Link to='/contact'>Contact Us</Link>
        </Container>
    );
}

export default Footer