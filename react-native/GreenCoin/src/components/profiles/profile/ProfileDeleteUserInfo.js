import * as React from 'react';
import { Text,Image, View, Dimensions,TouchableOpacity,StyleSheet, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {useNavigation,useRoute} from '@react-navigation/native';
import userInfoSingleton from '../../../db/userInfoSingleton';

export default function ProfileDeleteUserInfo({title}) {
  const navigation = useNavigation();
  const routeInfo = useRoute();

  const MoveToDeletePage = () =>{
    if(!userInfoSingleton.getInstance()._isLogin){
      navigation.navigate("selectLoginOrRegister",{root:routeInfo.name});
      return;
    }
    navigation.navigate("deleteUser",{root:routeInfo.name});
  }

    return (
      <View style={styles.container}>
          <TouchableOpacity style={styles.infoColum} onPress={MoveToDeletePage}>
            <Text style={styles.label}>{title}</Text>
          </TouchableOpacity>
      </View>
    );
  }
  

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });


const styles = EStyleSheet.create({
  container: {
    paddingLeft:"20rem",
    borderTopWidth:"5rem",
    borderTopColor :"#F4F6F9",
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