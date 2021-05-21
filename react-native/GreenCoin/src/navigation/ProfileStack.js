import React,{useEffect} from 'react';
import {BackHandler} from 'react-native';
import ProfileScreen from '../screens/profile/ProfileScreen';
import { createStackNavigator } from '@react-navigation/stack';
import MyCoinScreen from '../screens/profile/MyCoinScreen';
import MyContentScreen from '../screens/profile/MyContentScreen';
import MyProfileScreen from '../screens/profile/MyProfileScreen';
import MySettingScreen from '../screens/profile/MySettingScreen';
import SelectAreaTest from '../screens/profile/selectAreanTest';

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
      <Stack.Screen name="myCoin" component={MyCoinScreen}/>
      <Stack.Screen name="myContent" component={MyContentScreen}/>
      <Stack.Screen name="myProfile" component={MyProfileScreen}/>
      <Stack.Screen name="mySetting" component={MySettingScreen}/>
      <Stack.Screen name="selectArea" component={SelectAreaTest}/>
    </Stack.Navigator>
  );
}
