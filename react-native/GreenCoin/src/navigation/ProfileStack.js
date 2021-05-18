import React,{useEffect} from 'react';
import {BackHandler} from 'react-native';
import ProfileScreen from '../screens/profile/ProfileScreen';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function ProfileStack({navigation,route}) {


  return (
    <Stack.Navigator  
      initialRouteName="profile"
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="profile" component={ProfileScreen}/>
    </Stack.Navigator>
  );
}
