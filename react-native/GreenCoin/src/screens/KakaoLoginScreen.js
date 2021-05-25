import  React ,{useState} from 'react';
import {Image, Text,ImageBackground, View, Dimensions,ScrollView,Platform,Alert} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';


import KakaoLogins, {KAKAO_AUTH_TYPES} from '@react-native-seoul/kakao-login';
import realController from '../db/realm/realmController';
import LoginTypeSelectButton from '../components/comm/LoginTypeSelectButton';
import appStaticInfomation from '../db/appStaticInfomation';
import userInfoSingleton from '../db/userInfoSingleton';
import serverController from '../server/serverController';
import { useNavigation } from '@react-navigation/core';


export default function KakaoLoginScreen() {

  const navigation = useNavigation();
  const appInfo = appStaticInfomation.getInstance();

  const callBackRegister = async (data) =>{
    if(!data)
      return;

    var state = {
      no : data.userInfo.no,
      username : data.userInfo.username,
      autoLogin : true,
      isLogin : true,
      point : data.userInfo.point,
      location_no : data.userInfo.location_no,
      location_name : data.userInfo.location_name,
      location_fullname : data.userInfo.location_fullname,
      token : data.token
    }

    await realController.successUserLogin(state);
    navigation.goBack();
  }


  const loginByKakao = () =>{
    KakaoLogins.login([KAKAO_AUTH_TYPES.Talk, KAKAO_AUTH_TYPES.Account])
      .then(tocken => {
        KakaoLogins.getProfile()
        .then(result => {
          console.log(result);
            let data = {
              id : result.id,
              username  : result.nickname ?  result.nickname : "jungmin",
              location_no  : 17,
            }

            serverController.connectFetchController("/auth/kakao","POST",JSON.stringify(data),function(res){
              callBackRegister(res.data);
              
            })
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

  

    return (
       <View style={styles.container}>
          <View style={styles.itemContainer}>
            <View style={styles.marginTop}/>
              <LoginTypeSelectButton title={"카카오로 시작하기"} fontColor={"#391B1B"} backgroundColor={"#FFEB3B"} clickEvent={loginByKakao}/>
            <View style={styles.marginBar}/>
          </View>
        </View>
    );
}

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });


const styles = EStyleSheet.create({
  container: {
    width :"100%",
    height:"100%",
  },
  itemContainer:{
    width:"100%",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom:"100rem",
    marginBottom:"100rem",
  },
  image: {
    width:"100%",
    height:"100%",
  },
  labelContainer:{
    alignItems: "center",
    justifyContent: "center",
  },
  title:{
    fontFamily:"NotoSansKR-Bold",
    color:"black",
    fontSize:"13rem",
  },
  label:{
    fontFamily:"NotoSansKR-Regular",
    color:"black",
    fontSize:"13rem",
  },
  point:{
    fontFamily:"NotoSansKR-Medium",
    color:"black",
    fontSize:"13rem",
  },
  marginBar:{
    width:"90%",
  },
  marginTop:{
    height:"100%",
    marginTop:"20rem",
  }
  
});