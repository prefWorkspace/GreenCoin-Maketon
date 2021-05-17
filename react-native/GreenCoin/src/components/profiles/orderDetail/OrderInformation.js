import React, {useState} from 'react';
import { Text, View, Dimensions,Image, TouchableOpacity, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';


function getDateType(date){
  function checkZero(checkString){
    return checkString.toString().length == 1 ?  "0" + checkString : checkString;
  }
  var temp = `${checkZero(date.getFullYear())}-${checkZero(date.getMonth() + 1)}-${checkZero(date.getDate())}`
          + ` ${checkZero(date.getHours())}:${checkZero(date.getMinutes())}:${checkZero(date.getSeconds())}`;
  return temp;
}

function getOrderTime(txn_date){

  const date = txn_date.split('T');
  return date[0] + " " + date[1].split('.')[0];
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function getMessageArray(detail,list){

  let result = [];
  list.map((item)=>{
    if(item.mog_returned_date){
      result.push(
        <Text style={styles.description}>{'반품완료[' + getDateType(new Date(item.mog_returned_date.split('.')[0])) + ']'}</Text>
      )
    }
    else if(item.mog_cancelled_date){
      result.push(
        <Text style={styles.description}>{'취소완료[' + getDateType(new Date(item.mog_cancelled_date.split('.')[0])) + ']'}</Text>
      )
    }
    else if(item.mog_swapend_date){
      result.push(
        <Text style={styles.description}>{'교환완료[' + getDateType(new Date(item.mog_swapend_date.split('.')[0])) + ']'}</Text>
      )
    }
  })

  if(result && result.length > 0){
    return result;
  }
  return <Text style={styles.description}>개별처리</Text>;
}

export default function OrderInformation({detail, list}) {
    const [dropDown,setDropDown] = useState(true);

    return (
      <View style={styles.container}>
          <TouchableOpacity style={styles.titleContainer} onPress={()=>{setDropDown(!dropDown)}}>
          <Text style={styles.title} >결제정보</Text>
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
                <Text style={styles.subtitle}>주문번호</Text>
                <Text style={styles.description}>{detail.merchant_uid}</Text>
            </View>
            <View style={styles.content}>
                <Text style={styles.subtitle}>주문일자</Text>
            <Text style={styles.description}>{getOrderTime(detail.txn_date)}</Text>
            </View>
            <View style={styles.content}>
                <Text style={styles.subtitle}>주문자</Text>
                <Text style={styles.description}>{detail.mem_name}</Text>
            </View>
            <View style={styles.content}>
                <Text style={styles.subtitle}>처리상태</Text>
                <View>
                {
                  detail.txn_order_state_name == "입금 대기" && detail.vbank_name ?  
                  <Text style={styles.description}>{`[가상계좌 입금] \n[${detail.vbank_name} ${detail.vbank_num} ${detail.vbank_holder}]\n[금액 ${numberWithCommas(detail.txn_grand_total)}원]`}</Text>
                  :
                  getMessageArray(detail,list)
                }
                <Text style={styles.description}>
                </Text>
                </View>
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
    color:"black",
    fontFamily:"NotoSansKR-Bold",
  },
  contentContainer:{
    width:"100%",
    paddingLeft:"20rem",
  },
  content:{
    flexDirection: 'row',
    paddingBottom:"10rem",
    borderBottomColor: '#efefef',
    borderBottomWidth: 1.2,
    marginTop:"15rem",
  },
  subtitle:{
    fontSize:"13.873rem",
    width:"90rem",
  },
  description:{
    fontSize:"13.873rem",
    marginLeft:"10rem",
  },

 
});