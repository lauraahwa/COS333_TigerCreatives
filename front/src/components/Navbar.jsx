import React, { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import styled from 'styled-components'
import { useAuth } from '@/context/AuthContext'


const Nav = styled.nav`
  position: relative;
  display: flex;
  align-items: center;
  height: 115px;
  background-color: var(--background-color);
  padding: 0 100px 0 100px;
  background-color: #ffd5ab;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 10px; 
    background-color: #fff; 
  }
`;

const Links = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  list-style: none;

  li {
    display: flex;
    flex-grow: 1;
    justify-content: center;
    gap: 5vw;
  }

  #main { 
    font-size: 24px;
    font-weight: 700;
  }

  #first {
    justify-content: flex-start;
  }

  #last {
    justify-content: flex-end;
  }
`
const StyledLinkMain = styled(Link)`
  font-weight: 400;
  text-decoration: none;
  font-size: 18px;
  display: flex;
  align-items: center;
`

const StyledLink = styled(NavLink)`
  font-weight: 400;
  text-decoration: none;
  font-size: 18px;
  padding: 15px 28px; 
  border-radius: 20px; 
  
  transition: background-color 0.3s;
  &.active {
    font-weight: 700;
    background-color: #fff; 
  }
`;

const Navbar = () => {
  const { isSignedIn } = useAuth();

  return (
    <Nav>
      <Links>
        <li id="first">
          <StyledLinkMain to='/' id="main">
          TigerCreatives
          </StyledLinkMain>
        </li>
        <li>
          <StyledLink to='/'>
            home
          </StyledLink>
          <StyledLink to='/shop'>
            shop
          </StyledLink>
          <StyledLink to='/sellers'>
            sellers
          </StyledLink>
          <StyledLink to='/about'>
            about
          </StyledLink>
        </li>
        <li id="last">
          {isSignedIn ? 
          <StyledLink to='/profile'>
            profile
          </StyledLink> :
          <StyledLink to='/login'>
          login
          </StyledLink>
          }
          
        </li>
      </Links>
    </Nav>
  )
}

export default Navbar