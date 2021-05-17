import React,{useState} from 'react';
import { TouchableOpacity,Text,Image, View, Dimensions,ScrollView,StyleSheet, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import AddressModal from './AddressModal';

export default function AddressSetInfo({checkIsTextInputed}) {


    return (
      <View style={styles.container}>
          <TouchableOpacity style={styles.titleContainer} onPress={checkIsTextInputed}>
              <Text style={styles.title}>완료</Text>
          </TouchableOpacity>
      </View>
    );
  }


const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });


const styles = EStyleSheet.create({
  container: {
    width:"100%",
  },
  titleContainer:{
    width:"100%",
    height:"79.276rem",   
    alignItems: "center",
    justifyContent: "center",
    backgroundColor:"#0D2141",
    position: 'absolute',
    bottom :0
  },
  title:{
    color:"white",
  },
});