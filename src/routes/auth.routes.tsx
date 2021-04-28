import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

//Import das telas
import Login from '../pages/Login/index'
import Ajuda from '../pages/Login/ajuda'


const AuthStack = createStackNavigator();

const AuthRoutes: React.FC = () => {
    return (
        <AuthStack.Navigator>
            <AuthStack.Screen name='Login' component={Login} options={{ headerShown: false }} />
            <AuthStack.Screen name='Ajuda' component={Ajuda} />
        </AuthStack.Navigator>
    )
}

export default AuthRoutes