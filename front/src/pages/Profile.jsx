import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { Button, ButtonContainer, Splash, Grid } from '@/components'
import weirdswan from '@/assets/weirdswan.webp'
import { useProfile } from '@/components/ProfileInfo';

import { useAuth0 } from "@auth0/auth0-react"

import { viewListings } from '@/api/listingService'
import { login } from '@/api/userService'


const Container = styled.div`
    display: flex;
    flex-direction: column;
`
const Content = styled.div`
    padding: 0px 100px;
    display: flex;
    flex-direction: column;
`
const ProfileContainer = styled.div`
    display: flex;
    align-items: center;
`

const ProfilePic = styled.div`
    margin-top: 100px;
    width: 40%; 
    aspect-ratio: 1/1;
    border-radius: 50%; 
    max-width: 300px;
    min-width: 200px;
    overflow: hidden;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`

const ProfileDetails = styled.div`
    flex: 1; 
`
const ProfileName = styled.h2`
    margin-left: 50px; 
    font-size: 50px;
`
const Role = styled.h2` 
    margin-left: 50px; 
    color: grey;
`
const ProfileBio = styled.p`
    margin-left: 50px; 
`

const StyledButtonContainer = styled.div`
    margin-top: 50px;
    display: flex;
    margin-bottom: 50px;
`

const StyledLink = styled(Link)`
    text-decoration: none;
    margin-right: 40px;
`
const EditProfile = styled(Link)`
    background-color: #f0f0f0; 
    border: 2px solid #ccc; 
    font-size: 18px;
    text-align: center;
    padding: 10px 20px; 
    border-radius: 5px; 
    margin-top: 20px; 
    text-decoration: none;
`

const GridContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 100px;
    margin: 50px 0;
`

    const Profile = () => {
        const { user, isAuthenticated, handleRedirectCallback, getAccessTokenSilently } = useAuth0();

        const { profileData } = useProfile();
        const [listingsData, setListingsData] = useState([])
        const [userData, setUserData] = useState([])

        // useEffect(() => {
        //     const handleAuthCallback = async () => {
        //         await handleRedirectCallback()
            
        //         if (isAuthenticated) {
        //             const accessToken = await getAccessTokenSilently()
        //             console.log(accessToken)
        //         }
        //     }

        //     handleAuthCallback()
        // }, [handleRedirectCallback, isAuthenticated, getAccessTokenSilently])

        useEffect(() => {

            const fetchListings = async () => {
                if (!user) {
                    console.log('user not defined yet')
                    return
                }
                console.log(user)
                try {
                    const response = await login(user);
                    const token = response;
                    localStorage.setItem('token', token)
                    console.log("token:" + token)

                    try {
                        const data = await viewListings('user_items');
                        console.log("Data fetched", data)
                        setListingsData(data)
                    } catch (error) {
                        console.error("Fetching listings error:", error);
                    }
                } catch (error) {
                    console.error('token error', error)
                }


                
            };

            // const fetchUserInfo = async () => {
            //     try {
            //         const data = await getUserInfo();
            //         console.log("User data fetched", data)
            //         setUserData(data)
            //     } catch (error) {
            //         console.error("Fetching user data error", error)
            //     }
            // }

            fetchListings();
        }, [])
        return (
            isAuthenticated && (
            <Container>
                <Splash header="Profile" subtext="View your listings or create a new one!" />
                <Content>
                    <EditProfile to = "/editprofile">Edit Profile</EditProfile>
                <ProfileContainer>
                    <ProfilePic>
                        <img src={weirdswan} />
                    </ProfilePic>
                    <ProfileDetails>
                        <ProfileName> 
                            {user.email.split('@')[0]}
                        </ProfileName>
                        <Role>
                            {profileData.userType}
                        </Role>
                        <ProfileBio>
                            {profileData.bio}
                        </ProfileBio>
                    </ProfileDetails>
                </ProfileContainer>
                <GridContainer>
                    <Grid data={listingsData} />
                </GridContainer>
                <StyledButtonContainer>
                    <StyledLink to="/create">
                        <Button text="Create Listing"/>
                    </StyledLink>
                    <StyledLink to="/create-bid">
                        <Button text="Create Bid Listing"/>
                    </StyledLink>
            </StyledButtonContainer>
                <h2>Your listings</h2>
                {/* <Grid isLanding={true}/> */}
            </Content>
        </Container>
        )
    )
}

export default Profile