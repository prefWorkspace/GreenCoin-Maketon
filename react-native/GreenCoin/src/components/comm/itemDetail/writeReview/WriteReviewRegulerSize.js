import React,{useState}  from 'react';
import { Text,Image, View, Dimensions,TextInput,StyleSheet,TouchableOpacity, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';


const Data = [
  "XS",
  "S",
  "M",
  "L",
  "XL"
]




export default function WriteReviewSizeInfo({currentSize,setCurrentSize}) {
    const getTagBox = (value,index)=> {
      return (
        <TouchableOpacity 
          style={currentSize ==  index ? styles.sizeBoxActive : styles.sizeBox}
          onPress={()=>{setCurrentSize(index)}}
        >
          <Text  style={currentSize ==  index ? styles.labelActive : styles.label}>{value}</Text>
        </TouchableOpacity>
      );
    }
    

    return (
      <View style={styles.container}>
      <Text style={styles.title}>평소사이즈</Text>
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
    marginTop:"20rem",
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
    width:"40rem",
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
    width:"40rem",
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
