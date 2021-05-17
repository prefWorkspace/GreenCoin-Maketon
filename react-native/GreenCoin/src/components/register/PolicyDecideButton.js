import React from 'react';
import { Text, View, Dimensions,TouchableOpacity, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

export default function PolicyDecideButton({title,clickEvent,active}){

  return (
    <View style={styles.container}>
        <TouchableOpacity style={active ? styles.touchBoxActive : styles.touchBox} onPress={()=>{active ? clickEvent() : null}}>
          <Text style={active ? styles.titleActive : styles.title}>{title}</Text>
        </TouchableOpacity>
    </View>
  )
};


const styles = EStyleSheet.create({
  container:{
    width:"100%",
  },
  touchBoxActive:{
    width:"350.618rem",
    height:"54rem",
    backgroundColor:"#0D2141",
    fontSize:"22.773rem",
    borderRadius:50,
    alignItems: "center", 
    justifyContent: "center",
    marginBottom:"5rem",
  },
  touchBox:{
    width:"350.618rem",
    height:"54rem",
    backgroundColor:"#EEF1F5",
    fontSize:"22.773rem",
    borderRadius:50,
    alignItems: "center", 
    justifyContent: "center",
    marginBottom:"5rem",
  },
  titleActive:{
    color:"white",
  },
  title:{
    color:"#D8D8D8",
  },
});