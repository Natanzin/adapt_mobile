import React from 'react';
import { View, Button } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import { StackNavigationProp } from '@react-navigation/stack'
import { AppParamsList } from '../../../routes/app.routes'

const Rotas = (props: { navigation: StackNavigationProp<AppParamsList> }) => {
  return (
    <LinearGradient colors={['#FFFFFF', '#D0D0D0']} style={{ flex: 1, justifyContent: 'space-around' }}>
      <Button title='Mapa' onPress={() => props.navigation.navigate('Mapa')} />
    </LinearGradient>
  );
}

export default Rotas;