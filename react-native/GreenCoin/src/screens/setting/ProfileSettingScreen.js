import React,{useState, useEffect} from 'react';
import { Text, Dimensions, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import CommonTitleBar from '../../components/comm/CommonTitleBar';
//import MyInfo from '../../components/profiles/profile/MyInfo';
//import AskTitleTab from '../../components/profiles/askResult/AskTitleTab';
//import AskItem from '../../components/profiles/askResult/AskItem';
import { ScrollView } from 'react-native-gesture-handler';
import IdInformation from '../../components/profiles/profileSetting/IdInformation';
import NameInfomation from '../../components/profiles/profileSetting/NameInfomation';
import PhoneInfomation from '../../components/profiles/profileSetting/PhoneInfomation';
import GenderInformation from '../../components/profiles/profileSetting/GenderInformation';
import RefundInformation from '../../components/profiles/profileSetting/RefundInformation';
import BirthdayInformation from '../../components/profiles/profileSetting/BirthdayInformation';
import BodyInformation from '../../components/profiles/profileSetting/BodyInformation';
import {navigationBackHandler,useNavigation} from '../../navigation/NavigationBackHandler';
import userInfoSingleton from '../../db/userInfoSingleton';
import loginRegisterController from '../../server/loginRegisterController';
import realController from '../../db/realm/realmController';  

export default function ProfileScreen() {
   const singleton = userInfoSingleton.getInstance();

   const [gender,setGender] = useState(singleton._gender == "false" ? 0 : 1);

   const [phone,setPhone] = useState(singleton._mem_phone ?  singleton._mem_phone : "");
   const [phoneButton,setPhoneButton] = useState(false);
   const [identify,setIdentify] = useState("");

   const [name,setName] = useState(singleton._name ? singleton._name : "");
   const [year,setYear] = useState(singleton._bday ? singleton._bday.slice(0,4) : "");
   const [month,setMonth] = useState(singleton._bday ? singleton._bday.slice(5,7): "");
   const [day,setDay] = useState(singleton._bday ? singleton._bday.slice(8,10): "");
   const [weight,setWeight] = useState(singleton._weight);
   const [height,setHeight] = useState(singleton._height);
   const navigation = useNavigation();
   
  navigationBackHandler();
   useEffect(() => {
     if(year.length > 4){
       setYear(new Date().getFullYear().toString());
     }
   }, [year]);

   useEffect(() => {
    if(month.length == 1){
      setMonth("0" + month);
    }
    if(day.length == 1){
      setDay("0" + day);
    }
  }, [month,day]);


  const moveNext = (userJsonFile)=>{
      if(userJsonFile=="" || !userJsonFile){
        return;
      }
      realController.checkAutoLogin(()=>{navigation.goBack()});
  }
  
  function checkZero(checkString){
    return checkString.toString().length == 1 ?  "0" + checkString : checkString;
  }

  const saveProfileSetting = () => {
    const fromData = new FormData();
    fromData.append("mem_id",singleton._userId);
    fromData.append("mem_username",singleton._userName);
    fromData.append("mem_name",name);
    fromData.append("mem_password",singleton._userPassword);
    fromData.append("mem_gender",gender == 0 ? false : true);
    fromData.append("mem_dob",year +"-" + checkZero(month) +"-" + checkZero(day));
    fromData.append("mem_additional1",height);
    fromData.append("mem_additional2",weight);


    if((year +"-" + checkZero(month) +"-" + checkZero(day)).length != 10){
      Alert.alert(" ","생년월일 - 뒷1자리입력을 해주세요");
      return;
    }
console.log(fromData)
    loginRegisterController.updateUserProfileSetting(fromData,moveNext);
    
  }
  

  const clickPhoneIdentify = () => {
    var formData = new FormData();
    formData.append("mem_id",singleton._userId);
    formData.append("re_phone",phone);
    loginRegisterController.getRegisterPhoneNumber(formData,function(res){
      if(res == -1){
        Alert.alert(" ","이미 존재하는 핸드폰 번호입니다.");
      }
      else{
        setPhoneButton(true);
        Alert.alert(" ","인증번호를 입력해주세요");
      }
    });
  }  

  const clickChangePhoneNumber = () => {
    var formData = new FormData();
    formData.append("mem_id",singleton._userId);
    formData.append("re_phone",phone);
    formData.append("code",identify);
    loginRegisterController.updatePhoneNumber(formData,function(res){
      if(res == 0){
        Alert.alert(" ","인증 번호를 확인해주세요");
      }
      else{
        setPhoneButton(false);
        setIdentify(false);
        realController.checkAutoLogin(()=>{navigation.goBack()});
        Alert.alert(" ","변경되었습니다.");
      }
    });
  }


    return (
      <ScrollView style={styles.container}>
        <CommonTitleBar title={"프로필편집"} leftOption={"back"} rightOption={"submitText"} rightClick={saveProfileSetting}/>
        <IdInformation id={userInfoSingleton.getInstance()._userName}/>
        <NameInfomation name={name} setName={setName}/>
        <PhoneInfomation 
          phone={phone} 
          setPhone={setPhone} 
          phoneButton={phoneButton} 
          identify={identify} 
          setIdentify={setIdentify} 
          clickPhoneIdentify={clickPhoneIdentify}
          clickChangePhoneNumber={clickChangePhoneNumber}
        />
        <GenderInformation gender={gender} setGender={setGender}/>
        <BirthdayInformation 
          year={year} month={month} day={day}
          setYear={setYear} setMonth={setMonth} setDay={setDay}
        />
        <RefundInformation/>
        <BodyInformation weight={weight} height={height} setWeight={setWeight} setHeight={setHeight}/>
      </ScrollView>
    );
  }
  


const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });


const styles = EStyleSheet.create({
  container: {
    backgroundColor:"white",
  },
  height:{
    height:"100rem",
  }
});