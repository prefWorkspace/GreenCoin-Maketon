import * as React from 'react';
import { Text, View, Dimensions, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


function getDateType(date){
  function checkZero(checkString){
    return checkString.toString().length == 1 ?  "0" + checkString : checkString;
  }
  var temp = `${checkZero(date.getFullYear())}-${checkZero(date.getMonth() + 1)}-${checkZero(date.getDate())}`;
  return temp;
}


export default function CuponContent({item,active}) {

    return (
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.startDate}>{getDateType(new Date(item.cp_start.split('.')[0]))} / {getDateType(new Date(item.cp_expiration.split('.')[0]))} 까지</Text>
          <View style={styles.contentContainer}>
            <Text Text style={active ? styles.title : styles.titleNotActive}>{item.cp_name}</Text>
            <Text style={active ? styles.price : styles.priceNotActive}> {item.cp_discount  == 0 ? `${numberWithCommas(item.cp_discount_amount)}원` :`${item.cp_discount}%`}</Text>
            <View style={styles.endContainer}>
              <Text style={styles.ableUse}>{active == false ? "사용불가":""}</Text>
              <Text style={active ? styles.endDate : styles.endDateNotActive}></Text>
            </View>
          </View>
        </View>
      </View>
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
      padding:"20rem",
      height:"100%",
  },
  contentContainer:{
    height:"100%",
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
  },
  startDate:{
    fontSize:"11rem",
    color:'#ACACAC',
  },
  endContainer:{
    top:"1%",
    height:"100%",
    marginLeft:"auto",
  },
  title:{
    width:"200rem",
    fontSize:"14rem",   
    color:"black",
    fontFamily:"NotoSansKR-Medium",
  },
  titleNotActive:{
    width:"200rem",
    color:'#ACACAC',
    fontSize:"14rem",
  },
  price:{
    marginLeft:"30rem",
    fontSize:"13.873rem",
    color:"#26CBFF",
  },
  endDate:{
    fontSize:"13.873rem",
    fontFamily:"NotoSansKR-Medium",
    bottom:"6rem",
  },
  priceNotActive:{
    marginLeft:"30rem",
    fontSize:"13.873rem",
    color:'#ACACAC',
  },
  endDateNotActive:{
    color:'#ACACAC',
    fontSize:"13.873rem",   
    fontFamily:"NotoSansKR-Medium",
    bottom:"23rem",
  },
  ableUse:{
    fontSize:"11rem",
    color:'#ACACAC',
    fontFamily:"NotoSansKR-Regular",
    bottom:"29rem",
    marginLeft:"auto",
  }
});