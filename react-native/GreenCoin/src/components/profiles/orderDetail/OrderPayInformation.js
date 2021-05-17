import React, {useState} from 'react';
import { Text, View, Dimensions,Image, TouchableOpacity, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import appStaticInfomation from '../../../db/appStaticInfomation'
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


const Data = [
  {
    title:"카드",
    label:"카드",
    pg:"settle",
    payMethod:"card",
    src:require("../../../assets/img/payment/card.png")
  },
  {
    title:"용페이",
    label:"용페이",
    pg:"settle",
    payMethod:"card",
    src:require("../../../assets/img/payment/easyCard.png")
  },
  {
    title:"가상계좌입금",
    label:"가상계좌입금",
    pg:"settle",
    payMethod:"vbank",
    src:require("../../../assets/img/payment/Rectangle.png")
  },
  {
    title:"네이버페이",
    label:"네이버페이",
    pg:"naverpay",
    payMethod:"card",
    src:require("../../../assets/img/payment/naver.png")
  },
  {
    title:"카카오페이",
    label:"카카오페이",
    pg:"kakaopay",
    payMethod:"card",
    src:require("../../../assets/img/payment/kakao.png")
  },
  {
    title:"차이",
    label:"차이",
    pg:"chai",
    payMethod:"card",
    src:require("../../../assets/img/payment/chai.png")
  },
  {
    title:"페이코",
    label:"페이코",
    pg:"payco",
    payMethod:"card",
    src:require("../../../assets/img/payment/payco.png")
  },
  {
    title:"핸드폰소액결제",
    label:"핸드폰소액결제",
    pg:"settle",
    payMethod:"phone",
    src:require("../../../assets/img/payment/phone.png")
  },
  {
    title:"실시간계좌이체",
    label:"실시간계좌이체",
    pg:"settle",
    payMethod:"vbank",
    src:require("../../../assets/img/payment/account.png")
  },
]

export default function OrderPayInformation({detail , itemList, shipPrice}) {
  const [dropDown,setDropDown] = useState(true);

  const getPrice = () => {
    let price = 0;
    let optionPrice = 0;
    let salePrice = 0;

    for(let i =0;i<itemList.length;i++){
      let options = JSON.parse(itemList[i].mog_option).data;
      
      for(let j = 0; j<options.length;j++){
        let p = 0;
        let o = 0;
        let s = 0;
        let optionList = options[j].options.optionList;

        for(let calKey in optionList){
          for(let z =0;z<	optionList[calKey].length ;z++){
            o += optionList[calKey][z].opt_price;
          }
        }

        if(options[j].options.isSetOptional == true || options[j].options.isOptional == false){
          p += Math.round((options[j].prd_price) - ((options[j].prd_price) * (options[j].prd_sale_rate)) / 100);
          s += Math.round(((options[j].prd_price) * (options[j].prd_sale_rate)) / 100);
        }

        price += (p * options[j].count) * JSON.parse(itemList[i].mog_option).count;
        optionPrice += (o * options[j].count) * JSON.parse(itemList[i].mog_option).count;
        salePrice += (s * options[j].count) * JSON.parse(itemList[i].mog_option).count;
      }
    }
   
		return { price : price , optionPrice : optionPrice , salePrice : salePrice };
  }

  
  function getOrderType(type){
		switch(type){
			case "vbank" : return "무통장 입금";
			case "card" : return "카드 결제";
			case "phone" : return "핸드폰 결제";
			default : return "결제";
		}
	}
 
  const appInfo = appStaticInfomation.getInstance();
  const prices = getPrice();
  
    return (
      <View style={styles.container}>
         <TouchableOpacity style={styles.titleContainer} onPress={()=>{setDropDown(!dropDown)}}>
          <Text style={styles.title} >결제 정보</Text>
          {
                dropDown ?
                <Image style={styles.image} source={require('../../../assets/img/label_point/dropUpPoint.png')}></Image>
                :
                <Image style={styles.image} source={require('../../../assets/img/label_point/dropDownPoint.png')}></Image>
          }
          </TouchableOpacity>
        {
          dropDown == true?
          <View style={styles.contentContainer}>
            <View style={styles.content}>
                <Text style={styles.subtitle}>결제수단</Text>
                <Text style={styles.description}>{Data.filter((value)=>{ return value.pg == detail.txn_pg_name && value.payMethod == detail.txn_type })[0].label}</Text>
            </View>

            <View style={styles.content}>
                <Text style={styles.greySubtitle}>총 주문금액</Text>
                <Text style={styles.description}>{numberWithCommas(detail.txn_sub_total)}원</Text>
            </View>

            <View style={styles.saleInfoContent}>
              <View style={styles.saleBodyFrame}>
                <Text style={styles.greySubtitle}>상품금액</Text>
                  <Text style={styles.description}>
                    {numberWithCommas((prices.price))}원
                </Text>
              </View>
              {/* <View style={styles.saleBodyFrame}>
                <Text style={styles.greySubtitle}>총 주문금액</Text>
                  <Text style={styles.description}>
                    {numberWithCommas((prices.price + prices.optionPrice))}원
                </Text>
              </View>
              <View style={styles.saleBody}>
                <Text style={styles.saleSubTitle}> - 상품금액  </Text>
                <Text style={styles.greyDescription}>
                  -{numberWithCommas(prices.price)}원
               </Text>
              </View>  */}
              <View style={styles.saleDownBody}>
                <Text style={styles.saleSubTitle}> - 옵션추가금액</Text>
                <Text style={styles.greyDescription}>
                   {numberWithCommas(prices.optionPrice)}원
               </Text>
              </View> 
            </View> 

            {/* <View style={styles.content}>
                <Text style={styles.greySubtitle}>즉시할인</Text>
                <Text style={styles.description}>{numberWithCommas(prices.salePrice)}원</Text>
            </View> */}

            <View style={styles.content}>
                <Text style={styles.greySubtitle}>포인트사용</Text>
                <Text style={styles.greyPointDescription}> -{numberWithCommas(detail.txn_point_used)}원</Text>
            </View>

            {/* <View style={styles.saleInfoContent}>
              <View style={styles.saleBodyFrame}>
                <Text style={styles.greySubtitle}>총 할인금액</Text>
                  <Text style={styles.description}>
                    <Text style={styles.greyFont}>쿠폰할인  </Text> 
                    {numberWithCommas(-detail.txn_point_used + detail.txn_coupon_discount + prices.salePrice)}원
                </Text>
              </View>
              

                <View style={styles.saleBody}>
                  <Text style={styles.saleSubTitle}>즉시할인</Text>
                  <Text style={styles.greyDescription}>
                    -{numberWithCommas(prices.salePrice)}원
                  </Text>
                </View> 

              {
                detail.cp_name ? 
                <View style={styles.saleBody}>
                  <Text style={styles.saleSubTitle}>{detail.cp_name ? detail.cp_name : "쿠폰"}</Text>
                  <Text style={styles.greyDescription}>
                    -{numberWithCommas(detail.txn_coupon_discount)}원
                  </Text>
                </View> 
                :
                null
              }
            
              <View style={styles.saleDownBody}>
                <Text style={styles.saleSubTitle}>포인트</Text>
                <Text style={styles.greyDescription}>
                  -{numberWithCommas(-detail.txn_point_used)}원
               </Text>
              </View> 

            </View>  */}
            {
              shipPrice < detail.txn_shipping ? 
              <View style={styles.content}>
                  <Text style={styles.greySubtitle}>도서산간 배송비</Text>
                  <Text style={styles.description}>{numberWithCommas(detail.txn_shipping)}원</Text>
              </View>
              :
              null
              
            }

            <View style={styles.content}>
                <Text style={styles.greySubtitle}>배송비</Text>
                {
                  appInfo._shipLimit < detail.txn_grand_total - detail.txn_shipping ? 
                  <Text style={styles.description}>배송비 무료</Text>
                  :  
                  <Text style={styles.description}>{numberWithCommas(shipPrice)}원</Text>
                }
            </View>

            <View style={styles.content}>
                <Text style={styles.result}>총 결제금액</Text>
                <Text style={styles.resultPoint}>{numberWithCommas(detail.txn_grand_total)}원</Text>
            </View>
          </View>
          :
          null
        }
      </View>
    );
  }
  


const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });


