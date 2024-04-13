import React from 'react'
import styled from 'styled-components'
import { Splash } from '@/components'

const Container = styled.div`
    display: flex;
    flex-direction: column;
`

const Content = styled.div`
    padding: 0 100px;
    display: flex;
    flex-direction: column;
`


const CreateListing = () => {
  return (
    <Container>
        <Splash header="Create" subtext="Want to sell something you made or a service you can do? This is the place." />
        <Content>
            
        </Content>
    </Container>
  )
}

export default CreateListing