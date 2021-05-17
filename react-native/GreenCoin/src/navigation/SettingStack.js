import * as React from 'react';


import {BackHandler} from 'react-native';

import SettingScreen from '../screens/setting/SettingScreen';
import ProfileSettingScreen from '../screens/setting/ProfileSettingScreen';
import PasswordSettingScreen from '../screens/setting/PasswordSettingScreen';
import PolicyScreen from '../screens/setting/PolicyScreen';
import PersonalPolicyScreen from '../screens/setting/PersonalPolicyScreen';

import { createStackNavigator } from '@react-navigation/stack';



const Stack = createStackNavigator();

export default function SettingStack({navigation,route}) {
 
  return (
    <Stack.Navigator  
      initialRouteName="설정"
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="설정" component={SettingScreen}/>
      <Stack.Screen name="프로필"   component={ProfileSettingScreen}/>
      <Stack.Screen name="비밀번호 변경 / 찾기"   component={PasswordSettingScreen}/>
      <Stack.Screen name="개인정보취급방침"   component={PolicyScreen}/>
      <Stack.Screen name="이용약관"   component={PersonalPolicyScreen}/>
    </Stack.Navigator>
  );
}
