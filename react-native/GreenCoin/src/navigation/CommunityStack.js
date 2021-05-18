import React,{useEffect} from 'react';
import {BackHandler} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import CommunityScreen from '../screens/community/CommunityScreen';

const Stack = createStackNavigator();

export default function CommunityStack({navigation,route}) {


  return (
    <Stack.Navigator  
      initialRouteName="community"
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="community" component={CommunityScreen}/>
    </Stack.Navigator>
  );
}
