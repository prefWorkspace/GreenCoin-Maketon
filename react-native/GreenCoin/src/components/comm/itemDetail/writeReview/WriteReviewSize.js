import React,{useState}  from 'react';
import { Text,Image, View, Dimensions,TextInput,StyleSheet,TouchableOpacity, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';


const Data = [
  "많이 작아요",
  "조금 작아요",
  "잘 맞아요",
  "조금 커요",
  "많이 커요"
]





export default function WriteReviewSizeInfo({sizeInfo,setSizeInfo}) {
  const getTagBox = (value,index)=> {
    return (
      <TouchableOpacity 
        style={sizeInfo ==  index ? styles.sizeBoxActive : styles.sizeBox}
        onPress={()=>{setSizeInfo(index)}}
      >
        <Text  style={sizeInfo ==  index ? styles.labelActive : styles.label}>{value}</Text>
      </TouchableOpacity>
    );
  }
    
    return (
      <View style={styles.container}>
      
          <View style={styles.itemContainer}>
          {
              Data.map((value,index)=>{return getTagBox(value,index)})
          }
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
    marginBottom:"15rem",
  },
  itemContainer:{
    width:"100%",
    flexDirection: 'row',
    justifyContent: "flex-start",
    flexWrap: 'wrap',
  },
  inputTitle:{
    width:"100%",
    borderWidth:1,
    borderColor:"#E1E6ED",
    borderRadius:5,
    padding:"10rem",
    fontSize:"12.882rem",
  },
  title:{
    color:"black",
    fontFamily:"NotoSansKR-Bold",
    marginRight:"auto",
  },
  label:{
    color:"black",
    fontSize:"12.882rem",
  },
  labelActive:{
    color:"white",
    fontSize:"12.882rem",
  },
  sizeBoxActive:{
    height:"38rem",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor:"#0D2141",
    borderWidth:1,
    padding:"10rem",
    marginRight:"5rem",
    marginTop:"5rem",
  },
  sizeBox:{
    height:"38rem",
    alignItems: "center",
    justifyContent: "center",
    borderWidth:1,
    padding:"10rem",
    marginRight:"5rem",
    marginTop:"5rem",  
    borderColor:"#E1E6ED",
  },


});
