import React,{useState}  from 'react';
import { Text,Image, View, Dimensions,TextInput,StyleSheet,TouchableOpacity, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import loginRegisterController from '../../../../server/loginRegisterController';

export default function WriteReviewSizeInfo({updateUserWeightAndHeight,sizeResult,setWeight,setHeight}) {



    return (
      <View style={styles.container}>
          <View style={styles.itemContainer}>
             <Text style={styles.title}>키</Text>
             <TextInput placeholder={"180"} value={sizeResult.height} style={styles.inputTitle} onChangeText={text=>{setHeight(text)}}></TextInput>
          </View>
          <View style={styles.itemContainer}>
             <Text style={styles.title}>몸무게</Text>
             <TextInput placeholder={"80"} value={sizeResult.weight} style={styles.inputTitle} onChangeText={text=>{setWeight(text)}}></TextInput>
          </View>
          <View style={styles.editContainer}>
          <Text style={styles.title}> </Text>
            <TouchableOpacity style={styles.editBox} onPress={()=>{updateUserWeightAndHeight()}}>
              <Text style={styles.edit}>저장</Text>
            </TouchableOpacity>
          </View>
      </View>
    );
  }


const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });


const styles = EStyleSheet.create({
  container: {
    width:"100%",
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
  },
  itemContainer:{
    width:"35.5%",
    marginRight:"10rem",
  },
  inputTitle:{
    width:"100%",
    borderWidth:1,
    borderColor:"#E1E6ED",
    borderRadius:5,
    padding:"10rem",
    fontSize:"12.882rem",
  },
  editContainer:{
    alignItems: "center",
    justifyContent: "center",
  },
  editBox:{
    width:"75rem",
    height:"40rem",
    backgroundColor:"#0D2141",
    alignItems: "center",
    justifyContent: "center",
    borderRadius:50,
  },
  edit:{
    color:"white",
  },
  title:{
    color:"black",
    fontFamily:"NotoSansKR-Bold",
  }


});
