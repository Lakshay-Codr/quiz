import { createStackNavigator } from '@react-navigation/stack';
import React, {useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, Button ,Platform,Image } from 'react-native';
import Landing from '../screens/landing';
import { NavigationContainer } from '@react-navigation/native';
import Login from '../screens/Login';
import SignUp from '../screens/Signup';
import DrawerNav from './DrawerNav';



const Stack = createStackNavigator();
export default function Stacknav() {
  return (
      <NavigationContainer>
            <Stack.Navigator initialRouteName="Landing">
            <Stack.Screen name="Landing" component={Landing} options={{headerShown:false}} />
            <Stack.Screen name="Login" component={Login}options={{headerShown:false}} />
            <Stack.Screen name="Signup" component={SignUp}options={{headerShown:false}} />
            <Stack.Screen name="DrawNav" component={DrawerNav}options={{headerShown:false}} />
            </Stack.Navigator>
      </NavigationContainer>
  );
}