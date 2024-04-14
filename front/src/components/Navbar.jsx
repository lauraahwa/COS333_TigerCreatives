import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useAuth } from '@/context/AuthContext'


const Nav = styled.nav`
  display: flex;
  align-items: center;
  height: 105px;
  background-color: var(--background-color);
  padding: 0 100px;
`

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
    gap: 4vw;
  }

  #main {
      font-weight: 700;
  }

  #first {
    justify-content: flex-start;
  }

  #last {
    justify-content: flex-end;
  }
`

const StyledLink = styled(Link)`
  font-weight: 400;
  text-decoration: none;
`

const Navbar = () => {
  const { isSignedIn } = useAuth();

  return (
    <Nav>
      <Links>
        <li id="first">
          <StyledLink to='/' id="main">
          TigerCreatives
          </StyledLink>
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