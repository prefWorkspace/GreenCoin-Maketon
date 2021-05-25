import React ,{useState,useEffect} from 'react';
import { Text, View, TouchableOpacity,StyleSheet,BackHandler, Alert, AsyncStorage  } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import filterContoller from './src/db/realm/filterContoller';
import realmController from './src/db/realm/realmController';
// import messaging from '@react-native-firebase/messaging';
import InitStack from './src/navigation/InitStack';
import appStaticInfomation from './src/db/appStaticInfomation';
import KakaoLogins, {KAKAO_AUTH_TYPES} from '@react-native-seoul/kakao-login';
import SelectAreaScreen from './src/screens/select/SelectAreaScreen';


const Tab = createBottomTabNavigator();

const getFcmToken = async () => {
  const fcmToken = await messaging().getToken();
  appStaticInfomation.getInstance().updateToken(fcmToken);
};

export default function App() {
  const [load,setLoad] = useState(true);
  const [userToken, setUserToken] = useState();

  useEffect(() => {
    realmController.checkAutoLogin(setLoad);
    appStaticInfomation.getInstance()._interest = true;
    appStaticInfomation.getInstance()._area = true;
  }, [])




  return  load ?
      <InitStack></InitStack>
      :
      <View>
     
      </View>
}