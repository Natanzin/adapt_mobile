import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

//Import das telas
import Login from '../pages/Login/index'


const AuthStack = createStackNavigator();

const AuthRoutes: React.FC = () => {
    return (
        <AuthStack.Navigator>
            <AuthStack.Screen name='Login' component={Login} options={{ headerShown: false }} />
        </AuthStack.Navigator>
    )
}

export default AuthRoutes