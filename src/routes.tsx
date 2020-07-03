import React from 'react';
import { Feather } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import List from './pages/List/index';
import Register from './pages/Register/index';
import Login from './pages/Login/index';

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()


function AuthStack() {
  return(
    <Stack.Navigator screenOptions={stackOptions}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Home" component={AppStack} />
    </Stack.Navigator>
  )
}

function AppStack() {
  return (
    <Tab.Navigator tabBarOptions={tabBarOptions}>
      <Tab.Screen options={{ tabBarIcon: ({ color }) => <Feather name="plus-circle" size={24} color={color} /> }} name="New" component={Register} />
      <Tab.Screen options={{ tabBarIcon: ({ color }) => <Feather name="list" size={24} color={color} /> }} name="List" component={List} />
      {/* <Tab.Screen options={{ tabBarIcon: ({ color }) => <Feather name="settings" size={24} color={color} /> }} name="Settings" component={List} /> */}
      {/* <Tab.Screen options={{ tabBarIcon: ({ color }) => <Feather name="camera" color={color}/> }} name="Camera" component={Camera} /> */}
    </Tab.Navigator>
  )
}


const tabBarOptions = {
  tabStyle: { backgroundColor: '#151728' },
  style: { borderTopWidth: 0, borderTopColor: "transparent" },
  showLabel: false,
  // keyboardHidesTabBar: true,
  activeTintColor: '#1b86f9',
  inactiveTintColor: '#9c9cab'
}


const stackOptions = {
  headerShown: false
}

const isAuthenticated = false

export default function Routes() {
  return (
    <NavigationContainer>
      { AuthStack() }
    </NavigationContainer>
  );
}