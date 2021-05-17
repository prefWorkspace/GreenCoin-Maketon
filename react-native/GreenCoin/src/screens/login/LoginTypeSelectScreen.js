import  React ,{useState} from 'react';
import {Image, Text,ImageBackground, View, Dimensions,ScrollView,Platform,Alert} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import CommonTitleBar from '../../components/comm/CommonTitleBar';
import LoginTypeSelectButton from '../../components/login/LoginTypeSelectButton';

import KakaoLogins, {KAKAO_AUTH_TYPES} from '@react-native-seoul/kakao-login';
import {navigationBackHandler,useNavigation ,useIsFocused} from '../../navigation/NavigationBackHandler';
import { NaverLogin, getProfile } from "@react-native-seoul/naver-login";
import registerServerController from '../../server/registerServerController';
import realController from '../../db/realm/realmController';

import appStaticInfomation from '../../db/appStaticInfomation';
import localStringData from '../../const/localStringData';

import { appleAuthAndroid, AppleButton } from '@invertase/react-native-apple-authentication';
import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid'


import userInfoSingleton from '../../db/userInfoSingleton';
const iosKeys = {
  kConsumerKey: "Pr929iOp6nKXQZk6zheA",
  kConsumerSecret: "xASvXVsjE8",
  kServiceAppName: "용된다",
  kServiceAppUrlScheme: "testapp" // only for iOS
};

const androidKeys = {
  kConsumerKey: "Pr929iOp6nKXQZk6zheA",
  kConsumerSecret: "xASvXVsjE8",
  kServiceAppName: "용된다"
};

const initials = Platform.OS === "ios" ? iosKeys : androidKeys;

