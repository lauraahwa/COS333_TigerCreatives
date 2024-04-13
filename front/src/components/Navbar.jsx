import React from 'react'
import styled from 'styled-components'

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

  a {
    text-decoration: none;
    font-size: 1rem;
    font-weight: 400;
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

const Navbar = () => {
  return (
    <Nav>
      <Links>
        <li id="first">
          <a href='/' id="main">
          TigerCreatives
          </a>
        </li>
        <li>
          <a href='/signup'>
            sign up
          </a>
          <a href='/login'>
            login
          </a>
        </li>
        <li id="last">
          <a href='/profile'>
            profile
          </a>
        </li>
        <li>
          <a href='/Login'>
            Login
          </a>
        </li>
      </Links>
    </Nav>
  )
}

export default Navbar