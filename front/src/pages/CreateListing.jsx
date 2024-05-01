import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Splash, Form } from '@/components'
import { uploadImage, createListing } from '@/api/listingService'

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
        <Splash header="Create" subtext="Want to sell something you made or offer a service you can do? This is the place." />
        <Content>
            <Form />
        </Content>
    </Container>
  )
}

export default CreateListing