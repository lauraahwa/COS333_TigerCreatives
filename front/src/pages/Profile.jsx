import React from 'react'
import { Link } from 'react-router-dom'
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
                <Link to="/create">
                    <Button text="Create Listing"/>
                </Link>
            </ButtonContainer>
            <h2>Your listings</h2>
            {/* <Grid isLanding={true}/> */}
        </Content>
    </Container>
  )
}

export default Profile