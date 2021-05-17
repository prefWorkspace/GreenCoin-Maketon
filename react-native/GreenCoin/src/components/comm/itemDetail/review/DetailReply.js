import React,{useState} from 'react';
import { Text,Image, View, Dimensions,ScrollView,StyleSheet,TouchableOpacity, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
  
const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

export default function DetailReply({moveReviewDetailScreen,content,date}){
  return (
    <View style={styles.container}>
      <Text style={styles.title}>용된다 관리자   {date}</Text>
      <Text>{content}</Text>
      <Text style={styles.textOption} onPress={()=>{moveReviewDetailScreen(true)}}>
          [더보기]
      </Text>
      {
        /*
        content == false?
        <Text style={styles.textOption} onPress={()=>{moveReviewDetailScreen(true)}}>
          {[더보기]}
        </Text>
        :
        <View>
          <Text>
            내용을 입력하세요.내용을 입력하세요.내용을 입력하세요.내용을 입력하세요.내용을 입력하세요.내용을 입력하세요.내용을 입력하세요.내용을 입력하세요.내용을 입력하세요.내용을 입력하세요.내용을 입력하세요.내용을 입력하세요.내용을 입력하세요.내용을 입력하세요.내용을 입력하세요.내용을 입력하세요.내용을 입력하세요.내용을 입력하세요.내용을 입력하세요.내용을 입력하세요.내용을 입력하세요.내용을 입력하세요.내용을 입력하세요.내용을 입력하세요.내용을 입력하세요.내용을 입력하세요.내용을 입력하세요.내용을 입력하세요.내용을 입력하세요.내용을 입력하세요.내용을 입력하세요.내용을 입력하세요.내용을 입력하세요.내용을 입력하세요.내용을 입력하세요.내용을 입력하세요.
          </Text>
          <Text style={styles.textOption} onPress={()=>{}}>
            [접기]
          </Text>
        </View>*/
      }
    </View>
  )
};


const styles = EStyleSheet.create({
  container:{
    width:"100%",
    paddingBottom:"10rem",
    borderBottomWidth :1,
    borderBottomColor:"#efefef",
    marginTop:"10rem",
    marginBottom:"10rem",
  },
  title:{
    color:"black",
    fontSize:"13.873rem",
    marginLeft:"auto",
    marginBottom:"3rem",
  },
  textOption:{
    color:"grey",
  }
 
});