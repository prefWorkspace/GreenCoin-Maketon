import React ,{useState,useEffect} from 'react';
import { Text, View, Dimensions,TextInput, TouchableOpacity, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
  
import InputBox from '../../components/comm/InputBox';

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

export default function RegisterIdCheckBox({isClick,idState,setId,vaildate}){

  return (
    <View style={styles.container}>
        <InputBox isClick={isClick} placeholder={"아이디를 입력해주세요"} setText={setId}/>
        <View style={styles.stateContainer}>
          <Text style={idState == false ? styles.title: styles.titleActive}>{idState == null ? "" : idState ? "사용 가능한 아이디입니다" : "사용 불가능한 아이디입니다"}</Text>
          <TouchableOpacity style={styles.stateBox} onPress={vaildate}>
             <Text style={styles.label}>중복확인</Text>
          </TouchableOpacity>
        </View>
    </View>
  )
};


const styles = EStyleSheet.create({
  container:{
    width:"100%",
  },
  itemContainer:{
    width:"100%",
    alignItems: "center", 
    justifyContent: "center",
  },
  inputContainer:{
    width:"100%",
    height:"80rem",
    borderRadius:18,
    backgroundColor: "rgba(196, 196, 196, 0.1)",
    paddingTop:"30rem",
    paddingLeft:"23rem",
    backgroundColor:"white",
    fontSize:"24rem",
    fontFamily:"Montserrat-Medium",
    color:"black"
  },
  placeholder:{
    position: 'absolute',
    left:"20rem",
    top: "5rem",
    bottom:"20rem",
    fontSize: "13rem",
    color: '#BBBEC2',
    fontFamily:"NotoSansKR-Medium",
  },
  label:{
    color:"white",
    fontSize:"14rem",
  },
  stateContainer:{
    flexDirection: 'row',
    alignItems: "center", 
    paddingLeft:"10rem",
    marginTop:"13rem",
    marginBottom:"13rem",
  },
  stateBox:{
    width:"75rem",
    height:"35rem",
    backgroundColor:"#0D2141",
    alignItems: "center", 
    justifyContent: "center",
    borderRadius:5,
    marginLeft:"auto",
  },
  title:{
    color:"#FF0000",
    fontSize:"13rem",
  },
  titleActive:{
    color:"#26CBFF",
    fontSize:"13rem",
  },
});