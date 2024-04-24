import React from 'react'
import styled from 'styled-components'

const Container = styled.container`
    display: flex;
    justify-content: space-between;
    flex-direction: row;
`

const Filter = ({ filter }) => {
  return (
    <Container>
        <p>Price:</p>
        <p>{filter}</p>
    </Container>
  )
}

export default Filter