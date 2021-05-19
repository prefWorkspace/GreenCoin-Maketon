import * as React from 'react';
import { Text, View, Image,StyleSheet,BackHandler, Alert } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import EStyleSheet from 'react-native-extended-stylesheet';

import MainStack from './MainStack';
import ProfileStack from './ProfileStack';
import CommunityStack from './CommunityStack';

const Tab = createBottomTabNavigator();

export default function App() {

  

  return (
      <Tab.Navigator
        initialRouteName={"홈"}
        lazy={false}
        tabBarOptions={{
        scrollable :true,
        labelStyle: styles.tabNavgiationLabel,
        activeTintColor: '#00C386',
        style: styles.tabNavigationStyle,
        
      }}
    >
      <Tab.Screen 
        name="홈" component={MainStack}
        options={{
          tabBarLabel: "홈",
          tabBarIcon: ({focused }) => {
              let focuseColor = focused == true ? styles.iconFocuse : styles.iconUnFocuse;
              return  ( <Image style={[focuseColor,styles.icon1]} source={require('../assets/img/navi/home.png')} /> )
            }
        }}
      />
      <Tab.Screen 
        name="shop" component={MainStack} 
        options={{
          tabBarLabel: "컨텐츠",
          tabBarIcon: ({focused }) => {
              let focuseColor = focused == true ? styles.iconFocuse : styles.iconUnFocuse;
              return  ( <Image style={[focuseColor,styles.icon2]} source={require('../assets/img/navi/content.png')} /> )
            }
        }}
      />
       <Tab.Screen 
        name="Goods" component={CommunityStack} 
        options={{
          
          tabBarLabel: "커뮤니티",
          tabBarIcon: ({focused }) => {
              let focuseColor = focused == true ? styles.iconFocuse : styles.iconUnFocuse;
              return  ( <Image style={[focuseColor,styles.icon3]} source={require('../assets/img/navi/community.png')} /> )
            }
        }}
      />
      <Tab.Screen 
        name="Profile" component={ProfileStack} 
        options={{
          tabBarLabel: "마이페이지",
          tabBarIcon: ({focused }) => {
            let focuseColor = focused == true ? styles.iconFocuse : styles.iconUnFocuse;
            return  ( 
              <Image style={[focuseColor,styles.icon5]} source={require('../assets/img/navi/mypage.png')} />
          )}
        }}
      />
    </Tab.Navigator>
  );
}

const styles = EStyleSheet.create({
  iconFocuse:{
    tintColor:"#00C386",
  },
  iconUnFocuse:{
    tintColor :"#D2D5DA",
  },

  icon1: { width: "35rem", height: "35rem", },
  icon2: { width: "35rem", height: "35rem", },
  icon3: { width: "35rem", height: "35rem", },
  icon4: { width: "35rem", height: "35rem", },
  icon5: { width: "35rem", height: "35rem", },
  //============== Tab Navigation 디자인 ================
  tabNavgiationLabel:{
    bottom:"10rem",
  },
  tabNavigationStyle:{
    height: "70rem",
    backgroundColor : "#FFFFFF",
  },
  text: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
});
