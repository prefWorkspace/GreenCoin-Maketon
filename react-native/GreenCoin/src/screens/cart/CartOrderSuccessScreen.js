import React,{useState,useEffect,} from 'react';
import { Text,Image, View, Dimensions,StyleSheet, Alert,BackHandler } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import CommonTitleBar from '../../components/comm/CommonTitleBar';

import OrderMainTitle from '../../components/carts/orderSuccess/OrderMainTitle';
import OrderSuccessButton from '../../components/carts/orderSuccess/OrderSuccessButton';
import orderSeverController from '../../server/orderSeverController';
import {navigationBackHandler} from '../../navigation/NavigationBackHandler';

import { useNavigation,useFocusEffect } from '@react-navigation/native';


export default function CartOrderSuccessScreen({route}) {

  const data = route.params.data;
  const params = route.params;
  const [vBankInfo,setVBankInfo] = useState(null);

  const backAction = () => {
    return true;
  };

  useEffect(() => { 
    BackHandler.addEventListener('hardwareBackPress', backAction);
    orderSeverController.insertTransactions(createFormData(),callBack);
  }, [route])


  const callBack = (result) =>{
    console.log(result);
    if( result.vbank_name )
    setVBankInfo({
      amount : result.txn_order_price_amount,
      vbank_name : result.vbank_name , 
      vbank_num : result.vbank_num ,
      vbank_holder : result.vbank_holder ,
      vbank_date : result.vbank_date
    });
  }


  const pgTypeIndex = (type) => {
     switch(type){
      case "naverpay" : return 3;
      case "kakaopay" : return 6;
      case "vbank" : return 1;
      case "phone" : return 5;
      default: return 2; 
     }
  }

  const createFormData = () =>{

    var formData = new FormData();

    formData.append('name',data.name);
    formData.append('phone',data.phone);
    formData.append('email',data.email);
    formData.append('zipcode',data.zipcode);
    formData.append('cp_id',data.cp_id ? data.cp_id : 0);
    formData.append('coupon_discount',data.cp_discount ? data.cp_discount : 0);
    formData.append('mem_id',data.mem_id);
    formData.append('address',data.address);
    formData.append('pt_point',data.pt_point);
    formData.append('originalPrice',data.originalPrice);
    formData.append('totalPrice',data.totalPrice);
    formData.append('totalDiscount',data.totalDiscount);
    formData.append('cart_id', data.cart_id);
    formData.append('productlist',JSON.stringify(data.productlist));
    formData.append('payment_type',params.payMethod);
    formData.append('pg',params.pgType ? 0 : 1);
    formData.append('inflow_name',"application");
    formData.append('merchant_uid',params.merchant_uid);
    formData.append('txn_count',data.productlist.length);
    formData.append('txn_payment_amount',0);
    formData.append('txn_order_price_amount',data.totalPrice);
    formData.append('txn_pg_name',params.pg);
    formData.append('txn_pg_resultyn','n');
    formData.append('txn_payment_method',pgTypeIndex(params.pg));
    formData.append('txn_order_state_name',"입금 대기");
    formData.append('activeAlarm',data.activeAlarm);
    formData.append('receiver_phone',data.receiverPhone);
    formData.append('receiver_name',data.receiverName);
    formData.append('receiver_memo',data.receiver_memo);
    formData.append('txn_reserves',data.txn_reserves);
    formData.append('txn_shipping', data.txn_shipping);
    formData.append('txn_status',0);
    formData.append('mog_order_status',0);
    formData.append('imp_success',data.imp_success);
    formData.append('imp_uid',data.imp_uid);
    
    
    return formData;  
  }


  const navigation = useNavigation();
  
  const toMain = ()=>{ 
    //backHandler.remove();
    BackHandler.removeEventListener('hardwareBackPress',backAction);
    navigation.goBack();
    navigation.goBack();
    navigation.navigate("main"); 
  //  navigation.reset({index: 0, routes: [{ name: 'tab' }],}); 
  }
  const toOrderHistory = ()=>{ 
    //backHandler.remove();
    BackHandler.removeEventListener('hardwareBackPress',backAction);
    navigation.goBack();
    navigation.goBack();
    navigation.navigate("deliverInfo"); 
  }


    return (
      <View style={styles.container}>
        <CommonTitleBar title={"결제완료"}/>
        <View style={styles.titleContainer}>
          <OrderMainTitle vBankInfo={vBankInfo}/>
        </View>
        <View style={styles.bottomNav}>
          <OrderSuccessButton title={"메인으로 가기"} style={{backgroundColor:"#0D2141"}} color={"white"} clickEvent={toMain}/>
          <OrderSuccessButton title={"주문 내역 페이지로 이동하기"} style={{backgroundColor:"#EEF1F5"}} color={"#0D2141"} clickEvent={toOrderHistory}/>
        </View>
      </View>
    );
  }



  
const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });


const styles = EStyleSheet.create({
  container:{
    height:"100%",
    backgroundColor:"white",
  },
  marginBox:{
    height :"59rem",
  },
  titleContainer:{
    height:"50%",
    paddingTop:"100rem",
  },
  bottomNav:{
    width:"100%",
    position:"absolute",
    paddingBottom:"60rem",
    bottom:0,
  }

});
