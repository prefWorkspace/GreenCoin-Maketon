import React , {useState} from 'react';

import TabNavigation from './TabNavigation';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SelectAreaScreen from '../screens/select/SelectAreaScreen';
import SelectInterestScreen from '../screens/select/SelectInterestScreen';
import KakaoLoginScreen from '../screens/KakaoLoginScreen';
import appStaticInfomation from '../db/appStaticInfomation';



const Stack = createStackNavigator();




export default function InitStack() {




  return (
    <NavigationContainer>
    <Stack.Navigator
       initialRouteName="tab"
       screenOptions={{
         headerShown: false
       }}
     >
     <Stack.Screen name="tab" component={TabNavigation}/>
      <Stack.Screen name="kakaoLogin" component={KakaoLoginScreen}/>
      <Stack.Screen name="interest" component={SelectInterestScreen}/>
      <Stack.Screen name="area" component={SelectAreaScreen}/>
      {/* <Stack.Screen name="cartOrderSuccess" component={CartOrderSuccessScreen}/>
      <Stack.Screen name="login" component={LoginStack}/>
      <Stack.Screen name="register" component={RegisterAccountStack}/>
      <Stack.Screen name="selectLoginOrRegister" component={LoginMainScreen}/>
      <Stack.Screen name="insertIdentify" component={InsertPhoneIdentifyScreen}/>
      <Stack.Screen name="loadScreen" component={LoaderRotateBar}/>
      <Stack.Screen name="Payment" component={Payment}/>
      <Stack.Screen name="PaymentSuccess" component={CartOrderSuccessScreen}/> */}

    </Stack.Navigator>
    </NavigationContainer>
  );
}
