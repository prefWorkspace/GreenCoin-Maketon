import React,{useState}  from 'react';
import { Text,Image, View, Dimensions,ScrollView,StyleSheet,TouchableOpacity, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { useNavigation } from '@react-navigation/native';
import localStringData from '../../../../const/localStringData';


function getDateType(date){
  function checkZero(checkString){
    return checkString.toString().length == 1 ?  "0" + checkString : checkString;
  }
  var temp = `${checkZero(date.getFullYear())}-${checkZero(date.getMonth() + 1)}-${checkZero(date.getDate())}`
        //  + ` ${checkZero(date.getHours())}:${checkZero(date.getMinutes())}:${checkZero(date.getSeconds())}`;
  return temp;
}


export default function WriteAskTitle({orderState}) {
    const navigation = useNavigation();
    const option =  JSON.parse(orderState.mog_option);

    return (
      <View style={styles.container}>
          <View style={styles.itemContainer}>
              <View style={styles.imageContainer}>
                  <Image style={styles.image} source={{uri: localStringData.imagePath + option.prd_img}}></Image>
              </View>
              <View style={styles.labelContainer}>
                <View style={styles.titleContainer}>
                  <Text style={styles.title}>{orderState.mg_name}</Text>
                  <TouchableOpacity style={styles.close} onPress={()=>{navigation.goBack()}}>
                      <Image source={require('../../../../assets/img/title/closeItem.png')}></Image>
                  </TouchableOpacity>
                </View>
                  <Text style={styles.price}>{getDateType(new Date(orderState.txn_date))}에 구매하신 상품입니다.</Text>
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
    flexDirection: 'row',
    paddingBottom:"15rem",
    borderBottomWidth:1,
    borderColor:"#F4F6F9",
  },
  imageContainer:{
    height:"100%",
    marginRight:"20rem",
  },  
  image:{
    width :"65rem",
    height :"65rem",
    borderRadius:5,
  },
  labelContainer:{
    width:"80%",
    height:"100%",
    marginRight:"auto",
  },  
  titleContainer:{
    width:"96%",
    flexDirection: 'row',
  },
  close:{
    marginLeft:"auto",
    top:"2rem",
  },
  title:{
    fontSize:"14.864rem",
    paddingRight:"10rem",
  },
  price:{
    fontSize:"12.882rem",
    top:"10rem",
    color:"#878787",
  },
  


});
