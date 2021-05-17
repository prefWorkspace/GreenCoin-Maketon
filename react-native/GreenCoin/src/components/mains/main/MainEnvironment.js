import * as React from 'react';
import { TouchableOpacity, Text,Image, View, Dimensions,ScrollView,StyleSheet, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { useNavigation ,useRoute } from '@react-navigation/native';
import userInfoSingleton from '../../../db/userInfoSingleton';
MainEnvironmentResult
export default function MainEnvironment() {
  const navigation = useNavigation();
  const routeInfo = useRoute();

    return (
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <View style={styles.itemContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>미세먼지</Text>
              <View style={styles.titleDateContainer}>
                <Text style={styles.title}>10:30AM</Text>
                <Text>img</Text>    
              </View>
            </View>
            <View style={styles.dustInfoContainer}>
              <View style={styles.dustIconImage}>
                <Text>아이콘</Text>
              </View>
              <View>
                <Text>미세먼지<Text>좋음</Text></Text>
                <Text>초미세먼지<Text>좋음</Text></Text>
                <Text>오존<Text>좋음</Text></Text>
              </View>
            </View>
          </View>
          <View style={styles.middleContainer}></View>
          <View style={styles.itemContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>대기 정보</Text>
              <View style={styles.titleDateContainer}>
                <Text style={styles.title}>10:30AM</Text>
                <Text>img</Text>    
              </View>
            </View>
            <View style={styles.dustInfoContainer}>
              <View>
                <Text>이산화탄소 <Text>좋음</Text> <Text>0.0070ppm</Text></Text>
                <Text>일산화탄소 <Text>좋음</Text> <Text>0.0070ppm</Text></Text>
                <Text>아황산가스 <Text>좋음</Text> <Text>0.0070ppm</Text></Text>
                <Text>통합대기 <Text>좋음</Text> <Text>56</Text></Text>
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
  dustIconImage:{
    width:"60rem",
    height:"60rem",
    backgroundColor:"grey",
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
    color:"#7B7B7B"
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
