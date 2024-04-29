import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Button, ButtonContainer, Splash, ProfileForm, ProfileInfo, Grid } from '@/components'
import weirdswan from '@/assets/weirdswan.webp'
import {ProfileProvider} from '@/components/ProfileInfo';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 50px;
`
const Content = styled.div`
    padding: 0px 100px;
    display: flex;
    flex-direction: column;
`
const SaveProfile = styled(Link)`
    background-color: #f0f0f0; 
    border: 2px solid #ccc; 
    font-size: 18px;
    text-align: center;
    padding: 10px 20px; 
    border-radius: 5px; 
    margin-top: 20px; 
`

const EditProfile = ({ initialProfileData }) => {
    
    const { updateProfileData } = useContext(ProfileInfo);

    return (
        <ProfileProvider initialProfileData={initialProfileData}>
            <Container>
                <Splash header="Edit Profile" subtext="Let users know more about yourself!" />
                <Content>
                    <ProfileForm updateProfileData={updateProfileData} initialProfileData={initialProfileData} />
                </Content>
            </Container>
        </ProfileProvider>
        
    );
};

export default EditProfile