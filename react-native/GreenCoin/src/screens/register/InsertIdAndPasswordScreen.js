import  React ,{useState ,useEffect ,useRef}  from 'react';
import { Text,TouchableOpacity, View, Dimensions,ScrollView,Animated, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import CommonTitleBar from '../../components/comm/CommonTitleBar';
import InputBox from '../../components/comm/InputBox';
import RegisterIdCheckBox from '../../components/register/RegisterIdCheckBox';
import RegisterPasswordBox from '../../components/register/RegisterPasswordBox';

import {navigationBackHandler,useNavigation} from '../../navigation/NavigationBackHandler';
import registerApi from '../../server/registerServerController';
import appStaticInfomation from '../../db/appStaticInfomation';


export default function InsertIdAndPasswordScreen({route}) {
  const [idState,setIdState] = useState(null);
  const [passwordIdentify,setPasswordIdentify] = useState(null);
  const [id,setId] = useState(false);
  const navigation = useNavigation();
  const param = route.params.inputInfo;


  const ballAnimatedValue = useRef(new Animated.Value(0)).current;
  const focusAnimateValue = useRef(new Animated.Value(0)).current;

  const [index,setIndex] = useState(0);
  const [focus,setFocus] = useState(1);
  let load = false;
  

  
  navigationBackHandler();


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
  const click_0 = () =>{ 
    setIndex(0);  
    setFocus(1);
  }
  const click_1 = () =>{ setIndex(1);  setFocus(1);}
  const click_2 = () =>{ setIndex(2);  setFocus(1);}

  const moveToNext = (data) =>{
    if(data != 0)
     navigation.navigate("createFinish",{id : id, password: passwordIdentify});

     load = false;
  }

  const vaildate = () =>{

    if(idState == null || idState == false || passwordIdentify == false || passwordIdentify == null)
      return;

      
    if(load)
      return;
    load = true;
    const formData = new FormData();
    formData.append('mem_id', 1);
    formData.append('mem_username', id);
    formData.append('mem_password', passwordIdentify);
    formData.append('mem_name', param.name);
    formData.append('mem_phone', param.phone);
    formData.append('mem_gender',  param.person.charAt(param.person.length - 1) % 2 == 0);
    formData.append('fcm',appStaticInfomation.getInstance()._token);

    var year = "20" + param.person.charAt(0).toString() + param.person.charAt(1).toString();
    if(parseInt(param.person.charAt(0).toString() + param.person.charAt(1).toString()) > 40)
      year = "19" + param.person.charAt(0).toString() + param.person.charAt(1).toString();
    var month = param.person.charAt(2).toString() + param.person.charAt(3).toString();
    var day = param.person.charAt(4).toString() + param.person.charAt(5).toString();
    
    formData.append('mem_dob',year + '-' + month +'-' + day);

    registerApi.insertRegisterUserInfomation(formData,moveToNext);

  }

  const callBack = (data) =>{
    if(data == true){
      setIndex(1);
    }
    setIdState(data);
  }

  const checkRegisterAbleId = () =>{
    registerApi.checkRegisterIdVailable(id,callBack);
  }

  const changeId = (text) =>{
    if(idState == null || idState != false)
      setIdState(null);
    setId(text);
  }

    return (
      <TouchableOpacity style={styles.container} onPress={clickOutSide} activeOpacity={1}>
        <ScrollView style={styles.scrollView}>
          <CommonTitleBar leftOption={"back"} bottom={false}></CommonTitleBar>
          <View style={styles.itemContainer}>         
            <Text style={styles.title}>
              로그인하세요.
            </Text>
            <RegisterIdCheckBox isClick={click_0} idState={idState} id={id} setId={changeId} vaildate={checkRegisterAbleId}/>
            <View style={{opacity:idState?1:0}}>
              <RegisterPasswordBox 
                isClick_1={click_1} 
                isClick_2={click_2} 
                passwordIdentify={passwordIdentify} 
                setPasswordIdentify={setPasswordIdentify} 
                vaildate={vaildate}/>  
            </View>
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
  itemContainer:{
    padding:"20rem",
    bottom:"45rem",
  },
  title:{
    fontFamily:"NotoSansKR-Medium",
    fontSize:"28rem",
  } ,
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
    height:"-455rem",
  },
  second:{
    height:"-305rem",
  },
  third:{
    height:"-215rem",
  },
  five:{
    height:"-440rem",
  }
  
});