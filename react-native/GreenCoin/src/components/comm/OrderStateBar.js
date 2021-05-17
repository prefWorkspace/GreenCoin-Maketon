import React,{useState}  from 'react';
import { Text,Image, View, Dimensions,ScrollView,Linking,TouchableOpacity, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

export default function OrderStateBar({value,type}){
  switch(type){
      case "입금대기" : return (
      <Text style={styles.state}>입금대기</Text>
      );
      case "상품준비중" : return (
      <Text style={styles.state}>상품준비중</Text>
      );
      case "옵션변경 요청" : return (
        <Text style={styles.state}>옵션변경 요청</Text>
      );
      case "주문취소 요청" : return (
        <Text style={styles.state}>주문취소 요청</Text>
      );
      case "교환요청" : return (
        <Text style={styles.state}>교환요청</Text>
      );
      case "반품요청" : return (
        <Text style={styles.state}>반품요청</Text>
      );
      case "주문취소 완료" : return (
        <Text style={styles.state}>주문취소 완료</Text>
      );
      case "옵션변경 완료" : return (
        <Text style={styles.state}>옵션변경 완료</Text>
      );
      case "교환신청 완료" : return (
        <Text style={styles.state}>교환신청 완료</Text>
      );
      case "반품신청 완료" : return (
        <Text style={styles.state}>반품신청 완료</Text>
      );
      
      case "취소완료" : return (
      <TouchableOpacity style={styles.stateContainer}>
        <Text style={styles.state}>취소완료 [상세보기]</Text>
      </TouchableOpacity>
      );
      case "배송중" : return (
      <TouchableOpacity style={styles.stateContainer}>
        <Text style={styles.left}>배송중
          <Text onPress={()=>{Linking.openURL("https://www.hanjin.co.kr/kor/CMS/DeliveryMgr/WaybillSch.do?mCode=MN038")}} style={styles.left}>
            [운송장조회]
          </Text>
        </Text>
        <Text style={styles.right}>{value.mog_delivery_num}</Text>
      </TouchableOpacity>
      );
      case "배송완료" : return (
      <TouchableOpacity style={styles.stateContainer}>
        <Text style={styles.left}>배송완료
          <Text onPress={()=>{Linking.openURL("https://www.hanjin.co.kr/kor/CMS/DeliveryMgr/WaybillSch.do?mCode=MN038")}} style={styles.left}>
            [운송장조회]
          </Text>
        </Text>
        <Text style={styles.right}>{value.mog_delivery_num}</Text>
      </TouchableOpacity>
      );
      case "부분배송중" : return (
        <TouchableOpacity style={styles.stateContainer}>
          <Text style={styles.left}>부분배송중
          <Text onPress={()=>{Linking.openURL("https://www.hanjin.co.kr/kor/CMS/DeliveryMgr/WaybillSch.do?mCode=MN038")}} style={styles.left}>
            [운송장조회]
          </Text>
        </Text>
        <Text style={styles.right}>{value.mog_delivery_num}</Text>
        </TouchableOpacity>
      );
      case "반품중" : return (
        <Text style={styles.state}>반품중</Text>
      );

     
      default: return (<Text style={styles.state}>{type}</Text>);
  }
}




const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });


const styles = EStyleSheet.create({
  container: {
    width:"100%",
    alignItems: "center",
    justifyContent: "center",
  },
  state:{
    marginTop:"5rem",
    fontFamily:"NotoSansKR-Medium",
  },
  stateContainer:{
    width:"100%",
    paddingLeft:"20rem",
    paddingRight:"20rem",
    flexDirection: 'row',
  },
  left:{
    fontFamily:"NotoSansKR-Medium",
    color:"black",
    marginRight:"auto",
  },
  right:{
    fontFamily:"NotoSansKR-Medium",
    color:"#9FA6B2",
    marginLeft:"auto",
  },


});
