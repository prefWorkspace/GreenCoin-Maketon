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
  const [load,setLoad] = useState(false);
  const [userToken, setUserToken] = useState();

  useEffect(() => {
    realmController.checkAutoLogin(setLoad);
    appStaticInfomation.getInstance()._interest = true;
    appStaticInfomation.getInstance()._area = true;
  }, [])



  function updateToFalse(){
    setLoad(true);
  }

  function openLink(){
    KakaoLogins.login([KAKAO_AUTH_TYPES.Talk, KAKAO_AUTH_TYPES.Account])
    .then(tocken => {
      KakaoLogins.getProfile()
      .then(async (result) =>  {

        await realmController.successUserLogin({
          userId : 1,
          tok_name : "test",
          autoLogin : true,
          isLogin : true,
        });
        updateToFalse();
      })
      .catch(err => {
        console.log(err);
      });
    })
    .catch(err => {
      if (err.code === 'E_CANCELLED_OPERATION') {
        console.log(`Login Cancelled:${err.message}`);
      } else {
        console.log(`Login Failed:${err.code} ${err.message}`)
      }
    });
  }

  return  load ?
      <InitStack></InitStack>
      :
      <View>
        <TouchableOpacity style={{width:"100%",height:"100%",backgroundColor:"grey"}} onPress={openLink}>


        </TouchableOpacity>
      </View>
}