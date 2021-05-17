import * as React from 'react';
import { TouchableOpacity, Text,Image, View, Dimensions,ScrollView,StyleSheet, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { useNavigation ,useRoute } from '@react-navigation/native';
import userInfoSingleton from '../../../db/userInfoSingleton';

export default function MainEnvironmentResult() {
  const navigation = useNavigation();
  const routeInfo = useRoute();

  return (
    <View style={styles.container}>
        <View style={styles.likeInfoContainer}>
          <View style={styles.likeInfo}>
            <Image style={styles.image} source={require('../../../assets/img/icon/lose.png')} resizeMode="stretch"></Image>
            <Text>오늘 내가 줄인 탄소양</Text>
          </View>
        </View>
      <View style={styles.subContainer}>
     
        <View style={styles.itemContainer}>
          <View style={styles.titleContainer}>
            <Text  style={[styles.label,styles.title]}>미세먼지</Text>
            <View style={styles.titleDateContainer}>
              <Text  style={[styles.label,styles.title]} >10:30AM</Text>
              <Image style={styles.resetImage} source={require('../../../assets/img/icon/reset.png')}></Image>
            </View>
          </View>
          <View style={styles.dustInfoContainer}>
            <View style={styles.dustIconImage}>
              <Image style={styles.dustIconImage} source={require('../../../assets/img/icon/subway.png')}></Image>
            </View>
            <View>
              <Text style={[styles.label]}>미세먼지<Text style={styles.scoreLike}>좋음</Text></Text>
              <Text style={[styles.label]}>초미세먼지<Text style={styles.scoreLike}>좋음</Text></Text>
              <Text style={[styles.label]}>오존<Text style={styles.scoreLike}>좋음</Text></Text>
            </View>
          </View>
        </View>
        <View style={styles.middleContainer}></View>
        <View style={styles.itemContainer}>
          <View style={styles.titleContainer}>
            <Text  style={[styles.label,styles.title]}>대기 정보</Text>
            <View style={styles.titleDateContainer}>
              <Text  style={[styles.label,styles.title]} >10:30AM</Text>
              <Image style={styles.resetImage} source={require('../../../assets/img/icon/reset.png')}></Image>
            </View>
          </View>
          <View style={styles.dustInfoContainer}>
            <View>
              <Text style={[styles.label]}>이산화탄소 <Text style={styles.scoreLike} >좋음</Text> <Text >0.0070ppm</Text></Text>
              <Text style={[styles.label]}>일산화탄소 <Text style={styles.scoreLike}>좋음</Text> <Text>0.0070ppm</Text></Text>
              <Text style={[styles.label]}>아황산가스 <Text style={styles.scoreLike}>좋음</Text> <Text>0.0070ppm</Text></Text>
              <Text style={[styles.label]}>통합대기 <Text style={styles.scoreLike}>좋음</Text> <Text>56</Text></Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}


const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });


const styles = EStyleSheet.create({
container: {
  height :"180rem",
  justifyContent: "center",
  marginTop:"15rem",
  padding:"10rem",
  marginBottom:"40rem",
},
subContainer:{
  flexDirection: 'row',
  borderRadius:50,
  borderWidth:1,
  borderColor:"#efefef",
  width:"100%",
  padding:"20rem",
},
likeInfoContainer:{
  flexDirection: 'row',
  width:"100%",
  padding:"10rem",
  alignItems: "center",
  justifyContent: "center",
},
likeInfo:{
  marginRight:"auto",
  flexDirection: 'row',
  alignItems: "center",
  justifyContent: "center",
},
image:{
  width:"28.42rem",
  height:"28.42rem",
  marginRight:"10rem",
},
itemContainer:{
},
dustInfoContainer:{
  flexDirection: 'row',
},
resetImage:{
  width:"16rem",
  height:"16rem",
  marginLeft:"5rem",
},
scoreLike:{
  color:"#00C386",
},
dustIconImage:{
  width:"56rem",
  height:"56rem",
},
titleContainer:{
  flexDirection: 'row',
  marginBottom:"10rem", 
},
titleAreaBody:{
  flexDirection: 'row',
  width:"240rem",
  padding:"10rem",
  height:"68.42rem",
  alignItems: "center",
  justifyContent: "center",
},
middleContainer:{
  marginLeft:"10rem",
  marginRight:"10rem",
  borderWidth:1,
  borderColor:"#efefef",
},
label:{
  color:"#7B7B7B"
},
title:{
  color:"#7B7B7B"
},
titleLabel:{
  textAlign:"center",
  fontSize :"14rem",
  fontWeight:'bold',
  
  //fontFamily: "NotoSansCJKkrRegular"
},
titleDateContainer:{
  marginLeft:"13rem",
  flexDirection: 'row',
  color:"#7B7B7B",
  alignItems: "center",
  justifyContent: "center",
},
titleAddressPoint:{
  marginLeft:"5rem",
  bottom:"2rem",
},
logoImage:{
  width :"59.457rem",
  height :"44.593rem",
  top:"10rem",
},
searchImage:{
  width :"31.46rem",
  height :"31.46rem",
  top:"23.28rem",
  left:"15rem",
  
}

});
