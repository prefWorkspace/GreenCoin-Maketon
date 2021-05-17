import React  from 'react';
import { Text,Image, View, Dimensions,ScrollView,StyleSheet,TouchableOpacity, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { useNavigation } from '@react-navigation/native';

import localStringData from '../../../const/localStringData';

export default function AskItem({ item}) {
   const navigation = useNavigation();
    return (
        
      <TouchableOpacity style={styles.container} 
        onPress={()=>{ 
          navigation.navigate("askDetail",{
            root:"문의 내역",
            boardInfo:item,
            productInfo:{ 
              prd_id:item.prd_id,
              prd_price:item.prd_price,
              prd_title:item.prd_title,
              prd_img: item.prd_img,
              prd_sale_rate: item.prd_sale_rate,
            }
            })
        }
        }>
          <View style={styles.itemContainer}>
              <View style={styles.imageContainer}>
                  <Image style={styles.image} source={{uri:localStringData.imagePath + item.prd_img}}></Image>
              </View>
              <View style={styles.labelContainer}>
                <View style={styles.titleContainer}>
                  {
                    item.board_re_content != undefined ? 
                    <Text style={styles.stateBox}>답변 완료</Text>
                    :
                    <Text style={styles.pendingBox}>답변 대기</Text>
                  }
                  <Text style={styles.date}>{item.date}</Text>
                </View>
                  <Text style={styles.title}>{item.prd_title}</Text>
                  <Text style={styles.statelabel}>{item.board_title}</Text>
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
    left:"10rem",
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
    marginTop:"10rem",
    justifyContent: "center",
  },  
  image:{
    width :"102.068rem",
    height :"102.068rem",
    marginRight:"auto",
  },
  stateBox:{
    borderWidth: 1,
    borderRadius:5,
    color:"white",
    backgroundColor:"#0D2141",
    width:"60.448rem",
    height:"29.728rem",
    padding:"6rem",
    marginRight:"10rem",
    fontSize:"11.891rem",
  },
  pendingBox:{
    borderWidth: 1,
    borderRadius:5,
    borderColor:"#D2D5DA",
    color:"#0D2141",
    width:"60.448rem",
    height:"29.728rem",
    padding:"6rem",
    marginRight:"10rem",
    fontSize:"11.891rem",
  },
  date:{
    fontSize:"12.873rem",
    color:"#878787",
  },
  title:{
    marginTop:"10rem",
    fontSize:"12.873rem",
    color:"#878787",
  },  
  statelabel:{
    color:"black",
    marginTop:"10rem",
    fontFamily: "NotoSansKR-Bold",
    fontSize:"14.855rem",
  },
  bottomBorder:{
    width:"90%",
    marginTop:"5rem",
    borderBottomWidth:1,
    borderBottomColor :"#efefef",
    backgroundColor:"white",
  },

});
