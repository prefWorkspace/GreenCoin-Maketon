import React, {useState, useEffect} from 'react';
import { TouchableOpacity, Text,Image, View, Dimensions,ScrollView,StyleSheet, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { useNavigation ,useRoute } from '@react-navigation/native';
import userInfoSingleton from '../../../db/userInfoSingleton';
import { stringify } from 'uuid';

const parseString = require('react-native-xml2js').parseString;

export default function MainEnvironment() {
  const navigation = useNavigation();
  const routeInfo = useRoute();
  const [airTime, setAirTime] = useState("00:00");
  const [nitrogen, setNitrogen] = useState(0); // 이산화탄소
  const [carbon, setCarbon] = useState(0); // 일산화탄소
  const [sulfurous, setSulfurous] = useState(0); // 아황산가스
  const [idexmvl, setIdexmvl] = useState(0); // 통합대기환경지수
  const [airStatus, setAirStatus] = useState(["좋음", "좋음", "좋음", "좋음"])

  
  const [dustStatus, setDustStatus] = useState("좋음");
  const [ultraDustStatus, setUltraDustStatus] = useState("좋음");
  const [ozoneStatus, setOzoneStatus] = useState("좋음");
  const [dustTime, setDustTime] = useState("00:00");
  // 서울시 실시간 대기환경 평균 현황에서 데이터를 가져왔습니다.
  // 서울시 실시간 대기환경 평균 현황 -> http://data.seoul.go.kr/dataList/OA-1201/S/1/datasetView.do
  // 라이브러리 사용하여 XML을 JSON 형태로 바꾸었고

  // 앞에 0 추가
  const insertZero = (int) => {
    int = String(int);
    if(int.length == 1){
      int = "0" + int;
      return int;
    }
    return int;
  }

  // 대기정보 시간, 데이터 업데이트
  const refreshAir = () => {
    const currentDate = new Date();
    setAirTime(`${insertZero(currentDate.getHours()+9)}:${insertZero(currentDate.getMinutes())}`)

    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    fetch("http://openAPI.seoul.go.kr:8088/567551636f77616b3737445a686778/xml/ListAvgOfSeoulAirQualityService/1/5/", requestOptions)
    .then(response => response.text())
    .then(result => {
      parseString(result, (err, result) => {
        const data = JSON.parse(JSON.stringify(result));
        const _data = data.ListAvgOfSeoulAirQualityService.row[0];
        setNitrogen(_data.NITROGEN[0]); // 이산화탄소
        setCarbon(_data.CARBON[0]);// 일산화탄소
        setSulfurous(_data.SULFUROUS[0]);// 아황산가스
        setIdexmvl(_data.IDEX_MVL[0]);// 통합대기환경지수

        let newS = airStatus;
        if(_data.NITROGEN[0] > 0 && _data.NITROGEN[0] < 0.030){
          newS[0] = "좋음";
        }else if(_data.NITROGEN[0] > 0.031 && _data.NITROGEN[0] < 0.06){
          newS[0] = "보통";
        }else if(_data.NITROGEN[0] > 0.061 && _data.NITROGEN[0] < 0.2){
          newS[0] = "나쁨";
        }else{
          newS[0] = "매우나쁨";
        }

        if(_data.CARBON[0] > 0 && _data.CARBON[0] < 2.0){
          newS[1] = "좋음";
        }else if(_data.CARBON[0] > 2.01 && _data.CARBON[0] < 9.0){
          newS[1] = "보통";
        }else if(_data.CARBON[0] > 9.01 && _data.CARBON[0] < 15.00){
          newS[1] = "나쁨";
        }else{
          newS[1] = "매우나쁨";
        }

        if(_data.SULFUROUS[0] > 0 && _data.SULFUROUS[0] < 0.02){
          newS[2] = "좋음";
        }else if(_data.SULFUROUS[0] >  0.021 && _data.SULFUROUS[0] < 0.05){
          newS[2] = "보통";
        }else if(_data.SULFUROUS[0] > 0.051 && _data.SULFUROUS[0] < 0.150){
          newS[2] = "나쁨";
        }else{
          newS[2] = "매우나쁨";
        }

        if(_data.IDEX_MVL[0] > 0 && _data.IDEX_MVL[0] < 50){
          newS[3] = "좋음";
        }else if(_data.IDEX_MVL[0] >  51 && _data.IDEX_MVL[0] < 100){
          newS[3] = "보통";
        }else if(_data.IDEX_MVL[0] > 101 && _data.IDEX_MVL[0] < 250){
          newS[3] = "나쁨";
        }else{
          newS[3] = "매우나쁨";
        }
        setAirStatus([...newS]);
      })
    })
    .catch(error => console.log('error', error));
  }


  const refreshDus = () => {
    const currentDate = new Date();
    setDustTime(`${insertZero(currentDate.getHours()+9)}:${insertZero(currentDate.getMinutes())}`)

    var myHeaders = new Headers();
    myHeaders.append("Cookie", "WMONID=jiy3dsOGOuh");

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

  fetch("http://apis.data.go.kr/B552584/ArpltnStatsSvc/getCtprvnMesureSidoLIst?sidoName=서울&searchCondition=DAILY&pageNo=1&numOfRows=1&returnType=json&serviceKey=8lyaDMu%2FLOG8QO4QSq%2FmOmmtQ%2FneX%2BqEjNhWcuef1KDTv4EqX2%2Fue7Zjc5TCvfDiyVcYg7SHaIRhOkiTVR2uMg%3D%3D", requestOptions)
  .then(response => response.json())
  .then(result =>
    {
      const data = result.response.body.items[0]
      // 미세먼지
      if(data.pm10Value > 0 && data.pm10Value < 30){
        setDustStatus("좋음");
      }else if(data.pm10Value > 31 && data.pm10Value < 80){
        setDustStatus("보통");
      }else if(data.pm10Value > 81 && data.pm10Value < 150){
        setDustStatus("나쁨");
      }else{
        setDustStatus("매우나쁨");
      }
      // 초미세먼지
      if(data.pm25Value > 0 && data.pm25Value < 15){
        setUltraDustStatus("좋음");
      }else if(data.pm25Value > 16 && data.pm25Value < 35){
        setUltraDustStatus("보통");
      }else if(data.pm25Value > 36 && data.pm25Value < 75){
        setUltraDustStatus("나쁨");
      }else{
        setUltraDustStatus("매우나쁨");
      }
      // 오존
      if(data.o3Value > 0 && data.o3Value < 0.030){
        setOzoneStatus("좋음");
      }else if(data.o3Value > 0.031 && data.o3Value < 0.90){
        setOzoneStatus("보통");
      }else if(data.o3Value > 0.91 && data.o3Value < 0.150){
        setOzoneStatus("나쁨");
      }else{
        setOzoneStatus("매우나쁨")
      }
    }
  )
  .catch(error => console.log('error', error));
  }

  const statusColor = (status) => {
    if(status == "좋음"){
      return "#00C386";
    }else if(status == "보통"){
      return "#FFC400";
    }else{
      return "#FF4E00";
    }
  }



  useEffect(() => { 
    refreshAir();
    refreshDus();
  }, [])


    return (
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <View style={styles.itemContainer}>
            <View style={styles.titleContainer}>
              <Text  style={[styles.title]}>미세먼지</Text>
              <View style={styles.titleDateContainer}>
                <Text  style={[styles.title]} >{dustTime}</Text>
                <TouchableOpacity onPress={() => refreshDus()}>
                  <Image style={styles.resetImage} source={require('../../../assets/img/icon/reset.png')}></Image>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.dustInfoContainer}>
              <View style={styles.dustIconImage}>
                <Image style={styles.dustIconImage} source={require('../../../assets/img/icon/dustIcon.png')}></Image>
              </View>
              <View>
                <Text style={[styles.label,{bottom:"10%"}]}>&nbsp;&nbsp;미세먼지&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Text style={[styles.scoreLike,{color:statusColor(dustStatus)}]}>{dustStatus}</Text></Text>
                <Text style={[styles.label,{bottom:"20%"}]}>&nbsp;&nbsp;초미세먼지&nbsp;&nbsp;&nbsp;&nbsp;<Text style={[styles.scoreLike,{color:statusColor(ultraDustStatus)}]}>{ultraDustStatus}</Text></Text>
                <Text style={[styles.label,{bottom:"30%"}]}>&nbsp;&nbsp;오존&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Text style={[styles.scoreLike,{color:statusColor(ozoneStatus)}]}>{ozoneStatus}</Text></Text>
              </View>
            </View>
          </View>
          <View style={styles.middleContainer}></View>
          <View style={styles.itemContainer}>
            <View style={styles.titleContainer}>
              <Text  style={[styles.label,styles.title]}>대기 정보</Text>
              <View style={styles.titleDateContainer}>
                <Text  style={[styles.label,styles.title]} >{airTime}</Text>
                <TouchableOpacity  onPress={() => refreshAir()}>
                  <Image style={styles.resetImage} source={require('../../../assets/img/icon/reset.png')}></Image>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.dustInfoContainer}>
              <View>
                <Text style={[styles.label,{bottom:"10%"}]}>이산화탄소 &nbsp;<Text style={[styles.scoreLike,{color:statusColor(airStatus[0])}]}>{airStatus[0]}</Text>&nbsp;&nbsp;&nbsp;<Text>{nitrogen}ppm</Text></Text>
                <Text style={[styles.label,{bottom:"20%"}]}>일산화탄소 &nbsp;<Text style={[styles.scoreLike,{color:statusColor(airStatus[1])}]}>{airStatus[1]}</Text>&nbsp;&nbsp;&nbsp;<Text>{carbon}ppm</Text></Text>
                <Text style={[styles.label,{bottom:"30%"}]}>아황산가스 &nbsp;<Text style={[styles.scoreLike,{color:statusColor(airStatus[2])}]}>{airStatus[2]}</Text>&nbsp;&nbsp;&nbsp;<Text>{sulfurous}ppm</Text></Text>
                <Text style={[styles.label,{bottom:"40%"}]}>통합대기&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Text style={[styles.scoreLike,{color:statusColor(airStatus[3])}]}>{airStatus[3]}</Text>&nbsp;&nbsp;&nbsp;<Text>{idexmvl}</Text></Text>
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
