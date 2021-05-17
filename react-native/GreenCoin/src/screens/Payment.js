import React from 'react';
/* 아임포트 모듈을 불러옵니다. */
import IMP from 'iamport-react-native';
import {useNavigation} from '@react-navigation/native';

/* 로딩 컴포넌트를 불러옵니다. */
import Loading from './Loading';

function getDateType(date){

  date.setDate(date.getDate() + 1);

  function checkZero(checkString){
    return checkString.toString().length == 1 ?  "0" + checkString : checkString;
  }
  var temp = `${checkZero(date.getFullYear())}${checkZero(date.getMonth() + 1)}${checkZero(date.getDate())}${checkZero(date.getHours())}${checkZero(date.getMinutes())}`;
  return temp;
}

export function Payment({route}) {

  const navigation = useNavigation();

  if(!route.params.data){
    alert(" ","잘못된 접근입니다.");
    return <View></View>;
  }
  
  const formData = route.params.data;
  const payMethod = route.params.payMethod;
  const pg = route.params.pg ? route.params.pg  :'settle';
  const merchant_uid = `${new Date().getTime()}`;

  /* [필수입력] 결제 종료 후, 라우터를 변경하고 결과를 전달합니다. */
  function callback(response) {
   // console.log(imp_success);
    //console.log(imp_uid);

    formData.imp_success=response.imp_success;
    formData.imp_uid=response.imp_uid;
    formData.merchant_uid=response.merchant_uid;

    if(response.imp_success == "true"){
      navigation.goBack();
      navigation.navigate("PaymentSuccess",{data:route.params.data , pg:pg, payMethod:payMethod, merchant_uid : merchant_uid});
    }
    else{
      navigation.goBack();
    }
  }



  /* [필수입력] 결제에 필요한 데이터를 입력합니다. */
  const data = {
    pg: pg,
    pay_method: payMethod,
    name: formData.productlist[0].prd_title,
    merchant_uid: merchant_uid,
    amount: formData.totalPrice,
    buyer_name: formData.name,
    buyer_tel: formData.phone,
    buyer_email: formData.email,
    buyer_addr: formData.address,
    buyer_postcode: formData.zipcode,
    app_scheme: 'example',
    digital:false,
    vbank_due:getDateType(new Date()) //5일뒤로 셋팅
    // [Deprecated v1.0.3]: m_redirect_url
  };

  return (
    <IMP.Payment
      userCode={'imp06109399'}  // 가맹점 식별코드
      loading={<Loading />} // 웹뷰 로딩 컴포넌트
      data={data}           // 결제 데이터
      callback={callback}   // 결제 종료 후 콜백
    />
  );
}

export default Payment;