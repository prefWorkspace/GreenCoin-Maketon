import React,{useState}  from 'react';
import { Text,TextInput, View, Dimensions,Image,StyleSheet, Alert } from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';




export default function AddressInputDetail({setAddressDetail,inputBox}) {
    return (
      <View style={styles.container }>
          <TextInput 
            ref={inputBox}
            style={styles.textinput} 
            onChangeText={(text)=>{setAddressDetail(text)}} 
            placeholder={"상세주소 (아파트/동/호)"}  
            
          >
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
  },
  textinput:{
    width:"90%",
    height:"90%",
    fontSize :"15.855rem",
    top:"1rem",  
    color:"black",
    
    borderBottomWidth:1,
    borderBottomColor:"#BBBEC2",
  },
  
});