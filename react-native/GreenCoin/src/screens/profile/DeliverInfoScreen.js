import React,{useState,useEffect} from 'react';
import { Text, View, Dimensions, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import CommonTitleBar from '../../components/comm/CommonTitleBar';
import MarginBox from '../../components/comm/MarginBox';
import PointContent from '../../components/profiles/point/PointContent';
import EmptyContent from '../../components/profiles/point/EmptyContent';
import DeliverInfoSelectTab from '../../components/profiles/deliverInfo/DeliverInfoSelectTab';
import DeliverInfoSelectHistory from '../../components/profiles/deliverInfo/DeliverInfoSelectHistory';
import DeliverInfoContent from '../../components/profiles/deliverInfo/DeliverInfoContent';
import DeliverInfoCancelContent from '../../components/profiles/deliverInfo/DeliverInfoCancelContent';



import { useFocusEffect, useNavigation } from '@react-navigation/native';
import {navigationBackHandler} from '../../navigation/NavigationBackHandler';
import { ScrollView } from 'react-native-gesture-handler';

import orderSeverController from '../../server/orderSeverController';
import userInfoSingleton from '../../db/userInfoSingleton';
import ModalCalendar from '../../components/comm/ModalCalendar';

const emptyLabels = [
  "포인트가 없습니다.",
  "용된다에서 포인트를 모아 혜택을 누려보세요!"
] 



function getDateType(date){
  function checkZero(checkString){
    return checkString.toString().length == 1 ?  "0" + checkString : checkString;
  }
  var temp = `${checkZero(date.getFullYear())}-${checkZero(date.getMonth() + 1)}-${checkZero(date.getDate())}`;
  return temp;
}

function listInit(list){
  var templist = {};
  var itemList = [];

  list.map((value)=>{
    let date = value.txn_date.split('.')[0];
    value.txn_date = getDateType(new Date(date));
    if(templist[value.txn_id])
      templist[value.txn_id].push(value);
    else
      templist[value.txn_id] = [value];
  })

  for (const [key, value] of Object.entries(templist)){
      itemList.unshift(value)
  }
  return itemList;
}

export default function DeliverInfoScreen({route}) {
  const navigation = useNavigation();
  const [itemlist,setItemList] = useState([]);
  const [cancelItemlist,setCancelItemList] = useState([]);
  const [tabSelect,setTabSelect] = useState(true);
  const [startDate,setStartDate] = useState("");
  const [endDate,setEndDate] = useState("");
  const [show,setShow] = useState({show: false, type:"start"});

  navigationBackHandler();

  //서버에서 받은 주문/배송조회 jsonlist를 주문별 배열로 나눠주는 곳 
  const callBack = (data)=>{
    setItemList(listInit(data.orderList));
    setCancelItemList(listInit(data.canceOrderlList));
  }

  //검색!
  const clickSearchOrder =(start,end)=>{
    var formData = new FormData();
    formData.append("mem_id",userInfoSingleton.getInstance()._userId);
    formData.append("start",start == undefined ? null : start);

    if(!tabSelect)
      formData.append("cancel",true);
    
    if(end == undefined){
      orderSeverController.getTransactionListByUserName(formData,callBack);
    }
    else if(start.length != 10 || end.length != 10){
        Alert.alert(" ","조회 기간을 제대로 입력해주세요");
    }
    else{
      formData.append("end",end == undefined ? null : end);

      orderSeverController.getTransactionListByUserName(formData,callBack);
    }
  }


  function getTranscationList(){
    var formData = new FormData();
    formData.append("mem_id",userInfoSingleton.getInstance()._userId);
    orderSeverController.getTransactionListByUserName(formData,callBack);
  }

  useFocusEffect(
    React.useCallback(() => {
      getTranscationList();
    }, [])
  );

  const clickDate = (d) =>{
    let date = new Date(d);
    let resultDate = date.getFullYear() + "-" + (date.getMonth() + 1 < 10 ? "0" + (date.getMonth()  + 1) : date.getMonth() + 1) + "-"
    +  (date.getDate() < 10 ? "0" + (date.getDate()) : date.getDate());


    if(show.type == "start")
      setStartDate(resultDate);
    else
      setEndDate(resultDate);

    setShow({show:!show.show , type:show.type});
   }

    return (
      <View>
        <ScrollView style={styles.container}>
          <CommonTitleBar title={"주문/배송조회"} leftOption={"back"}/>
          <DeliverInfoSelectTab length={itemlist.length} cancelLength={cancelItemlist.length} tabSelect={tabSelect} setTabSelect={setTabSelect}/>
          <DeliverInfoSelectHistory endDate={endDate} setShow={setShow} startDate={startDate} clickSearchOrder={clickSearchOrder}/>
          {
            //주문 정보
            (tabSelect ? itemlist : cancelItemlist).length > 0
            ?
            (tabSelect ? itemlist : cancelItemlist).map((list)=>{
                if(!list[0].mog_option)
                  return null;
              var moveToOrderDetail = () =>{
                navigation.navigate("주문상세조회",{id:list[0].txn_id,list:list});
              };

              return  tabSelect ? 
              <DeliverInfoContent moveToOrderDetail={moveToOrderDetail} list={list} getTranscationList={getTranscationList}/>
              :
              <DeliverInfoCancelContent moveToOrderDetail={moveToOrderDetail} list={list}/>
              })
            :
            null
          }
          <MarginBox height={40}/>
        </ScrollView>
        <View style={styles.modalCalendar}>
          <ModalCalendar show={show} setShow={setShow} clickDate={clickDate}></ModalCalendar>
        </View>
      </View>
    );
  }
  


const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });


const styles = EStyleSheet.create({
  container: {
    backgroundColor:"white",
  },
  height:{
    height:"100rem",
  },
  modalCalendar:{
    backgroundColor:"white",
  },
});