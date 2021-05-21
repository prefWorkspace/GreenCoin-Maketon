import React,{useState,useEffect} from 'react';
import { View, ScrollView, Dimensions, Alert, Text, CheckBox} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import MainTitle from '../../components/mains/main/MainTitle';
import CommonDetailTitle from '../../components/comm/CommonDetailTitle';
import InputBox from '../../components/comm/InputBox';
import ContentDecide from '../../components/comm/ContentDecide';
import ModalCalendar from '../../components/comm/ModalCalendar';
import BirthdayInformation from '../../components/profiles/myProfile/BirthdayInformation';

export default function MyProfileScreen({route}) {

  const [name,setName] = useState("");
  const [phone,setPhone] = useState("");
  const [email,setEmail] = useState("");
  const [year,setYear] = useState("");
  const [month,setMonth] = useState("");
  const [day,setDay] = useState("");
  const [bday,setBday] = useState("");
  const [show,setShow] = useState(false);
  const [phoneError,setPhoneError] = useState("");
  const [emailError,setEmailError] = useState("");
  
  const editProfile = () =>{
    setPhoneError("유효하지 않은 휴대폰 번호입니다.");
    setEmailError("유효하지 않은 이메일주소입니다.");
  }

  const clickDate = (date) =>{
    setBday(date);
  }

    return (
      <View  style={styles.container}>
        <MainTitle></MainTitle>
        <CommonDetailTitle title={"내 정보"}/>
        <ScrollView style={styles.scrollView}>
          <InputBox title={"이름"} placeholder={"이름"} text={name} setText={setName} submitEvent={()=>{}}/>
          <InputBox title={"핸드폰 번호"} placeholder={"핸드폰 번호"} text={phone} setText={setPhone}  error={phoneError} submitEvent={()=>{}}/>
          <InputBox title={"이메일"} placeholder={"이메일"} text={email} setText={setEmail}  error={emailError}  submitEvent={()=>{}}/>
          <BirthdayInformation year={year} month={month} day={day} setYear={setYear} setMonth={setMonth} setDay={setDay}/>
          <ContentDecide submitEvent={editProfile}/>
        </ScrollView>
        <ModalCalendar show={show} setShow={setShow} clickDate={clickDate}/>
      </View>
    );
  }


const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });


const styles = EStyleSheet.create({
  container: {
    backgroundColor:"white",
    height:"100%",
  },
  scrollView:{
    padding:"20rem",
  },
  contentContainer:{
    flexDirection:"row",
    alignItems: "center",
    justifyContent: "center",
  },
  left:{
    marginRight:"auto",
  },
  right:{
    marginLeft:"auto",
  },
  checkbox:{
    width:"25rem",
    height:"25rem",
    marginRight:"10rem",
  },
  currentTop:{
      display:"flex",
      flexDirection:"row",
      justifyContent:"space-between",
  },
  currentTitle:{
    fontSize :"15rem",
  },
  changeText:{
    fontSize :"13rem",
    color:"#D68C01",
    width:"111rem",
    height:"28rem",
    backgroundColor:"#FFF7E8",
    lineHeight:"28rem",
    borderWidth:"1rem",
    borderColor:"#CD8E31",
    borderRadius:"14rem",
    textAlign:"center",
  },
  crtCoin:{
    fontSize :"29rem",
    color:"#66D8B9",
  },
  tableTitle:{
    display: "flex",
    flexDirection:"row",
    marginVertical:"20rem",
    marginHorizontal:"20rem",
  },
  pigIcon:{
    width: "22rem",
    height: "22rem",
    marginRight:"10rem",
  },
});