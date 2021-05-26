import React, { Component,useState ,useEffect } from "react";
import { Dimensions, View,BackHandler,ScrollView,TouchableOpacity,Image } from "react-native";
import { useNavigation ,useRoute } from '@react-navigation/native';

import MainTitle from '../../components/mains/main/MainTitle';
import MainAreaTitle from '../../components/mains/main/MainAreaTitle';
import MainLikeInfo from '../../components/mains/main/MainLikeInfo';
// import MainDoubleClick from '../../components/mains/main/MainDoubleClick';
import EStyleSheet from 'react-native-extended-stylesheet';
import CommunityPostTitle from "../../components/community/communityPost/CommunityPostTitle";
import CommunityPostTag from "../../components/community/communityPost/CommunityPostTag";
import CommunityPostContent from "../../components/community/communityPost/CommunityPostContent";
import CommunityPostImage from "../../components/community/communityPost/CommunityPostImage";
import CommunityPostDecide from "../../components/community/communityPost/CommunityPostDecide";
import ModalImageContent from "../../components/comm/ModalImageContent";
import serverController from '../../server/serverController';
import userInfoSingleton from '../../db/userInfoSingleton';

const CommunityPostScreen = () => {
  const navigation = useNavigation();
  const [couponList,setCouponList] = useState([]);
  const [image,setImage] = useState(require('../../assets/img/icon/banner.png'));
  const [showImage,setImageShow] = useState(false);
  const [imageList,setImageList] = useState([]);
  const [titleValue, setTitleValue] = useState("");
  const [labelValue, setLabelValue] = useState("");
  const [token, setToken] = useState("");

  const openImagePop = () =>{
    setImageShow(true);
  }

  useEffect(() => {
    setToken(userInfoSingleton.getInstance()._token);
  }, [])

  // 글쓰기
  const onClickSubmit = () => {
    let data = {
      token : token,
      title  : titleValue,
      content  : labelValue,
    }

    serverController.connectFetchController(`/posts`,"POST",JSON.stringify(data),function(res){
      if(res.success==1){
        console.log(res);
        navigation.navigate("community")
      }else{
        console.log("res.success!==1")
      }
    },function(err){console.log(err);});
  }

  return (
    <View style={styles.container}>
      <MainTitle/>
      <ScrollView>
        <CommunityPostTitle/>
        <CommunityPostContent titleValue={titleValue} labelValue={labelValue} setTitleValue={setTitleValue} setLabelValue={setLabelValue}/>
        <CommunityPostImage imageList={imageList} setImageList={setImageList}/>
        <View style={styles.hr}/>
        <CommunityPostTag/>
        <CommunityPostDecide onClickSubmit={onClickSubmit}/>
      </ScrollView>
    </View>
  );
}

export default CommunityPostScreen;


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
  hr:{
    height:"20rem",
    backgroundColor:"#F8F7F7",
    marginBottom:"20rem",
  }
});