import React,{useState}  from 'react';
import { Text,Image, View, Dimensions,ScrollView,StyleSheet,TouchableOpacity, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';




function getDateType(date){
  function checkZero(checkString){
    return checkString.toString().length == 1 ?  "0" + checkString : checkString;
  }
  var temp = `${checkZero(date.getFullYear())}-${checkZero(date.getMonth() + 1)}-${checkZero(date.getDate())}`
         + ` ${checkZero(date.getHours())}:${checkZero(date.getMinutes())}:${checkZero(date.getSeconds())}`;
  return temp;
}


export default function AskTitleInfo({title,date,name,view}) {

    return (
      <View style={styles.container}>
          <View style={styles.itemContainer}>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>{title}</Text>
              </View>
              <View style={styles.labelContainer}>
                  <Text style={styles.label}>{name.slice(0,3) + "***" }</Text>
                  <View style={styles.point}/>
                  <Text style={styles.label}>{getDateType(new Date(date.split('.')[0]))}</Text>
                  <View style={styles.point}/>
                  <Text style={styles.label}>조회 {view}</Text>
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
    marginTop:"5rem",
  },
  itemContainer:{
    width:"100%",
    alignItems: "center",
    justifyContent: "center",
  },
  titleContainer:{
    width:"100%",
    alignItems: "center",
    justifyContent: "center",
  },  
  title:{
    fontSize:"16rem",
    fontFamily:"NotoSansKR-Bold",
  },
  borderBox:{
    width:"90%",
    height:"40rem",
    borderRadius:5,
    backgroundColor:"#F4F6F9",
    alignItems: "center",
    justifyContent: "center",
  },
  labelContainer:{
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
  },
  label:{
    color:"#878787",
    fontSize:"14rem",
    fontFamily:"Montserrat-Regular",
  },
  point:{
    width:1,
    height:"10rem",
    backgroundColor:"#F4F6F9",
    marginLeft:"10rem",
    marginRight:"10rem",
  }
 

});
