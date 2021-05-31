import React, { useRef,useState ,useEffect } from "react";
import { Text,Dimensions, View,NativeEventEmitter,ScrollView,TouchableOpacity,Image } from "react-native";


import MainTitle from '../../components/mains/main/MainTitle';
import EStyleSheet from 'react-native-extended-stylesheet';
import { WebView } from 'react-native-webview';
import appStaticInfomation from '../../db/appStaticInfomation';
import {
  accelerometer,
  gyroscope,
  setUpdateIntervalForType,
  SensorTypes
} from "react-native-sensors";
import { map, filter } from "rxjs/operators";
import localStringData from '../../const/localStringData'
import serverController from '../../server/serverController'
import userInfoSingleton from '../../db/userInfoSingleton'
import { useNavigation } from "@react-navigation/core";

function getDateType(date){
  function checkZero(checkString){
    return checkString.toString().length == 1 ?  "0" + checkString : checkString;
  }
  var temp = `${checkZero(date.getFullYear())}-${checkZero(date.getMonth() + 1)}-${checkZero(date.getDate())}`;
  return temp;
}

const ContentScreen = () => {
  const [webViewHeight,setWebViewHeight] = useState(100);
  const [step,setStep] = useState(0);
  const [kg,setKg] = useState(50);
  const [kcal,setKcal] = useState(0);
  const [distancs,setDistancs] = useState(0);
  const userInfo = userInfoSingleton.getInstance();
  const webview = useRef(null);
  
  console.log(userInfo);
  const navigation = useNavigation();
  setUpdateIntervalForType(SensorTypes.accelerometer, 100); // defaults to 100ms

  const subscription = accelerometer
  .pipe(map(({ x, y, z }) => x + y + z), filter(speed => speed > 20))
  .subscribe(
    speed => {
      //console.log(`You moved your phone with ${speed}`)
      stepUpdate();
    },
    error => {
      console.log("The sensor is not available");
    }
  );


  const stepUpdate = () => {
    if(appStaticInfomation.getInstance()._step)
      return;
    appStaticInfomation.getInstance()._step = true;
    setTimeout(()=>{
        setStep(e => e + 1);
        updateStep();
        appStaticInfomation.getInstance()._step = false;
    },1000);
  }


  const onWebViewMessage = (event) => {
    let data = JSON.parse(event.nativeEvent.data);
    if(data.type == "screen"){
      initSteps();
    }
    else if(data.type == "myCoin"){
      navigation.navigate("myCoin");
    }
  }


  const initSteps = () =>{
    serverController.connectFetchController(`/users/${userInfo._no}/steps?token=${userInfo._token}`,"GET",null,
    function(res){
      if(res.success != 1)
        return;

      setStep(res.data.steps[0].step)
      setKg(55)
      setKcal(res.data.steps[0].kcal)
      setDistancs(res.data.steps[0].meter)
    }
    );
  }

  useEffect(() => {
    
    let curDate = new Date();
    curDate.setDate(curDate.getDate() - curDate.getDay())
    
    let lastDate = new Date();
    lastDate.setDate(lastDate.getDate() + (7 -  lastDate.getDay()))
    
    serverController.connectFetchController(`/users/${userInfo._no}/steps?token=${userInfo._token}&order=ASC&date_ge=${getDateType(curDate)}&date_le=${getDateType(lastDate)}`,"GET",null,
    function(res){
      if(res.success != 1)
        return;

        console.log(res.data.steps);
       // console.log(res.data.steps);
    }
    );
   
  }, [])

  useEffect(() => {
    if(step != 0)
      insertHTMLInfo();
  }, [step,kg,kcal,distancs])

  const insertHTMLInfo = () =>{
    if(webview && webview.current){

      var ca = (step ? step : 1) * 0.03;
      ca = (ca).toFixed(3) ?  (ca).toFixed(3) : 0;
      var tan = ca ? (ca / 100).toFixed(3) : 0;

      webview.current.injectJavaScript(`
        document.getElementsByName("steps")[0].innerHTML = "${step} steps";
        document.getElementsByName("kgs")[0].innerHTML = "${kg} kg";
        document.getElementsByName("kcals")[0].innerHTML = "${kcal > 0 ? kcal.toFixed(3) : ca}";
        document.getElementsByName("tansos")[0].innerHTML = "${tan}";
        document.getElementsByName("distancs")[0].innerHTML = "${distancs > 0 ? distancs.toFixed(3) : (step *  0.0008).toFixed(3)}";
        document.getElementsByName("historyListTag")[0].setAttribute("token","${userInfo._token}");
        document.getElementsByName("historyListTag")[0].setAttribute("no","${userInfo._no}");
        document.getElementsByName("historyListTag")[0].click();
        
      `)

    }
  }

  const updateStep = () =>{
    if(webview && webview.current){
      let data = { token : userInfo._token, step : 1  };
      serverController.connectFetchController(`/users/${userInfo._no}/steps/add`,"POST",JSON.stringify(data),
      function(res){
        console.log(res.data.updated_item);
        if(res.success == 1){
          initSteps();
        }
      }
      );
    }

  }


  
//172.28.5.10r
  return (
    <View style={styles.container}>
      <MainTitle/>
      <View>
        <TouchableOpacity onPress={updateStep}><Text>step : {step}</Text></TouchableOpacity>
        <ScrollView  contentContainerStyle={{flexGrow: 1, height : "100%"}}>
          <WebView
              ref={webview}
              source={{ uri: `${localStringData.webIp}` }}
              bounces={true}
              scrollEnabled={false}
              onMessage={onWebViewMessage}
              injectedJavaScript="window.ReactNativeWebView.postMessage(JSON.stringify({type:'screen' , data : Math.max(document.body.offsetHeight, document.body.scrollHeight)}));"
              style={styles.content}
              // onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
              />
        </ScrollView>
     </View>
    </View>
  );
}

export default ContentScreen;


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
    height: 100,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left:"76%",
    top:"84%",
  },
  image:{

  }
});