import React,{useEffect} from 'react';
import {BackHandler} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import CommunityScreen from '../screens/community/CommunityScreen';
import CommunityDetailScreen from '../screens/community/CommunityDetailScreen';
import CommunityPostScreen from '../screens/community/CommunityPostScreen';

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
      <Stack.Screen name="communityDetail" component={CommunityDetailScreen}/>
      <Stack.Screen name="communityPost" component={CommunityPostScreen}/>
    </Stack.Navigator>
  );
}
