import { createStackNavigator } from '@react-navigation/stack';
import React, { } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Myquiz from '../screens/Myquiz';
import CreateQuiz from '../screens/CreateQuiz';
import Home from '../screens/Home';
import GiveQuiz from '../screens/GiveQuiz';



const Stack = createStackNavigator();
export default function Homestack() {
  return (
     
            <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={Home} options={{headerShown:false}} />
            <Stack.Screen name="GiveQuiz" component={GiveQuiz}options={{headerShown:false}} />
            
            </Stack.Navigator>
     
  );
}