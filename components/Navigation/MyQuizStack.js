import { createStackNavigator } from '@react-navigation/stack';
import React, { } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Myquiz from '../screens/Myquiz';
import CreateQuiz from '../screens/CreateQuiz';
import AddQuizQstn from '../screens/AddQuizQuestion';
import QuizDetails from '../screens/QuizDetails';



const Stack = createStackNavigator();
export default function MyQuizStack() {
  return (
      
            <Stack.Navigator initialRouteName="Myquiz">
            <Stack.Screen name="Myquiz" component={Myquiz} options={{headerShown:false}} />
            <Stack.Screen name="CreateQuiz" component={CreateQuiz}options={{headerShown:false}} />
            <Stack.Screen name="AddQuizQuestion" component={AddQuizQstn}options={{headerShown:false}} />
            <Stack.Screen name="QuizDetails" component={QuizDetails}options={{headerShown:false}} />
            </Stack.Navigator>
     
  );
}