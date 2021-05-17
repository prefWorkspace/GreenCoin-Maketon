import React ,{useState,useEffect}from 'react';
import { Text, View, Dimensions,Image, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Swiper from 'react-native-swiper'
import ItemBox from '../../comm/ItemBox';





function renderPage(value){
  return <ItemBox item={value}  colum={1} tag={false}/>;
}

export default function ShopHotItemList({hotItemList}) {
  
  

  const getHotlist = (start) =>{
    var list = [];
    for(var i = start;i < start + 3;i++){
      if(hotItemList.length == i)
        return list;
        list.push(renderPage(hotItemList[i]));
    }

    return list;
  }
  
  const getItemList = () =>{
    var itemlist = [];
    for(var i =0;i<hotItemList.length/3;i++){
      itemlist.push(
        <View style={styles.renderContainer}>
        {
          getHotlist(i * 3)
        }
       </View>
      )
    }
    return itemlist;
  }

    return (  hotItemList.length > 0 ?
        <View style={styles.container}>
          <View>
            <View style={styles.titleContainer}>
              <Image Image source={require('../../../assets/img/shop/Star.png')}></Image>
              <Text style={styles.title}>인기상품</Text>
            </View>
        </View>
          <Swiper style={styles.wrapper} 
              loop={true}
              activeDotStyle={{top:"10%"}}
              dotStyle={{top:"10%"}}
              index={0}
              >
             {
               getItemList()
             }
          </Swiper>
      </View>
      :
      null
    );
}

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

const styles = EStyleSheet.create({
  container: {
    width: "100%",
    marginTop:"15rem",
    marginBottom:"40rem",
  },  
  titleContainer:{
    flexDirection: 'row',
    alignItems: "center",
    paddingLeft:"14rem",
  },
  title:{
    marginLeft:"6rem",
    fontSize:"16rem",
    fontFamily:"Montserrat-Medium",
  },
  renderContainer:{
    flexDirection: 'row',
    alignItems: "center",
    width:"100%",
    left:"8rem",
  },
  wrapper:{
    marginTop:"15rem",
    height:"275rem",
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
  lengthLabel:{ 
    fontSize:"10.9rem",
    fontWeight:'bold',
    color:"white"
  }
});