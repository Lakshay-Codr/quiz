import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Login from "../screens/Login";
import TabNav from "./TabNav";
import { Provider as PaperProvider,Appbar } from 'react-native-paper';
import { DrawerActions } from '@react-navigation/native';    

const Drawer = createDrawerNavigator();

export default function DrawerNav({navigation}) {
  return (
      <PaperProvider>
        <Appbar.Header>
        <Appbar.Action icon="menu"  onPress={()=>{
            navigation.dispatch(DrawerActions.openDrawer())
          }} />
        <Appbar.Content title="Quiz " subtitle="Subtitle" />
        </Appbar.Header>
      <Drawer.Navigator initialRouteName="TabNav">
        <Drawer.Screen name="TabNav" component={TabNav} options={{headerShown:false}}/>
        
      </Drawer.Navigator>
    
      </PaperProvider>
  );
}