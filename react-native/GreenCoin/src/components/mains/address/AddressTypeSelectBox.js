import React , {useState}  from 'react';
import { Text,Image, View, Dimensions,ScrollView,StyleSheet, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { TouchableOpacity } from 'react-native-gesture-handler';



const Data=[
  {
    source: require('../../../assets/img/address/home.png'),
    title: "집"
  },
  {
    source: require('../../../assets/img/address/company.png'),
    title: "회사"
  },
  {
    source: require('../../../assets/img/address/mark.png'),
    title: "기타"
  },
];

export default function AddressTypeSelectBox({active,setActive}) {
    return (
      <View style={styles.container}>
      {
        Data.map((value,index)=>{
          return (
            <View style={styles.infoColum}>
              <TouchableOpacity 
                activeOpacity={.5}
                style={active == index ? styles.touchableOpacity : styles.activeTouchableOpacity} 
                onPress ={()=>{setActive(index)}}>
                <Image source={value.source} style={active == index ? styles.imageAcitve : styles.image } resizeMode={"stretch"}/>
                <Text>{value.title}</Text>
              </TouchableOpacity>
            </View>
          );
        })
      }
      </View>
    );
  }


const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });


const styles = EStyleSheet.create({
  container: {
    padding :"10rem",
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
  },
  infoColum:{
    width:"33%",
    height:"106.032rem",   
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
  },
  activeTouchableOpacity:{
    width:"106rem",
    height:"60.448rem",
    borderWidth:1.5,
    borderColor:"#E5E5E5",
    alignItems: "center",
    justifyContent: "center",
  },
  touchableOpacity:{
    width:"106rem",
    height:"60.448rem",
    borderWidth:1,
    borderColor:"#26CBFF",
    backgroundColor:"rgba(38, 210, 255, 0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  imageAcitve:{
     tintColor:"#26CBFF",
     bottom:"3rem",
  },
  image:{
    tintColor:"black",
    bottom:"3rem",
  }

});