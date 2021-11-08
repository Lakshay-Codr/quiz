import React ,{useEffect}from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import LottieView from 'lottie-react-native';

export default function Landing({navigation}) {
 

    return (
      <View>
              <View>
                 {/* <LottieView 
                 autoPlay
                 style={{width:400, height:400}}
                 source={require('../../assets/logo5.json')}
                 >
                     </LottieView>     */}
              </View>
              <Text> Landing</Text>
              <Button title="login" onPress={()=>{navigation.navigate("Login")}}/>
              <Button title="signup" onPress={()=>{navigation.navigate("Signup")}}/>
       
  
      </View>
       
    );

  }


