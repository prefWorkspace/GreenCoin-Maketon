import React, {useState} from 'react';
import { Text, View, Dimensions,TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import OrderProductItem from './OrderProductItem';

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function OrderProductList({detail,list}) {
  const [dropDown,setDropDown] = useState(true);
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.titleContainer} onPress={()=>{setDropDown(!dropDown)}}>
          <Text style={styles.title} >주문상품</Text>
          {
                  dropDown ?
                  <Image style={styles.image} source={require('../../../assets/img/label_point/dropUpPoint.png')}></Image>
                  :
                  <Image style={styles.image} source={require('../../../assets/img/label_point/dropDownPoint.png')}></Image>
          }
        </TouchableOpacity>
        {
          dropDown == true?
          <View style={styles.contentContainer}>
            {
              list.map((value)=>{
                return <OrderProductItem value={value}></OrderProductItem>
              })
            }
            <View style={styles.resultContainer}>
                <Text style={styles.result}>합계</Text>
                <View style={styles.borderLine}/>
                <Text style={styles.resultPrice}>{numberWithCommas(detail.txn_grand_total)}원</Text>
            </View>
            <View style={styles.priceInfoContainer}>
            <View style={styles.contentPoint}>
                <Text style={styles.subtitle}>상품금액</Text>
                <Text style={styles.pirce}>+ {numberWithCommas(detail.txn_sub_total)}원</Text>
            </View>
            <View style={styles.borderEffect}/>
            <View style={styles.content}>
                <Text style={styles.subtitle}>상품구매금액</Text>
                <Text style={styles.pirce}>+ {numberWithCommas(detail.txn_sub_total)}원</Text>
            </View>
            <View style={styles.content}>
                <Text style={styles.subtitle}>배송비</Text>
                <Text style={styles.pirce}>+ {numberWithCommas(detail.txn_shipping)}원</Text>
            </View>
            <View style={styles.content}>
                <Text style={styles.subtitle}>상품할인금액</Text>
                <Text style={styles.pirce}>- {numberWithCommas(-detail.txn_point_used + detail.txn_coupon_discount)}원</Text>
            </View>
            <View style={styles.content}>
                <Text style={styles.subtitle}>합계</Text>
                <Text style={styles.pirce}>+ {numberWithCommas(detail.txn_grand_total)}원</Text>
            </View>
            </View>
          </View>
          :
          null
        }
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
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
  },
  borderLine:{
    height:1,
    width:"60%",
    borderColor: '#E1E6ED',
    borderRadius: 1,
    borderWidth: 1,
    borderStyle: 'dashed',
    marginRight:"auto",
  },
  image:{
    marginLeft:"auto",
  },
  title:{
    fontSize:"14.8rem",
    color:"black",
    fontFamily:"NotoSansKR-Bold",
  },
  contentContainer:{
    width:"100%",
  },
  resultContainer:{
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
    paddingLeft:"29rem",
    paddingRight:"25rem",
    marginTop:"30rem",
    marginBottom:"30rem",
  },
  result:{
    fontFamily:"Poppins-SemiBold",
    marginRight:"auto",
  },
  resultPrice:{
    fontSize:"18rem",
    color: "#26cbff",
    marginLeft:"auto",
    fontFamily:"MontserratMedium"
  },
  priceInfoContainer:{
    backgroundColor:"#F4F6F9",
    paddingLeft:"20rem",
    paddingTop:"20rem",
    paddingBottom:"20rem",
    borderTopWidth:1,
    borderTopColor:"#E1E6ED",
  },
  borderEffect:{
    left:"10rem",
    width:"90%",
    borderBottomColor: '#E1E6ED',
    marginBottom:"15rem",
    borderBottomWidth: 1.2,
    paddingBottom:"15rem",
  },
  contentPoint:{
    width:"100%",
    paddingLeft:"10rem",
    paddingRight:"25rem",
    flexDirection: 'row',
    marginTop:"8rem",
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
    fontFamily:"Poppins-SemiBold",
  },
  pirce:{
    fontSize:"14.5rem",
    marginLeft:"auto",
    fontFamily:"MontserratMedium"
  },

 
});