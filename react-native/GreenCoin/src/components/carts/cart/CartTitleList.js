import React,{useState} from 'react';
import { Text, View, Dimensions,TouchableOpacity, Platform, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });




export default function CartTitleList({activeIndex,setActiveIndex}){


  

  return (
    <View style={styles.container}>
        <View style={styles.optionContainer}>
          <TouchableOpacity style={styles.optionBox} onPress={()=>{setActiveIndex(0);}} activeOpacity={1}>
            <View>
              <Text style={[styles.label,(activeIndex == 0 ? styles.active : {color:"#D2D5DA"})]}>장바구니</Text>
            </View>
            {
              
              activeIndex == 0 ?
              <TouchableOpacity style={[styles.activeUnderLine]}/>
              :
              null
            }
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionBox} onPress={()=>{setActiveIndex(1);}} activeOpacity={1}>
            <View>
             <Text style={[styles.label,( activeIndex == 1 ? styles.active : {color:"#D2D5DA"})]}>찜한상품</Text>
            </View>
            {
               activeIndex == 1  ?
              <TouchableOpacity style={[styles.activeUnderLine]}/>
              :
              null
            }
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionBox} onPress={()=>{setActiveIndex(2);}} activeOpacity={1}>
            <View>
             <Text style={[styles.label,( activeIndex == 2  ? styles.active : {color:"#D2D5DA"})]}>최근 본 상품</Text>
            </View>
            {
               activeIndex == 2  ?
              <TouchableOpacity style={[styles.actvieRecentLine]}/>
              :
              null
            }
          </TouchableOpacity>
        </View>
    </View>
  )
};


const styles = EStyleSheet.create({
  container:{
    width:"100%",
    alignItems: "center", 
    justifyContent: "center",
    borderColor:"#F4F6F9",
    borderBottomWidth:2,
  },
  optionContainer:{
    flexDirection: 'row',
    alignItems: "center", 
    justifyContent: "center",
  },
  optionBox:{
    width:"110rem",
    height: Platform.OS != "ios" ? "38rem" : "18rem",
    borderRadius:100,
    alignItems: "center", 
    justifyContent: "center",
    margin:"5rem",
  },
  label:{
    //color:"#D2D5DA",
  },
  active:{
    color:"#0D2141"
  },
  activeUnderLine:{
    top: Platform.OS != "ios" ?  "15rem" : "10rem",
    height:3,
    width:"58rem",
    backgroundColor:"#0D2141",
  },
  actvieRecentLine:{
    top: Platform.OS != "ios" ?  "15rem" : "10rem",
    height:3,
    width:"78rem",
    backgroundColor:"#0D2141",
  }
});