import React,{useState} from 'react';
import { Text,Image, View, Dimensions,ScrollView,StyleSheet,TouchableOpacity, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import reviewServerController  from '../../../../server/reviewServerController';
import userInfoSingleton  from '../../../../db/userInfoSingleton';
import {useRoute} from '@react-navigation/native';

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

export default function DetailReviewTitle({item}){
  
  const [score,setScore] = useState(item.count);


  const routeInfo = useRoute();
  const callBack = (data)=>{
    if(data == 1){
      return setScore(score - 1);
    }
    else if(data == 2){
      return setScore(score + 1);
    }
  }

  const updateScore = () =>{

    if(userInfoSingleton.getInstance()._userId == ""){
      navigation.navigate("selectLoginOrRegister",{root:routeInfo.name});
      return;
    }
    var formData = new FormData();
    formData.append('rev_id',item.rev_id);
    formData.append('mem_id',userInfoSingleton.getInstance()._userId);
    reviewServerController.updateReviewlikeScore(formData,callBack);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.titleContainer} onPress={updateScore} activeOpacity={1} >
          <Text style={styles.title}>이 리뷰가 도움이 되었다면 눌러주세요. </Text>
          <Image source={require("../../../../assets/img/review/thumb.png")}/>
          <Text style={styles.count}> {score}</Text>
      </TouchableOpacity>
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
  titleContainer:{
    flexDirection: 'row',
    alignItems: "center", 
    justifyContent: "center",
  },
  title:{
    color:"black",
    fontSize:"13.873rem",
  },
  count:{
    color:"black",
    marginRight:"auto",
    marginLeft:"5rem",
  }
});