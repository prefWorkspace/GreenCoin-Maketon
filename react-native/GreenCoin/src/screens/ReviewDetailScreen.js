import React,{useState,useEffect} from 'react';
import { Text, View, ScrollView,Dimensions,BackHandler, Alert } from 'react-native';

import DetailImageTitle from '../components/comm/itemDetail/DetailImageTitle';
import ReviewDetailTitle from '../components/comm/itemDetail/reviewDetail/ReviewDetailTitle';
import ReviewDetailItemInfo from '../components/comm/itemDetail/reviewDetail/ReviewDetailItemInfo';
import ReviewDetailUserTitle from '../components/comm/itemDetail/reviewDetail/ReviewDetailUserTitle';
import ReviewDetailContent from '../components/comm/itemDetail/reviewDetail/ReviewDetailContent';
import ReviewDetailThumb from '../components/comm/itemDetail/reviewDetail/ReviewDetailThumb';
import ReviewDetailReplyTitle from '../components/comm/itemDetail/reviewDetail/ReviewDetailReplyTitle';
import MarginBox from '../components/comm/MarginBox';
import CommonTitleBar from '../components/comm/CommonTitleBar';
import reviewServerController from '../server/reviewServerController';

import { useNavigation ,useIsFocused} from '@react-navigation/native';

import EStyleSheet from 'react-native-extended-stylesheet';
import {navigationBackHandler} from '../navigation/NavigationBackHandler';
import userInfoSingleton from '../db/userInfoSingleton';

export default function ReviewDetailScreen({route}){
    const navigation = useNavigation();
    const [reviewData ,setReviewData] =useState(null);
    const [productInfo ,setProductInfo] =useState(null);
    const [reviewLike ,setReviewLike] = useState(0);
    const [load ,setLoad] = useState(false);
    navigationBackHandler(route.params.root);
    
    function handleBackButtonClick() {
      navigation.navigate(route.params.root);
    }
    
    const callBack = (jsonData) => {
      if(!jsonData.review){
        Alert.alert(" ","로드할 수 없습니다.");
        navigation.goBack();
      }
      setReviewData(jsonData.review);
      setProductInfo(jsonData.productInfo);
      setReviewLike(jsonData.revLike);
      setLoad(true);
    }


    
  const updateCallBack = (data)=>{
    if(data == 1){
      return setReviewLike(reviewLike - 1);
    }
    else if(data == 2){
      return setReviewLike(reviewLike + 1);
    }
  }

  const updateScore = () =>{

    if(userInfoSingleton.getInstance()._userId == ""){
      navigation.navigate("selectLoginOrRegister");
      return;
    }
    var formData = new FormData();
    formData.append('rev_id',reviewData.rev_id);
    formData.append('mem_id',userInfoSingleton.getInstance()._userId);
    reviewServerController.updateReviewlikeScore(formData,updateCallBack);
  }

    useEffect(() => {
      setLoad(false);
     reviewServerController.getReviewDetailAndProductsByReviewId(route.params.id,callBack);
    }, [route]);

    if(load == false){
      return <View></View>
    }

    return (
        <View>
        <ScrollView style={styles.container}>
          <CommonTitleBar title={"구매후기"} rightOption={"close"} rightClick={handleBackButtonClick}></CommonTitleBar>
          <DetailImageTitle  item={reviewData} productInfo={productInfo}></DetailImageTitle>
          <ReviewDetailTitle reviewData={reviewData}  productInfo={productInfo}></ReviewDetailTitle>
          <MarginBox height={7} backgroundColor={"#F4F6F9"} ></MarginBox>
          <View style={styles.reviewContainer}>
            <ReviewDetailItemInfo item={reviewData}></ReviewDetailItemInfo>
          </View>
          <MarginBox height={4} backgroundColor={"#F4F6F9"} ></MarginBox>
          <View style={styles.reviewContainer}>
            <ReviewDetailUserTitle item={reviewData}></ReviewDetailUserTitle>
            <ReviewDetailContent content={reviewData ? reviewData.rev_content : ""}></ReviewDetailContent>
            <ReviewDetailThumb helped={reviewLike} updateScore={updateScore}></ReviewDetailThumb>
          </View>
          <MarginBox height={4} backgroundColor={"#F4F6F9"} ></MarginBox>
          {
            reviewData && reviewData.rev_content_reply ? 
             <View style={styles.reviewContainer}>
              <ReviewDetailReplyTitle date={reviewData.rev_content_reply_date}></ReviewDetailReplyTitle>
              <ReviewDetailContent content={reviewData.rev_content_reply}></ReviewDetailContent>
              <MarginBox height={50}></MarginBox>
            </View>
            :
            null
          }
        </ScrollView>
        </View>
    )
}


const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });


const styles = EStyleSheet.create({
  container: {
    width:"100%",
    height:"100%",
    backgroundColor:"white",
    borderRadius:10,
  },
  reviewContainer:{
    padding:"15rem",
  },
  width:{
    width:"414rem",
  }


});