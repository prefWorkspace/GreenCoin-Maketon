import React, {useState} from 'react';
import { Text, View, Dimensions,TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function RefundPrice({item}) {
  return (
      <View style={styles.container}>
          <View style={styles.priceInfoContainer}>
            <View style={styles.refundContainer}>
                <Text style={styles.refund}>환불수단</Text>
                <Text style={styles.way}>계좌환불</Text>
            </View>
            {/* <View style={styles.content}>
                <Text style={styles.subtitle}>기본배송</Text>
                <Text style={styles.pirce}>{numberWithCommas(item.mog_price)}원</Text>
            </View> */}
            <View style={styles.content}>
                <Text style={styles.subtitle}>상품구매금액</Text>
                <Text style={styles.pirce}>{numberWithCommas(item.mog_total_dis_price)}원</Text>
            </View>
            <View style={styles.content}>
                <Text style={styles.subtitle}>배송비</Text>
                <Text style={styles.pirce}>{numberWithCommas(item.txn_shipping)}원</Text>
            </View>
            <View style={styles.content}>
                <Text style={styles.subtitle}>상품할인금액</Text>
                <Text style={styles.pirce}>{numberWithCommas(item.mog_price)}원</Text>
            </View>
            <View style={styles.contentPoint}>
                <Text style={styles.subtitle}>합계</Text>
                <Text style={styles.pirce}>{numberWithCommas(item.mog_price)}원</Text>
            </View>
            <View style={styles.resultContainer}>
                <Text style={styles.result}>환불 금액</Text>
                <View style={styles.dash}/>
                <Text style={styles.resultPrice}>{numberWithCommas(item.mog_price)}원</Text>
            </View>
            </View>
      </View>
    );
  }
  


const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });


const styles = EStyleSheet.create({
  container: {
    width:"100%",
    alignItems: "center",
    justifyContent: "center",
  },
  titleContainer:{
    width:"90%",
    height:"35rem",
    marginTop:"20rem",
    borderBottomColor: '#E1E6ED',
    borderBottomWidth: 2,
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
  },
  image:{
    marginLeft:"auto",
  },
  title:{
    fontSize:"14.8rem",
    color:"black",
  },
  contentContainer:{
    width:"100%",
  },
  refundContainer:{
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
    paddingLeft:"10rem",
    paddingRight:"25rem",
    paddingTop:"20rem",
    paddingBottom:"10rem",
    borderBottomColor: '#E1E6ED',
    borderBottomWidth: 1.2,
  },
  refund:{
    fontFamily:"Poppins-Regular",
    marginRight:"auto",
  },
  way:{
    color: "#26cbff",
    marginLeft:"auto",
    fontFamily:"MontserratMedium"
  },
  resultContainer:{
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
    paddingLeft:"10rem",
    paddingRight:"25rem",
    paddingTop:"20rem",
    paddingBottom:"10rem",
  },
  result:{
    fontFamily:"Poppins-SemiBold",
    marginRight:"auto",
    fontSize:"16rem",
  },
  resultPrice:{
    color: "#FF0000",
    marginLeft:"auto",
    fontFamily:"Montserrat-Medium",
    fontSize:"17rem",
    bottom:"2rem"
  },
  priceInfoContainer:{
    backgroundColor:"#F4F6F9",
    paddingLeft:"20rem",
  },
  contentPoint:{
    width:"100%",
    paddingLeft:"10rem",
    paddingRight:"25rem",
    flexDirection: 'row',
    marginTop:"15rem",
    borderBottomColor: '#E1E6ED',
    borderBottomWidth: 1.2,
    paddingBottom:"10rem",
  },
  dash:{
    width:100,
    borderStyle: 'dashed',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E1E6ED',
  },
  content:{
    width:"100%",
    paddingLeft:"10rem",
    paddingRight:"25rem",
    flexDirection: 'row',
    marginTop:"6rem",
    paddingBottom:"2rem",
  },
  subtitle:{
    fontSize:"13.873rem",
    fontFamily:"Poppins-Regular"
  },
  pirce:{
    fontSize:"14.5rem",
    marginLeft:"auto",
    fontFamily:"MontserratMedium"
  },

 
});