const styles = EStyleSheet.create({
  container: {
    width:"100%",
    alignItems: "center",
    justifyContent: "center",
  },
  titleContainer:{
    width:"90%",
    height:"35rem",
    marginTop:"20rem",
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
  },
  image:{
    marginLeft:"auto",
  },
  title:{
    fontSize:"14.8rem",
    fontFamily:"NotoSansKR-Bold",
    color:"black",
  },
  contentContainer:{
    width:"100%",
    paddingLeft:"20rem",
  },
  content:{
    flexDirection: 'row',
    marginTop:"15rem",
    borderBottomColor: '#efefef',
    borderBottomWidth: 1.2,
    paddingBottom:"10rem",
    paddingRight:"20rem",
  },
  saleInfoContent:{
    marginTop:"15rem",
    borderBottomColor: '#efefef',
    borderBottomWidth: 1.2,
    paddingRight:"20rem",
  },
  saleBodyFrame:{
    flexDirection: 'row',
  },
  saleBody:{
    flexDirection: 'row',
    bottom:"8rem"
  },
  saleDownBody:{
    flexDirection: 'row',
    bottom:"16rem"
  },
  greySubtitle:{
    fontSize:"13.873rem",
    color:"#878787",
    fontFamily:"NotoSansKR-Medium",
  },
  subtitle:{
    color:"black",
    fontSize:"13.873rem",
    width:"90rem",
    fontFamily:"NotoSansKR-Medium",
  },
  greyFont:{
    color:"#878787",
    fontSize:"12rem",
  },
  result:{
    color:"black",
    fontSize:"16rem",
    width:"90rem",
    fontFamily:"NotoSansKR-Medium",
  },
  resultPoint:{
    color:"#26CBFF",
    fontSize:"16rem",
    fontFamily:"Montserrat-Medium",
    top:"10rem",
    marginLeft:"auto",
  },
  description:{
    top:"10rem",
    fontSize:"13.873rem",
    marginLeft:"auto",
    fontFamily:"Montserrat-Medium",
  },
  saleSubTitle:{
    fontSize:"13.873rem",
    width:"90rem",
    color:"#878787",
    fontFamily:"NotoSansKR-Medium",
    left:"17rem"
  },
  greyDescription:{
    color:"#878787",
    top:"10rem",
    fontSize:"13.873rem",
    marginLeft:"auto",
    fontFamily:"Montserrat-Medium",
  },
  greyPointDescription:{
    color:"red",
    top:"10rem",
    fontSize:"13.873rem",
    marginLeft:"auto",
    fontFamily:"Montserrat-Medium",
  },

 
});