import React,{useState ,useEffect} from 'react';
import { Text,Image, View, Dimensions,ScrollView,StyleSheet, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import CartSelectOption from '../../../components/carts/cart/CartSelectOption';
import CartSetItem from '../../../components/carts/cart/CartSetItem';
import CartPriceInfo from '../../../components/carts/cart/CartPriceInfo';
import CartSelectCupon from '../../../components/carts/cart/CartSelectCupon';
import CartOrderBottom from '../../../components/carts/cart/CartOrderBottom';
import CartOptionModal from '../../../components/carts/cart/CartOptionModal';

import cartServerController from '../../../server/cartServerController';
import orderSeverController from '../../../server/orderSeverController';
import userInfoSingleton from '../../../db/userInfoSingleton';
import appStaticInfomation from '../../../db/appStaticInfomation';

import {  useNavigation ,useRoute} from '@react-navigation/native';

export default function CartActiveCartTag({cartlist}) {
    const [isModalVisible,setIsModalVisible] =useState(false);
    const [modalItem,setModalItem] =useState(null);
    const [activelist,setActivelist] = useState({});
    const [totalPrice,setTotalPrice] = useState(0);
    const [originalPrice,setOriginalPrice] = useState(0);
    const [itemList,setItemList] = useState(cartlist);
    const [load , setLoad] =useState(false);
    const [coupon,setCoupon] = useState(null);
    const [shipping,setShipping] = useState(0);
    const [isFreeShip,setIsFreeShip] = useState(false);
    const [selectAll,setSelectAll] = useState(false);
    const navigation = useNavigation();
    const routeInfo = useRoute();
    
    const shippingCallBack = (e) =>{
      setShipping(e.shipPrice);
    }

    useEffect(() => {
      setItemList(cartlist);
      orderSeverController.getShipPrice(0,shippingCallBack);
    }, [cartlist])



    useEffect(() => { userInfoSingleton.getInstance().updateCartCount(cartlist.length);}, [itemList])

    useEffect(() => {
      setTotalPriceFromActiveList();
    }, [activelist,selectAll,load])

    useEffect(() => {if(modalItem != null){ setIsModalVisible(true);} }, [modalItem])

    useEffect(() => { if(isModalVisible == false){ setModalItem(null); }}, [isModalVisible])

    const activeChange = (active,index) =>{
      activelist[index] = active;
      if(active == false)
        setSelectAll(active);
      setActivelist(JSON.parse(JSON.stringify(activelist)));
      setTotalPriceFromActiveList();
    }


    const getPrice = (option) => {
      let price = 0;
      option.data.map((value)=>{

        let p = 0;
        var optionList = value.options.optionList;
        
        for(var calKey in optionList){
          for(var i =0;i<	optionList[calKey].length ;i++){
            p  += optionList[calKey][i].opt_price;
          }
        }
  
        if(value.options.isSetOptional == true || value.options.isOptional == false){
          p += Math.round((value.prd_price) - ((value.prd_price) * (value.prd_sale_rate)) / 100);
        }
        price += p * value.count;
      });

      return price;
    }

    const setTotalPriceFromActiveList = () =>{
      var price = 0;

      itemList.map((value,index)=>{
        if(activelist[index] == true)
          price += getPrice(value.cart_items) * value.cart_items.count;
      });

      setOriginalPrice(price);
      if(coupon != null){
          price = price - (coupon.cp_discount  == 0 ? coupon.cp_discount_amount : parseInt(Math.floor(price * coupon.cp_discount / 100)));
      }

      setIsFreeShip(appStaticInfomation.getInstance()._shipLimit <= price ? true : false);
      price += appStaticInfomation.getInstance()._shipLimit <= price ? 0 : shipping ;

      setActivelist(activelist);
      setTotalPrice(price);
    }

    const selectAllClick = (type) =>{
      itemList.map((value,index)=>{ activelist[index]  = !selectAll;})
      setSelectAll(e=>!e);
      setActivelist(activelist);
      setTotalPriceFromActiveList();
    }

    const deleteCallBack = (data) =>{
        if(data == 1){
          userInfoSingleton.getInstance().updateCartCount(userInfoSingleton.getInstance()._cartCount - 1);
          navigation.reset({index: 0, routes: [{ name: 'cart' }],});
        }
        else
          Alert.alert(" ","다시 한번 시도해주세요");
    }

    const clickDelete = (item,index,deleteKey)=>{ 

      if(item.cart_items.data){

        let cartList = item.cart_items.data;
        let count = 0;
        for(var i = 0;i<cartList.length;i++){
          if(cartList[i].options.isOptional == false){
            count++;
          }
        } 

        if(cartList.length > 1 && count == 1 && item.cart_items.data[index].options.isOptional == false){
          Alert.alert(" ", "필수 옵션은 삭제할 수 없습니다.");
          return;
        }
      }
      
     item.cart_items.data.splice(index, 1);

       
      if(item.cart_items.data.length == 0){
        var formData = new FormData();
        formData.append("mem_id",userInfoSingleton.getInstance()._userId);
        formData.append("cart_id",item.cart_id);
        cartServerController.deleteCartItem(formData,deleteCallBack);
      }
      else{
        var list = JSON.parse(JSON.stringify(itemList));
        if(!list[deleteKey])
          return;
        list[deleteKey].cart_items  = item.cart_items;
        setItemList(list);
        changeLoadState();
      }
      
    }

    const deleteCartsItem = () =>{
      itemList.map((value,index)=>{ 
        if(activelist[index] ==true){
          var formData = new FormData();
          formData.append("mem_id",userInfoSingleton.getInstance()._userId);
          formData.append("cart_id",value.cart_id);
          cartServerController.deleteCartItem(formData,deleteCallBack);
      }})
    }

    const changeLoadState = () =>{
      setLoad(!load);
      setTotalPriceFromActiveList();
    }

 
    const clickPurchase = () =>{

      var selectList = [];
      itemList.map((value,index)=>{
        if(activelist[index] == true){
          selectList.push(JSON.parse(JSON.stringify(value)));
        }
      })

      if(selectList.length == 0){
        Alert.alert(" ","상품을 선택해주세요");
        return;
      }

       navigation.navigate("cartOrderItem",{root:routeInfo.name ,productlist:selectList,coupon:coupon == null ? null : coupon})
    }


    return (
      <ScrollView style={styles.container}>
        {
          itemList.length != 0 ? 
            <CartSelectOption selectAll={selectAll}  deleteCartsItem={deleteCartsItem} selectAllClick={selectAllClick}/>
            :
            <View style={styles.emptyContainer}>
              <Text>장바구니가 비어있습니다. </Text>
              <Text>용된다와 쇼핑하러 가실까요?</Text>
            </View>
        }
        {
            itemList.map((value ,i)=>{
              load;
              function clickActive(active){
                activeChange(active,i);
              }
              
              function changeOption(count,index){
                if(itemList[i] == undefined)
                    return;
                var list = JSON.parse(JSON.stringify(itemList));
                list[i].cart_items.data[index].count  = count;
                setItemList(list);
                changeLoadState();
              }
              var option = value.cart_items;
              return (
                <CartSetItem 
                  active={activelist[i]} 
                  option={option} 
                  optionalArray={value.prd_additional4}
                  changeOption={changeOption}
                  item={value} 
                  deleteKey={i}
                  clickActive={clickActive}  
                  setModalItem={setModalItem}
                  clickDelete={clickDelete}
                  />
              )
            })
         }
         {
          itemList.length != 0 ? 
          <View>
            <CartPriceInfo totalPrice={totalPrice} shipping={shipping} isFreeShip={isFreeShip}/>
            <CartSelectCupon originalPrice={originalPrice} coupon={coupon} setCoupon={setCoupon}/>
            <CartOrderBottom totalPrice={totalPrice} shipping={shipping} clickPurchase={clickPurchase}/>
            <CartOptionModal shipping={shipping} modalItem={modalItem} isModalVisible={isModalVisible} setModalVisible={setIsModalVisible}/>
          </View>
          :
          null
         }
      </ScrollView>
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
  emptyContainer:{
    width:"100%",
    height:"150rem",
    alignItems: "center",
    justifyContent: "center",
  }

});
