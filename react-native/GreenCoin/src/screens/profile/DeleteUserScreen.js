import React,{useState,useEffect} from 'react';
import { Text, View, Dimensions,TextInput, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import CommonTitleBar from '../../components/comm/CommonTitleBar';
import { useNavigation } from '@react-navigation/native';
import {navigationBackHandler} from '../../navigation/NavigationBackHandler';
import { ScrollView } from 'react-native-gesture-handler';

import UserIdAndPassword from '../../components/profiles/deleteUserInfoScreen/UserIdAndPassword';
import SelectDeleteReason from '../../components/profiles/deleteUserInfoScreen/SelectDeleteReason';

import userInfoSingleton from '../../db/userInfoSingleton';
import registerServerController from '../../server/registerServerController';
import realmController from '../../db/realm/realmController';


export default function DeleteUserScreen() {
  const navigation = useNavigation();
  navigationBackHandler();

  const userInfo = userInfoSingleton.getInstance();

  const [id,setId] = useState(userInfo._loginType != 0 ? userInfo._userName : "");
  const [password,setPassword] = useState(userInfo._loginType != 0 ? userInfo._userPassword : "");
  const [activeList , setActiveList] = useState({});

  const checkActiveList = () =>{
    for(var i =0;i<6;i++){
      if(activeList[i])
        return true;
    }
    return false;
  }

  const callBack = (data) =>{
    realmController.logoutUserState();
    
    navigation.reset({
      index: 0,
      routes: [{ name: 'tab' }],
    });
  }

  const deleteUserInfomationClick = () =>{
    
    if((userInfo._loginType != 0 && id == "") || (userInfo._loginType != 0 && password == "")){
      Alert.alert(" ","아이디를 혹은 비밀번호를 입력해주세요!");
    }
    else if(!checkActiveList()){
      Alert.alert(" ","탈퇴 사유를 선택해주세요");
    }

    var formData = new FormData();
    formData.append('mem_id',userInfo._userId);
    formData.append('mem_username',id);
    formData.append('mem_password',password);
    formData.append('mem_deactivated_mem',JSON.stringify(activeList));
    formData.append('mem_method',userInfo._loginType);
    
    registerServerController.updateUserInfoDelete(formData,callBack);
  }

    return (
      <ScrollView style={styles.container}>
        <CommonTitleBar title={"회원탈퇴"} leftOption={"back"} rightOption={"완료"} rightClick={deleteUserInfomationClick}></CommonTitleBar>
        {
          userInfo._loginType == 0 ?
          <UserIdAndPassword setId={setId} setPassword={setPassword}/>
          :
          null
        }
        <SelectDeleteReason activeList={activeList} setActiveList={setActiveList}/>
      </ScrollView>
    );
  }
  


const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });


const styles = EStyleSheet.create({
  container: {
    backgroundColor:"white",
  },
  height:{
    height:"100rem",
  }
});