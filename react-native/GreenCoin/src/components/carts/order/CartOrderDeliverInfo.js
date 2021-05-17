import React from 'react';
import { Text, View, Dimensions,TextInput, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import CartOrderBox from './CartOrderBox';
import CartOrderSubTitleInfo from './CartOrderSubTitleInfo';
import CartOrderDeliverInputBox from './CartOrderDeliverInputBox';

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

export default function CartOrderDeliverInfo({receiverPhone,receiverName,setReceiverPhone,setReceiverName, userMemo,setUserMemo,address,setAddress,addressDetail,setAddressDetail}){

  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <View  style={styles.titleContainer}>
          <Text style={styles.title}>배송지</Text>
        </View>
        <CartOrderBox title={"받는분"} text={receiverName} textChange={setReceiverName}/>
        <CartOrderDeliverInputBox setAddress={setAddress} zipcode={address.addr_zipcode}/>
        <CartOrderBox title={"주소"}  text={address.addr_title} editable={false} />
        <CartOrderBox text={addressDetail} placeholder={"상세 주소"} editable={true} textChange={setAddressDetail}/>
        <CartOrderBox title={"휴대전화"} text={receiverPhone} textChange={setReceiverPhone}/>
        <CartOrderBox title={"요청사항"} text={userMemo} textChange={setUserMemo}/>
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
    paddingLeft:"4rem",
    marginRight:"auto",
  },
  title:{
    fontFamily:"NotoSansKR-Bold",
    color:"#000000",
    fontSize:"17rem",
  },
});