import  React ,{useState} from 'react';
import { Text,Image, View, Dimensions,ScrollView, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import CommonTitleBar from '../../components/comm/CommonTitleBar';
import PolicyDecideButton from '../../components/register/PolicyDecideButton';
import {navigationBackHandler ,useNavigation} from '../../navigation/NavigationBackHandler';
import loginRegisterController from '../../server/loginRegisterController';
import realmController from '../../db/realm/realmController';
import appStaticInfomation from '../../db/appStaticInfomation';


export default function CreateFinishAccount({route}) {
  const navigation = useNavigation();
  navigationBackHandler();


   
  
  const moveToNext = (userJsonFile)=>{


    if(userJsonFile){
      var state = {
        userId : userJsonFile.userInfo.mem_id,
        tok_name : userJsonFile.userInfo.tok_name,
        name : userJsonFile.userInfo.mem_name,
        userName : userJsonFile.userInfo.mem_username,
        gender : userJsonFile.userInfo.mem_gender,
        bday : userJsonFile.userInfo.mem_dob,
        autoLogin : true,
        isLogin : true,
        height :  userJsonFile.userInfo.mem_additional1,
        weight :  userJsonFile.userInfo.mem_additional2,
        phone : userJsonFile.userInfo.mem_phone,
        mem_method : userJsonFile.userInfo.mem_method,
        email : userJsonFile.userInfo.mem_email ?  userJsonFile.userInfo.mem_email : "" ,
        mem_refund_bank : userJsonFile.userInfo.mem_refund_bank,
        mem_refund_account : userJsonFile.userInfo.mem_refund_account,
        refund_name : userJsonFile.userInfo.mem_refund_name,
        mem_notification : userJsonFile.userInfo.mem_notification,
        mem_notification_event : userJsonFile.userInfo.mem_notification_event,
        tok_name :userJsonFile.tocken
      }
  
      realmController.successUserLogin(state);
  
      navigation.reset({
        index: 0,
        routes: [{ name: 'tab' }],
      });
      return;
    }
    else
      Alert.alert(" ","아이디 혹은 비밀번호를 확인해주세요.");  

  }

  const doLogin = () =>{
    const formData = new FormData();
    formData.append('mem_username', route.params.id);
    formData.append('mem_password', route.params.password);
    formData.append('fcm',appStaticInfomation.getInstance()._token);
   loginRegisterController.loginByIdAndPassword(formData,moveToNext);
  }


    return (
      <View style={styles.container}>
        <View style={styles.itemContainer}>
          <Text style={styles.title}>가입이 완료되었습니다.</Text>
          <PolicyDecideButton title={"메인으로 가기"} clickEvent={doLogin} active={true}/>
        </View>
      </View>
    );
}

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });


const styles = EStyleSheet.create({
  container: {
    width :"100%",
    height:"100%",
    backgroundColor:"white",
    paddingLeft:"15rem",
  },
  title:{
    fontSize:'28rem',
    marginBottom:"50rem",
  },
  itemContainer:{
    height:"70%",
    alignItems: "center", 
    justifyContent: "center",
  }
  
});