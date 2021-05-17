import * as React from 'react';
import { Text, View, Image,StyleSheet,BackHandler, Alert } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import CartScreen from '../screens/cart/CartScreen';
import EStyleSheet from 'react-native-extended-stylesheet';

import MainStack from './MainStack';
import ShopStack from './ShopStack';
import GoodsStack from './GoodsStack';
import ProfileStack from './ProfileStack';
import CartStack from './CartStack';
import userInfoSingleton from '../db/userInfoSingleton';

const Tab = createBottomTabNavigator();

export default function App({navigation}) {

  

  return (
      <Tab.Navigator
        initialRouteName={"홈"}
        lazy={false}
        tabBarOptions={{
        scrollable :true,
        labelStyle: styles.tabNavgiationLabel,
        activeTintColor: '#e91e63',
        style: styles.tabNavigationStyle,
        
      }}
    >
      <Tab.Screen 
        name="홈" component={MainStack}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({focused }) => {
              let focuseColor = focused == true ? styles.iconFocuse : styles.iconUnFocuse;
              return  ( <Image style={[focuseColor,styles.icon1]} source={require('../assets/img/navi/mainBottomNav-1.png')} /> )
            }
        }}
      />
      <Tab.Screen 
        name="shop" component={ShopStack} 
        options={{
          tabBarLabel: "",
          tabBarIcon: ({focused }) => {
              let focuseColor = focused == true ? styles.iconFocuse : styles.iconUnFocuse;
              return  ( <Image style={[focuseColor,styles.icon2]} source={require('../assets/img/navi/mainBottomNav-2.png')} /> )
            }
        }}
      />
       <Tab.Screen 
        name="Goods" component={GoodsStack} 
        options={{
          tabBarLabel: "",
          tabBarIcon: ({focused }) => {
              let focuseColor = focused == true ? styles.iconFocuse : styles.iconUnFocuse;
              return  ( <Image style={[focuseColor,styles.icon3]} source={require('../assets/img/navi/mainBottomNav-3.png')} /> )
            }
        }}
      />
      {/* <Tab.Screen 
        name="Carts" component={CartStack} 
        options={{
          tabBarLabel: "",
          tabBarIcon: ({focused }) => {
              let focuseColor = focused == true ? styles.iconFocuse : styles.iconUnFocuse;
              return  ( 
                <View>
                  <Image style={[focuseColor,styles.icon4]} source={require('../assets/img/navi/mainBottomNav-4.png')} />
                  {
                    userInfoSingleton.getInstance()._cartCount > 0 
                    ?
                    <View style={styles.badge}>
                      <Text style={styles.text}>{userInfoSingleton.getInstance()._cartCount}</Text>
                    </View>
                    :
                    null
                  }
                </View>
              )}
        }}
      /> */}
      <Tab.Screen 
        name="Profile" component={ProfileStack} 
        options={{
          tabBarLabel: "",
          tabBarIcon: ({focused }) => {
            let focuseColor = focused == true ? styles.iconFocuse : styles.iconUnFocuse;
            return  ( 
              <Image style={[focuseColor,styles.icon5]} source={require('../assets/img/navi/mainBottomNav-5.png')} />
          )}
        }}
      />
    </Tab.Navigator>
  );
}

const styles = EStyleSheet.create({
  iconFocuse:{
    tintColor:"#2E3541",
  },
  iconUnFocuse:{
    tintColor :"#D2D5DA",
  },

  icon1: { width: "18.362rem", height: "19.502rem", },
  icon2: { width: "18.937rem", height: "15.746rem", },
  icon3: { width: "18.362rem", height: "18.362rem", },
  icon4: { width: "21.801rem", height: "20.483rem", },
  icon5: { width: "19.928rem", height: "19.541rem", },
  //============== Tab Navigation 디자인 ================
  tabNavgiationLabel:{
   
  },
  tabNavigationStyle:{
    paddingTop:"10rem",
    height: "67rem",
    backgroundColor : "#FFFFFF",
  },
  badge: {
    position: 'absolute',
    right: -6,
    top: "-8rem",
    backgroundColor: 'red',
    borderRadius: "12rem",
    width: "16rem",
    height: "16rem",
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
});
