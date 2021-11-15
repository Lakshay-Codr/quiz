import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, ActivityIndicator } 
from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from "../Firebase/firebaseconfig";
import BasicButton from "../BasicComponent/BasicButton";

export default function GiveQuiz({ route: {
    params: {
        quizId,
        quizImgUri,
        quizName,
        questions = [],
    } = {},
} = {},
    navigation,
}) {
    const totalQstnsCount = Object.keys(questions).length || 0;
    const [quizQsnts, setQuizQsnts] = useState([]);
    const [activeQstnIdx, setActiveQstnIdx] = useState(0);
    const [qstnResponses, setQstnResponses] = useState({});
    const [selectedQstnResponseOptionIdx, setSelectedQstnResponseOptionIdx] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
       fetchquestions(quizId)
    }, []);
    function fetchquestions(quizId){
        if(quizId){
            const quizDbref = firebase.app().database().ref("quizes/"+quizId);       
            quizDbref                  
            .on('value', (snap)=>{
                var questions= snap.val();
                var qstns=[]
                if(questions){
                    for(var key in questions){
                        if(key == "questions"){
                            var data = questions[key];                          
                            for(let c in data){
                                var qstn = data[c]
                                qstn["options"] = data[c].options;
                                qstn["questionId"] = data[c].question;
                                qstns.push(qstn)
                            }                            
                            setQuizQsnts(qstns)   
                            setIsLoading(false);
                        }
                    }                   
                }               
            })
        }
    }
    //function to handle when any option is clicked clicked on
    function handleOptionPressed(idx, option, question) {
       
    }

    //function to render question
    function renderQuestion() {
        const selectedQuestion = quizQsnts[activeQstnIdx] || {};
        const options = selectedQuestion.options || [];

        //rendering
        return (
            <ScrollView style={styles.scroll}>
                <View style={styles.qstnContainer}>
                    <Text style={styles.qstnCount}>{activeQstnIdx + 1 + " of " + totalQstnsCount}</Text>
                    <Text style={styles.qstnText}>{selectedQuestion.question}</Text>
                </View>

                {
                    options.map((item, idx) => {
                        const questionId = selectedQuestion["questionId"];
                        var selectedOptionId = null;
                        if (qstnResponses[questionId]) {
                            const qstnResponse = qstnResponses[questionId];
                            selectedOptionId = qstnResponse["answeredOptionId"];
                        }

                        //checking os selected ans is right/wrong
                       var optionImgSrc = require("../../assets/option.png");
                        var optionBorder = null;

                        const isAns = item.isAns;
                        const optionId = item.optionId;
                        if ((selectedOptionId == optionId || selectedQstnResponseOptionIdx == optionId) && isAns) {
                            optionImgSrc = require("../../assets/rightOption.png");
                            optionBorder = styles.rightAnsBorder;
                        } else if ((selectedOptionId == optionId || selectedQstnResponseOptionIdx == optionId) && !isAns) {
                            optionImgSrc = require("../../assets/wrongOption.png");
                            optionBorder = styles.wrongAnsBorder;
                        }

                        return (
                            <TouchableOpacity
                                key={idx}
                                style={[styles.option, optionBorder]}
                                onPress={() => handleOptionPressed(idx, item, selectedQuestion)}
                            >
                                <Text style={styles.optionText}>{item.option}</Text>
                                <Image style={styles.optionImg} source={optionImgSrc} />
                            </TouchableOpacity>
                        )
                    })
                }

                <View style={[styles.container, styles.btnsContainer]}>
                    {renderDirectionButtons(activeQstnIdx,totalQstnsCount)}
                </View>
            </ScrollView>
        )
                   
    }

    //function to render direction buttons
    function renderDirectionButtons() {
       
    }

    //function to handle when submit btn is pressed on
    async function handleSubmitBtnClick() {
        const loggedUserId = await AsyncStorage.getItem('loggedUserId');
        if (loggedUserId && quizId) {
            setIsLoading(true);

            // adding responses for that quiz in firebase db
         

        }
    }

    //function to handle next/prev btn click
    function handlePrevBtnClick() {
        
    }

    function handleNextBtnClick() {
        
    }

    //function to shuffle options
    function shuffle(array) {
       var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    //component rendering
    return (
        <View style={styles.root}>
            <Text> QuizName:  {quizName}</Text>
            <Text> quizId:  {quizId}</Text>
            
            {
                isLoading ?
                    <ActivityIndicator style={styles.loader} />
                    :
                    <>
                        <View style={styles.container}>
                            <View style={styles.row}>
                                <Text style={styles.title}>{quizName}</Text>
                                <BasicButton
                                    key={1}
                                    text="Submit"
                                    onPress={handleSubmitBtnClick}
                                />
                            </View>
                            <View style={styles.divider}></View>
                        </View>
                        <View style={styles.divider}></View>
                        <Image source={quizImgUri || require("../../assets/quiz.jpg")} style={styles.image} />
                        <View style={styles.divider}></View>
                        {
                            renderQuestion()
                        }
                    </>
            }
        </View >
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 10,
    },

    container: {
        paddingHorizontal: 30,
    },

    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    title: {
        fontWeight: '500',
        fontSize: 20,
        letterSpacing: 0.1,
        color: '#2E2E2E',
        flex: 1,
        flexWrap: "wrap",
    },

    divider: {
        paddingVertical: 8,
    },

    image: {
        position: 'absolute',
        top: 60,
        left: 0,
        right: 0,
        alignSelf: "center",
        width: "100%",
        height: 250,
        backgroundColor: "#f1f1f1",
    },

    scroll: {
        marginTop: 150,
        paddingHorizontal: 30,
    },

    qstnContainer: {
        backgroundColor: "#fff",
        padding: 8,
        shadowColor: 'black',
        shadowOpacity: .3,
        shadowOffset: { width: 0, height: 1 },
        elevation: 10,
        borderRadius: 8,
        marginBottom: 12,
    },

    qstnCount: {
        fontWeight: '500',
        fontSize: 13,
        letterSpacing: 0.1,
        color: '#B9B9B9',
    },

    qstnText: {
        fontWeight: '500',
        fontSize: 17,
        letterSpacing: 0.1,
        paddingVertical: 14,
        textAlign: "center",
    },

    option: {
        backgroundColor: "#fff",
        marginVertical: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#C6C6C6",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    optionText: {
        fontWeight: '500',
        fontSize: 16,
        letterSpacing: 0.1,
        color: '#757575',
    },

    rightAnsBorder: {
        borderColor: "#34A853",
    },

    wrongAnsBorder: {
        borderColor: "#EB4335",
    },

    optionImg: {
        width: 16,
        height: 16,
    },

    btnsContainer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 20,
    },

    button: {
        width: "43%",
    },

    disabledButton: {
        width: "43%",
        backgroundColor: "grey",
    }
});