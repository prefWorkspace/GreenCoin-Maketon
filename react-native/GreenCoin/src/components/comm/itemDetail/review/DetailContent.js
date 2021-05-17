import React,{useState} from 'react';
import { Text,Image, View, Dimensions,ScrollView,StyleSheet,TouchableOpacity, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
  
const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

export default function DetailOption({moveReviewDetailScreen,content}){
  return (
    <View style={styles.container}>
      <Text>{content}</Text>
      <Text style={styles.textOption} onPress={()=>{moveReviewDetailScreen()}}>
          [더보기]
      </Text>
      {
        /*
        content == false?
        <Text style={styles.textOption} onPress={()=>{moveReviewDetailScreen()}}>
          [더보기]
        </Text>
        :
        <View>
          <Text>
            내용을 입력하세요.내용을 입력하세요.내용을 입력하세요.내용을 입력하세요.내용을 입력하세요.내용을 입력하세요.내용을 입력하세요.내용을 입력하세요.내용을 입력하세요.내용을 입력하세요.내용을 입력하세요.내용을 입력하세요.내용을 입력하세요.내용을 입력하세요.내용을 입력하세요.내용을 입력하세요.내용을 입력하세요.내용을 입력하세요.내용을 입력하세요.내용을 입력하세요.내용을 입력하세요.내용을 입력하세요.내용을 입력하세요.내용을 입력하세요.내용을 입력하세요.내용을 입력하세요.내용을 입력하세요.내용을 입력하세요.내용을 입력하세요.내용을 입력하세요.내용을 입력하세요.내용을 입력하세요.내용을 입력하세요.내용을 입력하세요.내용을 입력하세요.내용을 입력하세요.
          </Text>
          <Text style={styles.textOption} onPress={()=>{setContent(false)}}>
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
    marginTop:"10rem",
    marginBottom:"10rem",
  },
  title:{
    color:"black",
    fontSize:"13.873rem",
    marginRight:"30rem",
  },
  price:{
    color:"black",
    fontSize:"13.873rem",
    marginRight:"auto",
  },
  point:{
    color:"#26CBFF",
    fontSize:"13.873rem",
    marginRight:"auto",
  },
  labelMargin:{
    marginTop:"5rem",
  },
  textOption:{
    color:"grey",
  }

 
});