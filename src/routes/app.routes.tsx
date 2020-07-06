import React from 'react'
import { Feather } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import List from '../pages/List';
import Register from '../pages/Register';

const Tab = createBottomTabNavigator()

const tabBarOptions = {
  tabStyle: { backgroundColor: '#151728' },
  style: { 
    borderTopWidth: 0, 
    borderTopColor: "transparent", 
    borderBottomWidth: 0.2,
    borderBottomColor: "#9c9cab" 
  },
  showLabel: false,
  activeTintColor: '#1b86f9',
  inactiveTintColor: '#9c9cab'
}

const AppRoutes: React.FC = () => (
    <Tab.Navigator tabBarOptions={tabBarOptions}>
      <Tab.Screen options={{ tabBarIcon: ({ color }) => <Feather name="plus-circle" size={24} color={color} /> }} name="New" component={Register} />
      <Tab.Screen options={{ tabBarIcon: ({ color }) => <Feather name="list" size={24} color={color} /> }} name="List" component={List} />
    </Tab.Navigator>
)

export default AppRoutes