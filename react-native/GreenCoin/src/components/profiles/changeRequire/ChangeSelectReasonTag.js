import React,{useState}  from 'react';
import { Text,Image, View, Dimensions,TextInput,StyleSheet,TouchableOpacity, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';


const Data = [
  "단순 변심",
  "파손 및 불량",
  "주문 실수",
  "오배송 및 지연",
]


export default function WriteReviewOrderReview({active,setActive}) {

    const BoxItem = (value,index) =>{
      const stylesLR = index % 2 == 0 ? styles.selectBoxLeft : styles.selectBoxRight;
      const stylesLRActive = index % 2 == 0? styles.selectBoxLeftActive : styles.selectBoxRightActive;
      return ( 
        <TouchableOpacity activeOpacity={1}  style={[styles.selectBox ,active == index ? stylesLRActive : stylesLR]} onPress={()=>{setActive(index)}}>
          <Text style={active == index ? styles.labelActive : styles.label}>{value}</Text>
        </TouchableOpacity>
      );
    }

    return (
      <View style={styles.container}>
          <View style={styles.tagContainer}>
            {
              Data.map((value,index)=>{
                return BoxItem(value,index);
              })
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
    paddingLeft :"20rem",
    paddingRight:"20rem",
    paddingTop:"10rem",
    marginTop:"10rem",
  },
  tagContainer:{   
    left:"4.5rem",
    justifyContent: "flex-start",
    flexWrap: 'wrap',
    flexDirection: 'row',
    backgroundColor:"white",
    alignItems: "center",
    justifyContent: "center",
    borderTopWidth:1,
    borderBottomWidth:1,
    borderColor:"#D2D5DA",
    paddingTop:"12rem",
    paddingBottom:"12rem",
  },
  selectBox:{
    width:"160rem",
    height:"40rem",
    borderWidth:1,
    borderColor:"#E1E6ED",
    padding:"10rem",
    fontSize:"12.882rem",
    alignItems: "center",
    justifyContent: "center",
  },
  selectBoxLeft:{
    marginRight:"auto",
    marginTop:"15rem",
  },
  selectBoxRight:{
    fontSize:"12.882rem",
    marginLeft:"auto",
  },
  selectBoxLeftActive:{
    marginRight:"auto",
    marginTop:"15rem",
    backgroundColor:"#0D2141",
  },
  selectBoxRightActive:{
    fontSize:"12.882rem",
    marginLeft:"auto",
    backgroundColor:"#0D2141",
  },
  label:{
    color:"black",
  },
  labelActive:{
    color:"white",
  }


});
