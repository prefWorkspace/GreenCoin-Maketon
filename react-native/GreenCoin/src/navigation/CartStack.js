import * as React from 'react';

import CartScreen from '../screens/cart/CartScreen';
import CartCuponScreen from '../screens/cart/CartCuponScreen';
import CartOrderItemScreen from '../screens/cart/CartOrderItemScreen';
import CartOrderSuccessScreen from '../screens/cart/CartOrderSuccessScreen';
import SettingStack from './SettingStack';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function CartStack() {
  return (
    <Stack.Navigator  
       initialRouteName="Cart"
       screenOptions={{
         headerShown: false
       }}
     >
      <Stack.Screen name="cart" component={CartScreen}/>
      <Stack.Screen name="cartCupon" component={CartCuponScreen}/>
      <Stack.Screen name="cartOrderItem" component={CartOrderItemScreen}/>
    </Stack.Navigator>
  );
}
