import React,{useState} from 'react';
import { TouchableOpacity, Text,Image, View, Dimensions,ScrollView,StyleSheet, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { useNavigation ,useRoute } from '@react-navigation/native';
import userInfoSingleton from '../../../db/userInfoSingleton';


const imageList = [
  {
    path:require("../../../assets/img/sample/pexels-photo-4946400.png"),
  },
  {
    path:require("../../../assets/img/sample/pexels-photo-6536119.png"),
  },
  {
    path:require("../../../assets/img/sample/pexels-photo-6634176.png"),
  },
  {
    path:require("../../../assets/img/sample/photo-1581375074612-d1fd0e661aeb.png"),
  },
  {
    path:require("../../../assets/img/icon/banner.png"),
  }
]

const url = "https://d2rue8hpwv3oux.cloudfront.net/post/";

export default function CommunityDetailImage({image,setImage,openImagePop, imageData}) {

  const changeImage = (value) =>{
    setImage(value);
  }

    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.titleAreaBody} onPress={()=>{openImagePop(image)}}>
           <Image style={styles.titleAddressPoint} source={{uri:url+image,}} resizeMode="stretch"></Image>
        </TouchableOpacity>
        <ScrollView style={styles.scrollView} horizontal={true}>
          {
            imageData.map((value)=>{
              return (
                <TouchableOpacity style={styles.imageContainer} onPress={()=>{changeImage(value)}}>
                  <Image style={styles.image} source={{uri:url+value,}} resizeMode="stretch"></Image>
                </TouchableOpacity>
              )
            })
          }
        </ScrollView>
        <View style={styles.fadeContainer}>
            <Image style={styles.fadeImage} source={require('../../../assets/img/label_point/rightGreen.png')}></Image>
        </View>
      </View>
    );
  }
  

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });


const styles = EStyleSheet.create({
  container: {
    padding:"20rem",
    marginTop:"20rem",
    marginBottom:"50rem",
    backgroundColor:"#F8F7F7"
  },
  titleAddressPoint:{
    width:"100%",
    height:"200rem",
  },
  titleAreaBody:{
    width:"100%",
  },
  scrollView:{
    width:"100%",
    height:"80rem",
  },
  imageContainer:{
    marginRight:"5rem",
    marginTop:"10rem",
  },
  image:{
    width:"60rem",
    height:"60rem",
  },
  fadeContainer:{
    width:"55rem",
    height:"55rem",
    flexDirection: 'row',
    position:"absolute",
    top:"220rem",
    left:"320rem",
    alignItems: "center",
    justifyContent: "center",
  },
  fadeImage:{
    width:"55rem",
    height:"55rem",
  }

});
