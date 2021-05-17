import * as React from 'react';
import { Text, View, Dimensions, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import CommonTitleBar from '../../components/comm/CommonTitleBar';
import { ScrollView } from 'react-native-gesture-handler';
import {navigationBackHandler} from '../../navigation/NavigationBackHandler';


export default function PolicyScreen() {
  navigationBackHandler();
    return (
      <ScrollView style={styles.container}>
        <CommonTitleBar title={"개인정보취급방침"} rightOption={"close"}></CommonTitleBar>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>개인정보처리방침</Text>
          <Text style={styles.title}>
          ■개인정보의 수집 및 이용목적{"\n"}
{"\n"}회사는 수집한 개인정보를 다음의 목적을 위해 활용합니다.
{"\n"}○ 서비스 제공에 관한 계약 이행 및 서비스 제공에 따른 요금정산 콘텐츠 제공, 구매 및 요금결제, 물품배송 또는 청구지 발송
{"\n"}○ 회원관리
{"\n"} 회원제 서비스 이용에 따른 본인확인, 개인 식별, 연령확인, 만14세 미만 아동 개인정보 수집시 법정 대리인 동의여부 확인, 고지사항 전달
{"\n"}○ 마케팅 및 광고에 활용 접송 빈도 파악 또는 회원의 서비스 이용에 대한 통계
{"\n"}
{"\n"}■개인정보의 보유 및 이용기간{"\n"}
{"\n"}회사는 개인정보 수집 및 이용목적이 달성된 후에는 예외 없이 해당 정보를 지체 없이 파기합니다.
{"\n"}
{"\n"}■개인정보의 위탁 처리{"\n"}
{"\n"}용된다는 서비스 향상을 위해 관계법령에 따라 회원의 동의를 얻거나 관련 사항을 공개 또는 고지 후 회원의 개인정보를 외부에 위탁하여 처리하고 있습니다. 용된다의 개인정보처리 수탁자와 그 업누의 내용은 다음과 같습니다.
{"\n"}
{"\n"}- 수탁자 : ㈜용된다컴퍼니
{"\n"}- 위탁 업무 내용 :  알림톡 발송 업무{"\n"}

{"\n"}직송 등 일부 배송형태에 따라, 전자상거래소비자보호법 제 21조에 의거 협력사에 배송정보가 제공됩니다.
{"\n"}{"\n"}
■쇼핑정보 수신 동의{"\n"}
{"\n"}할인쿠폿 및 혜택, 이벤트, 신상품 소식 등 쇼핑몰에서 제공하는 유익한 쇼핑정보를 SMS나 이메일로 받아보실 수 있습니다.
{"\n"}단, 주문/거래 정보 및 주요 정책과 관련된 내용은 수신동의 여부와 관계없이 발송됩니다.
{"\n"}선택 약관에 동의하지 않으셔도 회원가입은 가능하며, 회원가입 후 회원정보수정 페이지에서 언제든지 수신여부를 변경하실 수 있습니다.
{"\n"}{"\n"}
■ 개인정보에 관한 민원서비스{"\n"}
{"\n"}회사는 고객의 개인정보를 보호하고 개인정보와 관련한 불만을 처리하기 위하여 아래와 같이 관련 부서 및 개인정보관리책임자를 지정하고 있습니다.
{"\n"}고객서비스담당 부서 :남학현
{"\n"}전화번호 :02-2279-7459
{"\n"}{"\n"}
이메일 : yddcompany2019@gmail.com
{"\n"}{"\n"}
개인정보관리책임자 성명 : 이동욱
{"\n"}전화번호 : 02-2279-7459
{"\n"}이메일 : yddcompany2019@gmail.com
          </Text>
        </View>
      </ScrollView>
    );
  }
  


const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });


const styles = EStyleSheet.create({
  container: {
    backgroundColor:"white",
  },
  contentContainer:{
    width:"100%",
    padding:"20rem",
  },
  title:{
    marginTop:"15rem",
    fontSize:"14rem",
  },
});