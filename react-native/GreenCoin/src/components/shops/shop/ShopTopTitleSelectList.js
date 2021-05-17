import React,{useState,useEffect} from 'react';
import { Text,Image, View, Dimensions,ScrollView,TouchableOpacity} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import appStaticInfomation from '../../../db/appStaticInfomation';
import localStringData from '../../../const/localStringData';
import { useNavigation } from '@react-navigation/native';
import serverController from '../../../server/serverController';



export default function ShopTopTitleSelectList({categoriesList,category, setCategory }) {
  const navigation = useNavigation();

  if(categoriesList == undefined)
    return null;

    return (
      <ScrollView style={styles.container} horizontal={true} showsHorizontalScrollIndicator={false}>
        {
          categoriesList.map((item,index) => {
           return item.cat_name == null ? null :
            <View key={index+"category_shop_list"} style={styles.dataContainer}>
              <TouchableOpacity activeOpacity={1} style={styles.renderContainer}  
                onPress={()=>{item.cat_name == "리뷰" ? 
                 navigation.navigate("reviewFilter",{root:"shopList"}) 
                 : 
                 setCategory([item.cat_name,item.cat_id])}}
                >
                <View style={styles.imageContainer}>
                  <Image style={styles.imgIcon} source={{uri:localStringData.imagePath + item.cat_img}} resizeMode={"stretch"}/>
                </View>
                <View style={styles.titleContainer}>
                  <Text style={styles.titleBar}>{item.cat_name}</Text>
                </View>
              </TouchableOpacity>
              <View style={[
                category[0] == item.cat_name ?  styles.activeBar : styles.disActiveBar,
                {width:styles.activeBar.width * (item.cat_name.length == 4 ? 4 : 5) }]}
                />
            </View>
          })
        }
      </ScrollView>
    );
  }
  


const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });


const styles = EStyleSheet.create({
  container: {
    height :"85rem",
    marginTop:"13rem",
    flexDirection: 'row',
  },
  titleContainer:{
    marginTop:"6rem",
    height:"17rem",
    justifyContent: "center",
    alignItems :"center",
  },
  titleBar:{
    fontSize:"13rem",
    color:"black",
    fontFamily:"NotoSansKR-Medium",
  },
  dataContainer:{
    width:"70rem",
    height :"70rem",
    marginBottom:"10rem",
    alignItems :"center",
  },
  renderContainer:{
    width:"80rem",
    justifyContent: "center",
    alignItems :"center",
    marginBottom:"10rem",
  },
  imageContainer:{
    height:"28rem",
  },
  activeBar:{
    left:"0.5rem",
    backgroundColor:"#26CBFF",
    width:"12.1rem",
    height:"3rem",
    bottom:"7rem"
  },
  disActiveBar:{
    marginTop:"2rem",
    width:"50rem",
    height:"3rem",
    bottom:"7rem"
  },
  imgIcon:{
    width :"27.865rem",height :"27.865rem",
  },
});