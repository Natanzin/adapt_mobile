import 'react-native-gesture-handler'
import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import Routes from './routes/index'
import { AuthProvider } from './contexts/auth'
import { StatusBar } from 'expo-status-bar'

const App: React.FC = (props) => {
  return (
    <>
      <StatusBar backgroundColor='#F0F0F0' style='dark' />
      <NavigationContainer>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </NavigationContainer>
    </>
  );
}

export default App;