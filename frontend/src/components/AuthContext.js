import React, { createContext, useContext, useState } from 'react'

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext)


export const AuthProvider = ({children}) => {

    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        //return localStorage.getItem('isAuthenticated') === 'true'
        return sessionStorage.getItem('isAuthenticated') === 'true'
    })

    const login = () => {
        setIsAuthenticated(true)
        //localStorage.setItem('isAuthenticated', true)
        sessionStorage.setItem('isAuthenticated', true)
        //console.log("login 실행!");
    }

    const logout = () => {
        setIsAuthenticated(false)
        //localStorage.removeItem('isAuthenticated')
        sessionStorage.removeItem('isAuthenticated')
        //console.log("logout 실행!");
    }

    return (
        <AuthContext.Provider value={{isAuthenticated, login, logout}}>
            {children}
        </AuthContext.Provider>
    )

}
