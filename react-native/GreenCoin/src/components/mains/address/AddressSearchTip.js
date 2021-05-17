import React,{useState} from 'react';
import { Text,Image, View, Dimensions,ScrollView,StyleSheet, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { TouchableOpacity } from 'react-native-gesture-handler';


const Tips = ({title,subtitle,example}) => {
  return (
    <View style={styles.infoColum}>
      <View style={styles.labelContainer}>
          <Text style={styles.subtitle}>* {title}</Text> 
         <Text style={styles.subtitlePoint}>{subtitle}</Text>
      </View>
      <Text style={styles.example}>{example}</Text>
    </View>
    );
};
  


export default function AddressSearchTip() {  
    
    return (
      <View style={styles.container}>
        <Text style={styles.title}>검색 Tip</Text>
        <Tips title={"도로명 + "} subtitle={"건물번호"} example={"   (예: 송파대로 570)"}></Tips>
        <Tips title={"동/읍/면/리 + "} subtitle={"번지"} example={"   (예: 신천동 7-30)"}></Tips>
        <Tips title={"건물명, 아파트명"} example={"   (예: 반포자이아파트)"}></Tips>
      </View>
    );
}



  

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });


const styles = EStyleSheet.create({
  container: {
    backgroundColor:"white",
    paddingLeft:"20rem",
  },
  labelContainer:{
    flexDirection: 'row',
    bottom:"5rem",
    height:"45rem",
  },
  infoColum:{
    width:"347.645rem",
    height:"45rem",
    justifyContent: "flex-start",
  },
  title:{
    color:"black",
    fontSize:"15.855rem",
    fontFamily:"NotoSansKR-Bold",
  },
  subtitle:{
    color:"black",
    fontSize:"15.855rem",
    fontFamily:"NotoSansKR-Reguler",
  },
  subtitlePoint:{
    color:"black",
    fontSize:"15.855rem",
    fontFamily:"NotoSansKR-Bold",
    bottom:"12rem",
  },
  example:{
    bottom:"28rem",
    fontFamily:"NotoSansKR-Reguler",
    color:"grey"
  }

});