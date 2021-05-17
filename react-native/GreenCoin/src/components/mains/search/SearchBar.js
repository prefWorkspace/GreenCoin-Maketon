import React,{useState}  from 'react';
import { Text,TextInput, View, Dimensions,Image,StyleSheet, Alert } from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';


export default function SearchBar({setBlur,setInput}) {
    return (
      <View style={styles.container }>
          <Image style={styles.image} source={require("../../../assets/img/icon/search.png")}></Image>
          <TextInput 
            style={styles.textinput} 
            autoFocus={true}
            onChangeText={(text)=>{setInput(text)}} 
            placeholder={"상품명,카테고리 및 검색하기"}  
            onBlur={()=>{setBlur(true)}}>
        </TextInput>
      </View>
    );
}


  
const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });


const styles = EStyleSheet.create({
  container: {
    flexDirection: 'row',
    width :"380rem",
    height:"54rem",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor :"white",
    shadowRadius: 3,
    elevation: 2,
  },
  image:{
    width:"14.864rem",
    height:"21.801rem",
    
  },
  textinput:{
    width:"80%",
    height:"80%",
    fontSize :"15.855rem",
    marginLeft:"10rem",
    top:"1rem",
    
    borderBottomWidth:1,
    borderBottomColor:"#BBBEC2",
  },
  
});