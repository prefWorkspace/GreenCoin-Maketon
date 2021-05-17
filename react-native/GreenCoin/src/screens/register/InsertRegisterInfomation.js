import  React ,{useState ,useEffect,useRef}  from 'react';
import { Text,Animated, View, Dimensions,ScrollView,TouchableOpacity, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import CommonTitleBar from '../../components/comm/CommonTitleBar';
import InputBox from '../../components/comm/InputBox';
import ModalSelectPhoneCompany from '../../components/register/ModalSelectPhoneCompany';
import InputPersonDataBox from '../../components/register/InputPersonDataBox';
import InputPhoneNumber from '../../components/register/InputPhoneNumber';

import {navigationBackHandler,useNavigation} from '../../navigation/NavigationBackHandler';
import registerApi from '../../server/registerServerController';
import LoginBottomClickButton from '../../components/login/LoginBottomClickButton';

const Data = [
    {
      title : "휴대폰번호를 입력해주세요"
    },
    {
      title : "생년월일 - 뒷1자리입력을 해주세요"
    },
    {
      title : "이름을 입력해주세요"
    },
];



export default function InsertRegisterInfomation() {


  const [name,setName] = useState("");
  const [person,setPerson] = useState("");
  const [phone,setPhoneNumber] = useState("");
  const [checkIndex , setCheckIndex] = useState(0);
  const [title,setTitle] = useState("");
  const [isModalVisible,setModalVisible] = useState(false);
  var isClick = false;

  const ballAnimatedValue = useRef(new Animated.Value(0)).current;
  const focusAnimateValue = useRef(new Animated.Value(0)).current;

  const [index,setIndex] = useState(0);
  const [focus,setFocus] = useState(0);
  const [itemArray ,setItemArray] = useState([]);


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


  const navigation = useNavigation();
  navigationBackHandler();


  const openModal = ()=>{ 
    setIndex(2); 
    setModalVisible(true); 
  }
  const moveToNext = (data) =>{
    isClick = false;
    if(data == 0){
      Alert.alert(" ","이미 가입되어있는 회원입니다.");
      return;
    }

    navigation.navigate("selectPolicy",
    {
      inputInfo :{
      name:name,
      phoneCompany:" ",
      person:person, 
      phone:phone, 
      number:data
      } ,
    nextRoot:"insertIdentify"}); 

  }


  useEffect(() => {
    setTitle(Data[checkIndex].title); 
 }, [checkIndex]);


 const spendPhoneIdentify = () =>{
    isClick = true;
    registerApi.registerPhoneCheck(phone.toString(),moveToNext);
}

const vaildateClick = () =>{
  if(phone.length != 11){
    setIndex(0);
    setCheckIndex(0);
    Alert.alert(' ','핸드폰 번호를 입력해주세요');
    return false;
  }
  else if(person.length != 7){
    setIndex(1);
    setCheckIndex(1);
    Alert.alert(' ','생년월일 - 뒷1자리입력을 해주세요');
    return false;
  }
  else if(name.length <= 1){
    setIndex(2);
    setCheckIndex(2);
    Alert.alert(' ','이름을 입력해주세요');
    return false;
  }


  if(isClick)
    return;
  spendPhoneIdentify();
  return true;
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


  if(isClick)
    return;
  spendPhoneIdentify();
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
            {title}
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
        <LoginBottomClickButton title={"확인"} backgroundColor={"#0D2141"} fontColor={"#FFFFFF"} clickEvent={vaildateClick}/>
      </ScrollView>
    </TouchableOpacity>
    );
}

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });


const styles = EStyleSheet.create({
  container: {
    width :"100%",
    height:"120%",
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

//height:"-444rem",
//   height:"-350rem",
// height:"-260rem",
//height:"-170rem",