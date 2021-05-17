import * as React from 'react';
import { Text, View, Dimensions, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

export default function Service() {
    return (
      <View style={styles.hr}>
      <View style={styles.container}>
         <Text style={styles.title}>고객센터</Text>
            <View style={styles.itemContainer}>
              <Text style={styles.subtitle}>하단의 카카오톡 문의 혹은 용된다 고객센터 전화 버튼을 눌러주시면 빠르게 정확한 답변을 받아보실 수 있습니다.</Text>
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
    bottom:"10rem"
  },
  title:{
    fontFamily:"NotoSansKR-Medium",
    fontSize:"15.855rem",
  },
  itemContainer:{ 
    width:"100%",  
    backgroundColor:"white",
  },
  subtitle:{
    fontSize:"11rem",
    color:"#878787",
    bottom:Platform.OS != "ios" ?"8rem":0
  },
  selectBox:{
    width :"100%",
    height:"33.692rem",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    fontSize:"11.891rem",
    textAlign: "center",
    marginTop:"5rem",
    fontFamily:"NotoSansKR-Regular",
  },
  hr:{
    width:"100%",
    padding:"10rem",
  }, 
});