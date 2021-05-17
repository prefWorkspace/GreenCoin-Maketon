import React,{useState}  from 'react';
import { Text,Image, View, Dimensions,ScrollView,Linking,TouchableOpacity, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import appStaticInfomation from '../../db/appStaticInfomation'
import { useNavigation } from '@react-navigation/native'

export default function OrderFinBar(){

  const navigation = useNavigation();
  
  if(appStaticInfomation.getInstance()._finCount == 0 || !appStaticInfomation.getInstance()._finCount)
    return null;

  return (
    <TouchableOpacity style={styles.imageContainer} onPress={()=>{ navigation.navigate("deliverInfo") }}>
      <Image style={styles.image} source={require('../../assets/img/shop/cart.png')}></Image>
      <View  style={styles.countBox} >
        <Text style={{color:"white"}}>{appStaticInfomation.getInstance()._finCount ? appStaticInfomation.getInstance()._finCount  : 0}</Text>
      </View>
    </TouchableOpacity>
  )
}



const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });


const styles = EStyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: "center",
    backgroundColor: 'white'
  },
  blackRectBox : {
    width:"414rem",
    height:"63rem",
    backgroundColor:"#2E3541",
  },
  commonPaddingBox: {
    height :"44.42rem",
  },
  imageContainer:{
    width:"100rem",
    height:"100rem",
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left:"76%",
    top:"84%",
  },
  countBox:{
    borderRadius:50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:"red",
    width:"23rem",
    height:"23rem",
    bottom:"55rem",
    left: "16rem"
  },
  image:{

  }
});