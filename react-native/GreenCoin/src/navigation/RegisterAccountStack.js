import React from 'react';

import InsertRegisterInfomation from '../screens/register/InsertRegisterInfomation';
import SelectPolicyScreen from '../screens/register/SelectPolicyScreen';
import InsertIdAndPasswordScreen from '../screens/register/InsertIdAndPasswordScreen';
import CreateFinishAccount from '../screens/register/CreateFinishAccount';

import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function RegisterAccountStack() {
  return (
    <Stack.Navigator  
       initialRouteName="insertRegisterInfomation"
       screenOptions={{
         headerShown: false
       }}
     >
      <Stack.Screen name="insertRegisterInfomation" component={InsertRegisterInfomation}/>
      <Stack.Screen name="selectPolicy" component={SelectPolicyScreen}/>
      <Stack.Screen name="insertIdAndPassword" component={InsertIdAndPasswordScreen}/>
      <Stack.Screen name="createFinish" component={CreateFinishAccount}/>
    </Stack.Navigator>
  );
}
