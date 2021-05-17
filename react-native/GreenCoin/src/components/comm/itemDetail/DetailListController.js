import * as React from 'react';
import { Text,Image, View, Dimensions,ScrollView,StyleSheet,TouchableOpacity, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
  
const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

export default function DetailListController({writeTitle,writeEvent,moreView , active}){
  return (
    <View style={styles.container}>
      {
        active ?
        <TouchableOpacity style={styles.moreViewContainer} onPress={moreView}>
          <Text style={styles.moreView}>더보기</Text>
        </TouchableOpacity>
        :
        null
      }
    
      {
        writeTitle ? 
        <TouchableOpacity style={styles.writeContainer} onPress={writeEvent}>
          <Text style={styles.write}>{writeTitle}</Text>
        </TouchableOpacity>
        :
        null
      }
      
      {
        /*
        <View style={styles.pageContainer}>
        <TouchableOpacity style={styles.pointBox}>
          <Image source={require("../../../assets/img/review-ask-comm/leftDoubblePoint.png")}></Image>
        </TouchableOpacity>
        <TouchableOpacity style={styles.pointBox}>
          <Image source={require("../../../assets/img/review-ask-comm/leftPoint.png")}></Image>
        </TouchableOpacity>
        <Text style={styles.pointLabel}>01</Text>
        <TouchableOpacity style={styles.pointBoxRight}>
          <Image source={require("../../../assets/img/review-ask-comm/leftPoint.png")}></Image>
        </TouchableOpacity>
        <TouchableOpacity style={styles.pointBoxRight}>
          <Image source={require("../../../assets/img/review-ask-comm/leftDoubblePoint.png")}></Image>
        </TouchableOpacity>
      </View>
        */
      }
    </View>
  )
};


const styles = EStyleSheet.create({
  container:{
    width:"100%",
    paddingBottom:"10rem",
    borderBottomWidth :1,
    borderBottomColor:"#efefef",
    alignItems: "center",
    justifyContent :"center",
  },  
  moreViewContainer:{
    width:"345rem",
    height:"60rem",
    backgroundColor:"#EEF1F5",
    alignItems: "center",
    justifyContent :"center",
    marginBottom:"10rem",
  },
  moreView:{
    color: "#0D2141",
  },
  writeContainer:{
    width:"345rem",
    height:"60rem",
    backgroundColor:"#0D2141",
    alignItems: "center",
    justifyContent :"center",
    marginBottom:"10rem",
  },
  write:{
    color:"white",
  },
  pageContainer:{
    width:"345rem",
    height:"60rem",
    flexDirection: 'row',
    alignItems: "center",
    justifyContent :"center",
  },
  pointBox:{
    width:"40rem",
    height:"100%",
    alignItems: "center",
    justifyContent :"center",
  },
  pointBoxRight:{
    width:"40rem",
    height:"100%",
    alignItems: "center",
    justifyContent :"center",
    transform: [{ rotate: '180deg'}],
    top:"0.8rem",
  },
  pointLabel:{
    color:"black",
    fontSize:"18rem",
  },

 
});