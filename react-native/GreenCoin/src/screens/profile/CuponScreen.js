import React,{useState,useEffect} from 'react';
import { Text, View, Dimensions, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import CommonTitleBar from '../../components/comm/CommonTitleBar'
import CuponContent from '../../components/profiles/point/CuponContent';
import AbleCuponSearch from '../../components/profiles/point/AbleCuponSearch';
import EmptyContent from '../../components/profiles/point/EmptyContent';

import {navigationBackHandler} from '../../navigation/NavigationBackHandler';
import { ScrollView } from 'react-native-gesture-handler';

import userInfoSingleton from '../../db/userInfoSingleton';
import CuponServerController from '../../server/CuponServerController';


const emptyLabels = [
  "쿠폰이 없습니다.",
  "용된다에서 쿠폰을 모아 혜택을 누려보세요!"
] 


//<EmptyContent label={emptyLabels}></EmptyContent>
export default function CuponScreen() {

  const [itemList,setItemList] = useState([]);
  const [sort,setSort] = useState(false);
  const [couponCount,setCouponCount] = useState(0);
  navigationBackHandler();

  const callBack = (data)=>{
    setItemList(data);
    setCouponCount(data.length);
  }

  const clickUsedCouponOnly = () =>{

    var count = 0;
    itemList.map((value)=>{  
      let active = new Date(value.cp_expiration).getTime() > new Date().getTime();
      if(!sort && active)
        count++;
    })

    setCouponCount(!sort ? count : itemList.length);
    setSort(!sort);
    
  }

  useEffect(() => {
    var formData = new FormData();
    formData.append("mem_id",userInfoSingleton.getInstance()._userId);
    CuponServerController.getCuponListByUserId(formData,callBack);
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
      CuponServerController.getCuponListByUserId(formData,function(res){
        setItemList(itemList.concat(res));
        if(res.length > 0)
          isEvent =false;
      });
    }
  }

    return (
      <ScrollView style={styles.container} onScroll={scrollEvent}>
        <CommonTitleBar title={<Text>쿠폰 <Text style={{color:"#26CBFF"}}>{couponCount}</Text></Text>} leftOption={"back"}></CommonTitleBar>
        <AbleCuponSearch clickUsedCouponOnly={clickUsedCouponOnly} sort={sort} ></AbleCuponSearch>
        {
          itemList.length == 0 || itemList == null ?
          <EmptyContent label={emptyLabels}/>
          :
          itemList.map((value)=>{  
            let date = value.cp_expiration.split('.')[0];
            let active = new Date(date).getTime() > new Date().getTime();
            return sort ? 
                    active ? 
                    <CuponContent item={value} active={active}></CuponContent> 
                    : 
                    null 
                  : 
                  <CuponContent item={value} active={active}></CuponContent>
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