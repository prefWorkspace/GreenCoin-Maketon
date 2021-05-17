import React from 'react';
import { Text, View, Dimensions,TouchableOpacity, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

export default function LoginTypeSelectButton({title,clickEvent,fontColor,backgroundColor}){

  return (
    <View style={styles.container}>
        <TouchableOpacity style={[styles.touchBox,{backgroundColor:backgroundColor}]} onPress={clickEvent}>
          <Text style={[styles.title,{color:fontColor}]}>{title}</Text>
        </TouchableOpacity>
    </View>
  )
};


const styles = EStyleSheet.create({
  container:{
    margin:"2rem",
    width:"100%",
    alignItems: "center", 
    justifyContent: "center",
  },
  touchBoxActive:{
    width:"350.618rem",
    height:"45rem",
    backgroundColor:"#0D2141",
    fontSize:"22.773rem",
    borderRadius:5,
    alignItems: "center", 
    justifyContent: "center",
    marginBottom:"5rem",
  },
  touchBox:{
    width:"350.618rem",
    height:"45rem",
    backgroundColor:"#EEF1F5",
    fontSize:"22.773rem",
    borderRadius:5,
    alignItems: "center", 
    justifyContent: "center",
    marginBottom:"5rem",
  },
  titleActive:{
    color:"white",
  },
  title:{
    color:"#D8D8D8",
    fontSize:"16rem",
    fontFamily:Platform.OS != "ios" ?"FontsFree-Net-SFProDisplay-Semibold" : "Poppins-SemiBold",
  },
});