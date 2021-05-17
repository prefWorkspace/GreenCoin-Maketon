import React from 'react';
import { Text, View, Dimensions, TouchableOpacity, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
  
const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

export default function DeliverModalDecideButton({setModalVisible , clickChange}){
  return (
    <View style={styles.container}>
        <View style={styles.optionContainer}>
          <TouchableOpacity style={styles.cancleBox} onPress={()=>{setModalVisible(false)}}>
            <Text style={styles.cancle}>취소</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionBox} onPress={clickChange}>
            <Text style={styles.label}>확인</Text>
          </TouchableOpacity>
        </View>
    </View>
  )
};


const styles = EStyleSheet.create({
  container:{
    width:"100%",
    alignItems: "center", 
    justifyContent: "center",
  },
  purchase:{
    color:"white",
  },
  optionContainer:{
    flexDirection: 'row',
    alignItems: "center", 
    justifyContent: "center",
  },
  cancleBox:{
    backgroundColor:"black",
    width:"160rem",
    height:"64rem",
    borderRadius:100,
    backgroundColor:"#EEF1F5",
    alignItems: "center", 
    justifyContent: "center",
    margin:"5rem",
  },
  cancle:{
    color:"#0D2141",
  },
  optionBox:{
    backgroundColor:"black",
    width:"160rem",
    height:"64rem",
    borderRadius:100,
    backgroundColor:"#0D2141",
    alignItems: "center", 
    justifyContent: "center",
    margin:"5rem",
  },
  label:{
    color:"white",
  }
});