import React , {useState} from 'react';
import { Text, View, Dimensions,TouchableOpacity,Image,CheckBox ,TextInput} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import MarginBox from '../../comm/MarginBox';

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

export default function CartOrderExpectPointInfo({totalPrice}){

  if(!totalPrice)
  return null;

  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}> 
      <View  style={styles.titleContainer}>
        <Text style={styles.title}>예상 적립 포인트</Text>
      </View>
      <View style={styles.labelContainer}>
            <Text style={styles.labelPoint}>{numberWithCommas(parseInt(parseInt(Math.floor(totalPrice.replace(/,/gi,"") * 1) / 100)))} <Text style={styles.label}>적립 예정</Text></Text>
      </View>
      </View>
      <MarginBox height={5} backgroundColor={"#F4F6F9"}></MarginBox>
    </View>
  )
};


const styles = EStyleSheet.create({
  container:{
  },
  itemContainer:{
    padding:"15rem",
    alignItems: "center", 
    justifyContent: "center",
  },
  title:{
    fontFamily:"NotoSansKR-Bold",
    color:"#000000",
    fontSize:"17rem",
  },
  titleContainer:{
    marginRight:"auto",
  },
  labelContainer:{
    width:"100%",
  },
  label:{
    fontFamily:"NotoSansKR-Medium",
    color:"black",
    fontSize:"16rem",
  },
  labelPoint:{
    fontFamily:"NotoSansKR-Medium",
    color:"#26CBFF",
    fontSize:"16rem",
  }

});