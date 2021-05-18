import React,{useState} from 'react';
import { Text,Image, View, Dimensions,ScrollView,StyleSheet,TouchableOpacity, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {NewTagBox,FitTagBox,ModelPickTagBox,WeatherNewTagBox,MdPickTagBox} from './GoodsTagBox';
import { useNavigation,useRoute } from '@react-navigation/native';
import likesServerController from '../../server/likesServerController';
import userInfoSingleton  from '../../db/userInfoSingleton';
import appStaticInfomation  from '../../db/appStaticInfomation';
import localStringData  from '../../const/localStringData';
import FastImage from 'react-native-fast-image'

function numberWithCommas(x) {
  if(x)
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return "";
}

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

export default function ItemBox({item,colum,tag}){
  const navigation = useNavigation();
  const route = useRoute();
  const [wish ,setWish] = useState(item.prd_like);
  const _ptagList = appStaticInfomation.getInstance()._ptagList;

  let width = null;
  let height = null;
  const pivot = entireScreenWidth / 380; 

  tag = tag == false ? false : true;
  if(colum == undefined || colum == 2){
    width = "48.5%";
    height = entireScreenWidth * parseInt(width.split('%')[0]) / 100;
  }
  else if(colum == 1){
    width = entireScreenWidth  /3 ;
    height = entireScreenWidth  /3 ;
  }
  else{
    width = "33.3%"; 
    height = entireScreenWidth * parseInt(width.split('%')[0]) / 100;
  }


  if(item == null)
      return (<View style={[styles.container,{width:width}]}></View>);
  

      
  const callBack = (data) =>{
     if(data == true){
        setWish(!wish);
     }
     else
      Alert.alert(" ","찜 처리 실패");
  }

  const clickWishItem = () =>{
    if(userInfoSingleton.getInstance()._isLogin != true){
      navigation.navigate("selectLoginOrRegister",{root:route.name});
      return;
    } 

    var formData = new FormData();
    formData.append("mem_id",userInfoSingleton.getInstance()._userId);
    formData.append("prd_id",item.prd_id);

    if(wish == false){
      likesServerController.insertLikesTag(formData,callBack);
    }
    else
      likesServerController.deleteLikesTag(formData,callBack);
  }

  return (
    <View style={[styles.container,{width:width}]}>
      <TouchableOpacity style={styles.itemContainer} onPress={()=>{navigation.navigate("itemDetail",{root:route.name,id:item.prd_id})}}>
        <View style={styles.imageContainer}>
          <FastImage style={[styles.image,{height:height}]} source={{uri:localStringData.imagePath + item.prd_img}} resizeMode={FastImage.resizeMode.cover} />
        </View>
        <TouchableOpacity style={styles.wishContainer} onPress={clickWishItem}>

        </TouchableOpacity>
        <View style={styles.textContainer}>
          <View>
            <Text style={styles.title}>{item.prd_title}</Text>
          </View>
          {
              item.prd_sale_rate != 0 ? 
              <Text style={styles.saleLabelContainer}>
                <Text style={styles.prevPrice}>{numberWithCommas(item.prd_price)}</Text>
                <Text style={styles.saleRate}>  {numberWithCommas(Math.floor(item.prd_sale_rate))}%</Text>
                <Text style={styles.soldOut}>{item.prd_soldout != 1? "  품절" :""}</Text>
              </Text>
              :
              null
          }
          <Text style={styles.currentPrice}>{numberWithCommas(Math.round(item.prd_price - ((item.prd_price * item.prd_sale_rate) / 100)))}원</Text>
        </View>
        {
          tag == true && item.ptag_id ? 
            <View style={styles.tagContainer}>
            {
              
              JSON.parse(item.ptag_id).map((value)=>{

                if(_ptagList[value] == undefined)
                  return null;

                var ptagWidth  = _ptagList[value].width;
                var height  = _ptagList[value].height;
                return <FastImage style={[styles.tagImage , {width : ptagWidth - ((height - styles.tagImage.height)  *  (ptagWidth / height))}]} resizeMode={"stretch"} 
                source={{uri:localStringData.imagePath+ _ptagList[value].src}}/>
              })
            }
            </View>
           : null
        }
        </TouchableOpacity>
      </View> 
  )
};


const styles = EStyleSheet.create({
  container:{
    marginBottom:"auto",
  },
  imageContainer:{
    width: "96%",
    marginTop:"20rem",
    justifyContent: "center",
    alignSelf: "center",
  },
  tagImage:{
    marginRight:"7rem",
    marginTop:"4rem",
    height:"18rem",
  },
  image:{
    width:"100%",
  },  
  wishContainer:{
    padding:"1rem",
    position:'absolute',
    top:"30rem",
    right:"13rem",
    zIndex:10,
  },
  wish:{
    width:"40rem",
    height:"40rem",
  },
  textContainer:{
    left:"4.5rem",   
    width: "92%",
  },
  tagContainer:{   
    left:"4.5rem",
    justifyContent: "flex-start",
    flexWrap: 'wrap',
    flexDirection: 'row',
    backgroundColor:"white",
  },
  title:{
    fontFamily:"NotoSansKR-Medium",
  },
  saleLabelContainer:{
    marginBottom:"3rem",
    bottom:"2rem",
  },
  prevPrice:{    
    color:"#878787",
    textDecorationLine : "line-through",
    fontFamily:"Montserrat-Regular",
  },  
  soldOut:{
    color:"red",
    fontFamily:"Montserrat-Regular",
  },
  saleRate:{   
    color:"#4884DE",
    fontFamily:"Montserrat-Regular",
  },
  currentPrice:{      
    marginBottom:"5rem",
    fontFamily:"Montserrat-SemiBold",
  }

});