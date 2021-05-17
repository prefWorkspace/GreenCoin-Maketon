import React,{useState,useEffect} from 'react';
import { Text, View, Dimensions,TouchableOpacity , Alert } from 'react-native';
import CheckBox  from '@react-native-community/checkbox';

import EStyleSheet from 'react-native-extended-stylesheet';
import CartOrderBox from './CartOrderBox';
import CartOrderSubTitleInfo from './CartOrderSubTitleInfo';
import CartOrderDeliverInputBox from './CartOrderDeliverInputBox';

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

export default function CartOrderUserInfo({activeAlarm ,setActiveAlarm,userInfo,receiverPhone,receiverName ,setOrderPersonInfo , orderPersonInfo}){

  const [name ,setName] =useState("");
  const [email ,setEmail] =useState("");
  const [phone ,setPhone] =useState("");

  const updateSameInfo = () =>{
    setName(receiverName);
    setEmail(userInfo._email);
    setPhone(receiverPhone);
    setActiveAlarm(true);
  }

  useEffect(() => { updateInfo(); }, [name , email,phone,activeAlarm]);

  const updateInfo =() =>{ 
    setOrderPersonInfo({
      name : name,
      phone : phone,
      email : email,
      alarm : activeAlarm,
    });

 }

  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <View  style={styles.titleContainer}>
          <Text style={styles.title}>주문자</Text>
          <TouchableOpacity style={styles.subtitleContainer} onPress={updateSameInfo}>
            <Text style={styles.subtitle}>배송지와 동일</Text>
          </TouchableOpacity>
        </View>
        <CartOrderBox title={"이름"} text={name} textChange={setName}/>
        {/* <CartOrderBox title={"이메일"} text={email} textChange={setEmail}/> */}
        <CartOrderBox title={"휴대전화"} text={phone} textChange={setPhone}/>
        <View style={styles.checkBoxContainer}>
            <CheckBox boxType="square" tintColors={{true:"#0D2141" ,false:"#D2D5DA"}} value={activeAlarm}  onValueChange={(value)=>{setActiveAlarm(value); }}/>
            <Text> SMS 수신동의 (배송알림)</Text>
        </View>
        </View>
    </View>
  )
};


const styles = EStyleSheet.create({
  container:{
    padding:"15rem",
    alignItems: "center", 
    justifyContent: "center",
    backgroundColor:"white",
  },
  itemContainer:{
    width:"100%",
    paddingBottom:"20rem",
    borderBottomWidth:1,
    borderColor:"#D2D5DA",
  },
  titleContainer:{ 
    width:"100%",
    paddingLeft:"4rem",
    marginRight:"auto",
    flexDirection: 'row',
    alignItems: "center", 
    justifyContent: "center",
  },
  title:{
    fontFamily:"NotoSansKR-Bold",
    color:"#000000",
    fontSize:"17rem",
  },
  subtitleContainer:{
    marginLeft:"auto",
  },
  subtitle:{
    fontFamily:"NotoSansKR-Bold",
    color:"#26CBFF",
    fontSize:"13rem",
    textDecorationLine:"underline",
  },
  checkBoxContainer:{
    paddingTop:"10rem",
    flexDirection: 'row',
    alignItems: "center", 
    justifyContent: "center",
  }
});