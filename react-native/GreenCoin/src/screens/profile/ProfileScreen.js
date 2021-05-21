import * as React from 'react';
import { View, ScrollView, Dimensions, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import MyInfo from '../../components/profiles/profile/MyInfo';
import ProfileContent from '../../components/profiles/profile/ProfileContent';
import {navigationBackHandler} from '../../navigation/NavigationBackHandler';
import { useNavigation} from '@react-navigation/native';
import userInfoSingleton from '../../db/userInfoSingleton';
import MainTitle from '../../components/mains/main/MainTitle';

export default function ProfileScreen({route}) {
    const navigation = useNavigation();
    const userName = userInfoSingleton.getInstance()._userName;
    navigationBackHandler("main");

    return (
      <View  style={styles.container}>
        <MainTitle></MainTitle>
        <MyInfo></MyInfo>
        <View style={styles.fakeHeight}></View>
        <ScrollView>
            <ProfileContent  title={"내 정보"} navi={"myProfile"} ></ProfileContent>
            <ProfileContent  title={"내 그린코인"} navi={"myCoin"} ></ProfileContent>
            <ProfileContent  title={"내 글보기"} navi={"myContent"} ></ProfileContent>
            <ProfileContent  title={"설정"} navi={"mySetting"}></ProfileContent>
            <ProfileContent  title={"앱 정보"} navi={null}></ProfileContent>
            <ProfileContent  title={"커뮤니티 글쓰기"} navi={"communityPost"} ></ProfileContent>
         </ScrollView>
      </View>
    );
  }
  


const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });


const styles = EStyleSheet.create({
  container: {
    backgroundColor:"white",
    height:"100%",
  },
  fakeHeight:{
    height:"10rem",
    backgroundColor:"#F8F7F7",
  },
});