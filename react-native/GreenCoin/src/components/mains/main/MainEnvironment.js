import * as React from 'react';
import { TouchableOpacity, Text,Image, View, Dimensions,ScrollView,StyleSheet, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { useNavigation ,useRoute } from '@react-navigation/native';
import userInfoSingleton from '../../../db/userInfoSingleton';

export default function MainEnvironment() {
  const navigation = useNavigation();
  const routeInfo = useRoute();

    return (
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <View style={styles.itemContainer}>
            <View style={styles.titleContainer}>
              <Text  style={[styles.title]}>미세먼지</Text>
              <View style={styles.titleDateContainer}>
                <Text  style={[styles.title]} >10:30AM</Text>
                <Image style={styles.resetImage} source={require('../../../assets/img/icon/reset.png')}></Image>
              </View>
            </View>
            <View style={styles.dustInfoContainer}>
              <View style={styles.dustIconImage}>
                <Image style={styles.dustIconImage} source={require('../../../assets/img/icon/dustIcon.png')}></Image>
              </View>
              <View>
                <Text style={[styles.label,{bottom:"10%"}]}>&nbsp;&nbsp;미세먼지&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Text style={[styles.scoreLike,{}]}>좋음</Text></Text>
                <Text style={[styles.label,{bottom:"20%"}]}>&nbsp;&nbsp;초미세먼지&nbsp;&nbsp;&nbsp;&nbsp;<Text style={[styles.scoreLike,{}]}>좋음</Text></Text>
                <Text style={[styles.label,{bottom:"30%"}]}>&nbsp;&nbsp;오존&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Text style={[styles.scoreLike,{}]}>좋음</Text></Text>
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
                <Text style={[styles.label,{bottom:"10%"}]}>이산화탄소 &nbsp;<Text style={[styles.scoreLike,{}]}>좋음</Text>&nbsp;&nbsp;&nbsp;<Text>0.0070ppm</Text></Text>
                <Text style={[styles.label,{bottom:"20%"}]}>일산화탄소 &nbsp;<Text style={[styles.scoreLike,{color:"#FFC400"}]}>보통</Text>&nbsp;&nbsp;&nbsp;<Text>0.0070ppm</Text></Text>
                <Text style={[styles.label,{bottom:"30%"}]}>아황산가스 &nbsp;<Text style={[styles.scoreLike,{color:"#FFC400"}]}>보통</Text>&nbsp;&nbsp;&nbsp;<Text>0.0070ppm</Text></Text>
                <Text style={[styles.label,{bottom:"40%"}]}>통합대기&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Text style={[styles.scoreLike,{color:"#FF4E00"}]}>나쁨</Text>&nbsp;&nbsp;&nbsp;<Text>56</Text></Text>
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
    flexDirection: 'row',
    height :"180rem",
    justifyContent: "center",
    padding:"10rem",
  },
  subContainer:{
    flexDirection: 'row',
    borderRadius:50,
    borderWidth:1,
    borderColor:"#efefef",
    width:"100%",
    padding:"20rem",
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
    color:"#7B7B7B",
    fontSize:12,
    fontFamily: "NotoSansKR-Medium"
  },
  title:{
    color:"#7B7B7B",
    fontSize:17,
    fontFamily: "NotoSansKR-Medium",
  },
  titleLabel:{
    textAlign:"center",
    fontSize :"14rem",
    fontWeight:'bold',
    
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
