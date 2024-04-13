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

const Shop = () => {
  return (
    <Container>
        <Splash header="Shop" subtext="Want to browse stuff already made? This is the place."/>
        <GridContainer>
            <Grid />
        </GridContainer>
        
    </Container>
    
  )
}

export default Shop