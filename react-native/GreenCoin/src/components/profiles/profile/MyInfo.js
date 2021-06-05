import React, {useState,useEffect} from 'react';
import { Text,Image, View, Dimensions,TouchableOpacity,StyleSheet, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { useNavigation ,useFocusEffect } from '@react-navigation/native';
import userInfoSingleton from '../../../db/userInfoSingleton';
import serverController from '../../../server/serverController';
import ImagePicker from 'react-native-image-crop-picker';
import realmController from '../../../db/realm/realmController';

export default function MyInfo() {
 const navigation = useNavigation();
 const [name, setName] = useState("");
 const [currentPoint, setCurrentPoint] = useState(0);
 const [imageList, setImageList] = useState(null);
 const [image, setImage] = useState("");


  useFocusEffect(
    React.useCallback(() => {  
      
      setImage(userInfoSingleton.getInstance()._profile_img)
    setName(userInfoSingleton.getInstance()._username)
    // 현재 포인트 불러오기
    const num = userInfoSingleton.getInstance()._no;
    const token = userInfoSingleton.getInstance()._token;
    serverController.connectFetchController(`/users/${num}/points?token=${token}`,"GET",null,function(res){
      if(res.success==1){
        setCurrentPoint(res.data.point);
      }
    },function(err){console.log(err);});
    }, [])
  );

  const saveImageToServer = (images) =>{
    var formData = new FormData();

    images.map((value)=>{
      formData.append('file', {
        uri: value.path, 
        type: value.mime, 
        name: value.path.split('/')[value.path.split('/').length - 1], }
      );
    })

    console.log(images[0]);
    formData.append("token",userInfoSingleton.getInstance()._token);
    formData.append("path","post/");
    serverController.insertFilePostFetchController(`/files`,formData,function(res){
      console.log(res.data.upload_results)
      if(res.success==1){
          let data = {
            token : userInfoSingleton.getInstance()._token ,
            email : userInfoSingleton.getInstance()._email ? userInfoSingleton.getInstance()._email : "",
            phone_no : userInfoSingleton.getInstance()._phone ? userInfoSingleton.getInstance()._phone : "",
            birth_day : userInfoSingleton.getInstance()._bDay ? userInfoSingleton.getInstance()._bDay.split('T')[0] : "0000-00-00",
            profile_img  : res.data.upload_results[0].file_name,
          }
          serverController.connectFetchController(`/users/userinfo`,"PUT",JSON.stringify(data),function(res){
            if(res.success==1){
              realmController.checkAutoLogin((result)=>{
                if(result){
                   setImageList(images);
                   navigation.goBack();
                }
              });
            }
          },function(err){console.log(err);});
      }


    },function(err){console.log(err);});


  }


  
  const clickOpenGallery = () =>{
    ImagePicker.openPicker({  multiple: false ,mediaType:'photo', compressImageQuality : 0.6,width:600,height:600}).then(images => {
        saveImageToServer([images]);
      }); 
    };


    return (
      <View style={styles.container}>
          <TouchableOpacity style={styles.imageContainer} onPress={clickOpenGallery}>
              <Image style={styles.image} source={
                imageList && imageList[0] ? 
                {uri: imageList[0].path} : 
                image ? 
                  {uri: "https://d2rue8hpwv3oux.cloudfront.net/post/" + image}
                  :
                  require('../../../assets/img/logo/profile.png')
                  } 
                resizeMode={"cover"}
                >
              </Image>
          </TouchableOpacity>
          <View style={styles.textContainer}>
              <Text style={styles.name}>{name}</Text>
              <Text style={styles.coinTitle}>보유 그린코인 : <Text style={styles.coin}>{currentPoint}원</Text></Text>
          </View>
      </View>
    );
}
  

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });


const styles = EStyleSheet.create({
  container: {
    width:"100%",
    flexDirection: 'row',
    paddingLeft:"30rem",
    marginTop:"10rem",
    marginBottom:"10rem",
  },
  imageContainer:{
    width:"100rem",
    height:"100rem",
  },
  image:{ 
    width:"75rem",
    height:"75rem",
    borderRadius:50,
  },
  textContainer:{
    height:"100rem",
  },
  name:{
    fontSize:18,
    color:"#505050",
    fontFamily: "NotoSansKR-Medium",
  },
  coinTitle:{
    fontSize:15,
    color:"#505050",
    fontFamily: "NotoSansKR-Medium",
    bottom:"15rem",
  },
  coin:{
    fontSize:15,
    color:"#66D8B9",
    fontFamily: "NotoSansKR-Medium",
  }
  

});