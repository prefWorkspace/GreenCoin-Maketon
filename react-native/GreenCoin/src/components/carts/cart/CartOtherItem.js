import React, { Component } from "react";
import { SafeAreaView,Dimensions,Image, Text, View, Alert } from "react-native";
import EStyleSheet from 'react-native-extended-stylesheet';


const Data = [
  {key:"a", src: require("../../../assets/img/sample/clothes.png") ,title:"빈티지후드 오버핏 자켓", orginalPrice:"60,000원", currentPrice:"54,000원",sale:"10%"},
  {key:"b", src: require("../../../assets/img/sample/instargram.png"),title:"빈티지후드 오버핏 자켓", orginalPrice:"60,000원", currentPrice:"",sale:""},
  {key:"c", src: require("../../../assets/img/sample/clothes.png"),title:"빈티지후드 오버핏 자켓", orginalPrice:"60,000원", currentPrice:"54,000원",sale:"10%"},
  {key:"d", src: require("../../../assets/img/sample/instargram.png"),title:"빈티지후드 오버핏 자켓", orginalPrice:"60,000원", currentPrice:"54,000원",sale:"10%"},
  {key:"e", src: require("../../../assets/img/sample/instargram.png"),title:"빈티지후드 오버핏 자켓", orginalPrice:"60,000원", currentPrice:"54,000원",sale:"10%"},
  {key:"ea", src: require("../../../assets/img/sample/clothes.png"),title:"빈티지후드 오버핏 자켓" , orginalPrice:"60,000원", currentPrice:"",sale:""},
  {key:"d", src: require("../../../assets/img/sample/clothes.png"),title:"빈티지후드 오버핏 자켓", orginalPrice:"60,000원", currentPrice:"",sale:""},
  {key:"es", src: require("../../../assets/img/sample/instargram.png"),title:"빈티지후드 오버핏 자켓", orginalPrice:"60,000원", currentPrice:"",sale:""},
  {key:"ee", src: require("../../../assets/img/sample/instargram.png"),title:"빈티지후드 오버핏 자켓", orginalPrice:"60,000원", currentPrice:"",sale:""},
]

const Item = ({item}) => {
  return (
  <View style={styles.gridViewContainer}>
      <View style={styles.imagebody}>
          <Image style={styles.topImage} source={item.src} />
          <Text style={styles.title}>{item.title}</Text>
          {
              <Text style={styles.orginalPrice}>{item.orginalPrice} <Text style={styles.sale}>{item.sale}</Text></Text>
          }
          <Text style={styles.currentPrice}>{item.currentPrice}</Text>
      </View>
  </View>)
};



export default function MainInstargram(){
  return (
        <View style={styles.container}>
          <View style={styles.flatContainer}>
          {
            Data.map((item)=>{
            return <Item item={item}></Item>
            })
         }
          </View>
        </View>
  );
}




const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });


const styles = EStyleSheet.create({
  container:{
    width: '100%',
    height : '400.822rem',
    marginTop:"30rem",
    marginBottom:"25rem",
  },
  InstarLabel:{
    fontFamily:"Montserrat-Bold",
    fontSize:"13.873rem",
    left:"15rem",
    marginBottom:"10rem"
  },
  flatContainer:{
    justifyContent: "flex-start",
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
    paddingTop:"5rem",
    zIndex:100,
  },
  imagebody:{
    width:"100%",
    padding:"5rem",
  },
  gridViewContainer: {
   width:"120rem",
 },
  topImage:{
    width:"106rem",
    height: "106rem",
  },
  title:{
    fontSize:"11rem",
  },
  orginalPrice:{
    color:"#878787",
    fontSize:"10rem",
  },
  currentPrice:{
    color:"#4C4C4C",
    fontSize:"10rem",
  },
  sale:{
    color:"#26CBFF",
    fontSize:"10rem",
  }
});