import React from 'react'
import { View, ActivityIndicator } from 'react-native'

import { useAuth } from '../contexts/auth'

import AuthRoutes from './auth.routes'
import AppRoutes from './app.routes'

const Routes: React.FC = () => {
    const { signed, loading } = useAuth()
    /* if(loading){
        return(
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator size='large' color='#00f' />
            </View>
        )
    } */
    return signed ? <AppRoutes /> : <AuthRoutes />
}

export default Routes;