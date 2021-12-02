import React, { useState,useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import QuizItem from "../BasicComponent/QuizItem";
import firebase from "../Firebase/firebaseconfig";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MyQuizes({navigation}) {
    const [quiz, setQuiz] = useState([]); 

    useEffect(()=>{
        fetchuserquiz();
    },[]);

    async function fetchuserquiz(){
        const createdByUser = await AsyncStorage.getItem("UserId");
        if(createdByUser){
        const storageRef = firebase.app().database().ref("quizes/");
        storageRef.on("value",(res)=>{
            const data=res.val()
            console.log(data)
            if(data){

                var myQuize=[]
                for(const key in data ){
                    console.log(data [key].createdByUser)
                    const id=data [key].createdByUser
                    const d=data[key]
                    if(id==createdByUser){
                       d["quizId"]=key     
                        myQuize.push(data [key])
                    }
                }
                setQuiz(myQuize)
            }
        })
        }
    }
    //function to handle when any quiz item is clicked on
    function handleQuizItemClick(index) {
        console.log(index);
        const quizId=quiz[index];
        navigation.navigate("GiveQuiz",quizId)
    }

    //fuction to hanlde when add new quiz btn is pressed on
    function handleAddNewQuizBtnClick() {
        console.log("add new quiz btn pressed");
        navigation.navigate("CreateQuiz")
        //redirecting to CreateQuiz.js
    }

    //component rendering
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>My Quizzes</Text>
            <View style={styles.divider}></View>

            {
                quiz.map((item, idx) => {
                    return (
                        <QuizItem
                            key={idx}
                            index={idx}
                            name={item.quizName}
                            imageUrl={item.quizImgUri}
                            onPress={handleQuizItemClick}
                        />
                    )
                })
            }

            <TouchableOpacity style={styles.addNewBtn} onPress={handleAddNewQuizBtnClick}>
                <Text style={styles.addNewBtnText}>+ Add new quiz</Text>
            </TouchableOpacity>
        </ScrollView >
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

    divider: {
        paddingVertical: 8,
    },

    addNewBtn: {
        marginTop: 35,
        alignItems: "center",
    },

    addNewBtnText: {
        fontWeight: '500',
        fontSize: 16,
        color: '#2A34DC'
    },
});