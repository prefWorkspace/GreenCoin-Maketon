import React,{useState} from 'react';
import { Text,Image, View, Dimensions,ScrollView,StyleSheet,TouchableOpacity, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
  
const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });


function getDateType(date){
  function checkZero(checkString){
    return checkString.toString().length == 1 ?  "0" + checkString : checkString;
  }
  var temp = `${checkZero(date.getFullYear())}-${checkZero(date.getMonth() + 1)}-${checkZero(date.getDate())}`
        //  + ` ${checkZero(date.getHours())}:${checkZero(date.getMinutes())}:${checkZero(date.getSeconds())}`;
  return temp;
}


export default function DetailReviewTitle({date}){
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
          <Text style={styles.title}>용된다 관리자  |  {getDateType(new Date(date))}</Text>
      </View>
    </View>
  )
};


const styles = EStyleSheet.create({
  container:{
    width:"100%",
    paddingBottom:"10rem",
    marginTop:"10rem",
    marginBottom:"10rem",
  },
  titleContainer:{
    flexDirection: 'row',
    alignItems: "center", 
    justifyContent: "center",
  },
  star:{
    color:"blue",
  },
  title:{
    color:"#878787",
    fontSize:"13.873rem",
    marginRight:"auto",
  },
  like:{
    color:"black",
    fontSize:"13.873rem",
  }
});