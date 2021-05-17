import  React  , {useState} from 'react';
import { Text,Image, View, Dimensions,TouchableOpacity,StyleSheet, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {useFocusEffect, useNavigation,useRoute} from '@react-navigation/native';
import userInfoSingleton from '../../../db/userInfoSingleton';
import ModalContent from '../../comm/ModalContent';
import realmController from '../../../db/realm/realmController';

export default function ProfileLogout() {

  const [isLogin,setIsLogin] = useState(false);
  const [isModalVisible,setIsModalVisible] = useState(false);
  const navigation = useNavigation();
  const movteToLogin = () => { navigation.navigate("selectLoginOrRegister"); };
  const moveToLogOut = ()=>{  setIsModalVisible(true); }
  const clickLogOutOkayButton = async (state) =>{
    
    setIsModalVisible(state); 
    await realmController.logoutUserState();
    
    navigation.reset({
      index: 0,
      routes: [{ name: 'tab' }],
    });
  }
  useFocusEffect(
    React.useCallback(() => {  
      setIsLogin(userInfoSingleton.getInstance().isLogin());
    }, [])
  );



    return (

      <View style={styles.container}>
          <TouchableOpacity style={styles.infoColum} onPress={userInfoSingleton.getInstance().isLogin() ? moveToLogOut: movteToLogin}>
              <Text>{isLogin ? "로그아웃" : "로그인"}</Text>
          </TouchableOpacity>
          <ModalContent modalType={"Logout"} bottomType={"select"} isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} submitClick={clickLogOutOkayButton}></ModalContent>
      </View>
    );
  }
  

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });


const styles = EStyleSheet.create({
  container: {
    paddingLeft:"20rem",
    backgroundColor:"white",
    alignItems: "center",
    justifyContent: "center",
  },
  infoColum:{
    width:"347.645rem",
    height:"58.448rem",   
    flexDirection: 'row',    
    alignItems: "center",
    justifyContent: "flex-start",
  },
  label:{
    color:"#D2D5DA",
    fontSize:"13.873rem",
    fontFamily:"Montserrat-Bold",
    bottom:"2rem"
  }

});