import React,{useEffect,useState} from 'react';
import { ScrollView, Text, Dimensions,View, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import CommonTitleBar from '../../components/comm/CommonTitleBar'
import CartCuponItem from '../../components/carts/cupon/CartCuponItem';
import EmptyContent from '../../components/profiles/point/EmptyContent';

import {navigationBackHandler ,useNavigation} from '../../navigation/NavigationBackHandler';
import CuponServerController from '../../server/CuponServerController';
import userInfoSingleton from '../../db/userInfoSingleton';


const emptyLabels = [
  "쿠폰이 없습니다.",
  "용된다에서 쿠폰을 모아 혜택을 누려보세요!"
] 


//<EmptyContent label={emptyLabels}></EmptyContent>
export default function CartCuponScreen({route}) {

  const navigation = useNavigation();
  const [couponlist,setCouponlist] = useState([]);

  const callBack = (data) =>{ setCouponlist(data) }

  navigationBackHandler();

  useEffect(() => {
    var formData = new FormData();
    formData.append("mem_id",userInfoSingleton.getInstance()._userId);
    if(route.params.totalPrice){
      formData.append("total_price",route.params.totalPrice);
    }
    CuponServerController.getUseAbleCouponListByUserId(formData,callBack);
  }, [])
 
  const clickSelectCoupon = (item) =>{
    route.params.setCoupon(item);
    navigation.goBack();
  }

  var isEvent = false;
  const  scrollEvent = (e)=>{
    if(isEvent)
      return;

    var paddingToBottom = 700;
    paddingToBottom += e.nativeEvent.layoutMeasurement.height;
    
    if (e.nativeEvent.contentOffset.y + paddingToBottom >= e.nativeEvent.contentSize.height) {
      
      var formData = new FormData();
      formData.append("mem_id",userInfoSingleton.getInstance()._userId);
      formData.append("offset",couponlist.length);
      isEvent = true;
      CuponServerController.getUseAbleCouponListByUserId(formData,function(res){
        setCouponlist(couponlist.concat(res));
        if(res.length > 0)
          isEvent =false;
      });
    }
  }

    return (
      <ScrollView style={styles.container} onScroll={scrollEvent}>
        <CommonTitleBar title={"쿠폰"} leftOption={"back"} rightOption={"적용"}></CommonTitleBar>
        {
          couponlist.length != 0 ?
          couponlist.map((value)=>{
            return  <CartCuponItem item={value} clickSelectCoupon={clickSelectCoupon}></CartCuponItem>
          })
          :
          <EmptyContent label={emptyLabels}></EmptyContent>
        }
      </ScrollView>
    );
  }
  


const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });


const styles = EStyleSheet.create({
  container: {
    backgroundColor:"white",
  },
  height:{
    height:"100rem",
  }
});