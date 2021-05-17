import React,{useState}  from 'react';
import { Text,Image, View, Dimensions,ScrollView,StyleSheet,TouchableOpacity, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import localStringData from '../../../../const/localStringData';


function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function WriteAskTitle({productInfo ,titleLeftClickOption}) {


   let product = productInfo[0] ? productInfo[0] : productInfo;

    return (
      <View style={styles.container}>
          <View style={styles.itemContainer}>
              <TouchableOpacity style={styles.imageContainer} onPress={titleLeftClickOption}>
                  <Image style={styles.image} source={{uri:localStringData.imagePath + (product.prd_img)}}></Image>
              </TouchableOpacity>
              <View style={styles.labelContainer}>
                  <Text style={styles.title}>{(product.prd_title)}</Text>
                  <Text style={styles.price}>{numberWithCommas(Math.round(product.prd_price - ((product.prd_price * product.prd_sale_rate)/100)))}원</Text>
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
    padding :"20rem",

  },
  itemContainer:{
    width:"100%",
    flexDirection: 'row',
    paddingBottom:"15rem",
    borderBottomWidth:1,
    borderColor:"#F4F6F9",
  },
  imageContainer:{
    height:"100%",
    marginRight:"20rem",
  },  
  image:{
    width :"90rem",
    height :"90rem",
    borderRadius:5,
  },
  labelContainer:{
    width:"53%",
    height:"100%",
    marginRight:"auto",
  },  
  title:{
    fontSize:"16.846rem",
  },
  option:{
    fontSize:"12.882rem",
  },
  price:{
    fontSize:"15.855rem",
    top:"10rem",
    color:"#878787",
  },
  


});
