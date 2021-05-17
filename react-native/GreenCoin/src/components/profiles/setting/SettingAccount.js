import * as React from 'react';
import { Alert, View, Dimensions ,Image} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import SettingContent from './SettingContent';
import { useNavigation,useRoute } from '@react-navigation/native';
import userInfoSingleton from '../../../db/userInfoSingleton';

export default function SettingAccount() {
    const navigation = useNavigation();
    const routeInfo = useRoute();
    const userinfo = userInfoSingleton.getInstance();
    const moveToProfileStting = ()=>{
      if(userinfo._isLogin == false)
        navigation.navigate("selectLoginOrRegister",{root:routeInfo.name});
      else
        navigation.navigate("프로필",{root:routeInfo.name});
    };

    const moveToPasswordSetting = ()=>{
      if(userinfo._isLogin == false)
          navigation.navigate("selectLoginOrRegister",{root:routeInfo.name});
      else if(userinfo._loginType != 0)
        Alert.alert(" ","간편 로그인은 비밀번호를 설정할 수 없습니다.");
      else
        navigation.navigate("비밀번호 변경 / 찾기",{root:routeInfo.name});
  };

    return (
      <View style={styles.container}>
        <View style={styles.shadow}>
          <SettingContent 
            url={require("../../../assets/img/settingIcon/profile.png")}
            title={"프로필"}
            point={true}
            clickEvent={moveToProfileStting}
          />
          <View style={styles.hr}/>
          <SettingContent 
            url={require("../../../assets/img/settingIcon/password.png")}
            title={"비밀번호 변경 / 찾기"}
            point={true}
            clickEvent={moveToPasswordSetting}
          />
         </View>
      </View>
    );
  }
  


const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });


const styles = EStyleSheet.create({
  container: {
    marginTop:"20rem",
    padding:"10rem",
    alignItems: "center",
    justifyContent: "center",
    borderRadius:"10rem",
  },
  shadow:{
    width:"90%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor:"white",
    borderRadius:10,
    elevation:6,
    shadowColor: "#000",
    shadowOffset: {
	    width: 0,
	    height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,
  },
  hr:{
    width:"90%",
    borderBottomColor: '#efefef',
    borderBottomWidth: 1.2,
  }, 
});