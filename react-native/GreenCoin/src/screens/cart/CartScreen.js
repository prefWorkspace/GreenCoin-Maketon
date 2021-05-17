import React,{useState,useEffect} from 'react';
import { Text,Image, View, Dimensions,ScrollView,StyleSheet, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import CommonTitleBar from '../../components/comm/CommonTitleBar';
import CartTitleList from '../../components/carts/cart/CartTitleList';
import CartActiveCartTag from '../../components/carts/cart/CartActiveCartTag';
import CartActiveOtherTag from '../../components/carts/cart/CartActiveOtherTag';
import CartPreviousProductsList from '../../components/carts/cart/CartPreviousProductsList';
import {navigationBackHandler, useFocusEffect, useIsFocused,useNavigation} from '../../navigation/NavigationBackHandler';
import cartServerController from '../../server/cartServerController';
import userInfoSingleton from '../../db/userInfoSingleton';
import OrderFindBar from '../../components/comm/OrderFindBar';



export default function CartScreen({route}) {
  const [activeIndex,setActiveIndex] = useState(0);
  const [cartlist ,setCartList]= useState([]);
  const navigation = useNavigation();

  const callBack = (data)=>{
    data.map((value)=>{
      value.cart_items = JSON.parse(value.cart_items);
    })
    setCartList(data);
  }

  useEffect(() => {}, [activeIndex])

  useEffect(()=>{
    if(userInfoSingleton.getInstance()._userId && userInfoSingleton.getInstance()._userId > 0)
      cartServerController.getCartItemList(userInfoSingleton.getInstance()._userId,callBack);
  },[])


  useFocusEffect(
    React.useCallback(() => {
    if(userInfoSingleton.getInstance()._userId && userInfoSingleton.getInstance()._userId > 0)
      cartServerController.getCartItemList(userInfoSingleton.getInstance()._userId,callBack);
    }, [])
  );


  
  if(useIsFocused()){
    if(route.params && route.params.type == 2){
      if(activeIndex != route.params.type){
        setActiveIndex(2);
        route.params.type = 3;
      }
    }
    else if((userInfoSingleton.getInstance()._isLogin != true  && activeIndex != 2 )){
      navigation.goBack();
      navigation.navigate("selectLoginOrRegister");
    }
  }
 
  const getTagListByActiveIndex = (activeIndex) => {
    switch(activeIndex){
      case 0 : return  <CartActiveCartTag  cartlist={cartlist}/>;
      case 1 : return  <CartActiveOtherTag activeIndex={activeIndex}/>;
      case 2 : return  <CartPreviousProductsList/>;
      default: return null;
    }
}

  const getTitle = () =>{
    switch(activeIndex){
      case 0 : return "장바구니";
      case 1 : return "찜한상품";
      case 2 : return "최근 본 상품";
      default : return "장바구니";
    }
  }
  
  navigationBackHandler();
    return (
      <View>
        <ScrollView style={styles.container}>
          <CommonTitleBar title={getTitle()} leftOption={"back"}/>
          <CartTitleList activeIndex={activeIndex} setActiveIndex={setActiveIndex}/>
          {
            getTagListByActiveIndex(activeIndex)
          }
        </ScrollView>
        <OrderFindBar></OrderFindBar>
      </View>
    );
  }



  
const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });


const styles = EStyleSheet.create({
  container:{
    height:"100%",
  },
  marginBox:{
    height :"59rem",
  },


});
