import React, { createContext, useContext, useEffect, useState } from 'react'
import { getCurrentUser } from '@/lib/appwrite'
import { Models } from 'react-native-appwrite';


/* type GloabalContextType = {
    isLoggedIn: boolean
    setIsLoggedIn: () => void
    user: any
    setUser: () => void
    loading: boolean
} */

const GlobalContext = createContext(null as any);

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }: any) => {

    const [user, setUser] = useState<Models.Document>()
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getCurrentUser()
            .then(res => {
                if (res) {
                    setIsLoggedIn(true)
                    setUser(res)
                } else {
                    setIsLoggedIn(false)
                    setUser(null as any)
                }
            }).catch((err: any) => {
                throw Error(err)
            }).finally(() => {
                setLoading(false)
            })
    }, [])

    return (
        <GlobalContext.Provider
            value={{
                isLoggedIn, setIsLoggedIn, user, setUser, loading
            }}
        >
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider