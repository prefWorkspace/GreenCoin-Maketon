import * as React from 'react';
import { View, ScrollView, Dimensions, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import CommonTitleBar from '../../components/comm/CommonTitleBar'
import MarginBox from '../../components/comm/MarginBox';
import MyInfo from '../../components/profiles/profile/MyInfo';
import ApplySimpleSign from '../../components/profiles/profile/ApplySimpleSign';
import ProfileSubtitle from '../../components/profiles/profile/ProfileSubtitle';
// import ProfileDeleteUserInfo from '../../components/profiles/profile/ProfileDeleteUserInfo';
import ProfileContent from '../../components/profiles/profile/ProfileContent';
import ProfileLogout from '../../components/profiles/profile/ProfileLogout';
import MyShopping from '../../components/profiles/profile/MyShopping';
import {navigationBackHandler} from '../../navigation/NavigationBackHandler';
import { useNavigation} from '@react-navigation/native';
import userInfoSingleton from '../../db/userInfoSingleton';
import OrderFindBar from '../../components/comm/OrderFindBar';

export default function ProfileScreen({route}) {
    const navigation = useNavigation();
    const userName = userInfoSingleton.getInstance()._userName;
    navigationBackHandler("main");

    return (
      <View>
        <ScrollView style={styles.container}>
            <CommonTitleBar title={(userName == "" || !userName) ? "마이페이지" : userName} rightOption={"option"} rightClick={()=>{navigation.navigate("setting")}}></CommonTitleBar>
            <MyInfo></MyInfo>
            <ApplySimpleSign></ApplySimpleSign>
            <ProfileSubtitle title={"MY 쇼핑"}></ProfileSubtitle>
            <MyShopping></MyShopping>
            <ProfileSubtitle title={"MY 활동"}></ProfileSubtitle>
            <ProfileContent  title={"자주 묻는 질문"}></ProfileContent>
            <ProfileContent  title={"문의 내역"} ></ProfileContent>
            <ProfileContent  title={"구매후기내역"} ></ProfileContent>
            <ProfileContent  title={"고객센터"} ></ProfileContent>
            <ProfileSubtitle title={"MY 알림"}></ProfileSubtitle>
            <ProfileContent  title={"알림 내역"}></ProfileContent>
            <ProfileLogout></ProfileLogout>
            {/* <ProfileDeleteUserInfo title={"회원 탈퇴"}></ProfileDeleteUserInfo> */}
            <MarginBox height={styles.height.height}></MarginBox>
         </ScrollView>
         <OrderFindBar></OrderFindBar>
      </View>
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