import React from 'react';

import LoginIdAndPassword from '../screens/login/LoginIdAndPassword';
import LoginSearchId from '../screens/login/LoginSearchId';
import LoginSearchResult from '../screens/login/LoginSearchResult';
import LoginSearchPassword from '../screens/login/LoginSearchPassword';
import LoginSetPassword from '../screens/login/LoginSetPassword';
import LoginTypeSelectScreen from '../screens/login/LoginTypeSelectScreen';

import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function LoginStack() {
  return (
    <Stack.Navigator  
       initialRouteName="loginSelectType"
       screenOptions={{
         headerShown: false
       }}
     >
      <Stack.Screen name="loginSelectType" component={LoginTypeSelectScreen}/>
      <Stack.Screen name="loginIdAndPassword" component={LoginIdAndPassword}/>
      <Stack.Screen name="loginSearchId" component={LoginSearchId}/>
      <Stack.Screen name="loginSearchResult" component={LoginSearchResult}/>
      <Stack.Screen name="loginSearchPassword" component={LoginSearchPassword}/>
      <Stack.Screen name="loginSetPassword" component={LoginSetPassword}/>
    </Stack.Navigator>
  );
}
