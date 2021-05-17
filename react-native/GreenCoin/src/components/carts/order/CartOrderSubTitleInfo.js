import React from 'react';
import { Text, View, Dimensions,TextInput, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
  
const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

export default function CartOrderSubTitleInfo({title,placeholder}){
  return (
    <View style={styles.container}>
        <View style={styles.itemContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{title}</Text>
          </View>
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
    padding:"10rem",
    width:"100%",
    flexDirection: 'row',
    alignItems: "center", 
  },
  titleContainer:{
    width:"20%",
  },
  inputContainer:{
    width:"74%",
    height:"50rem",
    alignItems: "center", 
    justifyContent: "center",
    borderColor:"#E1E6ED",
    borderWidth: 1,
    borderRadius:4,
    backgroundColor: "rgba(196, 196, 196, 0.1)",
    paddingLeft:"10rem",
    marginLeft:"20rem",
  },
  title:{
    marginRight:"auto",
    color:"#000000",
    fontSize:"17rem",
    fontFamily:"NotoSansKR-Bold",
  }
});