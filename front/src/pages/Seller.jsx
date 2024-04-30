import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { Button, ButtonContainer, Splash, Grid } from '@/components'
import weirdswan from '@/assets/weirdswan.webp'
import { useProfile } from '@/components/ProfileInfo';

import { useAuth0 } from "@auth0/auth0-react"

import { Dialog } from '@headlessui/react'

import { faStar as fasStar, faStarHalfAlt, faStar as farStar } from '@fortawesome/free-solid-svg-icons';

import { getProfile } from '@/api/userService'
import { viewListings } from '@/api/listingService'


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
    margin-bottom: 50px;
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

const StarRating = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const halfStars = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStars;

    return (
        <>
            {Array.from({ length: fullStars }, (_, index) => (
                <FullStar key={`full_${index}`} icon={fasStar} />
            ))}
            {halfStars === 1 && <HalfStar key="half" icon={faStarHalfAlt} />}
            {Array.from({ length: emptyStars }, (_, index) => (
                <EmptyStar key={`empty_${index}`} icon={farStar} />
            ))}
        </>
    );
}

    const Seller = () => {
        const { user, isAuthenticated, handleRedirectCallback, getAccessTokenSilently } = useAuth0();
        const rating = 3.5

        let { id } = useParams()
        const [profileData, setProfileData] = useState([])
        const [listingsData, setListingsData] = useState([])

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
            const fetchProfile = async () => {
                try {
                    const data = await getProfile(id)
                    console.log(data)
                    setProfileData(data)
                } catch (error) {
                    console.error("fetching profile error", error)
                }                         
            };

            const fetchListings = async () => {
                try {
                    const data = await viewListings(`seller_items/${id}`)
                    console.log("Data fetched", data)
                    setListingsData(data)
                } catch (error) {
                    console.error("Fetching listings error:", error);
                }
            }

            // const fetchUserInfo = async () => {
            //     try {
            //         const data = await getUserInfo();
            //         console.log("User data fetched", data)
            //         setUserData(data)
            //     } catch (error) {
            //         console.error("Fetching user data error", error)
            //     }
            // }

            fetchProfile();
            fetchListings()
        }, [])
        return (
            isAuthenticated && (
            <Container>
                <Splash header="Profile" subtext="Find a seller with a style that you enjoy most!" />
                <Content>
                <ProfileContainer>
                    <ProfilePic>
                        <img src={user.picture} />
                    </ProfilePic>
                    <ProfileDetails>
                        <ProfileName> 
                            {user.email.split('@')[0]}
                        </ProfileName>
                        <StarRating rating={rating} />
                        <Role>
                            {profileData.userType}
                        </Role>
                        <ProfileBio>
                            {profileData.bio}
                        </ProfileBio>
                    </ProfileDetails>
                </ProfileContainer>
                <h2>Your listings</h2>
                <GridContainer>
                    <Grid data={listingsData} />
                </GridContainer>
                <StyledButtonContainer>
                    <StyledLink to="/create">
                        <Button text="Create Listing"/>
                    </StyledLink>
            </StyledButtonContainer>
                
                {/* <Grid isLanding={true}/> */}
            </Content>
        </Container>
        )
    )
}

export default Seller