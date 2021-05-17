import React,{useState} from 'react';
import { Text,Image, View, Dimensions,ScrollView,TouchableOpacity, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { useIsFocused ,useNavigation } from '@react-navigation/native';
import UTFSequence from 'react-native/Libraries/UTFSequence';

export default function AddressSaveList({item,clickToDetail}) {  
    return (
      <View style={styles.container}>
          <TouchableOpacity style={styles.touchableOpacity} 
              onPress={clickToDetail}
            >
            <View style={styles.infoColum}>
                <Text style={styles.title}>{item.jibunAddr}</Text>
                <View style={styles.labelContainer}>
                  <View style={styles.loadTag}>
                    <Text style={styles.loadText}>도로명</Text> 
                  </View>
                   <Text style={styles.subtitle}>{item.roadAddr}</Text>
                </View>
            </View>
          </TouchableOpacity>
      </View>
    );
  }
  

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });


const styles = EStyleSheet.create({
  container: {
    borderBottomWidth:1,
    borderBottomColor :"#efefef", 
    backgroundColor:"white",
    marginTop:"1rem",
    alignItems: "center",
    justifyContent: "center",
  },
  labelContainer:{
    flexDirection: 'row',
  },
  infoColum:{
    width:"86%",
    justifyContent: "flex-start",
    paddingLeft:"20rem",
  },
  title:{
    color:"black",
    fontSize:"13.873rem",
    fontFamily:"NotoSansKR-Regular",
    marginRight:"auto",
  },
  loadTag:{
    width:"40rem",
    height:"20rem",
    borderWidth: 1,
    borderColor:"#BBBEC2",
    borderRadius:4,
    marginRight:"6rem",
    alignItems: "center",
    justifyContent: "center",
  },
  loadText:{
    color:"#26CBFF",
    fontSize:"10.7rem",
    fontFamily:"NotoSansKR-Regular",
  },
  subtitle:{
    color:"grey",
    fontSize:"13.873rem",
    fontFamily:"NotoSansKR-Regular",
    bottom:"10rem",
    marginRight:"auto",
  },
  touchableOpacity:{
    width:"100%",
  },

});