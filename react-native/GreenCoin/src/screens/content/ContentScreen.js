import React, { Component,useState ,useEffect } from "react";
import { Dimensions, View,BackHandler,ScrollView,TouchableOpacity,Image } from "react-native";


import MainTitle from '../../components/mains/main/MainTitle';
import EStyleSheet from 'react-native-extended-stylesheet';
import { WebView } from 'react-native-webview';

const ContentScreen = () => {
 
  const [webViewHeight,setWebViewHeight] = useState(100);

  const onWebViewMessage = (event) => {
      setWebViewHeight(Number(event.nativeEvent.data));
  }
//172.28.5.10
  return (
    <View style={styles.container}>
      <MainTitle/>
      <View>
        <ScrollView  contentContainerStyle={{flexGrow: 1, height : webViewHeight}}>
          <WebView
              // source={{ uri: `http://172.28.5.10:3000` }}
              source={{ uri: `http://172.28.5.10:3000` }}
              bounces={true}
              scrollEnabled={false}
              onMessage={onWebViewMessage}
              injectedJavaScript="window.ReactNativeWebView.postMessage(Math.max(document.body.offsetHeight, document.body.scrollHeight));"
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