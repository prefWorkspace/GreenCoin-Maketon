import  React ,{useState} from 'react';
import { Text,Image, View, Dimensions,ScrollView, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import CommonTitleBar from '../../components/comm/CommonTitleBar';
import LoginBottomClickButton from '../../components/login/LoginBottomClickButton';

import {navigationBackHandler,useNavigation} from '../../navigation/NavigationBackHandler';



export default function LoginSearchResult({route}) {
  const navigation = useNavigation();
  navigationBackHandler();
  const doLogin = () =>{navigation.navigate("loginIdAndPassword");}
  const searchPassword = () =>{navigation.navigate("loginSearchPassword");}

    return (
      <ScrollView style={styles.container}>
         <View style={styles.itemContainer}>  
          <CommonTitleBar leftOption={"back"} bottom={false}></CommonTitleBar>
            <Text style={styles.title}>
              회원님의 아이디는{"\n"} {route.params.inputInfo.mem_name} 입니다.
            </Text>
          <LoginBottomClickButton title={"로그인"} backgroundColor={"#0D2141"} fontColor={"#FFFFFF"} clickEvent={doLogin}/>
          <LoginBottomClickButton title={"비밀번호 찾기"} backgroundColor={"#EEF1F5"} fontColor={"#0D2141"} clickEvent={searchPassword}/>
        </View>
      </ScrollView>
    );
}

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });


const styles = EStyleSheet.create({
  container: {
    width :"100%",
    height:"100%",
    backgroundColor:"white",
  },
  itemContainer:{
    alignItems: "center", 
    justifyContent: "center",
  },
  title:{
    fontFamily:"NotoSansKR-Medium",
    fontSize:"28rem",
    marginBottom:"200rem",
  },
});