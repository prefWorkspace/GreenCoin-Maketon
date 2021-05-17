import * as React from 'react';
import { Text,Image, View, Dimensions,ScrollView,StyleSheet,TouchableOpacity, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
  
const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function DetailSubinfo({reserve,ship,productInfo}){

  return (
    <View style={styles.container}>
     <View style={styles.itemContainer}>
      <View style={styles.titleContainer}>
        <Text style={[styles.labelMargin,styles.title]}>배송비  </Text>
        <Text style={[styles.labelMargin,styles.title]}>적립금  </Text>
        {
          productInfo.prd_coupon_discount || productInfo.prd_coupon_discount_amount ?
          <Text style={[styles.labelMargin,styles.title]}>쿠폰    </Text>
          :
          null
        }
      </View>
      <View>
        <Text style={[styles.labelMargin,styles.price]}>{numberWithCommas(ship)}원</Text>
        <Text style={[styles.labelMargin,styles.point]}>{numberWithCommas(parseInt(Math.round((productInfo.prd_price  - ((productInfo.prd_price * productInfo.prd_sale_rate) / 100)) * (reserve ? reserve.b_earn_rate : 1) /100)))} Point<Text style={styles.price}> ({ reserve ? reserve.b_earn_rate : 0 }% 적립)</Text></Text>
        {
          productInfo.prd_coupon_discount || productInfo.prd_coupon_discount_amount ?
          <Text style={[styles.labelMargin,styles.price]}>{numberWithCommas(productInfo.prd_coupon_discount)}원</Text>
          :
          null
        }
      </View>
    </View>
  </View>
  )
};


const styles = EStyleSheet.create({
  container:{
    width:"100%",
    padding:"15rem",   
  },
  itemContainer:{
    paddingBottom:"24rem",
    width:"100%",
    flexDirection: 'row',
    borderRadius:5,
    borderColor:"#E1E6ED",
    borderBottomWidth:1,
  },
  title:{
    color:"black",
    fontSize:"13.873rem",
    marginRight:"30rem",
  },
  price:{
    color:"black",
    fontSize:"13.873rem",
    marginRight:"auto",
  },
  point:{
    color:"#26CBFF",
    fontSize:"13.873rem",
    marginRight:"auto",
  },
  labelMargin:{
    marginTop:"5rem",
  },

});