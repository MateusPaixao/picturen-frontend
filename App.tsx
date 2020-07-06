import 'react-native-gesture-handler'
import React from 'react'

import { StatusBar } from 'expo-status-bar'
import { NavigationContainer } from '@react-navigation/native'
import { AuthProvider } from './src/contexts/auth'

import Routes from './src/routes/index.routes'

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <StatusBar style="light"/>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </NavigationContainer>
  )
}

export default App