import * as React from 'react';
import { Text,Image, View, Dimensions,ScrollView,StyleSheet,TouchableOpacity, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
  
const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

export default function DetailOption(){
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Image style={styles.image} source={require("../../../../assets/img/sample/imageDetail.png")}></Image>
        <Image style={styles.image} source={require("../../../../assets/img/sample/imageDetail.png")}></Image>
        <Image style={styles.image} source={require("../../../../assets/img/sample/imageDetail.png")}></Image>
      </View>
    </View>
  )
};


const styles = EStyleSheet.create({
  container:{
    width:"100%",
    paddingBottom:"10rem",
  },
  titleContainer:{
    width:"100%",
    flexDirection: 'row',
  },
  image:{
    width:"103rem",
    height:"103rem",
    marginRight:"7rem",
  }

 
});