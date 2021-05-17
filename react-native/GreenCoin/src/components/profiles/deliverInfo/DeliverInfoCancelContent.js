import React , {useState,useEffect} from 'react';
import { Text,Image,View, Dimensions,ScrollView,TouchableOpacity, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import DeliverInfoCancelItem from './DeliverInfoCancelItem';
import DeliverInfoModal from './DeliverInfoModal';
import CartOptionModal from '../../carts/cart/CartOptionModal';

import { useNavigation } from '@react-navigation/native';
import orderSeverController from '../../../server/orderSeverController';
import userInfoSingleton from '../../../db/userInfoSingleton';

export default function DeliverInfoCancelContent({moveToOrderDetail,list}) {
    const navigation = useNavigation();
    const [isModalVisible , setModalVisible] = useState(false);
    const [selectItem,setSelectItem] = useState(null);

   
    

    const compareWithArray = (valueArray, number) =>{
      for(var i =0;i<valueArray.length;i++){
        if(valueArray[i] == number)
            return true;
      }
      return false;
  }

    const getDeliverItemInfoByOrderState = (value,count) =>{
      var idx = value.mog_order_status;

      if(compareWithArray([12],idx)){
        return <DeliverInfoCancelItem type={"결제 실패"} 
                value={value}
                count={count} /> ;
       }

       if(compareWithArray([51,53,54,55],idx)){
          return <DeliverInfoCancelItem type={"반품중"} 
                  value={value}
                  count={count} /> ;
       }
       else if(compareWithArray([58,59,60,61],idx)){
          return <DeliverInfoCancelItem type={"교환중"} 
                  value={value}
                  count={count} /> ;
      }

      switch(idx){
        case -1 : return <DeliverInfoCancelItem type={"결제 취소"} value={value}  count={count}/>
        
        case 0 : return <DeliverInfoCancelItem type={"가상계좌입금대기"} value={value}  count={count}/>
                                               
        case 5 : return  <DeliverInfoCancelItem type={"옵션변경 요청"}  value={value}count={count} />
        case 6 : return  <DeliverInfoCancelItem type={"배송지변경 요청"}  value={value}count={count} />

        case 11 : return <DeliverInfoCancelItem type={"취소완료"} value={value}count={count}/>

        case 50 : return  <DeliverInfoCancelItem type={"반품요청"} value={value} count={count} />   
        case 52 : return  <DeliverInfoCancelItem type={"반품 완료"} value={value} count={count} /> 

        case 57 : return  <DeliverInfoCancelItem type={"교환요청"} value={value} count={count} /> 
        case 62 : return  <DeliverInfoCancelItem type={"교환 완료"} value={value} count={count} />      

        case 70 : return  <DeliverInfoCancelItem type={"취소완료"} value={value}count={count}/>           

        case 71 : return  <DeliverInfoCancelItem type={"주문취소 요청"} value={value}count={count} /> 
        case 72 : return  <DeliverInfoCancelItem type={"주문취소 요청"} value={value} count={count} /> 
        case 73 : return  <DeliverInfoCancelItem type={"취소 거부"}  value={value} count={count} />   
    }
    return <DeliverInfoCancelItem type={"처리중"}  value={value} count={count} />   
  }


    return (
      <TouchableOpacity style={styles.container} onPress={moveToOrderDetail}>
          <View style={styles.labelContainer}>
              <Text style={styles.title}>{list[0].txn_date} [{list[0].merchant_uid}]</Text>
              <Text style={styles.search} onPress={moveToOrderDetail}>주문상세조회<Image resizeMode={"stretch"}  source={require('../../../assets/img/label_point/rightClickPoint.png')}/></Text>
          </View>
          <View style={styles.bottomBorder}/>
          {
            list.map((value)=>{
              return getDeliverItemInfoByOrderState(value,list.length)
            })
          }
        {/* <CartOptionModal order={true} isModalVisible={isModalVisible} modalItem={selectItem} setModalVisible={setModalVisible}/> */}
      </TouchableOpacity>
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
  labelContainer:{
    width:"90%",
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
    marginTop:"10rem",
  },
  bottomBorder:{
    width:"90%",
    marginTop:"10rem",
    borderBottomWidth:2,
    borderBottomColor :"black",
    backgroundColor:"white",
  },
  title:{
    marginRight:"auto",
    fontFamily:"NotoSansKR-Bold",
  },
  search:{
    marginLeft:"auto",
    fontFamily:"NotoSansKR-Bold",
  },



});
