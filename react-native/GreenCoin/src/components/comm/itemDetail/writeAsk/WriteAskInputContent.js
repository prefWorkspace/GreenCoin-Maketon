import React,{useState}  from 'react';
import { Text,Image, View, Dimensions,TextInput,StyleSheet,TouchableOpacity, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

export default function WriteAskInputContent({title , setTitle , content, setContent}) {

    return (
      <View style={styles.container}>
          <View style={styles.itemContainer}>
             <TextInput placeholder={"제목"} style={styles.inputTitle} value={title} onChangeText={text=>{setTitle(text)}}></TextInput>
             <TextInput placeholder={"10자 이상 적어주세요"} style={styles.inputContent} value={content} multiline={true} onChangeText={text=>{setContent(text)}}></TextInput>
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
    paddingRight :"20rem",
  },
  itemContainer:{
    width:"100%",
  },
  inputTitle:{
    width:"100%",
    borderWidth:1,
    borderColor:"#E1E6ED",
    borderRadius:5,
    marginBottom:"15rem",
    padding:"10rem",
  },
  inputContent:{
    width:"100%",
    height:"168rem",
    borderWidth:1,
    borderColor:"#E1E6ED",
    borderRadius:5,
    textAlignVertical : "top",
    padding:"10rem",
  },


});
