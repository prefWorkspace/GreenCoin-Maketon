import React,{useState}  from 'react';
import { Text,Image, View, Dimensions,ScrollView,StyleSheet,TouchableOpacity, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';


import localStringData from '../../../const/localStringData';

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}




export default function RefundItemInfo({item,currentOption}) {

  if(!currentOption)
    return null;


    function getOptionTextList() {
      var textTagList = [];
      for(const key in currentOption.options){
        textTagList.push(
          <Text style={styles.option}>[옵션: {currentOption.options[key].color} / {currentOption.options[key].size}]</Text>
        )
      }
      return textTagList;
    }


    return (
      <View style={styles.container}>
          <View style={styles.itemContainer}>
              <View style={styles.imageContainer}>
                  <Image style={styles.image} source={{uri:localStringData.imagePath + currentOption.prd_img}} ></Image>
              </View>
              <View style={styles.labelContainer}>
                  <Text style={styles.title}>{item.mg_name}</Text>
                  {
                    getOptionTextList()
                  }
                  <Text style={styles.price}>{numberWithCommas(item.mog_total_price)}원/수량 {currentOption.count}개</Text>
                  <Text style={styles.deliver}>배송비 {numberWithCommas(item.txn_shipping)}원</Text>
              </View>
          </View>
          <View style={styles.bottomBorder}></View>
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
    paddingTop:"14rem",
  },
  itemContainer:{
    width:"90%",
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
    marginBottom:"20rem",
  },
  imageContainer:{
    width:"40%",
    alignItems: "center",
    justifyContent: "center",
  },
  labelContainer:{
    width:"60%",
    paddingLeft:"10rem",
    right:"10rem",
    marginBottom:"20rem",
  },  
  labelInner:{

  },
  image:{
    width :"120rem",
    height :"120rem",
    marginRight:"auto",
  },
  title:{
    fontSize:"16.846rem",
    fontFamily:"NotoSansKR-Medium",
    bottom:"10rem",
  },
  option:{
    fontSize:"12.882rem",
    fontFamily:"Poppins-Regular",
    bottom:"18rem",
  },
  price:{
    fontSize:"15.855rem",
    fontFamily:"Montserrat-Medium",
  },
  deliver:{
    color:"#BBBEC2",
    fontSize:"15.855rem",
    marginTop:"auto",
    fontFamily:"Montserrat-Medium",
  },
  bottomBorder:{
    width:"90%",
    borderBottomWidth:1,
    borderBottomColor :"#efefef",
    backgroundColor:"white",
  },
  state:{
    marginTop:"5rem",
    fontFamily:"NotoSansKR-Medium",
  },
  stateContainer:{
    width:"100%",
    paddingLeft:"20rem",
    paddingRight:"20rem",
    flexDirection: 'row',
  },
  left:{
    fontFamily:"NotoSansKR-Medium",
    color:"black",
    marginRight:"auto",
  },
  right:{
    fontFamily:"NotoSansKR-Medium",
    color:"#9FA6B2",
    marginLeft:"auto",
  },
  itemOptionContainer:{
    width:"100%",
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
    marginTop:"10rem",
    marginBottom:"10rem",
  },
  itemOption:{
    width:"30%",
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
  },
  selectBox:{
    height:"39.638rem",
    width:"108.914rem",
    borderWidth:1,
    borderRadius:30,
    textAlign: 'center',
    fontSize:"13rem",
    fontFamily:"NotoSansKR-Regular",
  },
  selectBoxPoint:{
    height:"39.638rem",
    width:"108.914rem",
    borderWidth:1,
    borderRadius:30,
    textAlign: 'center',
    backgroundColor:"#0D2141",
    color:"white",
    fontSize:"13rem",
    fontFamily:"NotoSansKR-Regular",
  }


});
