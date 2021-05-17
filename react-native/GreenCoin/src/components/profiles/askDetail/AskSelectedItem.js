import * as React from 'react';
import { Text,Image, View, Dimensions,ScrollView,StyleSheet,TouchableOpacity, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { useNavigation, useRoute } from '@react-navigation/native';
import localStringData from '../../../const/localStringData';

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


export default function AskSelectedItem({productInfo,state}) {
   const routeInfo = useRoute();
   const navigation = useNavigation();

   console.log(productInfo);
    return (
      <TouchableOpacity style={styles.container} onPress={()=>{navigation.navigate("askDetail",{root:routeInfo.name})}}>
          <View style={styles.itemContainer}>
              <View style={styles.imageContainer}>
                  <Image style={styles.image} source={{uri:localStringData.imagePath + productInfo.prd_img}}></Image>
              </View>
              <View style={styles.labelContainer}>
                <View style={styles.titleContainer}>
                  <Text style={styles.title}>{productInfo.prd_title}</Text>
                </View>
                  <Text style={styles.price}>{numberWithCommas(Math.round((productInfo.prd_price  - ((productInfo.prd_price * productInfo.prd_sale_rate) / 100))))}원</Text>
                  <View style={state ? styles.stateBox : styles.pendingBox}> 
                    <Text style={state ? styles.state : styles.pending}>{state ? "답변완료" : "답변대기"}</Text>
                  </View>
              </View>
          </View>
          <View style={styles.bottomBorder}></View>
      </TouchableOpacity>
    );
  }


const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });


const styles = EStyleSheet.create({
  container: {
    marginTop:"6rem",
    width:"100%",
    alignItems: "center",
    justifyContent: "center",
  },
  itemContainer:{
    width:"100%",
    height:"146.480rem",
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
    padding:"10rem",
  },
  titleContainer:{
    flexDirection: 'row',
    alignItems: "center",
  },
  imageContainer:{
    width:"34%",
    height:"100%",
    alignItems: "center",
    justifyContent: "center",
  },
  labelContainer:{
    width:"66%",
    height:"100%",
    marginTop:"25rem",
  },  
  image:{
    width :"102.068rem",
    height :"102.068rem",
    borderRadius:4,
  },
  stateBox:{
    borderWidth: 1,
    borderRadius:5,
    backgroundColor:"#0D2141",
    width:"66.448rem",
    height:"32.728rem",    
    alignItems: "center",
    justifyContent: "center",
    marginTop:"auto",
    marginBottom:"24rem",
  },
  pendingBox:{
    borderWidth: 1,
    borderRadius:5,
    backgroundColor:"white",
    width:"66.448rem",
    height:"32.728rem",    
    alignItems: "center",
    justifyContent: "center",
    marginTop:"auto",
    marginBottom:"24rem",
  },
  state:{
    fontSize:"12.5rem",
    color:"white", 
  },
  pending:{
    fontSize:"12.5rem",
    color:"#0D2141",
  },
  price:{
    fontFamily:"NotoSansKR-Regular",
    bottom:Platform.OS != "ios" ?"25rem" :0,
    fontSize:"14rem",
    color:"#878787",
  },
  title:{
    fontFamily:"NotoSansKR-Medium",
    fontSize:"15rem",
    color:"black",
    bottom: Platform.OS != "ios" ?"10rem" : 0,
  },
  bottomBorder:{
    width:"90%",
    marginTop:"5rem",
    borderBottomWidth:1,
    borderBottomColor :"#efefef",
    backgroundColor:"white",
  },

});
