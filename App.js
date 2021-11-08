import React from 'react';
import { StyleSheet } from 'react-native';
import Stacknav from './components/Navigation/stacknav'

export default function App() {
  return (
        
            <Stacknav/>
          
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
