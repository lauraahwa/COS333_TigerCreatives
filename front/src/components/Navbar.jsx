import React from 'react'
import styled from 'styled-components'

const Nav = styled.nav`
  display: flex;
  align-items: center;
  height: 10vh;
  background-color: gray;
  padding: 0 10%;
`

const Links = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  list-style: none;
  a {
    text-decoration: none;
    color: var(--text-color);

    &:hover {
      color: var(--orange-color);
      cursor: pointer;
    }
  }
`

const Navbar = () => {
  return (
    <Nav>
      <Links>
        <li>
          <a href='/'>
            Create
          </a>
        </li>
        <li>
          <a href='/read'>
            Read
          </a>
        </li>
        <li>
          <a href='/update'>
            Update
          </a>
        </li>
        <li>
          <a href='/delete'>
            Delete
          </a>
        </li>
      </Links>
    </Nav>
  )
}

export default Navbar