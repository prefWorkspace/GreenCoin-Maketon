import React,{useState}  from 'react';
import { Text,Image, View, Dimensions,ScrollView,StyleSheet,TouchableOpacity, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import ImagePicker from 'react-native-image-crop-picker';

export default function WriteAskSubImageList({imageList , setImageList}) {
  
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
                 {
                   imageList.map((image)=>{  
                     return (<Image style={styles.image} source={{uri:image.path}}></Image>);
                   })
                 }
                  <TouchableOpacity style={styles.imageAddContainer} onPress={clickOpenGallery}>
                      <Image style={styles.plus} source={require("../../../../assets/img/minus-plus/greyPlus.png")} />
                      <Text style={styles.title}>사진추가</Text>
                  </TouchableOpacity>
              </View>
              <Text style={styles.label}>최대 4장 첨부가능</Text>
          </View>
      </View>
    );
  }

//
//<Text style={styles.example}>asdsadas</Text>
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
