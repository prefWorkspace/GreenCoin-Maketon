import * as React from 'react';
import { Text,Image, View, Dimensions,TouchableOpacity,StyleSheet, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {useNavigation,useRoute} from '@react-navigation/native';
import userInfoSingleton from '../../../db/userInfoSingleton';


export default function MyShopping() {
  const navigation = useNavigation();
  const routeInfo = useRoute();
  
  const moveToCartPage = (type) =>{
    if(userInfoSingleton.getInstance()._isLogin != true){
      navigation.navigate("selectLoginOrRegister",{root:routeInfo.name});
    }
    else
      navigation.navigate("cart",{type:type,root:routeInfo.name})
  }

    return (
      <View style={styles.container}>
          <TouchableOpacity style={styles.leftColum} onPress={()=>{moveToCartPage(0)}}>
            <Text>장바구니 </Text>
          </TouchableOpacity>
          <View style={styles.boarderDiv}/>
          <TouchableOpacity style={styles.infoColum} onPress={()=>{moveToCartPage(1)}}>
            <Text>찜한상품 </Text>
          </TouchableOpacity>
          <View style={styles.boarderDiv}/>
          <TouchableOpacity style={styles.rightColum} onPress={()=>{navigation.navigate("cart",{type:2})}}>
            <Text>최근 본 상품</Text>
          </TouchableOpacity>
      </View>
    );
  }
  

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });


const styles = EStyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
    backgroundColor:"white",
    
  },
  leftColum:{
    width:"33%",
    height:"60rem",   
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
    right:"12rem",
  },
  infoColum:{
    width:"33%",
    height:"60rem",   
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
  },
  rightColum:{
    width:"33%",
    height:"60rem",   
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
  },
  lightLabel:{
    color:"#26CBFF",
    fontSize:"13.873rem",
    fontFamily:"NotoSansKR-Regular"
  },
  boarderDiv:{
    width:"2rem",
    height:"24rem",
    backgroundColor:"#F4F6F9",
  }

});
