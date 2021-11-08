import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from '../screens/Profile';
import Homestack from './Homestack';
import MyQuizStack from './MyQuizStack';


const Tab = createBottomTabNavigator();

export default function TabNav() {
  return (
    
      <Tab.Navigator>
        <Tab.Screen name="Homestack" component={Homestack} />
        <Tab.Screen name="MyQuizStack" component={MyQuizStack} />
        <Tab.Screen name="Profile" component={Profile}/>
      </Tab.Navigator>
    
  );
}