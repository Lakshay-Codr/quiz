import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, Button } from 'react-native';
import BasicButton from "../BasicComponent/BasicButton";
import LoginSignUpBtn from "../BasicComponent/LoginSignUpBtn";
import firebase from '../Firebase/firebaseconfig';
import SnackBar from '../BasicComponent/SnackBar'
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function Login({navigation}) {
  
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [snackBarVisible,setSnackBarVisible] = useState(false);
    const [snackBarText,setSnackBarText] =useState('');
    const [snackBarType,setSnackBarType] = useState('')
   

     //function to handle when login btn is clicked on
     async function handleLoginBtnClick() {
        console.log("login clicked", email, password);

        firebase.auth().signInWithEmailAndPassword(email, password)
                    .then(async(userCredential) => {
                        await AsyncStorage.setItem("UserId",userCredential.user.uid)

                        setSnackBarText('Login siuccess')
                     setSnackBarType("success");
                     setSnackBarVisible(true);
                       if(userCredential.user!=null){
                           navigation.navigate("DrawNav")
                       }
                        
                    })
                    .catch((error) => {
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        setSnackBarText(errorMessage)
                     setSnackBarType("error");
                     setSnackBarVisible(true);
                        console.log(errorMessage)
                    });


                    
    }


    //function to handle when signup btn is clicked on
    function handleSignUpBtnClick() {
        console.log("signup clicked");
        navigation.navigate("Singnup")
    }

    ///drawer navigatio
    function menu(){
        navigation.openDrawer();
    }
    //component rendering
    function hideSnackBar(){
        setSnackBarVisible(false);
    }
    return (
        <>
        <ScrollView style={styles.container}>
                {/* ///drawer navigatio */}

            <Button title="menu" onPress={()=>menu()}/>
            <Text style={styles.title}>Login</Text>
            <View style={styles.form}>
                <Text style={styles.label}>Email Address</Text>
                <TextInput
                    style={styles.inputField}
                    keyboardType="email-address"
                    placeholder="Enter your registered email"
                    value={email}
                    onChangeText={(val) => setEmail(val)}
                    
                />
                 <View style={styles.divider}></View>
                  <Text style={styles.label}>Password</Text>
                <TextInput
                    style={styles.inputField}
                    secureTextEntry
                    placeholder="Enter password"
                    value={password}
                    onChangeText={(val) => setPassword(val)}
                />
              </View>
              <BasicButton
                text="Login"
                onPress={handleLoginBtnClick}
              />


                    {
                            snackBarVisible ?
                                <SnackBar
                                    isVisible={snackBarVisible}
                                    text={snackBarText}
                                    type={snackBarType}
                                    onClose={hideSnackBar}
                                />
                                : null
                        }
             <LoginSignUpBtn
                customStyle={styles.signup}
                text="Don’t have an account?"
                btnText="Sign up"
                onPress={handleSignUpBtnClick}
              />      
        </ScrollView>
      
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: 60,
        paddingHorizontal: 30,
    },
    title: {
        fontWeight: '500',
        fontSize: 20,
        letterSpacing: 0.1,
        color: '#2E2E2E',
    },
    form: {
        marginVertical: 35,
    },
    label: {
        fontSize: 16,
        lineHeight: 18,
        color: '#666666',
        marginBottom: 3,
    },

    inputField: {
        fontSize: 14,
        borderBottomWidth: 1,
        borderBottomColor: '#BFBFBF',
        paddingVertical: 6,
        borderWidth:0
    },
    
    divider: {
        paddingVertical: 12,
    },

    log: {
        textAlign: "center",
        marginVertical: 2,
    },

    signup: {
        marginTop: 40,
    }
    ,
    buttoncontainer: {
        backgroundColor: '#2B35E0',
        borderRadius: 8,
        padding: 10,
    },

    buttontext: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#FFFFFF',
        textAlign: "center",
    },
});
