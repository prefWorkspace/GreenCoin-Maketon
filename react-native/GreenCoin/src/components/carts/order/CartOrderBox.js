import React from 'react';
import { Text, View, Dimensions,TextInput, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
  
const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

export default function CartOrderBox({title,placeholder,editable,text,textChange }){
  return (
    <View style={styles.container}>
        <View style={styles.itemContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.label}>{title}</Text>
          </View>
          <TextInput onChangeText={textChange} value={text} style={[styles.inputContainer ,{color : editable != false ? "black" : "#BBBEC2"}]} placeholder={placeholder} scrollEnabled={true}  editable={editable}/>
        </View>
    </View>
  )
};


const styles = EStyleSheet.create({
  container:{
    padding:"5rem",
    width:"100%",
    height:"60rem",
    alignItems: "center", 
    justifyContent: "center",
    backgroundColor:"white",
  },
  itemContainer:{
    height:"100%",
    width:"100%",
    flexDirection: 'row',
    alignItems: "center", 
  },
  titleContainer:{
    width:"20%",
  },
  inputContainer:{
    width:"74%",
    height:"48rem",
    alignItems: "center", 
    justifyContent: "center",
    borderColor:"#E1E6ED",
    borderWidth: 1,
    borderRadius:4,
    backgroundColor: "rgba(196, 196, 196, 0.1)",
    paddingLeft:"10rem",
    marginLeft:"20rem",
  },
  label:{
    marginRight:"auto",
    color:"#000000",
    fontSize:"13rem",
  }
});