import React,{useState}  from 'react';
import { Text,Image, View, Dimensions,TextInput,StyleSheet,TouchableOpacity, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

export default function WriteAskTitle({setPassword}) {
    return (
      <View style={styles.container}>
          <View style={styles.itemContainer}>
             <TextInput placeholder={"비밀번호 입력"} style={styles.inputTitle} onChangeText={text=>{setPassword(text)}}></TextInput>
             <Text style={styles.label}>자동잠금 기능</Text>
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
    padding :"20rem",
  },
  itemContainer:{
    width:"100%",
    paddingBottom:"15rem",
    borderBottomWidth:1,
    borderColor:"#F4F6F9",
  },
  inputTitle:{
    width:"100%",
    borderWidth:1,
    borderColor:"#E1E6ED",
    borderRadius:5,
    marginBottom:"15rem",
    padding:"10rem",
  },
  label:{
    marginLeft:"auto",
    color:"#FF0000",
  }


});
