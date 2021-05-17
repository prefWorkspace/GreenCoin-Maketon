import React,{useState}  from 'react';
import { Text,Image, View, Dimensions,TextInput,StyleSheet,TouchableOpacity, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

export default function ChangeSelectTag({setContent}) {

    return (
      <View style={styles.container}>
          <View style={styles.itemContainer}>
             <Text style={styles.title}>상세 사유 입력</Text>
             <TextInput 
             placeholder={"상세 사유를 입력해주세요.\n*교환배송비안내 : n원을 상품과 함께 동봉해주세요."} 
             style={styles.inputTitle}
             multiline={true}
             onChangeText={text=>{setContent(text)}}/>
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
    paddingLeft :"20rem",
    paddingRight:"20rem",
    paddingTop:"10rem",
  },
  itemContainer:{
    width:"100%",
    paddingBottom:"15rem",
  },
  inputTitle:{
    width:"100%",
    height:"106rem",
    borderWidth:1,
    borderColor:"#E1E6ED",
    borderRadius:5,
    marginBottom:"5rem",
    padding:"10rem",
    fontSize:"12.882rem",
    textAlignVertical : "top",
  },
  title:{
    color:"black",
    fontFamily:"NotoSansKR-Bold",
  }


});
