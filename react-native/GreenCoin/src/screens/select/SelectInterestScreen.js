import React, { Component,useState ,useEffect } from "react";
import { Dimensions, View,BackHandler,ScrollView,TouchableOpacity,Image } from "react-native";


import MainTitle from '../../components/mains/main/MainTitle';
import EStyleSheet from 'react-native-extended-stylesheet';
import { WebView } from 'react-native-webview';
import appStaticInfomation from "../../db/appStaticInfomation";
import { useFocusEffect, useNavigation } from "@react-navigation/core";
import localStringData from '../../const/localStringData'

const SelectInterestScreen = () => {
  var navigation = useNavigation();

  useEffect(() => {
    if(!appStaticInfomation.getInstance()._area && appStaticInfomation.getInstance()._interest){
      navigation.goBack();
      navigation.navigate("area");
    } 
  }, []);

  useFocusEffect(
    React.useCallback(() => {  
      if(appStaticInfomation.getInstance()._area && appStaticInfomation.getInstance()._interest){
        navigation.goBack();
        navigation.navigate("tab");
      } 
    }, [])
  );


  const onWebViewMessage = (event) => {
    let data = JSON.parse(event.nativeEvent.data);
    if(data.type == "screen"){
      console.log(data);
    }
    else if(data.type == "interest"){
      console.log(data.data);
      navigation.navigate("area");
    } 
  }
//172.28.5.10
  return (
    <View style={styles.container}>
      <MainTitle/>
      <View>
        <ScrollView  contentContainerStyle={{flexGrow: 1, height : "100%"}}>
          <WebView
              source={{ uri: `${localStringData.webIp}/SelectInterest` }}
              bounces={true}
              scrollEnabled={false}
              onMessage={onWebViewMessage}
              injectedJavaScript="window.ReactNativeWebView.postMessage(JSON.stringify({type:'screen' , data : Math.max(document.body.offsetHeight, document.body.scrollHeight)}));"
              style={styles.content}
              onRespons
              // onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
              />
        </ScrollView>
     </View>
    </View>
  );
}

export default SelectInterestScreen;


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