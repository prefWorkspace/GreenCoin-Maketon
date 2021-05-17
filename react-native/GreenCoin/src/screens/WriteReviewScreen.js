import React,{useState , useEffect} from 'react';
import { Text, View, ScrollView,Dimensions,Image, Alert} from 'react-native';

import WriteReviewTitle from '../components/comm/itemDetail/writeReview/WriteReviewTitle';
import WriteReviewBenefit from '../components/comm/itemDetail/writeReview/WriteReviewBenefit';
import WriteReviewQualification from '../components/comm/itemDetail/writeReview/WriteReviewQualification';
import WriteReviewOrderOption from '../components/comm/itemDetail/writeReview/WriteReviewOrderOption';
import WriteReviewOrderReview from '../components/comm/itemDetail/writeReview/WriteReviewOrderReview';
import WriteReviewImageList from '../components/comm/itemDetail/writeReview/WriteReviewImageList';
import WriteReviewSatify from '../components/comm/itemDetail/writeReview/WriteReviewSatify';
import WriteReviewSizeInfo from '../components/comm/itemDetail/writeReview/WriteReviewSizeInfo';
import WriteReviewDecide from '../components/comm/itemDetail/writeReview/WriteReviewDecide';

import MarginBox from '../components/comm/MarginBox';

import EStyleSheet from 'react-native-extended-stylesheet';
import userInfoSingleton from '../db/userInfoSingleton';
import {navigationBackHandler,useNavigation} from '../navigation/NavigationBackHandler';

import reviewServerController from '../server/reviewServerController';
import loginRegisterController from '../server/loginRegisterController';

