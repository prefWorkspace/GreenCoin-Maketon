import React from 'react';
import {BackHandler} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from '../screens/main/MainScreen';
import AddressScreen from '../screens/main/AddressScreen';
import AddressDetailScreen  from '../screens/main/AddressDetailScreen';
import AddressSearchScreen  from '../screens/main/AddressSearchScreen';
import SearchScreen  from '../screens/main/SearchScreen';
import ReviewDetailScreen from '../screens/ReviewDetailScreen';



const Stack = createStackNavigator();

export default function MainStack() {


  return (
    <Stack.Navigator  
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="main" component={MainScreen} />
      {/* <Stack.Screen name="address" component={AddressScreen}/>
      <Stack.Screen name="addressSearch"   component={AddressSearchScreen} />
      <Stack.Screen name="addressDetail"   component={AddressDetailScreen} />
      <Stack.Screen name="reviewDetail"   component={ReviewDetailScreen} />
      <Stack.Screen name="search"   component={SearchScreen} /> */}
      
      
    </Stack.Navigator>
  );
}
