import React,{useState} from 'react';
import { Text,Image, View, Dimensions,ScrollView,StyleSheet, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import CommonTitleBar from '../../components/comm/CommonTitleBar'

import RefundItemInfo from '../../components/profiles/refundRequire/RefundItemInfo';
import RefundWriteReason from '../../components/profiles/refundRequire/RefundWriteReason';
import RefundSelectReasonTag from '../../components/profiles/refundRequire/RefundSelectReasonTag';
import RefundSelectImage from '../../components/profiles/refundRequire/RefundSelectImage';
import RefundAbout from '../../components/profiles/refundRequire/RefundAbout';
import RefundSelectAccount from '../../components/profiles/refundRequire/RefundSelectAccount';
import RefundPrice from '../../components/profiles/refundRequire/RefundPrice';
import ChangeDecideBox from '../../components/profiles/refundRequire/ChangeDecideBox';
import MarginBox from '../../components/comm/MarginBox';
import orderSeverController from '../../server/orderSeverController';
import userInfoSingleton from '../../db/userInfoSingleton';

import {navigationBackHandler,useNavigation} from '../../navigation/NavigationBackHandler';


export default function ReviewResultScreen({route}) {
  const [isModalVisible,setIsModalVisible] =useState(false);


  const item = route.params.item;
  const currentOption = JSON.parse(item.mog_option);
  const navigation = useNavigation();
  const [content,setContent] =useState("");
  const [active,setActive] = useState(-1);
  const [imageList , setImageList] = useState([]);
  const [refundInfo ,setRefundInfo] = useState({});

  const cancleClickEvent = () =>{
    navigation.goBack();
    navigation.goBack();
  }

  
  const requestCallBack = (data) =>{
    if(data == 1){
      Alert.alert(" ","요청 완료");
      navigation.goBack();
      navigation.goBack();
    }
    else
      Alert.alert(" ","요청 실패");
  }

  const submitClickEvent = () =>{

    if(refundInfo.name == "" || refundInfo.account == "" || refundInfo.bank == -1 || active == -1){
      Alert.alert(" ","항목을 선택해주세요");
      return;
    }
    if(content.length  < 5){
      Alert.alert(" ","상세 사유를 입력해주세요");
      return;
    }

    var formData = new FormData();
    formData.append("mem_id",userInfoSingleton.getInstance()._userId);
    formData.append("txn_id",item.txn_id);
    formData.append("txn_update_require", 50);
    formData.append("mog_order_status", 50);
    formData.append("txnu_memo", content);
    formData.append("txnu_type", active);
    formData.append("mog_idx", item.mog_idx);
    
    var namelist = [];
    imageList.map((localImgData,index)=>{

      var regJpg = /(.*?)\.(jpg|jpeg)$/;
      var timestamp = new Date();
      var fileExtension = localImgData.path.match(regJpg) ? ".jpg" : ".png";
      var fileType = localImgData.path.match(regJpg) ? "image/jpg" : "image/png";
      var fileName = "orderRequest/" + userInfoSingleton.getInstance()._userId + index + timestamp.getTime() + fileExtension;
      var image = {  uri: localImgData.path, 
                     type: 'multipart/form-data', 
                     name: fileName, 
      };

      formData.append('file', image);
      namelist.push(fileName);
    });
 
    formData.append('txnu_file',namelist.toString());

    orderSeverController.updateTransactionOption(formData,requestCallBack);
  }
  

  navigationBackHandler();
    return (
      <ScrollView style={styles.container}>
        <CommonTitleBar title={"반품요청"} leftOption={"back"}></CommonTitleBar>
        <MarginBox height={60} backgroundColor={"white"} title={"반품 사유를 입력해주세요."} customStyle={{borderBottomWidth:1, borderBottomColor:"#F4F6F9"}}></MarginBox>
        <RefundItemInfo  item={item} currentOption={currentOption}/>
        <RefundSelectReasonTag active={active} setActive={setActive}/>
        <RefundWriteReason setContent={setContent}/>
        <RefundSelectImage imageList={imageList} setImageList={setImageList}/>
        <MarginBox height={5} backgroundColor={"#F4F6F9"} marginTop={30} marginBottom={10}></MarginBox>
        <RefundAbout />
        <RefundSelectAccount setRefundInfo={setRefundInfo}/>
        <RefundPrice  item={item} currentOption={currentOption}/>
        <ChangeDecideBox cancleClickEvent={cancleClickEvent} submitClickEvent={submitClickEvent}/>
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
  }
});