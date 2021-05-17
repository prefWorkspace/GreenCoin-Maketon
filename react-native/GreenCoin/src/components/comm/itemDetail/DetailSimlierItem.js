import React,{useState} from 'react';
import { Text, View, Dimensions,Image ,ScrollView, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import ItemBox from '../../comm/ItemBox';
import Swiper from 'react-native-swiper';

const Data = [
  {key:"a", src: require("../../../assets/img/sample/clothes.png") },
  {key:"b", src: require("../../../assets/img/sample/clothes.png")},
  {key:"c", src: require("../../../assets/img/sample/clothes.png")},
  {key:"d", src: require("../../../assets/img/sample/clothes.png")},
  {key:"e", src: require("../../../assets/img/sample/clothes.png")},
  {key:"u", src: require("../../../assets/img/sample/clothes.png")},
];





export default function ShopHotItemList({relativeProductList}) {
  
  //const itemList = Data.map((value, idx) => { return renderPage(value); });

  const getItemBoxList = (index)=>{
    return relativeProductList.map((value,i)=>{
        if(i >= index && i < index + 3)
        return <ItemBox item={value} colum={1} tag={false}/>
    })
  }

  const createItemArray = () =>{
    var resultList = [];
    for(var i = 0;i < relativeProductList.length / 3;i++){
      resultList.push(<View style={styles.renderContainer}>
        {
          getItemBoxList(i * 3)
        }
        </View>);
    }
      
    return resultList;
  }

  if(!relativeProductList || relativeProductList.length == 0)
      return <View style={styles.container}/>;

    return (
      <View style={styles.container}>
        <View style={styles.textContainer}>  
          <Image style={styles.markerPoint} source={require("../../../assets/img/label_point/leftClickPoint.png")} resizeMode="stretch"></Image>
          <Text style={styles.text}>함께 코디한 아이템</Text>
          <Image style={[styles.markerPoint,{top:".2%", transform: [{ rotate: '180deg'}]}]}  source={require("../../../assets/img/label_point/leftClickPoint.png")} resizeMode="stretch"></Image>
        </View>
        <Swiper 
            style={styles.wrapper} 
              autoplay={false}
              loop={false}
              activeDotStyle={{top:"10%",opacity:0}}
              dotStyle={{top:"10%",opacity:0}}
              >
             {
               createItemArray()
            }
        </Swiper>
      </View>
        
    );
}

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

const styles = EStyleSheet.create({
  container: {
    width: "100%",
    marginTop:"15rem",
    paddingLeft:"6rem",
  },  
  renderContainer:{    
    flexDirection: 'row',
    alignItems: "center",
    width:"100%",
  },
  wrapper:{
    marginTop:"15rem",
    height:"275rem",
    flexDirection: 'row',
  },  
  imageStyle:{
    width:"100%",
  },
  cuponLabelContainer:{
    bottom : "50rem",
    marginLeft:"auto",
    right:"10rem"
  },
  currentLabel:{
    fontSize:"10.9rem",
    fontWeight:'bold',
  },
  text:{
    fontSize:"16rem",
    fontFamily:"NotoSansKR-Medium",
    paddingLeft:"12rem",
    paddingRight:"12rem",
    padding:"8rem",
  },
  textContainer:{
    justifyContent: "center",
    alignSelf: "center",
    flexDirection: 'row',
  },
  lengthLabel:{ 
    fontSize:"10.9rem",
    fontWeight:'bold',
    color:"white"
  },
  markerPoint:{
    justifyContent: "center",
    alignSelf: "center",

  },
});