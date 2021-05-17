import React,{useState,useEffect} from 'react';
import { Text,Image, View, Dimensions,ScrollView,StyleSheet, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import CommonTitleBar from '../../components/comm/CommonTitleBar';
import CartOrderDeliverInfo from '../../components/carts/order/CartOrderDeliverInfo';
import CartOrderUserInfo from '../../components/carts/order/CartOrderUserInfo';
import CartOrderItemInfo from '../../components/carts/order/CartOrderItemInfo';
import CartOrderCuponInfo from '../../components/carts/order/CartOrderCuponInfo';
import CartOrderPointInfo from '../../components/carts/order/CartOrderPointInfo';
import CartOrderExpectPointInfo from '../../components/carts/order/CartOrderExpectPointInfo';
import CartOrderResultPriceInfo from '../../components/carts/order/CartOrderResultPriceInfo';
import CartOrderPaymentSelect from '../../components/carts/order/CartOrderPaymentSelect';
import CartOrderPolicyInfo from '../../components/carts/order/CartOrderPolicyInfo';
import CartOrderBottomNav from '../../components/carts/order/CartOrderBottomNav';

import userInfoSingleton from '../../db/userInfoSingleton';
import orderSeverController from '../../server/orderSeverController';
 
import {navigationBackHandler , useNavigation} from '../../navigation/NavigationBackHandler';

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function CartOrderItemScreen({route}) {


  const userInfo = userInfoSingleton.getInstance();

  const navigation = useNavigation();
  const [itemlist,setItemlist] = useState([]);
  const [coupon,setCoupon] = useState(null);
  const [point,setPoint] = useState(0);
  const [couponPrice,setCouponPrice] = useState(null);
  const [totalDiscount,setTotalDiscount] = useState(null);
  const [totalPrice,setTotalPrice] = useState(0);
  const [originalPrice,setOriginalPrice] = useState("0");
  const [shipping,setShipping] = useState(0);
  const [shippingPrice,setShippingPrice] = useState(0);
  const [basicShipping,setBasicShipping] = useState(0);
  const [shipLimit,setShipLimit] = useState(null);
  const [address ,setAddress] = useState(userInfo._currentAddress);
  const [addressDetail ,setAddressDetail] = useState(userInfo._currentAddress.addr_wireline);
  const [orderPersonInfo ,setOrderPersonInfo] = useState({});
  const [policy,setPolicy] = useState(false);
  const [userMemo,setUserMemo] = useState("");
  const [receiverName,setReceiverName] = useState(userInfo._name);
  const [receiverPhone,setReceiverPhone] = useState(userInfo._mem_phone);
  const [activeAlarm ,setActiveAlarm] =useState(false);
  const [pg,setPg] = useState("settle");
  const [payMethod,setPayMethod] = useState("card");
  const [reserve,setReserve] = useState(null);
  const [payLabel,setPayLabel] = useState("결제 수단을 선택해주세요");
  
  
  const basicShipPriceCallBack = (data) =>{ 
    setBasicShipping(data.shipPrice);
    if(!address.addr_zipcode){
      setShippingPrice(data.shipPrice);
      setShipping(data.shipPrice);
    }
    else if(address.addr_zipcode)
     orderSeverController.getShipPrice(address.addr_zipcode ?  address.addr_zipcode : userInfo._currentAddress.addr_zipcode ,shipPriceCallBack);
  }

  const shipPriceCallBack = async (data) =>{ 
     setShippingPrice(data.shipPrice); 
     setShipping(data.shipPrice);
  }

  


  const clickSetCoupon = (type) =>{
    if(coupon == null){
      navigation.navigate("cartCupon",{setCoupon:setCoupon,totalPrice : parseInt(originalPrice.replace(/,/gi,"")) + parseInt(shipping)});
    }
    else if(type){
      setCoupon(null);
    }
    else{
      setCoupon(null);
    }
  }

  const calCouponPrice = (price) =>{

    if(coupon){
      if(coupon.cp_type == 2){
        if(shipLimit <= price){
          Alert.alert(" ", "배송비 무료인 경우에는 배송비 무료 쿠폰을 사용하지 못합니다.");
          setCoupon(null);
          return 0;
        }
        setShippingPrice(shipping -  basicShipping);
        return 0;
      }
      else
        return coupon.cp_discount  == 0 ?  coupon.cp_discount_amount : parseInt(Math.round(price * coupon.cp_discount / 100));
    }
    return 0;
  }



  
  const getPrice = (option) => {
    let price = 0;
    option.data.map((value)=>{
      var optionList = value.options.optionList;
      let p = 0;
      for(var calKey in optionList){
        for(var i =0;i<	optionList[calKey].length ;i++){
          p += optionList[calKey][i].opt_price;
        }
      }

      if(value.options.isSetOptional == true || value.options.isOptional == false){
        p += Math.round((value.prd_price) - ((value.prd_price) * (value.prd_sale_rate)) / 100);
      }
      price += p * value.count;
    });

    return price;
  }

  const calTotalPrice = () =>{
    
     var resultPrice = 0;
     var originPrice = 0;

 		 itemlist.map((value)=>{
      originPrice += getPrice(value.cart_items) * value.cart_items.count;
      });
     
     
    resultPrice =  originPrice;


    setOriginalPrice(numberWithCommas(originPrice));
    resultPrice -= point;
    var cp = Math.round(calCouponPrice(resultPrice));
    
    setCouponPrice(cp);
    setTotalDiscount(parseInt(cp) + parseInt(point));

    if(coupon != null && point > 0){
      Alert.alert(" ","포인트와 쿠폰은 둘중 하나만 사용 가능합니다.");
      setPoint(0);
      setCoupon(null);
      return;
    }

    
    let currentShip = shippingPrice;
    if(shipLimit <= resultPrice){
      currentShip = shipping - basicShipping;
      setShippingPrice(shipping -  basicShipping);
    }

    

    if(resultPrice - totalDiscount < (resultPrice * 90) / 100){
      setPoint(0);
      setCoupon(null);
    }

    setTotalPrice(numberWithCommas((resultPrice + currentShip) - cp));

    return (resultPrice + currentShip) - cp;
  }

  const vaildate = (data) =>{
    if(data == false)
      Alert.alert(" ","다시 시도해주세요.");
    else 
    {

     
      var cart_idList = [];
      route.params.productlist.map((value)=>{
        cart_idList.push(value.cart_id);
      })
      
      
      var state ={
        productlist : route.params.productlist,
        cp_id: coupon  == null ? 0 : coupon.cp_id,
        cp_discount : coupon ? couponPrice : 0,
        pt_point : point == "" ? 0: point,
        mem_id : userInfo._userId,
        totalPrice : totalPrice.replace(/,/gi,""),
        originalPrice : originalPrice.replace(/,/gi,""),
        name : orderPersonInfo.name,
        email : "",
        phone : orderPersonInfo.phone,
        address : address.addr_address1 + " " + addressDetail,
        zipcode : address.addr_zipcode,
        receiver_memo: userMemo,
        cart_id : 1,//cart_idList.toString(),
        txn_count : itemlist.length,
        totalDiscount:totalDiscount,
        receiverPhone:receiverPhone,
        receiverName:receiverName,
        activeAlarm:activeAlarm,
        txn_reserves: parseInt(Math.floor(originalPrice.replace(/,/gi,"") * reserve.b_earn_rate) / 100),
        txn_shipping:shippingPrice,
        pg:pg,
        payMethod : payMethod
      }

       navigation.navigate("Payment",{data:state,pg:pg ,payMethod:payMethod});

    }
  }

  const clickOrderItem = () => {

    
    if(!orderPersonInfo || orderPersonInfo.name.lenght < 2 || receiverName.lenght < 2){
      Alert.alert(" ","이름을(를) 입력해주세요!");
      return;
    }
    if(!orderPersonInfo.phone || orderPersonInfo.phone.length != 11 || receiverPhone.length != 11){
      Alert.alert(" ","전화번호를 입력해주세요!");
      return;
    }
    if(!address || !address.addr_zipcode){
      Alert.alert(" ","주소를 입력해주세요!");
      return;
    }
    if(!addressDetail || !addressDetail){
      Alert.alert(" ","상세 주소를 입력해주세요");
      return;
    }
    if(!policy){
      Alert.alert(" ","결제 진행 필수사항에 동의를 해주세요!");
      return;
    }

    var formData = new FormData();
    formData.append("productlist" , JSON.stringify(route.params.productlist));

    formData.append("cp_id" , coupon == null ? 0 : coupon.cp_id);
    formData.append("point" , point == "" ? 0:point);
    formData.append("mem_id" , userInfo._userId);
    formData.append("totalPrice" , totalPrice.replace(/,/gi,""));
    formData.append("originalPrice" , originalPrice.replace(/,/gi,""));
    formData.append("zipcode" , address.addr_zipcode);


    orderSeverController.getVaildateInfomation(formData,vaildate);
    //()=>{navigation.navigate("cartOrderSuccess")
  }

  function getTotalPointLimit(){
    let result = parseInt(originalPrice.replace(/,/gi,""));
    return userInfo._point > result - ((result * 10) / 100) ? result - ((result * 10) / 100) : userInfo._point;
  }


  useEffect(()  => {
    
    setItemlist(route.params.productlist);
    if(route.params.coupon){
      setCoupon(route.params.coupon);
      setCouponPrice(route.params.coupon.cp_discount == 0 ? route.params.coupon.cp_discount_amount : route.params.coupon.cp_discount);
    }

    orderSeverController.getShipPrice(0 ,basicShipPriceCallBack);
   
    
    orderSeverController.getReserveInfo(0 ,function(res){
      setReserve(res.reserve);
      setShipLimit(res.shipLimit);
     
    });

  }, [route])

  
  useEffect(() => {

    if(address.addr_detail){
      setAddressDetail(address.addr_detail);
    }
    
    orderSeverController.getShipPrice(address.addr_zipcode ?  address.addr_zipcode : userInfo._currentAddress.addr_zipcode ,shipPriceCallBack);
  }, [address])


  useEffect(() => { if(itemlist.length != 0){calTotalPrice();} }, [itemlist])
  useEffect(() => { calTotalPrice();}, [coupon])
  useEffect(() => { calTotalPrice();}, [point])
  useEffect(() => { calTotalPrice();}, [shipLimit,basicShipping,shipping,shippingPrice])


    return (
      <ScrollView style={styles.container}>
        <CommonTitleBar title={"주문/결제"} leftOption={"back"} rightOption={"close"}/>
        <CartOrderDeliverInfo 
          address={address} 
          setAddress={setAddress}
          addressDetail={addressDetail}
          setAddressDetail={setAddressDetail}
          setUserMemo={setUserMemo}
          userMemo={userMemo}
          setReceiverName={setReceiverName}
          setReceiverPhone={setReceiverPhone}
          receiverPhone={receiverPhone}
          receiverName={receiverName}
        />
        <CartOrderUserInfo 
          receiverName={receiverName} 
          userInfo={userInfo} 
          receiverPhone={receiverPhone} 
          orderPersonInfo={orderPersonInfo} 
          setOrderPersonInfo={setOrderPersonInfo}
          activeAlarm={activeAlarm}
          setActiveAlarm={setActiveAlarm}/>
        <CartOrderItemInfo itemlist={itemlist}/>
        <CartOrderCuponInfo coupon={coupon} clickSetCoupon={clickSetCoupon} />
        <CartOrderPointInfo coupon={coupon} point={point} pointLimit={getTotalPointLimit()} setPoint={setPoint}/>
        <CartOrderExpectPointInfo totalPrice={totalPrice}/>
        <CartOrderResultPriceInfo shippnig={shipping} payLabel={payLabel} isFreeShip={shipLimit <= originalPrice.replace(/,/gi,"")} basicShipping={basicShipping} shippingPrice={shippingPrice} point={point} couponPrice={couponPrice} originalPrice={originalPrice} totalPrice={totalPrice}  itemlist={itemlist}/>
        <CartOrderPaymentSelect setPayLabel={setPayLabel} setPayMethod={setPayMethod} setPg={setPg}/>
        <CartOrderPolicyInfo policy={policy} setPolicy={setPolicy}/>
        <CartOrderBottomNav totalPrice={totalPrice} clickOrderItem={clickOrderItem}/>
      </ScrollView>
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


});
