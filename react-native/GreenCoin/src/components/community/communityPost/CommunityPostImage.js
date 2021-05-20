import React,{useState} from 'react';
import { TouchableOpacity, Text,Image, View, Dimensions,ScrollView,StyleSheet, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { useNavigation ,useRoute } from '@react-navigation/native';
import userInfoSingleton from '../../../db/userInfoSingleton';
import ImagePicker from 'react-native-image-crop-picker';



export default function CommunityPostImage({imageList , setImageList}) {
  
  const clickOpenGallery = () =>{
    ImagePicker.openPicker({ multiple: true ,mediaType:'photo', compressImageQuality : 0.6}).then(images => {
      if(imageList.length + images.length > 4){
        Alert.alert(" ","이미지는 최대 4장까지 첨부 가능합니다.");
      }else{
        images.map((value)=>{imageList.push(value)});
        setImageList([...imageList]);
      }}); 
    };

    return (
      <View style={styles.container}>
          <View style={styles.itemContainer}>
              <View style={styles.imageContainer}>
                  <TouchableOpacity style={styles.imageAddContainer} onPress={clickOpenGallery}>
                      <Text style={styles.title}>+</Text>
                  </TouchableOpacity>
                  {
                    imageList.length > 0 ? 
                    imageList.map((image)=>{  
                      return (<Image style={styles.image} source={{uri:image.path}}></Image>);
                    })
                    :
                    <View style={styles.image}></View>
                  }
              </View>
          </View>
      </View>
    );
  }

  const entireScreenWidth = Dimensions.get('window').width;
  EStyleSheet.build({ $rem: entireScreenWidth / 380 });
  
  
  const styles = EStyleSheet.create({
    container: {
      width:"100%",
      alignItems: "center",
      justifyContent: "center",
      padding :"20rem",
    },
    itemContainer:{
      width:"100%",
    },
    imageContainer:{
      marginRight:"20rem",
      flexDirection: 'row',
    },  
    image:{
      width :"58rem",
      height :"58rem",
      marginRight:"10rem",
      borderRadius:5,
    },
    imageAddContainer:{
      width :"58rem",
      height :"58rem",
      borderWidth:1,
      borderRadius:5,
      borderColor:"#E1E6ED",
      marginRight:"10rem",
      alignItems: "center",
      justifyContent: "center",
    },  
    plus:{
     marginBottom:"3rem",
    },
    title:{
      fontSize:"12.846rem",
      color:"#E1E6ED",
    },
    label:{
      marginTop:"10rem",
      color:"#878787",
    },
  
  });
  