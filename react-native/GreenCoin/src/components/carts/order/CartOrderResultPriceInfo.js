import React , {useState} from 'react';
import { Text, View, Dimensions,TouchableOpacity,Image,CheckBox ,TextInput} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import CartOrderResultPriceContent from './CartOrderResultPriceContent';
import MarginBox from '../../comm/MarginBox';
import appStaticInfomation from '../../../db/appStaticInfomation';

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

function numberWithCommas(x) {return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");}

export default function CartOrderResultPriceInfo({payLabel,isFreeShip,basicShipping,point,couponPrice,originalPrice,totalPrice,itemlist,shippingPrice ,shippnig }){

  const appInfo = appStaticInfomation.getInstance();

	function getProductPrices(){
		var productPriceSumResult = 0;
		var productOptionSumResult = 0;
		var productSalePrice = 0;
		for(var i =0;i<itemlist.length;i++){
			if(itemlist[i].cart_items){
        let priceInfo = getPrice(itemlist[i].cart_items);
        productPriceSumResult += priceInfo.price * itemlist[i].cart_items.count;
        productOptionSumResult += priceInfo.optionPrice * itemlist[i].cart_items.count;
        productSalePrice += priceInfo.salePrice * itemlist[i].cart_items.count;
			}
		}
    
		return { productPrice : productPriceSumResult , optionPrice : productOptionSumResult , salePrice : productSalePrice };
	}

    
  const getPrice = (option) => {
    let price = 0;
    let optionPrice = 0;
    let salePrice = 0;
    option.data.map((value)=>{
      var optionList = value.options.optionList;
      var p = 0;
      var o = 0;
      var s = 0;
      for(var calKey in optionList){
        for(var i =0;i<	optionList[calKey].length ;i++){
          o += optionList[calKey][i].opt_price;
        }
      }

      if(value.options.isSetOptional == true || value.options.isOptional == false){
        p += Math.round((value.prd_price) - ((value.prd_price) * (value.prd_sale_rate)) / 100);
        s += Math.round(((value.prd_price) * (value.prd_sale_rate)) / 100);
      }
      price += p * value.count;
      optionPrice += o * value.count;
      salePrice +=  s * value.count;

    });
		return { price : price , optionPrice : optionPrice , salePrice : salePrice };
  }

  const prices = getProductPrices();
  const detailList = [{},{title:"- 즉시 할인" ,subtitle:prices.salePrice},{title:"- 쿠폰할인",subtitle:couponPrice},{title:"- 포인트 할인",subtitle:point}];
  const priceList = [{title:"- 상품금액",subtitle:prices.productPrice},{title:"- 옵션추가금액",subtitle:prices.optionPrice}];


  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}> 
        <View  style={styles.titleContainer}>
          <Text style={styles.title}>최종 결제 금액</Text>
          <Text style={styles.titleRight}>총 {itemlist.length}개/{totalPrice}원</Text>
        </View>
        <MarginBox height={1.7} backgroundColor={"black"}></MarginBox>
        <View style={styles.contentContainer}>
          <CartOrderResultPriceContent titleActive={true} title={"결제수단"} content={"empty"} payContent={payLabel}/>
          <CartOrderResultPriceContent title={"총 주문금액"} content={originalPrice} />
          {/* <CartOrderResultPriceContent title={"즉시 할인"} content={numberWithCommas(parseInt(prices.salePrice))}/> */}
          <CartOrderResultPriceContent 
            contentColor={"red"}
            title={"할인 정보"} 
            subContent={point ? "포인트사용   " : "쿠폰사용   "} 
            content={couponPrice ? couponPrice : (parseInt(point) ? " " + numberWithCommas(-parseInt(point)) : "0")}/>
          {/* <CartOrderResultPriceContent title={"총 할인금액"} content={numberWithCommas(parseInt(couponPrice) + parseInt(point) + prices.salePrice)}  detailList={detailList}/> */}
          <CartOrderResultPriceContent title={"배송비"} content={isFreeShip ? "배송비 무료" : numberWithCommas(basicShipping)}/>
          {
            basicShipping < shippingPrice ? 
            <CartOrderResultPriceContent title={"도서산간 배송비"} content={"+"+numberWithCommas(shippnig - basicShipping)}/>
            :
            <CartOrderResultPriceContent title={"도서산간 배송비"} content={"0"}/>

            
          }
          {/* <CartOrderResultPriceContent title={"배송비"} content={numberWithCommas(basicShipping)}/> */}
          <CartOrderResultPriceContent titleActive={true} contentActive={true} title={"총 결제금액"} content={totalPrice}/>
        </View>
        
      </View>
      <MarginBox height={5} backgroundColor={"#F4F6F9"}></MarginBox>
    </View>
  )
};


const styles = EStyleSheet.create({
  container:{
  },
  itemContainer:{
    padding:"15rem",
    alignItems: "center", 
    justifyContent: "center",
  },
  contentContainer:{
    paddingLeft:"5rem",
    paddingRight:"5rem",
  },
  title:{
    fontFamily:"NotoSansKR-Bold",
    color:"#000000",
    fontSize:"17rem",
    marginRight:"auto",
  },
  titleRight:{
    marginLeft:"auto",    
    color:"#000000",
    fontSize:"17rem",
  },
  subtitle:{
    color:"#000000",
    fontSize:"14rem",
    marginRight:"auto",
  },
  content:{
    marginLeft:"auto",    
    color:"#000000",
    fontSize:"14rem",
  },
  titleContainer:{
    width:"100%",
    alignItems: "center", 
    justifyContent: "center",
    flexDirection: 'row',
  },
  labelContainer:{
    width:"100%",
    borderBottomWidth:1,
    borderColor:"#D2D5DA",
    paddingTop:"20rem",
    paddingBottom:"20rem",
  },
  label:{
    fontFamily:"NotoSansKR-Medium",
    color:"black",
    fontSize:"16rem",
  },
  labelPoint:{
    fontFamily:"NotoSansKR-Medium",
    color:"#26CBFF",
    fontSize:"16rem",
  }

});