import { Children, createContext, ReactNode, useContext, useEffect, useState } from "react";
import { User } from "../types/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

type Props = {
    children: ReactNode
}

type AuthContextType = {
    auth: string,
    user: User | null
    loading: boolean
    login: () => void
    logout: () => void
}

export const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({children}: Props) => {

    const [auth, setAuth] = useState('')
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    const login = () => {

    }

    const logout = () => {

    }

    const storeData = async () => {
        const auth = await AsyncStorage.getItem('auth')
        if(auth){
            setAuth(auth)
            const request = await axios.get('', {
                headers: {
                    Authorization: `Bearer ${auth}`
                }
            })

            if(request.data){
                setUser(request.data)
            }
        }

        setLoading(false)
    }

    useEffect(() => {
        storeData()
    }, [])

    return (
        <AuthContext.Provider value={{auth, user, login, logout, loading}}>
            {children}
        </AuthContext.Provider>
    )
} 

export const useAuth = () => {
    const context = useContext(AuthContext)

    if(context === undefined){
        return undefined
    }

    return context
}