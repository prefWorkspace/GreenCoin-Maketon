import React,{useState,useEffect} from 'react';
import { BackHandler , View, ScrollView,Image} from 'react-native';
import MarginBox from '../../components/comm/MarginBox'
import GoodTopTitleSelectList from '../../components/good/GoodTopTitleSelectList'
import EStyleSheet from 'react-native-extended-stylesheet';
import {navigationBackHandler} from '../../navigation/NavigationBackHandler';
import serverController from '../../server/serverController';
import roundUpServerController from '../../server/roundUpServerController';
import ItemBox from '../../components/comm/ItemBox';
import GoodItemBox from '../../components/good/GoodItemBox';
import CommonTitleBar from '../../components/comm/CommonTitleBar';
import localStringData from '../../const/localStringData';
import { WebView } from 'react-native-webview';
import {useNavigation} from '@react-navigation/native';

export default function GoodDetailScreen({route}) {

    //navigationBackHandler();
    const [productList,setProductList] = useState([]);
    const [webViewHeight,setWebViewHeight] = useState(100);

    const navigation = useNavigation();

    const callBack = (data) =>{ 
      setProductList(data); 
    }

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

    useEffect(() => {
      var formData = new FormData();
      formData.append("ru_id",route.params.ru_id);
      roundUpServerController.getRoundUpDetailListByRuId(formData,callBack);
    }, [route])

    const onWebViewMessage = (event) => {
      if(event.nativeEvent.data)
        setWebViewHeight(Number(event.nativeEvent.data));
    }


    const injectedJavaScript=`
    window.ReactNativeWebView.postMessage(
      Math.max(document.body.offsetHeight, document.body.scrollHeight)
    );
  `
  
    return (
      <View style={styles.container}>
        <CommonTitleBar bottom={false} leftOption={"close"}></CommonTitleBar>
        {
          productList.length == 1 && productList[0].rulist_text && productList[0].rulist_text.length > 0 ? 
          <View style={styles.webViewContainer}>
            <WebView
            style={{flexGrow: 1, height : webViewHeight}}
            scrollEnabled={false}
            source={{ uri: `${localStringData.webIp}roundup/view/mobile/${route.params.ru_id}` }}
            onMessage={onWebViewMessage}
            injectedJavaScript={injectedJavaScript}
            scalesPageToFit={true}
            androidHardwareAccelerationDisabled={true}
          />
          </View>
          :
          <ScrollView> 
              <Image style={styles.image} source={{uri:localStringData.imagePath + route.params.img}}/>
              <MarginBox marginTop={50}/>
              <View style={styles.renderContainer}>
              {
                productList.map((item, idx) => {
                    return <ItemBox item={item} colum={3}/> ;
                })
              }
              </View>
              <MarginBox marginTop={100}/>
            </ScrollView>
        }
        
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
