import React,{useState,useCallback, useEffect} from 'react';
import { Text, View, ScrollView,Dimensions,Platform, Alert } from 'react-native';

import CommonTitleBar from '../components/comm/CommonTitleBar'
import WriteAskTitle from '../components/comm/itemDetail/writeAsk/WriteAskTitle';
import WriteAskInputContent from '../components/comm/itemDetail/writeAsk/WriteAskInputContent';
import WriteAskSubImageList from '../components/comm/itemDetail/writeAsk/WriteAskSubImageList';
import WriteAskInputPassword from '../components/comm/itemDetail/writeAsk/WriteAskInputPassword';
import WriteAskSubmit from '../components/comm/itemDetail/writeAsk/WriteAskSubmit';

import { useNavigation } from '@react-navigation/native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {navigationBackHandler} from '../navigation/NavigationBackHandler';
import boardServerController from '../server/boardServerController';
import userInfoSingleton from '../db/userInfoSingleton';


export default function WriteAskScreen({route}){

  

  
    const [boardInfo,setBoardInfo ]= useState(route.params.boardInfo);
    const [productInfo,setProductInfo ]= useState(route.params.productInfo);
    const navigation = useNavigation();

    const [title,setTitle] = useState(boardInfo ? boardInfo.board_title : "");
    const [content,setContent] = useState(boardInfo ? boardInfo.board_content : "");
    const [imageList,setImageList] = useState([]);
    const [password,setPassword] = useState("");
    const titleLeftClickOption = useCallback(() =>{
      navigation.goBack();
      navigation.navigate("itemDetail");
    }) 

    useEffect(() => {
      setBoardInfo(route.params.boardInfo);
      setProductInfo(route.params.productInfo);
    }, [route.params])

    const callBack = (data)=>{
      if(data == 0){
        Alert.alert(" ","등록에 실패하였습니다.");
        return;
      }
    
        navigation.goBack();
        navigation.navigate("itemDetail");
    }

    const saveData = () =>{
      if(title.length > 50 || title.length < 1){
        Alert.alert(" ","제목을 입력해주세요");
        return false;
      }
      if(content.length > 500  || content.length < 10){
        Alert.alert(" ","문의 사항을 입력해주세요");
        return false;
      }
      if(password.length <= 2){
        Alert.alert(" ","비밀번호를 입력해주세요");
        return false;
      }
    
      var formData = new FormData();
      formData.append('board_title',title);
      formData.append('board_content',content);
      formData.append('board_pw',password);
      formData.append('mem_id',userInfoSingleton.getInstance()._userId);
      formData.append('bo_cat_id',route.params.productInfo.cat_id);
      formData.append('prd_id',route.params.productInfo.prd_id);
      formData.append('board_user',userInfoSingleton.getInstance()._userName);

      var namelist = [];
      imageList.map((localImgData,index)=>{

        var regJpg = /(.*?)\.(jpg|jpeg)$/;
        var timestamp = new Date();
        var fileExtension = localImgData.path.match(regJpg) ? ".jpg" : ".png";
        var fileType = localImgData.path.match(regJpg) ? "image/jpg" : "image/png";
        var fileName = "board/" + userInfoSingleton.getInstance()._userId + index + timestamp.getTime() + fileExtension;
        var image = {  uri: localImgData.path, 
                       type: 'multipart/form-data', 
                       name: fileName, 
        };

        formData.append('file', image);
        namelist.push(fileName);
      });
   
      formData.append('board_file',namelist.toString());
      if(boardInfo && boardInfo.board_id){
        formData.append('board_id',boardInfo.board_id);
        boardServerController.updateUserBoardInfo(formData,callBack);
      }
      else{
        boardServerController.insertUserBoardInfo(formData,callBack);
      }
    }
    
    navigationBackHandler(route.params.root);
    
    return (
        <View>
          <ScrollView style={styles.container}>
              <CommonTitleBar title={"문의하기"} leftOption={"back"} leftClick={titleLeftClickOption}></CommonTitleBar>
              <WriteAskTitle productInfo={productInfo} titleLeftClickOption={titleLeftClickOption}></WriteAskTitle>
              <WriteAskInputContent title={title} setTitle={setTitle} content={content} setContent={setContent}></WriteAskInputContent>
              <WriteAskSubImageList imageList={imageList} setImageList={setImageList}></WriteAskSubImageList>
              <WriteAskInputPassword setPassword={setPassword}></WriteAskInputPassword>
              <WriteAskSubmit saveData={saveData}></WriteAskSubmit>
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