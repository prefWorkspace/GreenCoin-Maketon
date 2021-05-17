import React from 'react';
import { Image, View, Dimensions,TouchableOpacity, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import localStringData from '../../const/localStringData';
const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

export default function GoodItemBox({value,clickEvent}){
  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.touchBox} onPress={()=>{clickEvent(value)}}>
          <Image style={styles.image} source={{uri:localStringData.imagePath + value.ru_image_mobile}} resizeMode={"stretch"}/>
        </TouchableOpacity>
    </View>
  )
};


const styles = EStyleSheet.create({
  container:{
    marginTop:"10rem",
    width:"100%",
    alignItems: "center", 
    justifyContent: "center",
  },
  touchBox:{
    width:"350.618rem",
    height:"236rem",
    backgroundColor:"#EEF1F5",
    fontSize:"22.773rem",
    alignItems: "center", 
    justifyContent: "center",
    marginBottom:"5rem",
  },
  image:{
    width:"100%",
    height:"100%",
  },
});