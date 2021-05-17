import * as React from 'react';

import FilterScreen from '../screens/shop/FilterScreen';
import ShopScreen from '../screens/shop/ShopScreen';
import ShopListScreen from '../screens/shop/ShopListScreen';
import ReviewFilterScreen from '../screens/shop/ReviewFilterScreen';
import ShopSearchItem from '../screens/shop/ShopSearchItem';
import ItemDetailScreen from '../screens/ItemDetailScreen';

import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

export default function ShopStack() {
  return (
    <Stack.Navigator  
       initialRouteName="shop"
       screenOptions={{
         headerShown: false
       }}
     >
      <Stack.Screen name="shop" component={ShopScreen}/>
      {/* <Stack.Screen name="shopList" component={ShopListScreen}/>
      <Stack.Screen name="filter" component={FilterScreen}/>
      <Stack.Screen name="reviewFilter" component={ReviewFilterScreen}/>
      
      <Stack.Screen name="itemDetail"   component={ItemDetailScreen} />
      <Stack.Screen name="shopSearch" component={ShopSearchItem}/> */}
    </Stack.Navigator>
  );
}
