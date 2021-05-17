import React, {useState,useEffect} from 'react';
import {Alert, Text, View,Dimensions,ScrollView, TouchableOpacity} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Modal from 'react-native-modal';

import DetailSetOption from './DetailSetOption';
import DeliverModalDecideButton from '../../profiles/deliverInfo/DeliverModalDecideButton';

import DetailSelectedItem from '../../comm/itemDetail/DetailSelectedItem';

import appStaticInfomation from '../../../db/appStaticInfomation';
import userInfoSingleton from '../../../db/userInfoSingleton';
import MarginBox from '../MarginBox';

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}



export default function ItemDetailOptionModal({ cartClick, shipping ,modal,purchaseClick , setModal, product,productInfo,optionList,totalPrice,setTotalPrice,selectList,setSelectList}) {



  const calculatePrice = (list) =>{
    var totalPrice = 0;
    var count = 0;
    
    for(var key in list){
    var price = 0;
    var optionList = list[key].options.optionList;
    count++;
    for(var calKey in optionList){
      for(var i =0;i<	optionList[calKey].length ;i++){
        price += optionList[calKey][i].opt_price;
      }
    }

    if(list[key].options.isSetOptional == true || list[key].options.isOptional == false){
      price += Math.round((list[key].prd_price) - ((list[key].prd_price) * (list[key].prd_sale_rate)) / 100);
    }
      
    price *= list[key].count;
    totalPrice += price;
    }
    
    if(count > 0 && appStaticInfomation.getInstance()._shipLimit > totalPrice)
      totalPrice += shipping;

    return totalPrice;
  }

  const clickChange = () =>{ 
    if(modal.event == "purchase"){
      if(purchaseClick() == true)
        setModal({type:false,event:"purchase"});
    }
    else{
      if(cartClick() == true)
        setModal({type:false,event:"cart"});
    }
 }

 const checkSetProductValidation = (opt) =>{
   
  let options = opt.options;
  
  for(let key  in selectList){
    if(JSON.stringify(selectList[key].options) == JSON.stringify(options)){
        Alert.alert(" ","이미 선택된 옵션입니다.");
        return;
    }
}


  var selectOption = JSON.parse(JSON.stringify(selectList));
  var date_id = new Date().getTime().toString();
  selectOption[date_id] = opt;
  setSelectList(selectOption);
}


const GetSelectList = () =>{ 
  var selectItemList = [];

  for(var key in selectList){
      var price = 0;
      var optionList = selectList[key].options.optionList;
      
      for(var calKey in optionList){
        for(var i =0;i<	optionList[calKey].length ;i++){
          price += optionList[calKey][i].opt_price;
        }
      }

    if(selectList[key].options.isSetOptional == true || selectList[key].options.isOptional == false){
      price += Math.round((selectList[key].prd_price) - ((selectList[key].prd_price) * (selectList[key].prd_sale_rate)) / 100);
    }
    price *= selectList[key].count;
    selectItemList.push(
      <DetailSelectedItem 
        title={selectList[key].prd_title}
        item={selectList[key].options}
        count={selectList[key].count}
        price={price}
        index={key}
        updateCount={updateCount}
        removeSelectItem={removeSelectItem}
    />
    )
  }
  return selectItemList;

}


  const removeSelectItem = (key) =>{
    delete selectList[key];
    setSelectList(JSON.parse(JSON.stringify(selectList)));
  };

  const updateCount = (key, count) =>{
    selectList[key].count = count;
    setSelectList(JSON.parse(JSON.stringify(selectList)));
    setTotalPrice(calculatePrice(selectList));
  }


    return (
      <Modal isVisible={modal.type} style={styles.modal} onBackdropPress={()=>{ setModal({type:false,event:"cart"})}}>
        <View style={styles.container}>
        <MarginBox height={40}></MarginBox>
          <ScrollView showsVerticalScrollIndicator={false} >
          <View style={styles.modalOption}>
              <DetailSetOption  
                  product={product}
                  productInfo={productInfo}
                  checkSetProductValidation={checkSetProductValidation} 
                  optionList={optionList} 
                  relative={true}
              />
            {
              selectList? <GetSelectList/> : null
            }
          </View>
          </ScrollView>
            <View style={[styles.resultContainer]}>
              <Text style={styles.result}>총 합계</Text>
              <Text style={styles.resultPrice}>{numberWithCommas(totalPrice)}원</Text>
            </View>
          <DeliverModalDecideButton clickChange={clickChange} setModalVisible={()=>{setModal({type:false,event:()=>{}})}}/>
        </View>
        <TouchableOpacity style={styles.topPoint} onPress={()=>{setModal({type:false,event:()=>{}})}}></TouchableOpacity>
      </Modal>
    );
  
}

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });


const styles = EStyleSheet.create({
  container: {
    width:"100%",
    height:"470rem",
    paddingBottom:"20rem",
    backgroundColor:"white",
    right:"19rem",
    position:"absolute",
    bottom:0,
    paddingLeft:"20rem",
    paddingRight:"20rem",
    borderRadius:10,
  },
  modalOption:{
  },
  modalContainer:{
  },
  modal:{
    width:"100%",
    top:"20rem",
  },
  itemContainer:{
    height:"106.480rem",
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
    marginTop:"10rem",
  },
  imageContainer:{
    width:"35%",
    height:"100%",
    alignItems: "center",
    justifyContent: "center",
  },
  labelContainer:{
    width:"65%",
    height:"100%",
    right:"10rem",
  },  
  image:{
    width :"95rem",
    height :"95rem",
    marginRight:"auto",
  },
  title:{
    fontSize:"16.846rem",
    fontFamily:"NotoSansKR-Medium",
  },
  option:{
    fontSize:"12.882rem",
    fontFamily:"Poppins-Regular",
    color:"#A3A7AB",
    bottom:"7rem",
    marginTop:"auto",
  },
  price:{
    fontSize:"15.855rem",
    bottom:"10rem",
    fontFamily:"Montserrat-Medium",
  },
  resultContainer:{
    flexDirection: 'row',
    marginTop:"10rem",
    paddingLeft:"30rem",
    paddingRight:"30rem",
    alignItems: "center",
    justifyContent: "center",
  },
  result:{
    color:"#A3A7AB"
  },
  resultPrice:{
    marginLeft:"auto",
    fontFamily:"NotoSansKR-Medium",
  },
  topPoint:{
    width:"80rem",
    height:"8rem",
    backgroundColor:"white",
    borderRadius:50,
    bottom:"480rem",
    left:"136rem",
    position:"absolute",
  }
});