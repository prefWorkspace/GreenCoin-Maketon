import React,{useState}  from 'react';
import { Text,Image, View, Dimensions,TextInput,StyleSheet,TouchableOpacity, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

export default function WriteReviewOrderReview({content,setContent}) {

    return (
      <View style={styles.container}>
          <View style={styles.itemContainer}>
             <Text style={styles.title}>* 구매후기 작성란</Text>
             <TextInput 
             placeholder={"구매후기 10자 이상 작성부탁드립니다." /*50자 이상 남겨주세요. 사진은 꼭 착용컷으로 부탁드려요:)\n상품 1개당 1회 지급입니다."*/} 
             style={styles.inputTitle}
             multiline={true}
             value={content}
             onChangeText={text=>{setContent(text)}}/>
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
    paddingLeft :"20rem",
    paddingRight:"20rem",
    paddingTop:"10rem",
  },
  itemContainer:{
    width:"100%",
    paddingBottom:"15rem",
  },
  inputTitle:{
    width:"100%",
    height:"106rem",
    borderWidth:1,
    borderColor:"#E1E6ED",
    borderRadius:5,
    marginBottom:"5rem",
    padding:"10rem",
    fontSize:"12.882rem",
    textAlignVertical : "top",
  },
  title:{
    color:"black",
    fontFamily:"NotoSansKR-Bold",
  }


});
