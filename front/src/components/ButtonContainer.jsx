import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  margin-top: 44px;

  a {
      text-decoration: none;
  }
`

const ButtonContainer = ({ children }) => {
  return (
    <Container>{children}</Container>
  )
}

export default ButtonContainer