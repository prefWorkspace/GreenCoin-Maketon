import  React ,{useState ,useEffect,useRef}  from 'react';
import { Text,Alert,TouchableOpacity, View, Dimensions,ScrollView ,Animated} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import CommonTitleBar from '../../components/comm/CommonTitleBar';
import InputBox from '../../components/comm/InputBox';
import InputPersonDataBox from '../../components/register/InputPersonDataBox';
import InputPhoneNumber from '../../components/register/InputPhoneNumber';
import LoginBottomClickButton from '../../components/login/LoginBottomClickButton';
import loginRegisterController from '../../server/loginRegisterController';
import {navigationBackHandler,useNavigation,useIsFocused} from '../../navigation/NavigationBackHandler';


export default function InsertRegisterInfomation() {
  const [name,setName] = useState("");
  const [person,setPerson] = useState("");
  const [phone,setPhoneNumber] = useState("");
  const [checkIndex , setCheckIndex] = useState(0);
  const [isModalVisible,setModalVisible] = useState(false);

  var isClick =false;
  const navigation = useNavigation();
  navigationBackHandler();


  const ballAnimatedValue = useRef(new Animated.Value(0)).current;
  const focusAnimateValue = useRef(new Animated.Value(0)).current;

  const [index,setIndex] = useState(0);
  const [focus,setFocus] = useState(0);


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
    inputRange: [0, 1,2,4],
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



  const callBack = (data) =>{
    
    isClick = false;
    if(data && data.user != null){
      navigation.navigate("insertIdentify",{
        inputInfo :{
          mem_id:data.user.mem_id,
          mem_name:data.user.mem_username,
          name:name,
          phoneCompany:"",
          person:person, 
          phone:phone, 
          number:data.identify,
        },
        nextRoot:"loginSearchResult"});
    }
    else{
      Alert.alert(" ","없는 회원 정보입니다.")
    }
    
  }

  const spendPhoneIdentify = () =>{
    if(vaildate() == true){
      if(isClick)
        return;

      isClick = true;
      const formData = new FormData();
      formData.append('mem_phone', phone);
      loginRegisterController.checkProfileSearchAbleByPhoneNumber(formData,callBack);
    }
  }

  const vaildate = () =>{
    if(phone.length != 11){
      setIndex(0);
      setCheckIndex(0);
      return false;
    }
    else if(person.length != 7){
      setIndex(1);
      setCheckIndex(1);
      return false;
    }
    else if(name.length <= 1){
      setIndex(2);
      setCheckIndex(2);
      return false;
    }
    return true;
  }


  const clickOutSide = ()=>{ setFocus(0);};  
  const click_0 = () =>{ setIndex(0);  setFocus(1);}
  const click_1 = () =>{ setIndex(1);  setFocus(1);}
  const click_2 = () =>{ setIndex(2);  setFocus(1);}

  
    return (
      <TouchableOpacity style={styles.container} onPress={clickOutSide} activeOpacity={1}>
        <ScrollView style={styles.scrollView}>
          <CommonTitleBar leftOption={"back"} bottom={false}></CommonTitleBar>
          <View style={styles.itemContainer}>         
            <Text style={styles.title}>
              아이디찾기
            </Text>
            {
            checkIndex >= 2 ? 
            <InputBox  isClick={click_2} placeholder={"이름을 입력해주세요"} value={name} setText={setName} submitEvent={vaildate}/>
            : null
          }
          {
            checkIndex >= 1 ? 
            <InputPersonDataBox isClick={click_1} placeholder={"생년월일 - 뒷1자리입력을 해주세요"} setText={setPerson} submitEvent={vaildate}/>
            : null
          }
          {
            checkIndex >= 0 ? 
            <InputPhoneNumber isClick={click_0} placeholder={"휴대폰번호를 입력해주세요"} value={phone} setText={setPhoneNumber} submitEvent={vaildate}/>
            : null
          }
        </View>
           <TouchableOpacity>
            <Animated.View style={[styles.aniView, animStyle]}>
              <View style={styles.pointTitle}/>
            </Animated.View>
          </TouchableOpacity>
        </ScrollView>
        <LoginBottomClickButton title={"확인"} backgroundColor={"#0D2141"} fontColor={"#FFFFFF"} clickEvent={spendPhoneIdentify}/>
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
    paddingBottom:"100rem",
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