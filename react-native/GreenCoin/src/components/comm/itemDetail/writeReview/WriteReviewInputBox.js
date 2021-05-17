import React,{useState}  from 'react';
import { Text,Image, View, Dimensions,TextInput,StyleSheet,TouchableOpacity, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

export default function WriteReviewSizeInfo({title , text, placeholder, onChangeText}) {

    return (
      <View style={styles.container}>
          <View style={styles.itemContainer}>
             <Text style={styles.title}>{title}</Text>
             <TextInput placeholder={placeholder}  value={text} onChangeText={(text)=>{onChangeText(text)}} style={styles.inputTitle}></TextInput>
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
    marginBottom:"10rem",
    marginTop:"10rem",
  },
  itemContainer:{
    width:"100%",
  },
  inputTitle:{
    width:"100%",
    borderWidth:1,
    borderColor:"#E1E6ED",
    borderRadius:5,
    padding:"10rem",
    fontSize:"12.882rem",
  },
  title:{
    color:"black",
    fontFamily:"NotoSansKR-Bold",
  }


});
