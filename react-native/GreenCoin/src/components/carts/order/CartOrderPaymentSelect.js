import React ,{useState}from 'react';
import { Text, View, Dimensions,Image, TouchableOpacity, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });


const Data = [
  {
    title:"용페이",
    label:"용페이",
    pg:"settle",
    payMethod:"card",
    src:require("../../../assets/img/payment/easyCard.png")
  },
  {
    title:"카드",
    label:"카드",
    pg:"settle",
    payMethod:"card",
    src:require("../../../assets/img/payment/card.png")
  },
  {
    title:"가상계좌입금",
    label:"가상계좌입금",
    pg:"settle",
    payMethod:"vbank",
    src:require("../../../assets/img/payment/Rectangle.png")
  },
  {
    title:"네이버페이",
    label:"네이버페이",
    pg:"naverpay",
    payMethod:"card",
    src:require("../../../assets/img/payment/naver.png")
  },
  {
    title:"카카오페이",
    label:"카카오페이",
    pg:"kakaopay",
    payMethod:"card",
    src:require("../../../assets/img/payment/kakao.png")
  },
  {
    title:"차이",
    label:"차이",
    pg:"chai",
    payMethod:"card",
    src:require("../../../assets/img/payment/chai.png")
  },
  {
    title:"페이코",
    label:"페이코",
    pg:"payco",
    payMethod:"card",
    src:require("../../../assets/img/payment/payco.png")
  },
  {
    title:"핸드폰소액결제",
    label:"핸드폰소액결제",
    pg:"settle",
    payMethod:"phone",
    src:require("../../../assets/img/payment/phone.png")
  },
  {
    title:"실시간계좌이체",
    label:"실시간계좌이체",
    pg:"settle",
    payMethod:"vbank",
    src:require("../../../assets/img/payment/account.png")
  },
]



export default function CartOrderPaymentSelect({setPayMethod,setPg,setPayLabel}){
  const [payIndex,setPayIndex] = useState(-1);

  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <View  style={styles.titleContainer}>
          <Text style={styles.title}>결제수단</Text>
        </View>
        <View style={styles.paymentContainer}>
        {
          Data.map((item,index)=>{

            return   (
              <TouchableOpacity 
                style={[styles.paymentItem,{borderWidth:1.5, borderColor : payIndex == index ? "#26CBFF":"#efefef"}]} 
                onPress={()=>{

                  if(item.pg == "naverpay"){
                    Alert.alert(' ','네이버 페이는 준비중에 있습니다.');
                    return;
                  }

                  setPayLabel(item.label);
                  setPayIndex(index); 
                  setPg(item.pg);
                  setPayMethod(item.payMethod);


                  }}>
                <View style={styles.imageContainer}>
                  {
                    item.title == "차이" ?
                    <Image style={styles.chaiImage} source={item.src} resizeMode="stretch"></Image>
                    :
                    <Image style={styles.image} source={item.src} resizeMode="stretch"></Image>
                  }
                </View>
                <Text style={styles.payment}>{item.title}</Text>
              </TouchableOpacity>
            )
          })

        }
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
  paymentContainer:{
    justifyContent: "flex-start",
    flexWrap: 'wrap',
    flexDirection: 'row',
    backgroundColor:"white",
    alignItems: "center",
    justifyContent: "center",
    paddingTop:"12rem",
    paddingBottom:"12rem",
  },
  paymentItem:{
    width:"33.33%",
    height:"100rem",
    borderWidth:1,
    borderColor:"#D2D5DA",
    alignItems: "center", 
    justifyContent: "center",
  },
  imageContainer:{
    width:"100%",
    height:"65%",
    alignItems: "center", 
    justifyContent: "center",
  },
  image:{
    top:"8rem",
  },
  chaiImage:{
    width:"67rem",
    height:"26rem",
    top:"8rem",
  },
  payment:{

    height:"35%",
  }
});