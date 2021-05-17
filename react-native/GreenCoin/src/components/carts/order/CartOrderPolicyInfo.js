import React , {useState} from 'react';
import { Text, View, Dimensions, TouchableOpacity, Alert } from 'react-native';
import CheckBox  from '@react-native-community/checkbox';

import EStyleSheet from 'react-native-extended-stylesheet';
import CartOrderBox from './CartOrderBox';

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

export default function CartOrderPolicyInfo({policy ,setPolicy }){

  const [dropDown,setDropDown] = useState(false);

  return (
    <View style={styles.container}>
          <View style={styles.titleContainer}>
            <CheckBox boxType="square" tintColors={{true:"#0D2141" ,false:"#D2D5DA"}} style={styles.check} value={policy} onValueChange={value=>{setPolicy(value)}}/>
            <Text style={styles.title}>결제 진행 필수사항 동의</Text>
            <TouchableOpacity onPress={()=>{setDropDown(!dropDown)}}>
                <Text style={styles.more}>{dropDown ? "닫기" : "보기"}</Text>
            </TouchableOpacity>
          </View>
        <View style={styles.itemContainer}>
        {
          dropDown?
          <Text>
            [개인정보 수집이용, 제 3자 제공 및 결제대행 서비스 표준 이용약관]
            {"\n"}{"\n"}
            (주)용된다컴퍼니는 원활한 서비스제공을 위해 최소한의 범위내에서 아래와 같이 개인정보 수집, 제 3자 제공및 결제대행 서비스 표준 약관을 이용합니다.{"\n"} 
            1. 개인정보 수집이용
            {"\n"}● 수집방법- 상품구매- 결제- 취소,환불- 휴대전화 인증
            {"\n"}● 수집항목- 상품구매 : 
            {"\n"}  1) 구매자 정보(성명, 휴대전화번호) 
            {"\n"}  2)수령인 정보(성명, 휴대전화번호, 주소)- 결제: 신용카드 정보- 취소,환불: 환불 계좌번호, 은행명, 예금주명- 휴대전화인증: 휴대전화 번호
            {"\n"}● 수집목적- 상품구매: 상품배송 및 서비스제공을 위한 사용자정보 확인- 결제: 간편 결제 서비스 제공- 취소,환불: 결제 서비스 환불- 휴대전화 인증: 상품 구매 및 포인트(적립금) 지급 시 본인인증, 이벤트 및 마케팅 정보 수신(마케팅 활용 동의한건에 한함)
            {"\n"}● 보유 및 이용기간목적 달성 후 파기합니다.
            {"\n"}단, 전자상거래 등에서의 소비자보호에 관한 법률 등 관련 법령의 규정에 따라 거래 관계 확인을 위해개인정보를 일정기간 보휴 할 수 있습니다.
            또한 회원에서 탈퇴한 후 회원 재가입, 임의해지 등을 반복적으로 행하여 회사가 제공하는 할인쿠폰, 
            이벤트혜택 등으로 경제상의 이익을 취하는 것을 방지 하고자 회원 탈퇴 후에도 구매 인증시 입력한 정보는 1년동안 보관합니다.
            {"\n"}2. 개인정보 제 3자 제공● 제공받는자- (주)용된다컴퍼니, (주)셀메이트
            {"\n"}● 제공목적- 상품 및 경품(서비스) 배송(전송), 반품, 환불, 고객상담등 정보통신서비스제공계약 및 전자상거래(통신판매) 계약의 이행을 위해 필요한 업무의 처리
            {"\n"}● 항목
            {"\n"}  1) 구매자정보(성명, 휴대폰번호, 이메일주소)
            {"\n"}  2) 수령인정보(성명, 휴대폰번호, 주소)
            {"\n"}  3) 상품 구매,취소,반품,교환정보
            {"\n"}  4) 송장정보
            {"\n"}● 보유 및 이용기간- 서비스 제공완료 후 파기
            {"\n"}  3.결제대행서비스 이용에 따른 개인정보 제3자 제공
            {"\n"}● 제공정보/목적: 결제 관련 거래정보
            {"\n"}●제공받는자(주)NICE정보통신, 세틀뱅크(주), (주)카카오페이, 네이버(주), (주)다날, (주)차이코퍼레이션, (주)페이코※개인정보 제공에 동의하지 않으실 수 있으며, 동의하지 않으실 경우 서비스 이요이 제한될 수 있습니다.</Text>
          :
          null
        }
        </View>
    </View>

  )
};


const styles = EStyleSheet.create({
  container:{
    padding:"15rem",
    alignItems: "center", 
    justifyContent: "center",
    backgroundColor:"white",
  },
  itemContainer:{
    width:"100%",
    marginTop:"10rem",
    flexDirection: 'row',
    alignItems: "center", 
  },
  titleContainer:{
    width:"100%",
    flexDirection: 'row',
    alignItems: "center", 
    justifyContent: "center",
  },
  check:{
    right:"8rem",
  },
  title:{
    fontSize:"12.8rem",
    marginRight:"auto",    
    right:"3rem",
  },
  subtitle:{
    fontSize:"12.8rem",
    marginRight:"auto",
  },
  more:{
    color:"#BBBEC2",
    fontSize:"12.8rem",
  },
  inputContainer:{
    width:"80%",
    height:"48rem",
    alignItems: "center", 
    justifyContent: "center",
    borderColor:"#E1E6ED",
    borderWidth: 1,
    borderRadius:4,
    backgroundColor: "rgba(196, 196, 196, 0.1)",
    paddingLeft:"10rem",
  },
  label:{
    color:"#0D2141",
  }
});