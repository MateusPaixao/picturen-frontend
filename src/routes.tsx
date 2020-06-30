import React from 'react';
import { Feather } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import List from './pages/List/index';
import Register from './pages/Register/index';

const Tab = createBottomTabNavigator();


const tabBarOptions = {
  tabStyle: { backgroundColor: '#151728' },
  style: { borderTopWidth: 0, borderTopColor: "transparent" },
  showLabel: false,
  // keyboardHidesTabBar: true,
  activeTintColor: '#1b86f9',
  inactiveTintColor: '#9c9cab'
}

export default function Routes() {
  return (
    <NavigationContainer>
      <Tab.Navigator tabBarOptions={tabBarOptions}>
        <Tab.Screen options={{ tabBarIcon: ({ color }) => <Feather name="plus-circle" size={24} color={color} /> }} name="New" component={Register} />
        <Tab.Screen options={{ tabBarIcon: ({ color }) => <Feather name="list" size={24} color={color} /> }} name="List" component={List} />
        {/* <Tab.Screen options={{ tabBarIcon: ({ color }) => <Feather name="settings" size={24} color={color} /> }} name="Settings" component={List} /> */}
        {/* <Tab.Screen options={{ tabBarIcon: ({ color }) => <Feather name="camera" color={color}/> }} name="Camera" component={Camera} /> */}
      </Tab.Navigator>
    </NavigationContainer>
  );
}