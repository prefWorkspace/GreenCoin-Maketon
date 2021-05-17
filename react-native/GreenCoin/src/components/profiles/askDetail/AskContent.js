import React,{useState}  from 'react';
import { Text,Image, View, Dimensions,ScrollView,StyleSheet,TouchableOpacity, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

export default function AskContent({content}) {

    return (
      <View style={styles.container}>
          <View style={styles.itemContainer}>
              <View style={styles.titleContainer}>
                <Text style={styles.label}>{content}</Text>
              </View>
              <View style={styles.labelContainer}>
                  {/* <Text style={[styles.label,{top : styles.top.top * 20}]}>주문번호:</Text>
                  <Text style={[styles.label,{top : styles.top.top * 10}]}>반품:</Text>
                  <Text style={[styles.label,{top : styles.top.top * 0}]}>반품 원하시는 상품명/사이즈:</Text>
                  <Text style={[styles.label,{top : styles.top.top * -10}]}>반품사유:</Text> */}
              </View>
          </View>
      </View>
    );
  }


const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });


const styles = EStyleSheet.create({
  container: {
    width:"100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop:"5rem",
    paddingTop:"3rem",
    paddingLeft:"20rem",
    paddingRight:"20rem",
  },
  itemContainer:{
    width:"100%",
    alignItems: "center",
    justifyContent: "center",
  },
  titleContainer:{
    width:"100%",
    alignItems: "center",
  },  
  title:{
    fontSize:"16rem",
    fontFamily:"NotoSansKR-Bold",
  },
  borderBox:{
    width:"90%",
    height:"40rem",
    borderRadius:5,
    backgroundColor:"#F4F6F9",
    alignItems: "center",
    justifyContent: "center",
  },
  labelContainer:{
    alignItems: "center",
    justifyContent: "center",
  },
  label:{
    color:"black",
    fontFamily:"NotoSansKR-Regular",
    textAlign:"center"
  },
  top:{
    top:"1rem",
  }
 

});
