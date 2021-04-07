import React from 'react'
import { Button } from 'react-native'
import { useAuth } from '../../contexts/auth'
import { LinearGradient } from 'expo-linear-gradient'
import { StackNavigationProp } from '@react-navigation/stack'
import { AppParamsList } from '../../routes/app.routes'
import * as StoreReview from 'expo-store-review';

const Dashboard = (props: { navigation: StackNavigationProp<AppParamsList> }) => {
    const { signOut, user } = useAuth()

    function handleSignOut() {
        signOut()
    }

    return (
        <LinearGradient colors={['#FFFFFF','#D0D0D0']} style={{ flex: 1, justifyContent: 'space-around'}}>
            <Button title='Reservas' onPress={() => props.navigation.navigate('Reservas') } />
            <Button title='Rotas' onPress={() => props.navigation.navigate('Rotas') }/>
            <Button title='Suprimentos' onPress={() => props.navigation.navigate('Suprimentos')} />
            <Button title='Ponto' onPress={() => props.navigation.navigate('Ponto', {'user': JSON.stringify(user)})} />
            {/*<Button title='Avalie o app' onPress={() => StoreReview.requestReview() } />*/}
            <Button title='Sair' onPress={handleSignOut} />
        </LinearGradient>
    );
}

export default Dashboard;