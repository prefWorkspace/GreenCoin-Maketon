import React,{useState}  from 'react';
import { Text,Image, View, Dimensions,ScrollView,StyleSheet,TouchableOpacity, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import userInfoSingleton from '../../../../db/userInfoSingleton';

export default function WriteAskTitle() {
    const name = userInfoSingleton.getInstance()._userName;
    return (
      <View style={styles.container}>
          <View style={styles.itemContainer}>
              <View style={styles.titleContainer}>
                <Text>{name} 고객님,  <Text> 구매 상품은 어떠셨나요?</Text></Text>
                <Text>구매후기를 작성하고 적립금 받으세요!</Text>
              </View>
              <View style={styles.borderBox}>
                  <Text style={styles.label}>지금 구매후기 남기면 적립금 최대 <Text>8,000원</Text></Text>
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
    marginBottom:"20rem",
    marginTop:"5rem",
  },
  itemContainer:{
    width:"100%",
    alignItems: "center",
    justifyContent: "center",
  },
  titleContainer:{
    width:"100%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom:"20rem",
  },  
  borderBox:{
    width:"90%",
    height:"40rem",
    borderRadius:5,
    backgroundColor:"#F4F6F9",
    alignItems: "center",
    justifyContent: "center",
  },
  label:{
    color:"black",
  }
 

});
