import * as React from 'react';

import LoginMainScreen from '../screens/register/LoginMainScreen';
import CartOrderSuccessScreen from '../screens/cart/CartOrderSuccessScreen';
import LoaderRotateBar from '../components/comm/LoaderRotateBar';
import TabNavigation from './TabNavigation';
import LoginStack from './LoginStack';
import RegisterAccountStack from './RegisterAccountStack';
import InsertPhoneIdentifyScreen from '../screens/register/InsertPhoneIdentifyScreen';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Payment from '../screens/Payment';


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
