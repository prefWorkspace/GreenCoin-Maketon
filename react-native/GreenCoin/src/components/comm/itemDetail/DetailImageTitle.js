import React, {useState,useEffect ,useRef} from 'react';
import { Text,Image, View, Dimensions,ScrollView,StyleSheet,TouchableOpacity, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import localStringData from '../../../const/localStringData';
import Swiper from 'react-native-swiper'
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

export default function DetailImageTitle({item,productInfo,scroll ,setScroll}){
  
  const [index,setIndex] = useState(1);
  const [imagelist ,setImagelist] = useState([]);
  const swiper = useRef();


  useEffect(() => {
    var splitImage = [];
    
    if(item && item.rev_file != undefined && item.rev_file.split(',')[0] != ""){
      splitImage = item.rev_file.split(',');   
    }
    else{
        if(productInfo && productInfo["prd_img"]){
          splitImage.push(productInfo["prd_img"]);
  
          if(productInfo["prd_img_2"]){
            var imgListStr = productInfo["prd_img_2"].split(',');
            for(var i=0;i<imgListStr.length;i++)
              splitImage.push(imgListStr[i]);
          }
          setImagelist(splitImage);
          return;
        }
    }

    setImagelist(splitImage);
    if(splitImage.length > 0)
        setIndex(0);

    
  }, [item,productInfo])

  const pinchEvent = () =>{
    setScroll(true); 
  }


  if(imagelist[index] == "")
    return null;
  return (
    <View style={styles.container}>
        <Swiper style={styles.titleImageContainer} 
                loop={true}
                activeDotStyle={{opacity:0}}
                dotStyle={{opacity:0}}
                ref={swiper}
                scrollEnabled={scroll}
                index={0}
                onIndexChanged={(index)=>{setIndex(index)}}
                >
                {
                  imagelist.map((value,index)=>{
                    return (
                      <ReactNativeZoomableView
                      key={index+"image_title"}
                      maxZoom={2}
                      minZoom={1}
                      zoomStep={0.3}
                      initialZoom={1}
                      onZoomAfter={()=>{setScroll(false);}}
                      onZoomEnd={pinchEvent}
                      >
                          <Image style={styles.titleImage}  source={index != -1 ? {uri:localStringData.imagePath + value} : null} resizeMode={"stretch"} />
                      </ReactNativeZoomableView>

                    )
                    })
                }
            </Swiper>
     
          <ScrollView style={styles.subImageListContainer} horizontal={true}>
          {
              imagelist.map((value,i)=>{
                return <TouchableOpacity onPress={()=>{
                  swiper.current.scrollBy(i - index);
                }
                  }>
                          <Image style={styles.subImage}  source={{uri:localStringData.imagePath + value}} resizeMode={"stretch"}/>
                       </TouchableOpacity>
              })
          }
          </ScrollView>
    </View> 
  )
};


const styles = EStyleSheet.create({
  container:{
   
  },
  titleImageContainer:{
    height:"410.256rem",
  },
  titleImage:{
    width:"410.256rem",
    height:"410.256rem",
  },
  subImageListContainer:{
    flexDirection: 'row',
  },
  subImage:{
    width:"81.258rem",
    height:"81.258rem",
    marginTop:"5rem",
    marginRight:"5rem",
  },

});