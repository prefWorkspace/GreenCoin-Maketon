import React,{useState,useEffect} from 'react';
import { Text,Image, View, Dimensions,ScrollView,TouchableOpacity} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import localStringData from '../../const/localStringData';
import { useNavigation } from '@react-navigation/native';


export default function GoodTopTitleSelectList({categoriesList,category, setCategory}) {
  const navigation = useNavigation();

    
  if(categoriesList == undefined)
    return null;
    
    return (
      <ScrollView style={styles.container} horizontal={true} showsHorizontalScrollIndicator={false}>
        {
          categoriesList.map((item,index) => {
           return item.cat_name == null ? null :
            <View style={styles.dataContainer}>
              <TouchableOpacity activeOpacity={1} style={styles.renderContainer}  
                onPress={()=>{item.cat_name == "리뷰" ? 
                 navigation.navigate("reviewFilter",{root:"shopList"}) 
                 : 
                 navigation.navigate("shopList",{root:"shopList",cat_id:item.cat_id,cat_name:item.cat_name}) 
                }}
                >
                <View style={styles.imageContainer}>
                <Image style={styles.imgIcon} source={{uri:localStringData.imagePath + item.cat_img}} resizeMode={"stretch"}/>
                </View>
                <View style={styles.titleContainer}>
                  <Text style={styles.titleBar}>{item.cat_name}</Text>
                </View>
              </TouchableOpacity>
              <View style={[
                category == item.cat_name ?  styles.activeBar : styles.disActiveBar,
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
    height :"90rem",
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
    height :"90rem",
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
  },
  disActiveBar:{
    marginTop:"2rem",
    width:"50rem",
    height:"3rem",
  },
  imgIcon:{
    width :"27.865rem",height :"27.865rem",
  },
});