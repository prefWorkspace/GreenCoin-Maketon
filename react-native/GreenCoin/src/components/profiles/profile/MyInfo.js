import React, {useState,useEffect} from 'react';
import { Text,Image, View, Dimensions,TouchableOpacity,StyleSheet, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { useNavigation ,useFocusEffect } from '@react-navigation/native';
import userInfoSingleton from '../../../db/userInfoSingleton';
import serverController from '../../../server/serverController';

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function MyInfo() {
 const navigation = useNavigation();
 const [name, setName] = useState("");
 const [currentPoint, setCurrentPoint] = useState(0);


  useFocusEffect(
    React.useCallback(() => {  
      
    setName(userInfoSingleton.getInstance()._username)
    // 현재 포인트 불러오기
    const num = userInfoSingleton.getInstance()._no;
    const token = userInfoSingleton.getInstance()._token;
    serverController.connectFetchController(`/users/${num}/points?token=${token}`,"GET",null,function(res){
      if(res.success==1){
        setCurrentPoint(res.data.point);
      }
    },function(err){console.log(err);});
    }, [])
  );

    return (
      <View style={styles.container}>
          <View style={styles.imageContainer}>
              <Image style={styles.image} source={require('../../../assets/img/logo/profile.png')} resizeMode={"stretch"}></Image>
          </View>
          <View style={styles.textContainer}>
              <Text style={styles.name}>{name}</Text>
              <Text style={styles.coinTitle}>보유 그린코인 : <Text style={styles.coin}>{currentPoint}원</Text></Text>
          </View>
      </View>
    );
}
  

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });


const styles = EStyleSheet.create({
  container: {
    width:"100%",
    flexDirection: 'row',
    paddingLeft:"30rem",
    marginTop:"10rem",
    marginBottom:"10rem",
  },
  imageContainer:{
    width:"100rem",
    height:"100rem",
  },
  image:{ 
    width:"75rem",
    height:"75rem",
  },
  textContainer:{
    height:"100rem",
  },
  name:{
    fontSize:18,
    color:"#505050",
    fontFamily: "NotoSansKR-Medium",
  },
  coinTitle:{
    fontSize:15,
    color:"#505050",
    fontFamily: "NotoSansKR-Medium",
    bottom:"15rem",
  },
  coin:{
    fontSize:15,
    color:"#66D8B9",
    fontFamily: "NotoSansKR-Medium",
  }
  

});