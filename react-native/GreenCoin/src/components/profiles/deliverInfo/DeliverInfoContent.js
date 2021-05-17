import React , {useState,useEffect} from 'react';
import { Text,Image,View, Dimensions,Linking,TouchableOpacity, Alert } from 'react-native';
import EStyleSheet, { value } from 'react-native-extended-stylesheet';
import DeliverInfoItem from './DeliverInfoItem';
import DeliverInfoModal from './DeliverInfoModal';
import CartOptionModal from '../../carts/cart/CartOptionModal';

import { useNavigation ,useRoute} from '@react-navigation/native';
import orderSeverController from '../../../server/orderSeverController';
import userInfoSingleton from '../../../db/userInfoSingleton';
import ModalContent from '../../comm/ModalContent';

export default function DeliverInfoContent({moveToOrderDetail,list,getTranscationList}) {
    const navigation = useNavigation();
    const [isModalVisible , setModalVisible] = useState(false);
    const [selectItem,setSelectItem] = useState(null);
    const [reqeust,setReqeust] = useState(null);
    const routeInfo = useRoute();

    async function kakaolinkText () {
      Linking.openURL('https://pf.kakao.com/_dexmSK');
    };


    const callBack = (data)=>{
      if(data == 1){
        Alert.alert(" ","성공적으로 요청 완료 되었습니다.");
        navigation.goBack();
      }
      else if(data == -1){
        setReqeust(true);
      }
    }

    const setAddress = (data) =>{
      if(!selectItem){
        Alert.alert(" ","다시 시도해주세요");
        return;
      }

      data.addr_zipcode = data.zipNo ? data.zipNo : data.addr_zipcode;
      data.addr_title = data.jibunAddr ? data.jibunAddr : data.addr_title;
      var formData = new FormData();
      formData.append("mem_id",userInfoSingleton.getInstance()._userId);
      formData.append("txn_id",selectItem.txn_id);
      formData.append("mog_idx",selectItem.mog_idx);
      formData.append("address", data.addr_title + " " + data.addr_wireline);
      formData.append("zipcode", data.addr_zipcode);
      formData.append("txn_update_require", 20);
      formData.append("mog_order_status", 20);

      orderSeverController.updateAddress(formData,callBack);
    };
    const optionChange = (item) =>{ setSelectItem(item); setModalVisible(true); }
    const writeChangeRequire = (item) =>{ navigation.navigate("교환신청",{  root:routeInfo.name,item:item}); }
    const wrtieRefundRequire = (item) =>{ navigation.navigate("반품신청",{  root:routeInfo.name,item:item}); }
    const setAddressInfomation = (item) =>{ setSelectItem(item);  navigation.navigate("address",{  root:routeInfo.name,setAddress:setAddress ,order :false}); }
    const writeReview = (item) =>{ navigation.navigate("writeReview",{  root:routeInfo.name,item:item,txn_mog:item }); }
    
    const cancelItem = (item) =>{ 
      setSelectItem(item);  
      var formData = new FormData();
      formData.append("mem_id",userInfoSingleton.getInstance()._userId);
      formData.append("txn_id",item.txn_id);
      formData.append("txn_update_require", 3);
      formData.append("mog_order_status", 3);
      formData.append("mog_idx", item.mog_idx);
      formData.append("imp_uid", item.imp_uid);
      orderSeverController.cancelTransactionOption(formData,callBack);
    }

    const vBankCancel = (item) =>{
      var formData = new FormData();
      formData.append("mem_id",userInfoSingleton.getInstance()._userId);
      formData.append("txn_id",item.txn_id);
      formData.append("txn_update_require", 11);
      formData.append("mog_order_status", 11);
      formData.append("mog_idx", item.mog_idx);
      formData.append("imp_uid", item.imp_uid);
      formData.append("merchant_uid", item.merchant_uid);
      orderSeverController.cancelVbankTranscation(formData,function(res){
        if(res){
          getTranscationList();
        }
      });
    }

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
        return <DeliverInfoItem type={"결제 실패"} 
                value={value}
                count={count} /> ;
       }

       if(compareWithArray([51,53,54,55],idx)){
          return <DeliverInfoItem type={"반품중"} 
                  value={value}
                  count={count} /> ;
       }
       else if(compareWithArray([58,59,60,61],idx)){
          return <DeliverInfoItem type={"교환중"} 
                  value={value}
                  count={count} /> ;
      }
      else if(compareWithArray([13,14,20],idx)){
          return <DeliverInfoItem type={"상품준비중"} 
                   bottomOption={{option:true}}  
                   options={{firstOption:optionChange,secondOption:setAddressInfomation,}} 
                   value={value}
                   cancelItem={cancelItem}
                   count={count}/> 
      }
      switch(idx){
        case -1 : return <DeliverInfoItem type={"결제 취소"} value={value}  count={count}/>
                                               
        case 0 : return (
          <DeliverInfoItem 
            type={"가상계좌입금대기"} 
            value={value}  
            count={count}
            vBankbottomOption={{option:true}}  
            options={{firstOption:vBankCancel}} 
          />
        )

        case 5 : return  <DeliverInfoItem type={"옵션변경 요청"}  value={value}count={count} />
        case 6 : return  <DeliverInfoItem type={"배송지변경 요청"}  value={value}count={count} />

        case 11 : return <DeliverInfoItem type={"취소완료"} value={value}count={count}/>

        case 30 : return <DeliverInfoItem type={"배송 준비"} optinos={{}} value={value} count={count}/>                     
        case 41 : return <DeliverInfoItem type={"배송중"} optinos={{}} value={value} count={count} /> 

        case 42 : return  <DeliverInfoItem type={"배송완료"} 
                            bottomOption={{option:false}}  
                            options={{firstOption:writeChangeRequire ,secondOption:wrtieRefundRequire,thirdOption:writeReview}}
                            value={value}
                            count={count} />
        case 43 : return  <DeliverInfoItem type={"부분배송중"} value={value} count={count} />  
                                                            
        case 50 : return  <DeliverInfoItem type={"반품요청"} value={value} count={count} />   
        case 52 : return  <DeliverInfoItem type={"반품 완료"} value={value} count={count} /> 

        case 57 : return  <DeliverInfoItem type={"교환요청"} value={value} count={count} /> 
        case 62 : return  <DeliverInfoItem type={"교환 완료"} value={value} count={count} />      

        case 70 : return  <DeliverInfoItem type={"취소완료"} value={value}count={count}/>           

        case 71 : return  <DeliverInfoItem type={"주문취소 요청"} value={value}count={count} /> 
        case 72 : return  <DeliverInfoItem type={"주문취소 요청"} value={value} count={count} /> 
        case 73 : return  <DeliverInfoItem type={"취소 거부"}  value={value} count={count} />   
                     
      }

      return <DeliverInfoItem type={"처리중"}  value={value} count={count} />   
    }

    return (
      <TouchableOpacity style={styles.container} onPress={moveToOrderDetail}>
          <View style={styles.labelContainer}>
              <Text style={styles.title}>{list[0].txn_date} [{list[0].merchant_uid}]</Text>
              <Text style={styles.search} onPress={moveToOrderDetail}>주문상세조회<Image resizeMode={"stretch"} source={require('../../../assets/img/label_point/rightClickPoint.png')}/></Text>
          </View>
          <View style={styles.bottomBorder}/>
          {
            list.map((value)=>{
              console.log(value.mog_order_status);
              return getDeliverItemInfoByOrderState(value,list.length)
            })
          }
        <CartOptionModal order={true} isModalVisible={isModalVisible} modalItem={selectItem} setModalVisible={setModalVisible}/>
        <ModalContent modalType={"RequestAddressKakao"} bottomType={"select"} isModalVisible={reqeust} setIsModalVisible={setReqeust} submitClick={kakaolinkText}></ModalContent>
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
    paddingBottom:"30rem",
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
