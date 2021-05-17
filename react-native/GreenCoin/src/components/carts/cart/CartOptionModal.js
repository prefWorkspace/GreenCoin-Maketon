import React, {useState,useEffect} from 'react';
import {Image, Text, View,Dimensions,ScrollView , Linking,Alert} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Modal from 'react-native-modal';

import DetailSetOption from '../../comm/itemDetail/DetailSetOption';

import DeliverModalDecideButton from '../../profiles/deliverInfo/DeliverModalDecideButton';

import cartServerController from '../../../server/cartServerController';
import orderSeverController from '../../../server/orderSeverController';
import productServerController from '../../../server/productServerController';
import DetailSelectedItem from '../../comm/itemDetail/DetailSelectedItem';

import userInfoSingleton from '../../../db/userInfoSingleton';
import { useNavigation } from '@react-navigation/native';
import localStringData from '../../../const/localStringData';
import ModalContent from '../../comm/ModalContent';
import appStaticInfomation from '../../../db/appStaticInfomation';

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}



export default function CartOptionModal({ shipping, modalItem ,isModalVisible , setModalVisible, order}) {



  const [productInfo,setProductInfo] = useState(null);
  const [product,setProduct] = useState(null);
  const [optionList,setOptionList] = useState([]);
  const [selectList,setSelectList] = useState({});
  const [totalPrice,setTotalPrice] = useState(0);
  const [reqeust,setReqeust] = useState(false);

  
  
  const navigation = useNavigation();

  const callBack = ((jsonData) => {
    setProduct(jsonData.product);
    setOptionList(jsonData.opt);
    setProductInfo(jsonData.productInfo);
  });

  useEffect(() => {
    if(modalItem)
    productServerController.getProductDetailById(modalItem.prd_id,callBack,function(){
      Alert.alert(" ","삭제 혹은 숨김 처리된 상품입니다.")
      navigation.goBack();
    });
  }, [modalItem]);
  
  if(!modalItem || !product)
  return <View></View>


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
    
    shipping = shipping ? shipping : (modalItem.txn_shipping ? modalItem.txn_shipping : 0);
    if(count > 0)
      totalPrice += shipping;

    return totalPrice;
  }

  const clickChange = () =>{ 
      
    if(modalItem.mog_option){
      console.log("허허")
      if(calculatePrice(JSON.parse(modalItem.mog_option).data) != calculatePrice(selectList)){
        setReqeust(true);
        return;
      }
    }

    var count = 0;
    let essenceSelectArray = product.prd_additional5.split(',');
    for(let key in selectList){
      if(selectList[key].options.isOptional == false && essenceSelectArray.indexOf(String(selectList[key].prd_id)) != -1){
        count++;
      }
      else if(selectList[key].options.isOptional == false && selectList[key].prd_id == product.prd_id)
        count++;
    }
    
    if(count == 0){
      Alert.alert(" ","필수 상품을 선택해주세요");
      return;
    }
    
    var formData = new FormData();
	    
    var resultArray = [];
    for(var key in selectList){
      resultArray.push(selectList[key]);
   }

   let currentOption = {
    prd_id : product.prd_id, 
    prd_price : product.prd_price, 
    prd_sale_rate : product.prd_sale_rate, 
    prd_title : product.prd_title, 
    prd_img : product.prd_img, 
    count:1,
    data:resultArray};

    var formData = new FormData();
    formData.append("mem_id",userInfoSingleton.getInstance()._userId);
    formData.append("cart_id",modalItem.cart_id);
    formData.append("mog_idx",modalItem.mog_idx);
    formData.append("txn_id",modalItem.txn_id);
    formData.append("txn_update_require",20);
    formData.append("mog_order_status",20);
    formData.append("mog_option",JSON.stringify(currentOption));
    formData.append("cart_items" ,JSON.stringify(currentOption));
    
    modalItem.mog_option ? 
    orderSeverController.updateTransactionOptionBeforeOrder(formData,updateOrderCallBack)
    :
    cartServerController.updateCartItem(formData,updateCartCallBack);
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

const updateCartCallBack = (data) =>{
  if(data == 1){
    navigation.reset({index: 0, routes: [{ name: 'cart' }],});
  }
  else  
    Alert.alert(" ","다시 한번 시도해주세요");
}
const updateOrderCallBack = (data) =>{
  if(data == 1){
    navigation.reset({index: 0, routes: [{ name: 'profile' }],});
  }
  else  
    Alert.alert(" ","다시 한번 시도해주세요");
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
      <Modal isVisible={isModalVisible} style={styles.modal} onBackdropPress={()=>{ setModalVisible(false);}}>
          <View style={styles.container}>
          <View style={styles.itemContainer}>
              <View style={styles.imageContainer}>
                  <Image style={styles.image} source={{uri:localStringData.imagePath + product.prd_img}}></Image> 
              </View>
              <View style={styles.labelContainer}>
                  <Text style={styles.title}>{product.prd_title}</Text>
                  <Text style={styles.price}>{numberWithCommas(product.prd_price - ((product.prd_price * product.prd_sale_rate) / 100))}원</Text>
                  <Text style={styles.option}>배송비 {appStaticInfomation.getInstance()._shipLimit <= totalPrice ? 0 : numberWithCommas(product.prd_shipping)}원</Text>
              </View>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{zIndex:3000}}>
            <DetailSetOption  
                product={product}
                productInfo={productInfo}
                checkSetProductValidation={checkSetProductValidation} 
                optionList={optionList} 
            />
            {
              selectList? <GetSelectList/> : null
            }
            <View style={[styles.resultContainer,{zIndex:0}]}>
              <Text style={styles.result}>총 합계</Text>
              <Text style={styles.resultPrice}>{numberWithCommas(totalPrice)}원</Text>
            </View>
          </View>
          <DeliverModalDecideButton clickChange={clickChange} setModalVisible={setModalVisible}/>
          </ScrollView>
          <ModalContent 
            modalType={"productKakao"} 
            bottomType={"select"} 
            isModalVisible={reqeust} 
            setIsModalVisible={setReqeust} 
            submitClick={()=>{  Linking.openURL('https://pf.kakao.com/_dexmSK');}}>
          </ModalContent>
      </View>
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
  modal:{
    width:"100%",
    top:"20rem",
  },
  itemContainer:{
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
    marginTop:"10rem",
  },
  imageContainer:{
    width:"35%",
    alignItems: "center",
    justifyContent: "center",
  },
  labelContainer:{
    width:"65%",
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
  price:{
    fontSize:"15.855rem",
    bottom:"10rem",
    fontFamily:"Montserrat-Medium",
  },
  option:{
    fontSize:"12.882rem",
    fontFamily:"Poppins-Regular",
    color:"#A3A7AB",
    marginTop:"auto",
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
  }
});