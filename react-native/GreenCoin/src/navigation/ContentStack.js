import React from 'react';
import {BackHandler} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import ContentScreen from '../screens/content/ContentScreen';



const Stack = createStackNavigator();

export default function ContentStack() {


  return (
    <Stack.Navigator  
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="content" component={ContentScreen} />
      
    </Stack.Navigator>
  );
}
