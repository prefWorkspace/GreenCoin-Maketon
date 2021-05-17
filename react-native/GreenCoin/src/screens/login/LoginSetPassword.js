import  React ,{useState ,useEffect,useRef}  from 'react';
import { Text,TouchableOpacity, View, Dimensions,ScrollView ,Animated} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import CommonTitleBar from '../../components/comm/CommonTitleBar';
import RegisterPasswordBox from '../../components/register/RegisterPasswordBox';
import LoginBottomClickButton from '../../components/login/LoginBottomClickButton';

import {navigationBackHandler,useNavigation} from '../../navigation/NavigationBackHandler';
import loginRegisterController from '../../server/loginRegisterController';


export default function LoginSetPassword({route}) {
  const [passwordIdentify,setPasswordIdentify] = useState(null);
  const navigation = useNavigation();

  const ballAnimatedValue = useRef(new Animated.Value(0)).current;
  const focusAnimateValue = useRef(new Animated.Value(0)).current;

  const [index,setIndex] = useState(0);
  const [focus,setFocus] = useState(1);

  navigationBackHandler();

  const callBack = (data)=>{
    if(data == true)
      navigation.navigate("loginIdAndPassword",{mem_name : route.params.inputInfo.mem_name , password: passwordIdentify});
  }

  const vaildate = () =>{
    if(passwordIdentify != false && passwordIdentify != null && passwordIdentify.length > 4){
      const formData = new FormData();
      formData.append('mem_username',  route.params.inputInfo.mem_name);
      formData.append('mem_password', passwordIdentify);
      loginRegisterController.updateUserPassword(formData,callBack);
    }
  }


  useEffect(() => {
    Animated.timing(ballAnimatedValue, {
      toValue: index,
      duration: 1000,
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
              비밀번호를{"\n"}재설정해주세요
            </Text>
            <RegisterPasswordBox isClick_1={click_0} isClick_2={click_1} passwordIdentify={passwordIdentify} setPasswordIdentify={setPasswordIdentify} vaildate={vaildate}/>
          </View>
          <TouchableOpacity>
            <Animated.View style={[styles.aniView, animStyle]}>
              <View style={styles.pointTitle}/>
            </Animated.View>
          </TouchableOpacity>
        </ScrollView>
        <LoginBottomClickButton title={"확인"} backgroundColor={"#0D2141"} fontColor={"#FFFFFF"} clickEvent={vaildate}/>
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
  scrollView:{
    height:"100%",
  },
  aniView:{
    position:"absolute",
    width:"100%",
    padding:"20rem",
    top:0,
  },
  pointTitle:{
    width:"100%",
    height:"80rem",
    borderRadius:18,
    borderColor:"black",
    borderWidth: 2,
  },
  itemContainer:{
    padding:"20rem",
    bottom:"45rem",
  },
  title:{
    fontFamily:"NotoSansKR-Medium",
    fontSize:"28rem",
  },
  fisrt:{
    height:"-305rem",
  },
  second:{
    height:"-212rem",
  },
  third:{
    height:"-350rem",
  },
  five:{
    height:"-440rem",
  }
  
  
});