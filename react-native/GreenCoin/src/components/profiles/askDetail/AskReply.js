import React,{useState}  from 'react';
import { Text,Image, View, Dimensions,ScrollView,StyleSheet,TouchableOpacity, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

export default function AskContent({boardReply}) {
  
    return (
      <View style={styles.container}>
          <View style={styles.itemContainer}>
              <View style={styles.titleContainer}>
              <Text style={styles.label}>[관리자 답글] 문의해주셔서 감사합니다 고객님.</Text>
              <Text style={styles.label}>{boardReply}</Text>
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
    padding:"20rem",
    borderTopWidth:1,
    borderColor:"#F4F6F9",
    paddingTop:"30rem",
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
    alignItems: "center",
    justifyContent: "center",
    marginBottom:"20rem",
    
  },
  label:{
    color:"black",
    fontFamily:"NotoSansKR-Medium",
  },
 

});
