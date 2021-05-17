import React,{useState,useEffect} from 'react';
import { Text, View, Dimensions, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import CommonTitleBar from '../../components/comm/CommonTitleBar'
import PointContent from '../../components/profiles/point/PointContent';
import EmptyContent from '../../components/profiles/point/EmptyContent';


import { ScrollView } from 'react-native-gesture-handler';

import {navigationBackHandler} from '../../navigation/NavigationBackHandler';

import userInfoSingleton from '../../db/userInfoSingleton';
import pointServerConroller from '../../server/pointServerConroller';

const emptyLabels = [
  "포인트가 없습니다.",
  "용된다에서 포인트를 모아 혜택을 누려보세요!"
] 



export default function PointScreen() {
  const [itemList,setItemList] = useState([]);

  navigationBackHandler();

  const callBack = (data)=>{
    setItemList(data);
  }

  useEffect(() => {
    var formData = new FormData();
    formData.append("mem_id",userInfoSingleton.getInstance()._userId);
    pointServerConroller.getPointListByUserId(formData,callBack);
  }, [])

  var isEvent = false;
  const  scrollEvent = (e)=>{
    if(isEvent)
      return;

    var paddingToBottom = 700;
    paddingToBottom += e.nativeEvent.layoutMeasurement.height;
    
    if (e.nativeEvent.contentOffset.y + paddingToBottom >= e.nativeEvent.contentSize.height) {
      
      var formData = new FormData();
      formData.append("mem_id",userInfoSingleton.getInstance()._userId);
      formData.append("offset",itemList.length);
      isEvent = true;
      pointServerConroller.getPointListByUserId(formData,function(res){
        setItemList(itemList.concat(res));
        if(res.length > 0)
          isEvent =false;
      });
    }
  }

    return (
      <ScrollView style={styles.container} onScroll={scrollEvent}>
        <CommonTitleBar title={"포인트"} leftOption={"back"}/>
        {
          itemList.length == 0 || itemList == null ?
          <EmptyContent label={emptyLabels}/>
          :
          itemList.map((value)=>{
            return  <PointContent item={value}/>         
          })
        }
      </ScrollView>
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
  }
});