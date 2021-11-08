import React from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView,Button, TouchableOpacity,Image } from 'react-native';
import BasicButton from '../BasicComponent/BasicButton';
import LoginSignUpBtn from '../BasicComponent/LoginSignUpBtn';
import { Picker } from '@react-native-picker/picker';
import ValidationComponent from 'react-native-form-validator';
import ORDivider from "../BasicComponent/ORDivider";
import SnackBar from "../BasicComponent/SnackBar";
import { Audio } from 'expo-av';
import firebase from '../Firebase/firebaseconfig';



export default class SignUp extends ValidationComponent {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      ageGroup: '',
      password: '',
      confirmPassword: '',
      snackBarVisible: false,
      snackBarType: "",
      snackBarText: "",
      pswvisibality:false,
    };
  }

  


  playAudio = async () => {
    try {
        const soundObject = new Audio.Sound();
        await soundObject.loadAsync(require('../../assets/ding2.mp3'));
        await soundObject.playAsync();

       
    } catch (error) {
        // An error occurred!
    }
}

  //function to handle when signup btn is clicked on
  handleRegisterBtnClick = () => {
    //validating fields using 3rd party library
    this.validate({
      name: { minlength: 3, maxlength: 25, required: true },
      email: { email: true, required: true },
      ageGroup: { required: true },
      password: { required: true },
      confirmPassword: { equalPassword: this.state.password, required: true },
    });

      //if some error found in validation
        //then displaying it in snackbar
        if (this.getErrorMessages()) {
          this.displaySnackBar("error", this.getErrorMessages());
          } 
        else {

                    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
                    .then((userCredential)=>{
                      var user = userCredential.user;
                      console.log(user)
                      this.hideSnackBar();
                      this.playAudio();
                      this.displaySnackBar("success", "Login Clicked!");
                    })
                    .catch((error)=>{
                      var errorCode = error.code;
                      var errorMessage = error.message;
                      this.hideSnackBar();                    
                      this.displaySnackBar("error", errorMessage,errorCode);


                    });
      
             }

  };

 //function to display snackbar
 displaySnackBar = (type, text) => {
  this.setState({
      "snackBarType": type,
      "snackBarText": text,
  });
  this.setState({
      "snackBarVisible": true
  });
}

//function to hide snackbar
hideSnackBar = () => {
  this.setState({
      "snackBarVisible": false
  });
}
 

  //function to handle when sign in btn is clicked on
  handleSignInBtnClick() {
   navigation.navigate("Home");
    console.log('sign in clicked');
  }
toggle=()=>{
  this.setState({
    "pswvisibality":!this.state.pswvisibality,
  });
  console.log(this.state.pswvisibality)
}
  ///drawer navigatio
  menu(){
    this.props.navigation.openDrawer();
}
  //component rendering
  render() {
    return (
      <>
      <ScrollView style={styles.container}>
            <Button title="menu" onPress={()=>this.menu()}/>
        <Text style={styles.title}>Signup</Text>

        <View style={styles.form}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.inputField}
            placeholder="Enter your name"
            value={this.state.name}
            onChangeText={(name) => this.setState({ name })}
          />

          <View style={styles.divider}></View>

          <Text style={styles.label}>Email Address</Text>
          <TextInput
            style={styles.inputField}
            keyboardType="email-address"
            placeholder="Enter your registered email"
            value={this.state.email}
            onChangeText={(email) => this.setState({ email })}
          />

          <View style={styles.divider}></View>
          <Text style={styles.label}>Age Group</Text>
          <Picker
                style={styles.inputField}
                selectedValue={this.state.ageGroup}
                onValueChange={(ageGroup, itemIndex) => this.setState({ ageGroup })}>
                <Picker.Item label="" value="" />
                <Picker.Item label="1-4" value="1-4" />
                <Picker.Item label="5-12" value="5-12" />
                <Picker.Item label="13-18" value="13-18" />
           </Picker>

           <View style={styles.divider}></View>

          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.inputField}
            secureTextEntry
            placeholder="Enter password"
            value={this.state.password}
            onChangeText={(password) => this.setState({ password })}
          />

          <View style={styles.divider}></View>
          {/* text input with button */}

          <Text style={styles.label}>Password</Text>

          <View >
                  <View >
                    <TextInput
                      style={styles.inputField}                    
                      secureTextEntry={this.state.pswvisibality}
                      placeholder="Enter password"
                      value={this.state.password}
                      onChangeText={(password) => this.setState({ password })}
                    />
                  </View>
                  <View  >
                      <TouchableOpacity
                         onPress={this.toggle}
                      >
                        
                            
                      </TouchableOpacity>
                  </View>
          </View>
         
                   {/* text input with button */}

          <View style={styles.divider}></View>

          <Text style={styles.label}>Confirm Password</Text>
          <TextInput
            style={styles.inputField}
            secureTextEntry
            placeholder="Confirm password"
            value={this.state.confirmPassword}
            onChangeText={(confirmPassword) =>
              this.setState({ confirmPassword })
            }
          />
        </View>

        <BasicButton text="Register" onPress={this.handleRegisterBtnClick} />

        
        <ORDivider />
        <LoginSignUpBtn
          customStyle={styles.signin}
          text="Already have an account?"
          btnText="Sign in"
          onPress={this.handleSignInBtnClick}
        />
      </ScrollView>
       {
        this.state.snackBarVisible ?
            <SnackBar
                isVisible={this.state.snackBarVisible}
                text={this.state.snackBarText}
                type={this.state.snackBarType}
                onClose={this.hideSnackBar}
            />
            : null
    }
</>
    );
  }
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
  pswstyle:{
      display:"flex",
      justifyContent:'space-around',flexDirection:'row'
  },
  form: {
    marginVertical: 35,
  },
  
  icon:{
   position:'absolute',right:10,
   top:-30,
    width:20,
    height:20,
  },

  label: {
    fontSize: 16,
    lineHeight: 18,
    color: '#666666',
    marginBottom: 3,
  },

  inputField: {
    fontSize: 14,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#BFBFBF',
    paddingVertical: 6,
  },

  divider: {
    paddingVertical: 8,
  },

  log: {
    textAlign: 'center',
    marginVertical: 2,
    color: 'red',
  },

  signin: {
    marginVertical: 40,
  },
  snackbar: {
    backgroundColor: "red",
}
});
