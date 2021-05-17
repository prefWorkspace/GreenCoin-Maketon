import * as React from 'react';
import { Text,Image, View, Dimensions,ScrollView,StyleSheet,TouchableOpacity, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import DetailReviewItem from './DetailReviewItem';
import DetailListController from '../DetailListController';
import { useNavigation ,useRoute} from '@react-navigation/native';
import MarginBox from '../../MarginBox';
import userInfoSingleton from '../../../../db/userInfoSingleton';
import reviewServerController from '../../../../server/reviewServerController';

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

export default function DetailReviewList({count,reviewList,moreView,productInfo}){
  const navigation = useNavigation();
  const routeInfo = useRoute();
     
  const callBack = (data) =>{
    if(!data  || data.length == 0)
      return;

    for(var i =0;i<data.length;i++){
      if(data[i].rev_count == 0){
        navigation.navigate("writeReview",{productInfo:productInfo,root:"itemDetail", txn_mog : data[i]});
        return;
      }
    }
  }

  const moveToWriteReviewPage = () =>{
    if(userInfoSingleton.getInstance()._isLogin != true){
      navigation.navigate("selectLoginOrRegister",{root:routeInfo.name});
      return;
    }

    var formData = new FormData();
    formData.append("mem_id", userInfoSingleton.getInstance()._userId);
    formData.append("prd_id", productInfo.prd_id);

    reviewServerController.getWriteReviewAble(formData,callBack);
    
  }



  return (
    <View style={styles.container}>
      {
        reviewList != undefined ?
          reviewList.map((item)=>{
            return <DetailReviewItem item={item}></DetailReviewItem>
          })
          :
          null
      }
         <MarginBox height={30}/>
      <DetailListController 
        active={ count != reviewList.length } 
        writeTitle={null} 
        writeEvent={moveToWriteReviewPage} 
        moreView={moreView}/>
    </View>
  )
};


const styles = EStyleSheet.create({
  container:{
    width:"100%",
    alignItems: "center",
    justifyContent :"center",
  },
});