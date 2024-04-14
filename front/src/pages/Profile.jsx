import React from 'react'
import styled from 'styled-components'
import { Button, ButtonContainer, Splash, Grid } from '@/components'

const Container = styled.div`
    display: flex;
    flex-direction: column;
`
const Content = styled.div`
    padding: 0px 100px;
    display: flex;
    flex-direction: column;
`

const Profile = () => {
  return (

    <Container>
        <Splash header="Profile" subtext="View your listings or create a new one!" />
        <Content>
            <ButtonContainer>
                <a href="/create">
                    <Button text="Create Listing"/>
                </a>
            </ButtonContainer>
            <h2>Your listings</h2>
            <Grid isLanding={true}/>
        </Content>
    </Container>
  )
}

export default Profile