import React from 'react'
import SignIn from '../pages/SignIn'

import { createStackNavigator } from '@react-navigation/stack'

const AuthStack = createStackNavigator()

const screenOptions = {
    headerShown: false
}

const AuthRoutes: React.FC = () => (
    <AuthStack.Navigator screenOptions={screenOptions}>
        <AuthStack.Screen name="SignIn" component={SignIn}/>
    </AuthStack.Navigator>
)

export default AuthRoutes