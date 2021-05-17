import React,{useState} from 'react';
import { Text, View, Dimensions, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import CommonTitleBar from '../../components/comm/CommonTitleBar';
import IdentifiyPhoneNumber from '../../components/profiles/password/IdentifiyPhoneNumber';
import ChangePassword from '../../components/profiles/password/ChangePassword';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import {navigationBackHandler} from '../../navigation/NavigationBackHandler';
import loginRegisterController from '../../server/loginRegisterController';
import registerServerController from '../../server/registerServerController';
import userInfoSingleton from '../../db/userInfoSingleton';
import realmController from '../../db/realm/realmController';

export default function PasswordSettingScreen() {
    const [identify , setIdentify] = useState(null);
    const [next,setNext] = useState(false);
    const [phone,setPhone] = useState("");
    const [number,setNumber] = useState("");
    const [password,setPassword] = useState("");
    const [checkPassword,setCheckPassword] = useState(" ");

    const navigation = useNavigation();

    const nextEvent = async (data) =>
    {
      if(data == true){
        await realmController.logoutUserState();
        navigation.navigate("selectLoginOrRegister");
      }
      Alert.alert(" ","변경 성공"); 
      navigation.goBack(); 
    }

  
    const clickPhoneIdentify = () => {
      var formData = new FormData();
      formData.append("mem_id",userInfoSingleton.getInstance()._userId);
      formData.append("re_phone",phone);

      registerServerController.checkRegisterNumber(formData,function(res){

        setIdentify(res);
        if(res == -1){
          Alert.alert(" ","이미 존재하는 핸드폰 번호입니다.");
        }
        else{
          Alert.alert(" ","인증번호를 입력해주세요");
        }
      });
    }  
  
    const clickNext = () =>{
      if(next == true){
        if(password.length > 2 && checkPassword == password){
          const formData = new FormData();
          formData.append('mem_username',  userInfoSingleton.getInstance()._userName);
          formData.append('mem_password', password);
          loginRegisterController.updateUserPassword(formData,nextEvent);
        }
        else{
          return;
        }
      }

      if(identify == number){
        successIdentify();
      }
      else{
        Alert.alert(" ","인증 번호를 확인해주세요");
      }
    };

    const successIdentify = () =>{
       setNext(true); 
    }

    navigationBackHandler();
    
    return (
      <ScrollView style={styles.container}>
        <CommonTitleBar 
        leftOption={"back"}
        title={"비밀번호 변경 / 찾기"} 
        rightOption={next == false ? "nextText" : "submitText"} 
        rightClick={clickNext}/>
        {
          next ? 
          <ChangePassword setPassword={setPassword} setCheckPassword={setCheckPassword}></ChangePassword>
          :
          <IdentifiyPhoneNumber 
            phone={phone} 
            setPhone={setPhone} 
            setNumber={setNumber} 
            identify={identify}
            setIdentify={setIdentify} 
            clickNext={clickNext}
            clickPhoneIdentify={clickPhoneIdentify}
            originalPhone={userInfoSingleton.getInstance()._mem_phone}/>
        }
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