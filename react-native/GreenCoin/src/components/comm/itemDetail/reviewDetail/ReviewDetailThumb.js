import React,{useState} from 'react';
import { Text,Image, View, Dimensions,ScrollView,StyleSheet,TouchableOpacity, Alert } from 'react-native';
import MarginBox from '../../MarginBox';

import EStyleSheet from 'react-native-extended-stylesheet';
  
const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

export default function DetailReviewTitle({helped,updateScore}){
  return (
    <View style={styles.container}>
      <MarginBox height={2} backgroundColor={"#F4F6F9"} marginBottom={10}></MarginBox>
      <TouchableOpacity style={styles.titleContainer} onPress={updateScore} activeOpacity={1}>
          <Text style={styles.title}>이 리뷰가 도움이 되었다면 눌러주세요.  </Text>
          <Image source={require("../../../../assets/img/review/thumb.png")}/>
          <Text style={styles.count}>{helped}</Text>
      </TouchableOpacity>
    </View>
  )
};


const styles = EStyleSheet.create({
  container:{
    width:"100%",
    paddingBottom:"10rem",
  },
  titleContainer:{
    flexDirection: 'row',
    alignItems: "center", 
    justifyContent: "center",
    top:"6rem",
  },
  title:{
    color:"black",
    fontSize:"13.873rem",
    marginLeft:"auto",
  },
  count:{
    color:"black",
    marginLeft:"5rem",
  }
});