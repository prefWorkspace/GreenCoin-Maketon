import * as React from 'react';
import { Text,Image, View, Dimensions,ScrollView,StyleSheet, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation,useRoute } from '@react-navigation/native';
import userInfoSingleton from '../../../db/userInfoSingleton';

export default function ProfileContent({title}) {
  const navigation = useNavigation();
  const routeInfo = useRoute();
  const moveToPage = () =>{
    if(!userInfoSingleton.getInstance()._isLogin && (title == "문의 내역" || title == "구매후기내역" || title =="알림 내역")){
      navigation.navigate("selectLoginOrRegister",{root:routeInfo.name});
      return;
    }

    navigation.navigate(title,{root:routeInfo.name});
  }
    return (
      <View style={styles.container}>
          <TouchableOpacity style={styles.touchableOpacity} 
              onPress={moveToPage}
            >
            <View style={styles.infoColum}>
              <Text style={styles.label}>{title}</Text>
            </View>
          </TouchableOpacity>
      </View>
    );
  }
  

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });


const styles = EStyleSheet.create({
  container: {
    paddingLeft:"20rem",
    borderBottomWidth:1,
    borderBottomColor :"#efefef", 
    backgroundColor:"white",
    marginTop:"1rem",
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
    color:"black",
    fontSize:"13.873rem",
    fontFamily:"NotoSansKR-Regular"
  },
  touchableOpacity:{
    width:"100%",
  },

});
