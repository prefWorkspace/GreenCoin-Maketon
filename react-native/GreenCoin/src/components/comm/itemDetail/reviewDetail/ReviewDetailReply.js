import React,{useState} from 'react';
import { Text,Image, View, Dimensions,ScrollView,StyleSheet,TouchableOpacity, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
  
const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

export default function DetailReply(){
  return (
    <View style={styles.container}>
      <Text style={styles.title}>용된다 관리자     2020.11.30</Text>
      <Text>답글 답글 답글</Text>
    
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
  title:{
    color:"black",
    fontSize:"13.873rem",
    marginLeft:"auto",
    marginBottom:"3rem",
  },
  textOption:{
    color:"grey",
  }
 
});