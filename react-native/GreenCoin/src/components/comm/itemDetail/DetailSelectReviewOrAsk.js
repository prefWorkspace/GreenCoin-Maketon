import React,{useState} from 'react';
import { Text, View, Dimensions, TouchableOpacity } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
  
const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

export default function DetailDecideButton({boardCount,reviewCount,reviewActive ,askActive ,moveToAsk ,moveToReview ,setHeightInfo}){


  //parseInt(review.nativeEvent.layout.width)
  return (
    <View style={styles.container} 
      onLayout={(event) => {
        var {x, y, width, height} = event.nativeEvent.layout;
        if(setHeightInfo)
           setHeightInfo(e => { e.selectBar = height;   return e;});
      }}
      >
        <View style={styles.optionContainer}>
          <TouchableOpacity style={styles.optionBox} onPress={moveToReview} >
            <View >
              <Text style={[styles.label,(reviewActive ? styles.active : {color:"#D2D5DA"})]}>구매후기({reviewCount})</Text>
            </View>
            {
              
              reviewActive ?
              <View style={[styles.activeUnderLine]}/>
              :
              null
            }
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionBox} onPress={moveToAsk} >
            <View >
             <Text style={[styles.label,(askActive ? styles.active : {color:"#D2D5DA"})]}>문의내역({boardCount})</Text>
            </View>
            {
              askActive ?
              <View style={[styles.activeUnderLine]} />
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
    padding:"15rem",
    width:"100%",
    alignItems: "center", 
    justifyContent: "center",
    borderTopWidth:5,
    borderColor:"#F4F6F9",
    borderBottomWidth:2,
  },
  optionContainer:{
    flexDirection: 'row',
    alignItems: "center", 
    justifyContent: "center",
  },
  optionBox:{
    width:"170rem",
    height:"24rem",
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
    top:"21rem",
    height:"3rem",
    backgroundColor:"#0D2141",
  },
});