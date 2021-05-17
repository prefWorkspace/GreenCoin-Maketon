import  React ,{useState ,useRef,useEffect}  from 'react';
import { Text,Animated, View,Alert, TouchableOpacity,ScrollView ,Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import CommonTitleBar from '../../components/comm/CommonTitleBar';
import InputBox from '../../components/comm/InputBox';
import ModalSelectPhoneCompany from '../../components/register/ModalSelectPhoneCompany';
import InputPersonDataBox from '../../components/register/InputPersonDataBox';

import {navigationBackHandler,useNavigation} from '../../navigation/NavigationBackHandler';

import registerApi from '../../server/registerServerController';


export default function InsertPhoneIdentifyScreen({route}) {
  
  const navigation = useNavigation();
  
  const [identify,setIdentify] = useState("");

  const ballAnimatedValue = useRef(new Animated.Value(0)).current;
  const focusAnimateValue = useRef(new Animated.Value(0)).current;

  const [index,setIndex] = useState(0);
  const [focus,setFocus] = useState(1);


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
    inputRange: [0, 1,2,3],
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


  navigationBackHandler();

  const submitEvent = () =>{
      if(identify == route.params.inputInfo.number){
        moveToNext();
      }else{
        Alert.alert(" ","인증번호를 확인해주세요");
      }

  }

  const moveToNext = (userInfo) =>{  
    navigation.navigate(
      route.params.nextRoot,{
      inputInfo : route.params.inputInfo,
      userInfo : userInfo,
  }); 
 }


 const clickOutSide = ()=>{ setFocus(0);};  
 const click_0 = () =>{ setIndex(0);  setFocus(1);}
 
    return (
      <TouchableOpacity style={styles.container} onPress={clickOutSide} activeOpacity={1}>
      <ScrollView style={styles.scrollView}>
        <CommonTitleBar leftOption={"back"} bottom={false}></CommonTitleBar>
        <View style={styles.itemContainer}>         
          <Text style={styles.title}>
            인증번호를{"\n"}입력해주세요
          </Text>
          <InputBox inputType={"numberic"} isClick={click_0} placeholder={"인증번호"} setText={setIdentify} submitEvent={submitEvent}/>
        </View>
        <TouchableOpacity>
        <Animated.View style={[styles.aniView, animStyle]}>
          <View style={styles.pointTitle}/>
        </Animated.View>
        </TouchableOpacity>
      </ScrollView>
      </TouchableOpacity>
    );
}

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });


const styles = EStyleSheet.create({
  container: {
    width :"100%",
    height:"100%",
  },
  scrollView:{
    height:"100%",
  },
  itemContainer:{
    padding:"20rem",
    bottom:"45rem",
  },
  title:{
    fontFamily:"NotoSansKR-Medium",
    fontSize:"28rem",
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
  fisrt:{
    height:"-170rem",
  },
  second:{
    height:"-260rem",
  },
  third:{
    height:"-350rem",
  },
  five:{
    height:"-440rem",
  }
  
});