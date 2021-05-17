import React,{useEffect,useState} from 'react';
import { Text,Image, View, Dimensions,ScrollView,StyleSheet, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import CommonTitleBar from '../../components/comm/CommonTitleBar'
import OrderInformation from '../../components/profiles/orderDetail/OrderInformation';
import OrderProductList from '../../components/profiles/orderDetail/OrderProductList';
import OrderPayInformation from '../../components/profiles/orderDetail/OrderPayInformation';
import OrderDeliverInformation from '../../components/profiles/orderDetail/OrderDeliverInformation';
import OrderRefundInformation from '../../components/profiles/orderDetail/OrderRefundInformation';

import orderSeverController from '../../server/orderSeverController';
import userInfoSingleton from '../../db/userInfoSingleton';

import {navigationBackHandler} from '../../navigation/NavigationBackHandler';



export default function OrderDetail({route}) {

  const [detail,setDetail] = useState({});
  const [list,setList] = useState([]);
  const [shipPrice,setShipPrice] = useState(0);
  const callBack = (data) =>{ 
    setDetail(data.orderDetail[0]);
    setList(data.orderList);
    setShipPrice(data.shippingPrice);
  }

  useEffect(() => {
    var formData = new FormData();
    formData.append("mem_id",userInfoSingleton.getInstance()._userId);
    formData.append("txn_id",route.params.id);
    orderSeverController.getTransactionDetail(formData,callBack);
  }, [route])

  navigationBackHandler();
    return (
      <ScrollView style={styles.container}>
        {
          detail.txn_id ?
          <View>
            <CommonTitleBar title={"주문상세조회"} leftOption={"back"}></CommonTitleBar>
            <OrderInformation detail={detail} list={list}/>
            {
              list.length > 0 && list[0].mog_option ? 
              <OrderProductList shipPrice={shipPrice} detail={detail} list={list}/>
              :
              null
            }
            <OrderPayInformation detail={detail} itemList={list} shipPrice={shipPrice}/>
            <OrderDeliverInformation detail={detail}/>
            {/*  환불 있으면 <OrderRefundInformation></OrderRefundInformation> */}
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
  container: {
    width :"100%",
    height:"100%",
    backgroundColor:"white",
  },
 
});