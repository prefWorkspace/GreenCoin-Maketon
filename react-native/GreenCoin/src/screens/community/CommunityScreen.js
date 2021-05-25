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
import serverController from '../../server/serverController';
import DateText from '../../components/commonsjh/dateText';

const CommunityScreen = () => {
 
  const [couponList,setCouponList] = useState([]);
  const [communityList, setCommunityList] = useState([])
  useEffect(() => {
    serverController.connectFetchController(`/posts`,"GET",null,function(res){
      const dataArr = res.data.posts;
      let newArr = []
      dataArr.map(item => {
        let newObj = {
          title:item.title,
          date:DateText(new Date(res.data.posts[0].create_date), "."),
          type:2,
          no:item.no
        }
        newArr.push(newObj);
      })
      setCommunityList([...newArr]);
    },function(err){console.log(err);});

  }, [])
  return (
    <View style={styles.container}>
      <MainTitle/>
      <ScrollView>
        <MainAreaTitle/>
        <CommunityEventBanner couponList={couponList}/>
        <CommunityEvent/>
        <CommunityContentList list={communityList} title={"우리지역 커뮤니티"} icon={"community"}/>
        {/* <MainDoubrleClick></MainDoubrleClick> */}
      </ScrollView>
    </View>
  );
}

export default CommunityScreen;


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
  imageContainer:{
    height: 100,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left:"76%",
    top:"84%",
  },
  image:{

  }
});