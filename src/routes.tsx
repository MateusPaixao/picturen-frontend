import React from 'react';
import { Feather } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import Main from './pages/Main';
import Register from './pages/Register/index';

const Tab = createBottomTabNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen options={{ tabBarIcon: ({ color }) => <Feather name="plus-circle" color={color}/> }} name="New" component={Register} />
        <Tab.Screen options={{ tabBarIcon: ({ color }) => <Feather name="list" color={color}/> }} name="List" component={Main} />
        {/* <Tab.Screen options={{ tabBarIcon: ({ color }) => <Feather name="camera" color={color}/> }} name="Camera" component={Camera} /> */}
      </Tab.Navigator>
    </NavigationContainer>
  );
}