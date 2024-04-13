import React from 'react'
import styled from 'styled-components'
import { Splash, Grid } from '@/components'

const Container = styled.div`
    display: flex;
    flex-direction: column;
`

const GridContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 100px;
    margin: 50px 0;
`

const Sellers = () => {
  return (
    <Container>
        <Splash header="Sellers" subtext="Need something creative? This is the place."/>
        <GridContainer>
            <Grid />
        </GridContainer>
    </Container>
  )
}

export default Sellers