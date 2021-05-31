import React, { Component,useState ,useEffect } from "react";
import { Dimensions, View,BackHandler,ScrollView,TouchableOpacity,Image } from "react-native";


import MainTitle from '../../components/mains/main/MainTitle';
import MainAreaTitle from '../../components/mains/main/MainAreaTitle';
import MainLikeInfo from '../../components/mains/main/MainLikeInfo';
// import MainDoubleClick from '../../components/mains/main/MainDoubleClick';
import EStyleSheet from 'react-native-extended-stylesheet';
import CommunityEventBanner from "../../components/community/community/CommunityEventBanner";
import CommunityEvent from "../../components/community/community/CommunityEvent";
import CommunityContentList from "../../components/community/community/CommunityContentList";
import CommunityDetailTitle from "../../components/community/communityDetail/CommunityDetailTitle";
import CommunityDetailContent from "../../components/community/communityDetail/CommunityDetailContent";
import CommunityDetailImage from "../../components/community/communityDetail/CommunityDetailImage";
import ModalImageContent from "../../components/comm/ModalImageContent";

import DateText from '../../components/commonsjh/dateText';
import serverController from '../../server/serverController';

const CommunityList = [
  {
    title:"탄소줄이고 다이어트도 같이했어요!",
    date :"2020.00.00",
    type : 0,
  },
  {
    title:"Title place here, long title will be shorten when text reac… 운동",
    date :"2020.11.00",
    type : 1,
  },
  {
    title:"Title place here, long title will be shorten when text reac…",
    date :"2020.33.00",
    type : 2,
  },
  {
    title:"탄소줄이고 다이어트도 같이했어요!",
    date :"2020.00.00",
    type : 0,
  },
  {
    title:"Title place here, long title will be shorten when text reac… 운동",
    date :"2020.11.00",
    type : 1,
  },
  {
    title:"Title place here, long title will be shorten when text reac…",
    date :"2020.33.00",
    type : 2, 
  },
  {
    title:"탄소줄이고 다이어트도 같이했어요!",
    date :"2020.00.00",
    type : 0,
  },
  {
    title:"Title place here, long title will be shorten when text reac… 운동",
    date :"2020.11.00",
    type : 1,
  },
  {
    title:"Title place here, long title will be shorten when text reac…",
    date :"2020.33.00",
    type : 2,
  },
  {
    title:"탄소줄이고 다이어트도 같이했어요!",
    date :"2020.00.00",
    type : 0,
  },
  {
    title:"Title place here, long title will be shorten when text reac… 운동",
    date :"2020.11.00",
    type : 1,
  },
  {
    title:"Title place here, long title will be shorten when text reac…",
    date :"2020.33.00",
    type : 2, 
  },
]

const CommunityDetailScreen = ({route}) => {
 

  const [couponList,setCouponList] = useState([]);
  const [image,setImage] = useState(require('../../assets/img/icon/banner.png'));
  const [showImage,setImageShow] = useState(false);
  const [textData, setTextData] = useState({title:"", label:"", date:""})
  const [imageData, setImageData] = useState([]);
  const openImagePop = () =>{
    setImageShow(true);
  }

  // 토픽, 커뮤니티 분기처리
  useEffect(() => {
    // 토픽글
    if(route.params.isTopic){
      serverController.connectFetchController(`/pollutions/posts/${route.params.no}`,"GET",null,function(res){
        setResData(res.data)
      },function(err){console.log(err);});
    }
    // 커뮤니티글
    else{
      serverController.connectFetchController(`/posts?no=${route.params.no}`,"GET",null,function(res){
        setResData(res.data.posts[0])
      },function(err){console.log(err);});
    }
  }, [])

  // 데이터 저장
  const setResData = (data) => {
    setTextData({
      title:data.title,
      label:data.content,
      date:DateText(new Date(data.create_date), "."),
    })
    setImage(data.img_attachment[0])
    setImageData([...data.img_attachment])
  }

  return (
    <View style={styles.container}>
      <MainTitle/>
      <ScrollView>
        <CommunityDetailTitle/>
        <CommunityDetailContent textData={textData}/>
        <CommunityDetailImage imageData={imageData} image={image} setImage={setImage} openImagePop={openImagePop}/>
      </ScrollView>
      
      <ModalImageContent show={showImage} setShow={setImageShow} image={image}/>
    </View>
  );
}

export default CommunityDetailScreen;


const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });


const styles = EStyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: "center",
    backgroundColor: 'white'
  },
  blackRectBox : {
    width:"414rem",
    height:"63rem",
    backgroundColor:"#2E3541",
  },
  commonPaddingBox: {
    height :"44.42rem",
  },
});