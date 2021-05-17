import React,{useState,useEffect} from 'react';
import { Text,View, BackHandler, Dimensions,ScrollView,StyleSheet, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import CommonTitleBar from '../../components/comm/CommonTitleBar'
import ReviewItem from '../../components/review/ReviewItem';
import ModalContent from '../../components/comm/ModalContent';

import {navigationBackHandler} from '../../navigation/NavigationBackHandler';
import reviewServerController from '../../server/reviewServerController';
import userInfoSingleton from '../../db/userInfoSingleton';

export default function ReviewResultScreen() {
  const [isModalVisible,setIsModalVisible] =useState(false);
  const [reviewList,setReviewList] =useState([]);
  const [deleteInfo,setDeleteInfo] = useState({});
  navigationBackHandler();

  const callBack = (data)=>{
    setReviewList(data);
  }
  
  const deleteState = (data)=>{
    if(data != 0){
      Alert.alert(" ","삭제 완료");
      reviewServerController.getReviewListByUserId(userInfoSingleton.getInstance()._userId,callBack);
    }
    else
      Alert.alert(" ","삭제 실패");
     
  }

  const deleteReview = (item) =>{
    setDeleteInfo(item);
    setIsModalVisible(true);
  }

  const submitClick = () =>{
    setIsModalVisible(false);

    var formData = new FormData();
    formData.append('rev_id',deleteInfo.rev_id);
    formData.append('mem_id',userInfoSingleton.getInstance()._userId);
    reviewServerController.deleteReviewByIds(formData,deleteState)
  }

  useEffect(() => {
    reviewServerController.getReviewListByUserId(userInfoSingleton.getInstance()._userId,callBack);
  }, []);

    return (
      <ScrollView style={styles.container}>
        <CommonTitleBar title={"구매후기내역"} leftOption={"back"}/>
        {
          reviewList && reviewList.length > 0 ?
          reviewList.map((item)=>{
            return <ReviewItem item={item} deleteReview={deleteReview}/>
          })
          :
          <View style={styles.titleContainer}>
            <Text style={styles.title}>구매후기가 없습니다.</Text>
          </View>
        }
        <ModalContent modalType={"Delete"} bottomType={"select"} isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} submitClick={submitClick}/>
      </ScrollView>
    );
}

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

const c = StyleSheet.create({
  
})
const styles = EStyleSheet.create({
  container: {
    width :"100%",
    height:"100%",
    backgroundColor:"white",
  },
  form:{ 
    width:"100%",  
    justifyContent: "flex-start",
    flexWrap: 'wrap',
    flexDirection: 'row',
    backgroundColor:"white",
    marginBottom:"40rem",
    marginTop:"20rem",    
    justifyContent: "center",
    alignItems: "center",
  },
  label:{
    left:"8rem",
  },
  clear:{
    margin:"3.5rem",
    width :"155.877rem",
    height:"56.316rem",
    fontSize:"14.864rem",
    textAlign: "center",
    backgroundColor:"#DFE1E8",
    borderRadius:100,
    paddingVertical: "6.5rem",
    fontFamily:"NotoSansKR-Medium",
    color:"#FFFFFF"
  }, 
  submit:{
    margin:"3.5rem",
    width :"155.877rem",
    height:"56.316rem",
    fontSize:"14.864rem",
    textAlign: "center",
    backgroundColor:"#0D2141",
    borderRadius:100,
    paddingVertical: "6.5rem",
    fontFamily:"NotoSansKR-Medium",
    color:"#FFFFFF"
  },
  hr:{
    padding:"15rem",
    borderBottomColor: '#efefef',
    borderBottomWidth: 1,
  },
  titleContainer:{
    width:"100%",
    height:"200rem",
    alignItems: "center",
    justifyContent: "center",
  },
  title:{
    fontSize:"16rem",
    fontFamily:"NotoSansKR-Bold",
  }
  
});