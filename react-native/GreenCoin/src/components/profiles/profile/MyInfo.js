import React, {useState,useEffect} from 'react';
import { Text,Image, View, Dimensions,TouchableOpacity,StyleSheet, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { useNavigation ,useRoute } from '@react-navigation/native';
import userInfoSingleton from '../../../db/userInfoSingleton';
import appStaticInfomation from '../../../db/appStaticInfomation';
import serverController from '../../../server/serverController';


function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function MyInfo() {
 const navigation = useNavigation();
 const routeInfo = useRoute();
 const [point,setPoint] = useState(0);
 const [coupon,setCoupon] = useState(0);

 
 const callBack = (data) =>{
   
    setPoint(data.point == undefined ? 0 : data.point);
    setCoupon(data.coupon == undefined ? 0 : data.coupon);
    if(data.point != undefined ){
      userInfoSingleton.getInstance().updatePointAndCoupon({point :data.point,coupon : data.coupon});
    }
    appStaticInfomation.getInstance().updateFaqList(data.faq);
 }



  useEffect(() => {
    var formData = new FormData();
    formData.append("mem_id",userInfoSingleton.getInstance()._userId);

    serverController.post(`pointCupon/user`,formData,callBack);
  }, [])

  const moveToPage = (name) =>{
    if(loginCheck() == true)
        navigation.navigate(name,{root:routeInfo.name});
  }

  const loginCheck = ()=>{
    if(userInfoSingleton.getInstance()._isLogin != true){
      navigation.navigate("selectLoginOrRegister",{root:routeInfo.name});
      return false;
    }
    return true;
  }
    return (
      <View style={styles.container}>
          <TouchableOpacity style={styles.infoColum} onPress ={()=>{moveToPage("deliverInfo",{root:"profile"});}}>
              <Text>주문/배송조회</Text>
          </TouchableOpacity>
          <View style={styles.boarderDiv}/>
          <TouchableOpacity style={styles.infoColum} onPress ={()=>{moveToPage("point",{root:"profile" , count : point});}}>
              <Text>포인트 </Text>
              <Text style={styles.lightLabel}>{numberWithCommas(point)}</Text>
          </TouchableOpacity>
          <View style={styles.boarderDiv}/>
          <TouchableOpacity style={styles.infoColum} onPress ={()=>{moveToPage("cupon",{root:"profile" , count : coupon});}}>  
              <Text>쿠폰 </Text>
              <Text style={styles.lightLabel}>{coupon}</Text>
          </TouchableOpacity>
      </View>
    );
  }


const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });


const styles = EStyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth:1,
    borderBottomColor :"#efefef",
    backgroundColor:"white",
  },
  infoColum:{
    width:"33%",
    height:"106.032rem",   
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
  },
  lightLabel:{
    color:"#26CBFF",
    fontFamily:"NotoSansKR-Regular"
  },
  touchableOpacity:{
    flexDirection: 'row',
  },
  boarderDiv:{
    width:"1.5rem",
    height:"70rem",
    backgroundColor:"#F4F6F9",
  }

});