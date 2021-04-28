import React, { createContext, useState, useEffect, useContext } from 'react'
import * as auth from '../services/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Response } from '../services/auth'
//import api from '../services/api';

export type User = {
    USU_ST_LOGIN: string
    USU_IN_CODIGO: string
    ORG_IN_CODIGO: string
}

interface AuthContextData {
    signed: boolean
    user: User | null
    loading: boolean
    signIn(usuarioLogin: Response): Promise<void>
    signOut(): void
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {

    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    async function signIn(usuarioLogin: Response) {
        const response = await auth.SignIn(usuarioLogin)
        setUser(response.user)

        //utilizar essa função quando tiver API para que o token seja utilizado em todas as requisições HTTP
        //api.defaults.headers['Autorization'] = `Bearer ${response.token}`
    }

    function signOut() {
        AsyncStorage.clear().then(() => { setUser(null) })
    }

    return (
        <AuthContext.Provider value={{ signed: !!user, user, signIn, loading, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    return context
}