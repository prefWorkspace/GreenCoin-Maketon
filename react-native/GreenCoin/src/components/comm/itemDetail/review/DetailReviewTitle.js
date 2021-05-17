import React,{useState} from 'react';
import { Text,Image, View, Dimensions,ScrollView,StyleSheet,TouchableOpacity, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
  
const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

const getStarImageList = (count) =>{
  let imageList = [];
  for(var i =0;i < 5;i++){
    if(i < count )
      imageList.push( <Image style={styles.star} source={require("../../../../assets/img/review/star.png")} />);
    else
      imageList.push( <Image style={styles.star} source={require("../../../../assets/img/review/starEmpty.png")} />);
  }
  return imageList;
}


function getDateType(date){
  function checkZero(checkString){
    return checkString.toString().length == 1 ?  "0" + checkString : checkString;
  }
  var temp = `${checkZero(date.getFullYear())}-${checkZero(date.getMonth() + 1)}-${checkZero(date.getDate())}`
        //  + ` ${checkZero(date.getHours())}:${checkZero(date.getMinutes())}:${checkZero(date.getSeconds())}`;
  return temp;
}

export default function DetailReviewTitle({item}){

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
          {
            getStarImageList(item.rev_score)
          }
          <Text style={styles.like}> 좋아요</Text>
          <Text style={styles.title}>{item.mem_name != undefined ? item.mem_name.slice(0,3) + "***" : ""}   {getDateType(new Date(item.rev_date.split('.')[0]))}</Text>
      </View>
    </View>
  )
};


const styles = EStyleSheet.create({
  container:{
    width:"100%",
    paddingBottom:"10rem",
    borderBottomWidth :1,
    borderBottomColor:"#efefef",
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
    color:"black",
    fontSize:"13.873rem",
    marginLeft:"auto",
  },
  like:{
    color:"black",
    fontSize:"13.873rem",
  }
});