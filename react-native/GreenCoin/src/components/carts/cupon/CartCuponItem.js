import * as React from 'react';
import { Text, View, Dimensions,TouchableOpacity, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

function numberWithCommas(x) {return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");}


function getDateType(date){
  function checkZero(checkString){
    return checkString.toString().length == 1 ?  "0" + checkString : checkString;
  }
  var temp = `${checkZero(date.getFullYear())}-${checkZero(date.getMonth() + 1)}-${checkZero(date.getDate())}`;
  return temp;
}

export default function CartCuponItem({item,clickSelectCoupon}) {
  

  const selectCouponEvent = () =>{ clickSelectCoupon(item); }

    return (
      <TouchableOpacity style={styles.container} onPress={selectCouponEvent} >
        <View style={styles.textContainer}>
          <Text style={styles.startDate}>{getDateType(new Date(item.cp_start.split('.')[0]))}</Text>
          <View style={styles.contentContainer}>
            <View style={styles.titleContainer}>
               <Text Text style={styles.title}>{item.cp_name}</Text>
            </View>
            <Text style={styles.price}>{item.cp_discount  == 0 ? ` ${numberWithCommas(item.cp_discount_amount)}원` :` ${item.cp_discount}%`}</Text>
            <Text style={styles.endDate}>{getDateType(new Date(item.cp_expiration.split('.')[0]))} 까지</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
  


const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });


const styles = EStyleSheet.create({
  container: {
    width:'100%',
    height:'106.032rem',
    justifyContent: "center",
    backgroundColor: "rgb(178, 227, 250)",
    borderBottomWidth:1,
    borderBottomColor :"#efefef",
    backgroundColor:"white",
  },
  textContainer:{
      padding:"20rem"
  },
  contentContainer:{
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
  },
  startDate:{
    fontSize:"10.9rem",
    color:'#ACACAC',
    bottom:"14rem"
  },
  titleContainer:{
    width:"165rem",
    paddingRight:"20rem",
  },
  title:{
    fontSize:"13.873rem",
  },
  price:{
    fontSize:"13.873rem",
    color:"#26CBFF",
  },
  endDate:{
    fontSize:"13.873rem",
    marginLeft:"auto",

  }
});