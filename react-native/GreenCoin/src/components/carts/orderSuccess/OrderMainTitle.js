import React from 'react';
import { Text, View, Dimensions, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
  
const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

function numberWithCommas(x) { return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");}

function getDateType(date){

  date.setDate(date.getDate() + 1);

  function checkZero(checkString){
    return checkString.toString().length == 1 ?  "0" + checkString : checkString;
  }
  var temp = `${checkZero(date.getFullYear())}-${checkZero(date.getMonth() + 1)}-${checkZero(date.getDate())} ${checkZero(date.getHours())}:${checkZero(date.getMinutes())}`;
  return temp;
}


export default function OrderMainTitle({vBankInfo}){
  return (
    <View style={styles.container}>
        <View style={styles.itemContainer}>
          <Text style={styles.title}>결제가 완료되었습니다.</Text>
          {
            vBankInfo ?
              <View>
                <Text style={styles.vbankTitle}>은행 : [{vBankInfo.vbank_name} {vBankInfo.vbank_num}]</Text>
                <Text style={styles.vbankTitle}>입금자명 : [{vBankInfo.vbank_holder}]</Text>
                <Text style={styles.vbankTitle}>금액 : [{numberWithCommas(vBankInfo.amount)}원]</Text>
                <Text style={styles.vbankTitle}>입금기한 : {getDateType(new Date())}까지</Text>
                
              </View>
            :
            null
          }
          <Text style={styles.subtitle}>결제 내역은 마이용 > 주문조회에서 확인 하실 수 있습니다. </Text>
        </View>
    </View>
  )
};


const styles = EStyleSheet.create({
  container:{
  },
  itemContainer:{
    alignItems: "center", 
    justifyContent: "center",
  },
  titleContainer:{
  },
  title:{
    fontFamily:"NotoSansKR-Medium",
    fontSize:"28rem",
    color:"#0D2141",
  },
  vbankTitle:{
    fontFamily:"NotoSansKR-Medium",
    fontSize:"13rem",    
    color:"#0D2141",
    bottom:"20rem", 
    textAlign: 'center',
  },
  subtitle:{
    fontFamily:"NotoSansKR-Medium",
    fontSize:"13rem",
    color:"#BBBEC2",
    bottom:"20rem",
  },

});