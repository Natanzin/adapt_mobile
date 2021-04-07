import React, { createContext, useState, useEffect, useContext } from 'react'
import * as auth from '../services/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'
//import api from '../services/api';

interface User {
    usuario: string
    senha: string
    codEmpresa: string
} 

interface AuthContextData {
    signed: boolean
    user: User | null
    loading: boolean
    signIn(): Promise<void>
    signOut(): void
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {

    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadStoragedData() {
            const storagedUser = await AsyncStorage.getItem('@Adapt:user')
            const storagedToken = await AsyncStorage.getItem('@Adapt:token')

            if (storagedUser && storagedToken) {
                //utilizar essa função quando tiver API para que o token seja utilizado em todas as requisições HTTP
                //api.defaults.headers['Autorization'] = `Bearer ${storagedToken}`
                setUser(JSON.parse(storagedUser))
                setLoading(false)
            }
        }
        loadStoragedData()
    }, [])

    async function signIn() {
        const response = await auth.SignIn()
        setUser(response.user)

        //utilizar essa função quando tiver API para que o token seja utilizado em todas as requisições HTTP
        //api.defaults.headers['Autorization'] = `Bearer ${response.token}`
        
        await AsyncStorage.setItem('@Adapt:user', JSON.stringify(response.user))
        await AsyncStorage.setItem('@Adapt:token', response.token)
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

export function useAuth(){
const context = useContext(AuthContext)
return context
}