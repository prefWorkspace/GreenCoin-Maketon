import React from 'react';
import {BackHandler} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from '../screens/main/MainScreen';



const Stack = createStackNavigator();

export default function MainStack() {


  return (
    <Stack.Navigator  
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="main" component={MainScreen} />
      
    </Stack.Navigator>
  );
}