export default function LoginTypeSelectScreen() {

  const navigation = useNavigation();
  const appInfo = appStaticInfomation.getInstance();

  const [credentialStateForUser,updateCredentialStateForUser] = useState(-1);
  const [searchList,setSearchList] = useState([]);
  const [imagePath , setImagePath] = useState(appInfo._loginBanner[0] ? appInfo._loginBanner[0] : null);
  

  if(useIsFocused()){
    if(imagePath && imagePath.ban_image_mobile != appInfo._loginBanner[0].ban_image_mobile)
      setImagePath(appInfo._loginBanner[0]);
  }
  

  const callBackRegister = (data) =>{
    if(data == 0)
      return;

    var state = {
      userId : data.userInfo.mem_id,
      userName : data.userInfo.mem_username,
      autoLogin : true,
      isLogin : true,
      gender :  data.userInfo.mem_gender ? data.userInfo.mem_gender : "",
      bday :  data.userInfo.mem_dob ? data.userInfo.mem_dob : "0000-00-00",
      height :  data.userInfo.mem_additional1 ? data.userInfo.mem_additional1 : "0",
      weight :  data.userInfo.mem_additional2 ? data.userInfo.mem_additional2 : "0",
      phone :  data.userInfo.mem_phone ? data.userInfo.mem_phone : "",
      name :  data.userInfo.mem_name,
      email : data.userInfo.mem_email ? data.userInfo.mem_email : "",
      mem_method : data.userInfo.mem_method,
      mem_notification :data.userInfo.mem_notification ? data.userInfo.mem_notification : "",
      mem_notification_event : data.userInfo.mem_notification_event ? data.userInfo.mem_notification_event : "",
      tok_name : data.tocken
    }

    realController.successUserLogin(state);

    navigation.reset({
      index: 0,
      routes: [{ name: 'tab' }],
    });
  }

  const registerUserAccount = (method,tocken,name) =>{
    var formData = new FormData();

    formData.append('mem_username',name);
    formData.append('mem_password',tocken);
    formData.append('mem_name',"");
    formData.append('mem_method',method);
    formData.append('fcm',appStaticInfomation.getInstance()._token);

    registerServerController.insertUserInfomationAsTocken(formData,callBackRegister);
  }
  
  navigationBackHandler();

  const moveToLogin = () =>{
    navigation.navigate("loginIdAndPassword");
  }

  const getNaverProfile = async (token) =>{
    const profileResult = await getProfile(token.accessToken);
    if (profileResult.resultcode === "024") {
      Alert.Alert.alert(" ","로그인 실패", profileResult.message);
      return;
    }
    registerUserAccount(2,"naver_"+profileResult.response.id,"n_"+profileResult.response.email.split('@')[0])
  }

  const loginByNaver =  () =>{
    return new Promise((resolve, reject) => {
      NaverLogin.login(initials,async (err, token) => {
        getNaverProfile(token);
        if (err) {
          console.log(err);
          return;
        }
      });
    });
  }


async function fetchAndUpdateCredentialState(updateCredentialStateForUser){
    if(user === null){
        updateCredentialStateForUser('N/A');
    }else{
        const credentialState = await appleAuth.getCredentialStateForUser(user);
        if(credentialState === AppleAuthCredentialState.AUTHORIZED){
            updateCredentialStateForUser('AUTHORIZED');
        }else{
            updateCredentialStateForUser(credentialState);
        }
    }
}

async function onAppleButtonPress(updateCredentialStateForUser){ 
    try{
    const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: AppleAuthRequestOperation.LOGIN,
        requestedScopes: [AppleAuthRequestScope.EMAIL , AppleAuthRequestScope.FULL_NAME],
    });
  
    //const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);
    
    const {
        user:newUser,
        identityToken,
        nonce,
    } = appleAuthRequestResponse;

    user = newUser;

    fetchAndUpdateCredentialState(updateCredentialStateForUser).catch(error => updateCredentialStateForUser('Error: ${error.code}'),);

    if(identityToken)
      return user;
    else
      return null;

    }catch(error){
        if(error.code === AppleAuthError.CANCELED){
            Alert.alert(" ","Login Cancle");
        }else{
            alert(error);
        }
        return null;
    }
}

  const iosAppleLogin = () => {
    onAppleButtonPress(updateCredentialStateForUser).then(result =>{
            if(result == null || result == undefined)
                return;
          registerUserAccount(3,"apple_" + result.sub.toString(),"a_"+ result.email.split('@')[0]);
    });
  }

  const loginByApple = async () =>{
    if(Platform.OS === 'ios'){
      iosAppleLogin();
      return;
    }

    // Generate secure, random values for state and nonce
    const rawNonce = uuid();
    const state = uuid();

    // Configure the request
    appleAuthAndroid.configure({
      // The Service ID you registered with Apple
      clientId: 'kr.com.yongdeanda.service',
      // Return URL added to your Apple dev console. We intercept this redirect, but it must still match
      // the URL you provided to Apple. It can be an empty route on your backend as it's never called.
      redirectUri: 'https://www.yongdeanda.com/redirect',
      // The type of response requested - code, id_token, or both.
      responseType: appleAuthAndroid.ResponseType.ALL,
      // The amount of user information requested from Apple.
      scope: appleAuthAndroid.Scope.ALL,
      // Random nonce value that will be SHA256 hashed before sending to Apple.
      nonce: rawNonce,
      // Unique state value used to prevent CSRF attacks. A UUID will be generated if nothing is provided.
      state,
    });

    // Open the browser window for user sign in
    const response = await appleAuthAndroid.signIn();
    var formData = new FormData();
    formData.append("id_token",response.id_token);
    registerServerController.appleRefreash(formData,callBackRegister);
    // Send the authorization code to your backend for verification

  }

  const loginByKakao = () =>{
  KakaoLogins.login([KAKAO_AUTH_TYPES.Talk, KAKAO_AUTH_TYPES.Account])
    .then(tocken => {
      KakaoLogins.getProfile()
      .then(result => {
        registerUserAccount(1,"kakao_"+result.id, "k_"+result.email.split('@')[0])
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
      <ImageBackground  blurRadius={1} source={{uri:localStringData.imagePath + ( imagePath ?  imagePath.ban_image_mobile : "")}} style={styles.image} resizeMode={"cover"}>
        <ScrollView style={styles.container}>
          <CommonTitleBar leftOption={"back"} bottom={false}></CommonTitleBar>
          <View style={styles.itemContainer}>
            <View>
              <Image source={require("../../assets/img/login/LoginLogo.png")}></Image>
            </View>
            <View View style={styles.labelContainer}>
              <Text style={styles.title}>매일매일 신상 업로드 되는 용된다.</Text>
              <Text style={[styles.title,styles.fontPosition]}>소비자가 원했던 편리함을 한 곳에 담았습니다.</Text>
              <Text style={[styles.label,styles.font1]}>1. 회원가입시 <Text style={styles.point}>2,000원</Text> 적립금 지급</Text>
              <Text style={[styles.label,styles.font2]}>2. {appInfo._shipLimit}만원 이상 구매시 <Text style={styles.point}>무료배송</Text></Text>
              <Text style={[styles.label,styles.font3]}>3. 리뷰작성 시 적립금 <Text style={styles.point}>100%</Text> 지급</Text>
              <Text style={[styles.label,styles.font4]}>4. 출석체크 이벤트 참여 시 <Text style={styles.point}>다양한 보상</Text></Text>
            </View>
            <View style={styles.marginTop}/>
            <LoginTypeSelectButton title={"네이버로 시작하기"} fontColor={"white"} backgroundColor={"#1EC800"} clickEvent={loginByNaver}/>
            <LoginTypeSelectButton title={"카카오로 시작하기"} fontColor={"#391B1B"} backgroundColor={"#FFEB3B"} clickEvent={loginByKakao}/>
            <LoginTypeSelectButton title={"Apple로 로그인"} fontColor={"#FFFFFF"} backgroundColor={"#000000"} clickEvent={loginByApple}/>
            <View style={styles.marginBar}/>
            <LoginTypeSelectButton title={"용된다 로그인"} fontColor={"#FFFFFF"} backgroundColor={"#0D2141"} clickEvent={moveToLogin}/>
          </View>
        </ScrollView>
      </ImageBackground>
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

 
  fontPosition:{  bottom:  Platform.OS != "ios" ?"15rem":0,},
  font1:{  bottom:  Platform.OS != "ios" ?"10rem":0, },
  font2:{  bottom:  Platform.OS != "ios" ?"23rem":0,},
  font3:{  bottom:  Platform.OS != "ios" ?"36rem":0,},
  font4:{  bottom:  Platform.OS != "ios" ?"49rem":0, },
  
  marginBar:{
    width:"90%",
    borderBottomWidth:.5,
    borderColor:"#BBBEC2",
    marginTop:"20rem",
    marginBottom:"20rem",
  },
  marginTop:{
    marginTop:"20rem",
  }
  
});