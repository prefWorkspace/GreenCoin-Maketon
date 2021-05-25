import React , {useState} from 'react';
import { View, ScrollView, Dimensions, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import MyInfo from '../../components/profiles/profile/MyInfo';
import ProfileContent from '../../components/profiles/profile/ProfileContent';
import { useFocusEffect, useNavigation} from '@react-navigation/native';
import userInfoSingleton from '../../db/userInfoSingleton';
import MainTitle from '../../components/mains/main/MainTitle';
import ModalCommon from '../../components/comm/ModalCommon';
import realmController from '../../db/realm/realmController'
export default function ProfileScreen({route}) {

    const [show,setShow] = useState(false);
    const navigation = useNavigation();
    const userName = userInfoSingleton.getInstance()._userName;

    useFocusEffect(
      React.useCallback(() => {
     
        if(!userInfoSingleton.getInstance()._isLogin){
          navigation.navigate("kakaoLogin");
        }

      }, [])
    );
  

    const versionClick = () =>{
      setShow(true);
    }

    const logOut = () =>{
      realmController.logoutUserState();
    }

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
            <ProfileContent  title={"앱 정보"} onPress={versionClick}></ProfileContent>
            <ProfileContent  title={"커뮤니티 글쓰기"} navi={"communityPost"} ></ProfileContent>
            <ProfileContent  title={"로그아웃"} onPress={logOut}></ProfileContent>
            {/* <ProfileContent  navi={"selectArea"} title={"지역 선택(인트로)"} ></ProfileContent> */}
         </ScrollView>
        <ModalCommon isModalVisible={show} setIsModalVisible={setShow} title={"000.000.ver"}/>
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