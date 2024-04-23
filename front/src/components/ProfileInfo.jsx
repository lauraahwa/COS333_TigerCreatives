import React, { createContext, useState, useContext } from 'react';
import styled from 'styled-components'

const ProfileInfo = createContext();

export const ProfileProvider = ({ children }) => {
    const [profileData, setProfileData] = useState({
        username: 'Username',
        userType: 'buyer/seller',
        profilePicture: 'editlater',
        bio: 'bio here...',
    });

    const updateProfileData = (newProfileData) => {
        setProfileData(newProfileData);
    };

    return (
        <ProfileInfo.Provider value={{ profileData, updateProfileData }}>
            {children}
        </ProfileInfo.Provider>
    );
};

// allow new info to show up on profile
export const useProfile = () => useContext(ProfileInfo);

export default ProfileInfo; 