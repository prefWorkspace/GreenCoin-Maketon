import React, {useState} from 'react';
import { Text, View, Dimensions,TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import localStringData from '../../../const/localStringData';

const compareWithArray = (valueArray, number) =>{
  for(var i =0;i<valueArray.length;i++){
    if(valueArray[i] == number)
        return true;
  }
  return false;
}


const getDeliverItemInfoByOrderState = (idx) =>{

  if(compareWithArray([12],idx)) 
      return "결제 실패"
  else if(compareWithArray([51,53,54,55],idx))
      return "반품중"
  else if(compareWithArray([58,59,60,61],idx))
      return "교환중"
  else if(compareWithArray([13,14,20],idx))
      return "상품준비중"
  
 
  switch(idx){
    case 0 : return "가상계좌입금"
    case -1 : return "결제 취소"
                                           
    case 5 : return  "옵션변경 요청" 

    case 11 : return "취소완료"

    case 30 : return "배송 준비"                     
    case 41 : return "배송중"

    case 42 : return  "배송완료"
    case 43 : return  "부분배송중"
                                                        
    case 50 : return  "반품요청" 
    case 52 : return  "반품 완료"

    case 57 : return  "교환요청"
    case 62 : return  "교환 완료"    

    case 70 : return  "취소 완료"         

    case 71 : return  "주문취소 요청"
    case 72 : return  "주문취소 요청"
    case 73 : return  "취소 거부"
}
}


export default function OrderProductItem({value}) {
   var mogOption = JSON.parse(value.mog_option);

   
   const getOptionText = () =>{
    var tagList = [];
    mogOption.data.map((value)=>{
      for(let key in value.options.optionList){
        let optionlist = value.options.optionList[key];
        let optionText = "";
        optionlist.map((opt,i)=>{
          optionText += " " + opt.opt_name + ( i + 1 == optionlist.length ?  " " :  " /");
        })
        tagList.push(<Text style={styles.size}>{optionText}</Text>);
      }
    });
    return tagList;
}


 //
    return (
      <View style={styles.container}>
        <View style={styles.itemContainer}>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={{uri : localStringData.imagePath + mogOption.prd_img}}></Image>
            </View>
            <View style={styles.labelContainer}>
                <View style={styles.labelInner}>
                  <Text style={styles.title}>{mogOption.prd_title}</Text>
                  {
                    getOptionText()
                  }
                  <View style={styles.bottomDetail}>
                  { 
                    compareWithArray([41,42,43],value.mog_order_status) && value.mog_delivery_name ? 
                    <Text style={styles.deliverInfo}>{value.mog_delivery_name}</Text> 
                    : 
                    null
                  }
                  {  
                    compareWithArray([41,42,43],value.mog_order_status) && value.mog_delivery_num ? 
                    <Text style={styles.deliverInfo}>{value.mog_order_status  ? "배송 : 기본배송" : ""}</Text>
                    : 
                    null
                  }
                  </View>
                  
                  </View>
            </View>
        </View>  
        <View style={styles.underContainer}>
          <Text style={styles.under}>{getDeliverItemInfoByOrderState(value.mog_order_status)}</Text>
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
    paddingTop:"14rem",
  },
  itemContainer:{
    width:"90%",
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
    marginBottom:"6rem",
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
    flex: 1,
    justifyContent: 'center',
  },
  image:{
    width :"120rem",
    height :"120rem",
    marginRight:"auto",
  },
  bottomDetail:{
    marginTop:"10rem",
  },
  size:{
    fontSize:"13rem",
    fontFamily:"Poppins-Regular",
  },
  title:{
    fontSize:"16.846rem",
    fontFamily:"NotoSansKR-Medium",
    marginBottom:"auto",
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
    top:"10rem",
    marginTop:"auto",
  },
 deliverInfo:{
    color:"black",
    fontSize:"12.882rem",
    fontFamily:"Montserrat-Medium",
  },
  underContainer:{
    width:"94%",
    height:"40rem",
    alignItems: "center",
    justifyContent: "center",
    borderTopWidth:1,
    borderBottomWidth:1,
    borderColor:"#D2D5DA",
  },
  under:{
    fontFamily:"NotoSansKR-Bold",
    fontSize:"13rem",
  }
 
});