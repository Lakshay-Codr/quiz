import React, { useState,useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ScrollView, Dimensions ,Platform } from 'react-native';
import BasicButton from "../BasicComponent/BasicButton";
import * as ImagePicker from 'expo-image-picker';
import { PieChart } from 'react-native-chart-kit'
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from '../Firebase/firebaseconfig';
import SnackBar from '../BasicComponent/SnackBar';

export default function Profile() {
    const [image, setImage] = useState("http://2.bp.blogspot.com/-QWj2Wq45014/TzNOfQezNqI/AAAAAAAAAIY/Lvy0m7ZtWRM/s1600/12.jpg");
    const [hasImageChanged, setHasImageChanged] = useState(false);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [aboutYou, setAboutYou] = useState("");   

    useEffect(() => {
        //asking for permission to access phone's gallery
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();

        //getting users data from firebase
        fetchUsersData();
    }, []);
    //function to fetch users data from firebase
    async function fetchUsersData() {
        const loggedUserId = await AsyncStorage.getItem('UserId');
        const email_data =      await AsyncStorage.getItem("email" )
      
        if (loggedUserId) {
            const usersDbRef = firebase.app().database().ref('users/');
            usersDbRef
                .child(loggedUserId)
                .once('value')
                .then(resp => {
                    const response = resp.val();
                    if (response) {
                        //for getting performance pie chart
                        //Write code
                            console.log(response)
                              //for getting performance pie chart
                        var total = 0;
                        var correct = 0;
                        var incorrect = 0;
                        const quizResponses = response.quizResponses || {};
                        const tempGivenQuiz = Object.keys(quizResponses).length || null;
                        for (const quizId in quizResponses) {
                            const quizResponse = quizResponses[quizId];
                            const responses = quizResponse.responses || {};
                            console.log("responses", responses);
                            const tempTotal = Object.keys(responses).length || 0;
                            total += tempTotal;
                            for (const questionId in responses) {
                                const ansResponse = responses[questionId];
                                const isCorrect = ansResponse["isCorrect"];
                                if (isCorrect) {
                                    correct++;
                                }
                            }
                        }
                        incorrect = total - correct;

                        //updating state
                        setName(response.name);
                        setEmail(email_data);
                        setDesc(response.desc);
                        setAgeGroup(response.ageGroup);
                        setGivenQuizCount(tempGivenQuiz);
                        setPerformanceData({
                            total,
                            correct,
                            incorrect,
                        });

                        if (response.profilePicUri) {
                            setProfilePicUri(response.profilePicUri)
                        }

                    
                    }
                    setIsLoading(false);
                })
                .catch(error => {
                    displaySnackBar("error", "Failed to fetch profile");
                });
        } else {
            displaySnackBar("error", "User is not logged in");
        }
    }
    //function to update user profile data in firebase db
    function updateProfileInFirebase(loggedUserId, imageUploadUrl) {
        const usersDbRef = firebase.app().database().ref('users/');
       //write code
       usersDbRef
            .child(loggedUserId)
            .update({
                name,
                ageGroup,
                profilePicUri: imageUploadUrl,
                desc,
            },
                (error) => {
                    if (error) {
                        setIsLoading(false);
                        displaySnackBar("error", "Failed to update profile");
                    } else {
                        setIsLoading(false);
                        displaySnackBar("success", "Profile updated");
                    }
                });
    }

    //function to handle when login btn is clicked on
    async function handleSaveBtnClick() {
        console.log("save btn clicked");
        try {
            const loggedUserId = await AsyncStorage.getItem('UserId');
            if (loggedUserId) {
                //if new profile pic has been choosen
                //then uploading it to firebase storage
                if (hasImageUploaded) {
                    await uploadImageInFirebase(loggedUserId)
                        .then(() => {
                            displaySnackBar("success", "Image Successfully Uploaded");
                        })
                        .catch((error) => {
                            setIsLoading(false);
                            displaySnackBar("error", "Failed to upload Image");
                        });

                    setHasImageUploaded(false);
                } else {
                    updateProfileInFirebase(loggedUserId, profilePicUri);
                }
            }
        } catch {
            setIsLoading(false);
            displaySnackBar("error", "Something went wrong");
        }
    }

    //function to handle when profile pic edit btn is clicked on
    async function handleProfilePicEditBtnClick() {
        console.log("edit profile pic btn clicked");
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            quality: 1,
        });

        if (!result.cancelled) {
            setHasImageChanged(true);
            setImage(result.uri);
        }
    }

    //component rendering
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Profile</Text>

            <View style={styles.imageContainer}>	
                    <Image source={{ uri: image }} style={styles.image} />	
                    <TouchableOpacity onPress={handleProfilePicEditBtnClick}>	
                        <Image source={require('../../assets/edit.png')} style={styles.editIcon} />	
                    </TouchableOpacity>	
            </View>

            <View style={styles.form}>
               
                <View style={styles.divider}></View>

                <Text style={styles.label}>Name</Text>
                <TextInput
                    style={styles.inputField}
                    placeholder="Enter your name"
                    value={name}
                    onChangeText={(val) => setName(val)}
                />
                <View style={styles.divider}></View>

                <Text style={styles.label}>Email Address</Text>
                <TextInput
                    style={styles.inputField}
                    keyboardType="email-address"
                    placeholder="Enter your registered email"
                    value={email}
                    onChangeText={(val) => setEmail(val)}
                />
                <View style={styles.divider}></View>

                <Text style={styles.label}>Phone Number</Text>
                <TextInput
                    style={styles.inputField}
                    keyboardType="number-pad"
                    placeholder="Enter phone number"
                    value={phoneNo}
                    onChangeText={(val) => setPhoneNo(val)}
                />
                <View style={styles.divider}></View>

                <Text style={styles.label}>About Yourself</Text>
                <TextInput
                    style={styles.inputField}
                    multiline
                    placeholder="describe yourself"
                    value={aboutYou}
                    onChangeText={(val) => setAboutYou(val)}
                />
                <View style={styles.divider}></View>
            </View>

            <Text style={styles.label}>Performance</Text>
            <Text style={styles.totalData}>Total attempted: </Text>
            <View style={styles.chartContainer}>
            <PieChart
                        data={[
                        {
                            name: 'Correct',
                            population: 15,
                            color: '#34A853',
                            legendFontColor: '#34A853',
                            legendFontSize: 14,
                        },
                        {
                            name: 'Incorrect',
                            population: 7,
                            color: '#EB4335',
                            legendFontColor: '#EB4335',
                            legendFontSize: 14,
                        },
                        ]}
                        width={Dimensions.get('window').width}
                        height={220}
                        chartConfig={{
                        color: () => `rgba(255, 255, 255)`,
                        
                        }}
                        accessor="population"
                        backgroundColor="transparent"
                        paddingLeft="20"
                        absolute
                    />
            </View>
                
            <View style={styles.divider}></View>
            <BasicButton
                text="Save"
                onPress={handleSaveBtnClick}
            />
            <View style={styles.divider}></View>
        </ScrollView>
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
        marginTop: 35,
    },

    imageContainer: {
        width: 120,
        height: 120,
        alignSelf: "center",
        shadowColor: 'grey',
        shadowOpacity: .8,
        shadowOffset: { width: 0, height: 2 },
        elevation: 10,
    },

    image: {
        alignSelf: "center",
        width: "100%",
        height: "100%",
        borderRadius: 1000,
    },

    editIcon: {
        width: 20,
        height: 20,
        position: "absolute",
        bottom: 0,
        right: 0,
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
    },

    divider: {
        paddingVertical: 8,
    },

    chartContainer: {
        alignItems: "center",
    },

    totalData: {
        fontWeight: '500',
        fontSize: 15,
        lineHeight: 20,
        color: '#757575',
        marginVertical: 10,
    }
});