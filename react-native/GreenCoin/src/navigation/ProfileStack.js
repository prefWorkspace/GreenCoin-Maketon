import React,{useEffect} from 'react';
import {BackHandler} from 'react-native';
import ProfileScreen from '../screens/profile/ProfileScreen';
import DeliverInfoScreen from '../screens/profile/DeliverInfoScreen';
import AlarmResultScreen from '../screens/profile/AlarmResultScreen';
import CuponScreen from '../screens/profile/CuponScreen';
import PointScreen from '../screens/profile/PointScreen';
import AskResultScreen from '../screens/profile/AskResultScreen';
import ClientServiceScreen from '../screens/profile/ClientServiceScreen';
import RepeatQNAScreen from '../screens/profile/RepeatQNAScreen';
import ReviewResultScreen from '../screens/profile/ReviewResultScreen';
import AskDetailScreen from '../screens/profile/AskDetailScreen';
import RefundRequireScreen from '../screens/profile/RefundRequireScreen';
import ChangeRequireScreen from '../screens/profile/ChangeRequireScreen';
import WriteAskScreen from '../screens/WriteAskScreen';
import WriteReviewScreen from '../screens/WriteReviewScreen';
import DeleteUserScreen from '../screens/profile/DeleteUserScreen';

import OrderDetail from '../screens/profile/OrderDetail';
import { createStackNavigator } from '@react-navigation/stack';

import SettingStack from './SettingStack';


//<Stack.Screen name="setting"   component={SettingStack}/>   
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
      {/* <Stack.Screen name="주문상세조회" component={OrderDetail}/>
      <Stack.Screen name="point"   component={PointScreen}/>
      <Stack.Screen name="cupon"   component={CuponScreen}/>
      <Stack.Screen name="deliverInfo"   component={DeliverInfoScreen}/>
      <Stack.Screen name="자주 묻는 질문"   component={RepeatQNAScreen}/>
      <Stack.Screen name="문의 내역"   component={AskResultScreen}/>
      <Stack.Screen name="구매후기내역"   component={ReviewResultScreen}/>
      <Stack.Screen name="고객센터"   component={ClientServiceScreen}/>
      <Stack.Screen name="알림 내역"   component={AlarmResultScreen}/>    
      <Stack.Screen name="setting"   component={SettingStack}/>  
      <Stack.Screen name="askDetail"   component={AskDetailScreen}/>  
      <Stack.Screen name="반품신청"   component={RefundRequireScreen}/>  
      <Stack.Screen name="교환신청"   component={ChangeRequireScreen}/> 
      <Stack.Screen name="writeAsk"   component={WriteAskScreen} />
      <Stack.Screen name="writeReview"   component={WriteReviewScreen} />
      <Stack.Screen name="deleteUser"   component={DeleteUserScreen} /> */}
    </Stack.Navigator>
  );
}
