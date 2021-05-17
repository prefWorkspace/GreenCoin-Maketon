import * as React from 'react';

import GoodsScreen from '../screens/good/GoodsScreen';
import GoodDetailScreen from '../screens/good/GoodDetailScreen';
import AttendanceDetailScreen from '../screens/good/AttendanceDetailScreen';

import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function ShopStack() {
  return (
    <Stack.Navigator  
       initialRouteName="Good"
       screenOptions={{
         headerShown: false
       }}
     >
      <Stack.Screen name="Good" component={GoodsScreen}/>
      {/* <Stack.Screen name="GoodDetail" component={GoodDetailScreen}/>
      <Stack.Screen name="attendance" component={AttendanceDetailScreen}/> */}
    </Stack.Navigator>
  );
}
