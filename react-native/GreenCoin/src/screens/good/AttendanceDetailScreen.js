import React,{useState,useEffect} from 'react';
import { BackHandler , View, ScrollView,Image} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import CommonTitleBar from '../../components/comm/CommonTitleBar';
import localStringData from '../../const/localStringData';
import userInfoSingleton from '../../db/userInfoSingleton';
import { WebView } from 'react-native-webview';
import {useNavigation} from '@react-navigation/native';

export default function AttendanceDetailScreen({route}) {

    const [webViewHeight,setWebViewHeight] = useState(100);

    const navigation = useNavigation();



    function handleBackButtonClick() {
      navigation.goBack();
      return true;
    }

    useEffect(() => {
      BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
      };
    }, []);

    const onWebViewMessage = (event) => {
      if(event.nativeEvent.data)
        setWebViewHeight(Number(event.nativeEvent.data));
    }


    const injectedJavaScript=`
    window.ReactNativeWebView.postMessage(
      Math.max(document.body.offsetHeight, document.body.scrollHeight)
    );
  `
  // /
    return (
      <View style={styles.container}>
        <CommonTitleBar bottom={false} leftOption={"close"}></CommonTitleBar>
          <View style={styles.webViewContainer}>
            <WebView
            style={{flexGrow: 1, height : webViewHeight}}
            scrollEnabled={false}
            source={{ uri: `${localStringData.webIp}mypage/attendance/mobile?token=${userInfoSingleton.getInstance()._tok_name.replace(/ /gi,"")}` }}
            onMessage={onWebViewMessage}
            injectedJavaScript={injectedJavaScript}
            scalesPageToFit={true}
            androidHardwareAccelerationDisabled={true}
          />
          </View>
     </View>
    );
}


const styles = EStyleSheet.create({
  container:{
    height:"100%",
    backgroundColor:"white",
  },
  marginBox:{
    height :"59rem",
  },
  renderContainer:{
    width:"100%",
    justifyContent: "flex-start",
    flexWrap: 'wrap',
    flexDirection: 'row', 
  },
  image:{
    width:"400rem",
    height:"170rem",
  },
  webViewContainer:{
    width:"380rem",
    height:"100%",
    paddingBottom:"20%",
  },
  webView:{
    width:"100%",
    height:"100%",
  }


});