export default function WriteReviewScreen({route}){


    const orderState = route.params.item;

    const userInfo = userInfoSingleton.getInstance();
    const navigation = useNavigation();
    const prd_id = route.params.productInfo == undefined ? route.params.item.prd_id : route.params.productInfo.prd_id;
    const [content,setContent] = useState("");
    const [imageList,setImageList] = useState([]);
    const [satisfy,setSatisfy] = useState(0);
    const [sizeResult , setSizeResult] = useState({
      sizeInfo:-1,
      sizeOpinion:"",
      height:userInfo._height ? userInfo._height : "",
      weight:userInfo._weight ? userInfo._weight : "",
      currentSize:-1
    });
    
    const callback = (data) =>{
      if(data == 0){
        return;
      }
      navigation.reset({index: 0, routes: [{ name: 'cart' }],});
      navigation.goBack();
    }
    
    useEffect(() => {

      
      var item = route.params.item;
      if(item != undefined){
        
        let formData = new FormData();
        formData.append("mem_id",userInfo._userId);
        formData.append("prd_id",item.prd_id);
        reviewServerController.getWriteReviewAble(formData,function(params) {
          if(!params || params.length == 0){
            Alert.alert(" ","이미 작성된 리뷰 혹은 구매하신 상품이 아닙니다.")
            navigation.goBack();
          }
        });

        setContent(item.rev_content);
        setSatisfy(item.rev_score ? item.rev_score : 0);
        setSizeResult({
          sizeInfo:item.rev_additional1,
          sizeOpinion:item.rev_additional3,
          height: userInfo._height,
          weight: userInfo._weight,
          currentSize:item.rev_personal3
        });
      }
    }, [])

    const vaildate = () =>{
        if(sizeResult.sizeInfo == -1 || sizeResult.sizeOpinion == "" || sizeResult.weight == 0||sizeResult.height == 0 ||sizeResult.currentSize == -1){
          Alert.alert(" ","사이즈는 어때요 페이지를 작성해주세요");
          return;
        }
        if(content == "" || content.length < 10 || content.length > 500){
           Alert.alert(" ","리뷰작성 또는 10자 이상 채워주세요");
           return;
        }
        if(satisfy == 0){
          Alert.alert(" ","만족도를 선택해주세요");
          return;
        }

        var formData = new FormData();

        formData.append("rev_content",content);
        formData.append("rev_title",sizeResult.sizeOpinion);
        formData.append("prd_id",prd_id);
        formData.append("mem_id",userInfoSingleton.getInstance()._userId);
        formData.append("mem_name",userInfoSingleton.getInstance()._userName);
        formData.append("rev_personal1",sizeResult.height);
        formData.append("rev_personal2",sizeResult.weight);
        formData.append("rev_personal3",sizeResult.currentSize);
        formData.append("rev_photo",imageList.length == 0? 0: 1);
        formData.append("rev_best",0);
        formData.append("rev_additional1",sizeResult.sizeInfo);
        formData.append("rev_additional2","null");
        formData.append("rev_additional3",sizeResult.sizeOpinion);
        formData.append("rev_helped",0);
        formData.append("rev_score",satisfy);
        formData.append("mog_idx",orderState.mog_idx);

        var namelist = [];
        imageList.map((localImgData,index)=>{
  
          var regJpg = /(.*?)\.(jpg|jpeg)$/;
          var timestamp = new Date();
          var fileExtension = localImgData.path.match(regJpg) ? ".jpg" : ".png";
          var fileType = localImgData.path.match(regJpg) ? "image/jpg" : "image/png";
          var fileName = "review/" + userInfoSingleton.getInstance()._userId + index + timestamp.getTime() + fileExtension;
          formData.append('file', {
            uri: localImgData.path, 
            type: 'multipart/form-data', 
            name: fileName, }
          );
          namelist.push(fileName);
          formData.append('file',userInfoSingleton.getInstance()._userName);
        });
     
        formData.append('rev_file',namelist.toString());

        if(route.params.item){
          formData.append('rev_id',route.params.item.rev_id);
          reviewServerController.updateReviewInfomation(formData,callback);
        }
        else
          reviewServerController.insertReviewInfomation(formData,callback);
    }

    const updateCallBack = (data) =>{
      isClick = false;
      if(data)
        Alert.alert(" ","저장 성공");
      else
        Alert.alert(" ","저장 실패");
    }

    var isClick = false;
    const updateUserWeightAndHeight = () => {
      if(isClick)
        return;
      isClick = true;
      var formData = new FormData();

      formData.append('mem_id',userInfoSingleton.getInstance()._userId);
      formData.append('mem_gender',userInfoSingleton.getInstance()._gender);
      formData.append('mem_dob',userInfoSingleton.getInstance()._bday);
      formData.append('mem_additional1',sizeResult.height ? sizeResult.height : 180);
      formData.append('mem_additional2',sizeResult.weight ? sizeResult.weight : 70);
      formData.append('mem_name',userInfoSingleton.getInstance()._userName);
      loginRegisterController.updateUserProfileSetting(formData,updateCallBack);
    }

    const saveData = () =>{ vaildate();}

    navigationBackHandler(route.params.root);

    console.log(orderState);
    return (
        <View>
        <ScrollView style={styles.container}>
          <WriteReviewTitle orderState={orderState}></WriteReviewTitle>
          <WriteReviewBenefit></WriteReviewBenefit>
          <MarginBox height={3} backgroundColor={"#F4F6F9"}></MarginBox>
          <WriteReviewQualification></WriteReviewQualification>
          <WriteReviewOrderOption orderState={orderState}></WriteReviewOrderOption>
          <WriteReviewOrderReview content={content} setContent={setContent}></WriteReviewOrderReview>
          <WriteReviewImageList imageList={imageList} setImageList={setImageList}></WriteReviewImageList>
          <WriteReviewSatify satisfy={satisfy} setSatisfy={setSatisfy}></WriteReviewSatify>
          <MarginBox height={3} backgroundColor={"#F4F6F9"}></MarginBox>
          <WriteReviewSizeInfo
            updateUserWeightAndHeight = {updateUserWeightAndHeight}
            sizeResult = {sizeResult}  
            setSizeResult={setSizeResult}
          ></WriteReviewSizeInfo>
          <WriteReviewDecide saveData={saveData}></WriteReviewDecide>
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



});