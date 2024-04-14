import React, { createContext, useState, useContext } from 'react'

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isSignedIn, setIsSignedIn] = useState(false)

    const signIn = () => setIsSignedIn(true)
    const signOut = () => setIsSignedIn(false)

    return (
        <AuthContext.Provider value={{ isSignedIn, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}