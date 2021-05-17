import React,{useState,useEffect} from 'react';
import { Text, View, Dimensions, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
  


import DetailImageTitle from './DetailImageTitle';
import DetailTitleInfo from './DetailTitleInfo';
import DetailSubInfo from './DetailSubInfo';
import DetailResultPrice from './DetailResultPrice';
import DetailDecideButton from './DetailDecideButton';
import DetailSelectedItem from './DetailSelectedItem';
import DetailSetOption from './DetailSetOption';
import likesServerController from '../../../server/likesServerController';
import userInfoSingleton from '../../../db/userInfoSingleton';
import appStaticInfomation from '../../../db/appStaticInfomation';
import { useNavigation,useRoute } from '@react-navigation/native';
import ModalContent from '../../comm/ModalContent';





export default function DetailSelectProcess({scroll,setScroll,setModal,reserve,ship,purchaseClick,selectList,setSelectList,optionList,productInfo,cartClick,product,totalPrice,setTotalPrice}){
 
  const [isModalVisible,setIsModalVisible] =useState(false);
  
  const navigation = useNavigation();
  const routeInfo = useRoute();

  useEffect(() => {
    setTotalPrice(calculatePrice());
  }, [selectList])   


  const checkSetProductValidation = (opt) =>{
    let options = opt.options;

    const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);
    for(let key  in selectList){
        if(equals(options.optId, selectList[key].options.optId)){
           			Alert.alert(" ","이미 선택된 옵션입니다.");
          			return;
        }
    }


    var selectOption = JSON.parse(JSON.stringify(selectList));
    var date_id = new Date().getTime().toString();
    selectOption[date_id] = opt;
    setSelectList(selectOption);
}


  const calculatePrice = () =>{
    var totalPrice = 0;
    var count = 0;
    
    for(var key in selectList){
    var price = 0;
    var optionList = selectList[key].options.optionList;
    count++;
    for(var calKey in optionList){
      for(var i =0;i<	optionList[calKey].length ;i++){
        price += optionList[calKey][i].opt_price;
      }
    }

    if(selectList[key].options.isSetOptional == true || selectList[key].options.isOptional == false){
      price += Math.round((selectList[key].prd_price) - ((selectList[key].prd_price) * (selectList[key].prd_sale_rate)) / 100);
    }
      
    price *= selectList[key].count;
    totalPrice += price;
    }
    if(count > 0 && appStaticInfomation.getInstance()._shipLimit > totalPrice)
      totalPrice += ship;



    return totalPrice;
  }

  const removeSelectItem = (key) =>{
    delete selectList[key];
    setSelectList(JSON.parse(JSON.stringify(selectList)));
  };

  const updateCount = (key, count) =>{
    selectList[key].count = count;
    setSelectList(JSON.parse(JSON.stringify(selectList)));
    setTotalPrice(calculatePrice());
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

      let title = selectList[key].prd_title;
      if(selectList[key].options.isSetOptional == true){
        title = product.prd_title;
      }

      price *= selectList[key].count;
      selectItemList.push(
        <DetailSelectedItem 
          title={title}
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

  const callBack = (data) =>{
    if(data == 1){
      navigation.reset({index: 0, routes: [{ name: 'cart' }],});
      setIsModalVisible(true);
    //  navigation.goBack();
    }
    else
     Alert.alert(" ","다시 시도해주세요");
  }

  const wishClick = () =>{
    if(userInfoSingleton.getInstance()._isLogin != true){
      navigation.navigate("selectLoginOrRegister",  {root:routeInfo.name });
      return;
    } 
    
    var formData = new FormData();
    formData.append("mem_id",userInfoSingleton.getInstance()._userId);
    formData.append("prd_id",product.prd_id);
    likesServerController.insertLikesTaginDetailPage(formData,callBack);
    
  };

  if(productInfo == null)
    return null;

  return (
    <View style={styles.container}>
          <DetailImageTitle productInfo={product} scroll={scroll} setScroll={setScroll}/>
          <DetailTitleInfo productInfo={product}/>
          <DetailSubInfo reserve={reserve} ship={ship} productInfo={product}/>
          <DetailSetOption  
              product={product}
              productInfo={productInfo}
              checkSetProductValidation={checkSetProductValidation} 
              optionList={optionList} 
          />
          {
            selectList? <GetSelectList/> : null
          }
          <DetailResultPrice totalPrice={totalPrice}/>
          <DetailDecideButton 
            setModal={setModal}
            purchaseClick={purchaseClick} 
            cartClick={cartClick} 
            wishClick={wishClick}/>
          <ModalContent  modalType={"Zim"} isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible}></ModalContent>
    </View>
  )
};


const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

const styles = EStyleSheet.create({
  container:{
    width:"100%",
  },
  optionContainer:{
    flexDirection: 'row',
    alignItems: "center", 
    justifyContent: "center",
  },
  optionBox:{
    width:"170rem",
    height:"24rem",
    borderRadius:100,
    alignItems: "center", 
    justifyContent: "center",
    margin:"5rem",
  },
  label:{
    //color:"#D2D5DA",
  },
  active:{
    color:"#0D2141"
  },
  activeUnderLine:{
    top:"21rem",
    height:"3rem",
    backgroundColor:"#0D2141",
  },
});