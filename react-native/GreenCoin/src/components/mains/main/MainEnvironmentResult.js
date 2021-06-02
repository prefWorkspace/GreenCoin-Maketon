import React ,{useEffect, useState}from 'react';
import { TouchableOpacity, Text,Image, View, Dimensions,ScrollView,StyleSheet, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { useNavigation ,useRoute } from '@react-navigation/native';
import userInfoSingleton from '../../../db/userInfoSingleton';
import serverController from '../../../server/serverController';
import Swiper from 'react-native-swiper'
import ModalCommon from '../../comm/ModalCommon';

export default function MainEnvironmentResult({setIsModal}) {
  const navigation = useNavigation();
  const routeInfo = useRoute();
  const userInfo = userInfoSingleton.getInstance();
  const [idx, setIndex] = useState(0);
  const [stepInfo, setStepInfo] = useState({kcal:0,location_no: 0, meter: 0, step: 0});

  const initSteps = () =>{
    serverController.connectFetchController(`/users/${userInfo._no}/steps?token=${userInfo._token}`,"GET",null,function(res){
      const data = res.data.steps; 
      if(!data[0]){return;}
      setStepInfo(data[0]);
    },function(err){console.log(err);});
  }


  const popModal = () => {
    setIsModal(true);
  }

  useEffect(() => {
    initSteps();
  }, [])

  const swipeItem  = () =>{
    return(
        <View style={styles.dustInfoContainer}>
          <View style={styles.dustIconImage}>
            <Image style={styles.dustIconImage} source={require('../../../assets/img/icon/subway.png')}></Image>
          </View>
          <View>
            <Text style={[styles.label]}>하루 출/퇴근 대중교통 이용하기!</Text>
            <View style={[styles.agreeBox]}>
              <TouchableOpacity onPress={() => popModal()}>
                <Text style={[styles.agreeLabel]}>미션수락</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      //  원래코드입니다.
      // <View style={styles.itemContainerSwiper}>
      //   <View style={styles.titleContainer}>
      //     <View style={styles.titleDateContainer}>
      //     </View>
      //   </View>
      //   <View style={styles.dustInfoContainer}>
      //     <View style={styles.dustIconImage}>
      //       <Image style={styles.dustIconImage} source={require('../../../assets/img/icon/subway.png')}></Image>
      //     </View>
      //     <View>
      //       <Text style={[styles.label]}>하루 출/퇴근 대중교통 이용하기!</Text>
      //       <View style={[styles.agreeBox]}>
      //         <Text style={[styles.agreeLabel]}>미션수락</Text>
      //       </View>
      //     </View>
      //   </View>
      // </View>
    )
  }
  
  return (
    <View style={styles.container}>
        <View style={styles.likeInfoContainer}>
          <View style={styles.likeInfo}>
            <Image style={styles.image} source={require('../../../assets/img/icon/lose.png')} resizeMode="stretch"></Image>
            <Text>오늘 내가 줄인 탄소양</Text>
          </View>
        </View>
      <View style={styles.subContainer}>
        
        <Swiper
          loop={true}
          onIndexChanged={(index)=>{setIndex(index)}}
          activeDotStyle={{ top:"25%", backgroundColor:"#BFBFBF"}}
          dotStyle={{top:"25%",backgroundColor:"#E4E4E4"}}
          >
          {swipeItem()}
          {swipeItem()}
          {swipeItem()}
        </Swiper>

        <View style={styles.middleContainer}></View>
        <View style={styles.itemContainer}>
          <View style={styles.titleContainer}>
            <View style={styles.titleDateContainer}>
              <TouchableOpacity onPress={() => popModal()}>
                <Image style={styles.resetImage} source={require('../../../assets/img/icon/share.png')}></Image>
              </TouchableOpacity>
              <Text  style={[styles.label,styles.title]} >{stepInfo.step} step</Text>
            </View>
          </View>
          <View style={styles.dustInfoContainer}>
            <View style={styles.infoContainer}>
              <Text style={[styles.calLabel]}>{(stepInfo.kcal / 100).toFixed(3)} kg</Text>
              <View style={styles.row}>
              <Text style={[styles.label]}>칼로리</Text><Text style={styles.rate}>{stepInfo.kcal.toFixed(3)}</Text>
              </View>
              <View style={styles.row}>
              <Text style={[styles.label]}>거리</Text><Text style={styles.rate}>{stepInfo.meter.toFixed(3)}</Text>
              </View>
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
  justifyContent: "center",
  padding:"10rem",
  marginBottom:"40rem",
},
subContainer:{
  flexDirection: 'row',
  borderRadius:50,
  borderWidth:1,
  borderColor:"#efefef",
  width:"100%",
  // height: "176rem",
  height: "200rem",
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
row:{
  flexDirection: 'row',
  width:"100rem",
  alignItems: "center",
  justifyContent: "center",
},
image:{
  width:"28.42rem",
  height:"28.42rem",
  marginRight:"10rem",
},
itemContainer:{
  width:"47%",
},
itemContainerSwiper:{
  width:"47%",
},
dustInfoContainer:{
  alignItems: "center",
  justifyContent: "center",
},
infoContainer:{
  alignItems: "center",
  justifyContent: "center",
},
resetImage:{
  width:"16rem",
  height:"16rem",
  marginLeft:"100rem",
  top:"10rem",
},
scoreLike:{
  color:"#00C386",
},
dustIconImage:{
  width:"128rem",
  height:"96rem",
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
calLabel:{
  color:"#00C386",
  fontSize:29,
  marginBottom:"20rem",
},
agreeBox:{
  borderRadius:50,
  backgroundColor:"#66D8B9",
  alignItems: "center",
  justifyContent: "center",
  textAlign:"center",
  height:"40rem",
},
agreeLabel:{
  color:"white",
},
rate:{
  color:"#7B7B7B",
  marginLeft:"10rem",
  fontSize:10,
  marginBottom:"5rem",
},
label:{
  fontSize:10,
  color:"black",
  marginBottom:"5rem",
},
title:{
  fontSize:15,
  color:"#7B7B7B"
},
titleLabel:{
  textAlign:"center",
  fontSize :"14rem",
  fontWeight:'bold',
  
  //fontFamily: "NotoSansCJKkrRegular"
},
titleDateContainer:{
  width:"100%",
  alignItems: "center",
  justifyContent: "center",
  textAlign:"center",
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
