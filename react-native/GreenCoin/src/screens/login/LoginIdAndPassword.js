import  React ,{useState,useEffect ,useRef}  from 'react';
import { Text,Image, View, Dimensions,ScrollView, TouchableOpacity ,Animated, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import CommonTitleBar from '../../components/comm/CommonTitleBar';
import InputBox from '../../components/comm/InputBox';
import LoginBottomClickButton from '../../components/login/LoginBottomClickButton';

import {navigationBackHandler,useNavigation} from '../../navigation/NavigationBackHandler';
import loginRegisterController from '../../server/loginRegisterController';
import realController from '../../db/realm/realmController';
import appStaticInfomation from '../../db/appStaticInfomation';


export default function LoginIdAndPassword({route}) {
  const [id,setId] = useState("");
  const [password,setPassword] = useState("");
  const [check,setCheck] = useState(true);
  const ballAnimatedValue = useRef(new Animated.Value(0)).current;
  const focusAnimateValue = useRef(new Animated.Value(0)).current;

  const [index,setIndex] = useState(0);
  const [focus,setFocus] = useState(1);

  const navigation = useNavigation();
  navigationBackHandler();

 
  
  const moveToNext = (userJsonFile)=>{
    if(userJsonFile==""){
      Alert.alert(" ","아이디 혹은 비밀번호를 확인해주세요.");
      return;
    }

    var state = {
      userId : userJsonFile.userInfo.mem_id,
      tok_name : userJsonFile.userInfo.tok_name,
      name : userJsonFile.userInfo.mem_name,
      userName : userJsonFile.userInfo.mem_username,
      gender : userJsonFile.userInfo.mem_gender,
      bday : userJsonFile.userInfo.mem_dob,
      autoLogin : check,
      isLogin : true,
      height :  userJsonFile.userInfo.mem_additional1,
      weight :  userJsonFile.userInfo.mem_additional2,
      phone : userJsonFile.userInfo.mem_phone,
      mem_method : userJsonFile.userInfo.mem_method,
      email : userJsonFile.userInfo.mem_email ?  userJsonFile.userInfo.mem_email : "" ,
      mem_refund_bank : userJsonFile.userInfo.mem_refund_bank,
      mem_refund_account : userJsonFile.userInfo.mem_refund_account,
      refund_name : userJsonFile.userInfo.mem_refund_name,
      mem_notification : userJsonFile.userInfo.mem_notification,
      mem_notification_event : userJsonFile.userInfo.mem_notification_event,
      tok_name :userJsonFile.tocken
    }

    realController.successUserLogin(state);

    navigation.reset({
      index: 0,
      routes: [{ name: 'tab' }],
    });

  }



  

  const doLogin = () =>{
    const formData = new FormData();
    formData.append('mem_username', id);
    formData.append('mem_password', password);
    formData.append('fcm',appStaticInfomation.getInstance()._token);

    loginRegisterController.loginByIdAndPassword(formData,moveToNext);
  }



  useEffect(() => {
    Animated.timing(ballAnimatedValue, {
      toValue: index,
      duration: 650,
      useNativeDriver: true,
    }).start();
  }, [index]);

  useEffect(() => {

    Animated.timing(focusAnimateValue, {
      toValue: focus,
      duration: 650,
      useNativeDriver: true,
    }).start();
  }, [focus]);

  const xVal = ballAnimatedValue.interpolate({
    inputRange: [0,1,2,3],
    outputRange: [
      styles.fisrt.height,
      styles.second.height,
      styles.third.height,
      styles.five.height
    ],
  });

  const xOpacity = focusAnimateValue.interpolate({
    inputRange: [0,1],
    outputRange: [
      0,
      1
    ],
  });

  const animStyle = {
    transform: [{ translateY: xVal }],
    opacity: xOpacity,
  };


    
  const clickOutSide = ()=>{ setFocus(0);};  
  const click_0 = () =>{ setIndex(0);  setFocus(1);}
  const click_1 = () =>{ setIndex(1);  setFocus(1);}


    return (
      <TouchableOpacity style={styles.container} onPress={clickOutSide} activeOpacity={1}>
      <ScrollView style={styles.scrollView}>
          <CommonTitleBar leftOption={"back"} bottom={false}></CommonTitleBar>
          <View style={styles.itemContainer}>         
          <Text style={styles.title}>
            로그인하세요.
          </Text>
          <InputBox isClick={click_0} placeholder={"아이디를 입력해주세요"} setText={setId} submitEvent={null}/>
          <InputBox isClick={click_1}  placeholder={"비밀번호를 입력해주세요"} setText={setPassword} submitEvent={null} secure={true}/>
          <View style={styles.buttonContainer}>
            <TouchableOpacity  onPress={()=>{navigation.navigate("loginSearchId")}}>
                <Text>아이디 찾기</Text>
            </TouchableOpacity>
            <View style={styles.border}/>
            <TouchableOpacity style={styles.passwordSearchContainer} onPress={()=>{navigation.navigate("loginSearchPassword")}}>
                <Text>비밀번호 찾기</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.autoLoginContainer} onPress={()=>{setCheck(!check)}} activeOpacity={1}>
              <View style={check ? styles.checkboxActive : styles.checkbox}>
                <Image source={require('../../assets/img/label_point/check.png')}></Image>
              </View>
              <Text>자동로그인</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity>
          <Animated.View style={[styles.aniView, animStyle]}>
            <View style={styles.pointTitle}/>
          </Animated.View>
          </TouchableOpacity>
      </ScrollView>  
      <LoginBottomClickButton title={"로그인"} backgroundColor={"#0D2141"} fontColor={"#FFFFFF"} clickEvent={doLogin}/>
      </TouchableOpacity>
    );
}

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });


const styles = EStyleSheet.create({
  container: {
    width :"100%",
    height:"80%",
  },
  itemContainer:{
    padding:"20rem",
    bottom:"45rem",
  },
  title:{
    fontFamily:"NotoSansKR-Medium",
    fontSize:"28rem",
  },
  buttonContainer:{
    width :"100%",
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
    marginTop:"10rem",
  },
  border:{
    borderWidth:0.55,
    height:"14rem",
    marginLeft:"6rem",
    marginRight:"6rem",
  },
  passwordSearchContainer:{
    marginRight:"auto",
  },
  autoLoginContainer:{
    flexDirection: 'row',
  },
  checkbox:{
    width:"20rem",
    height:"20rem",
    backgroundColor:"#E1E6ED",
    borderRadius:"10rem",
    alignItems: "center",
    justifyContent: "center",
    marginRight:"5rem",
  },
  checkboxActive:{
    width:"20rem",
    height:"20rem",
    backgroundColor:"#0D2141",
    borderRadius:"10rem",
    alignItems: "center",
    justifyContent: "center",
    marginRight:"5rem",
  },
  clickButton:{
    marginTop:"150rem",
  },
  aniView:{
    position:"absolute",
    width:"100%",
    padding:"20rem",
    top:0,
  },
  scrollView:{
    height:"100%",
  },
  pointTitle:{
    width:"100%",
    height:"80rem",
    borderRadius:18,
    borderColor:"black",
    borderWidth: 2,
  },
  fisrt:{
    height:"-290rem",
  },
  second:{
    height:"-200rem",
  },
  third:{
    height:"-215rem",
  },
  five:{
    height:"-440rem",
  }
});