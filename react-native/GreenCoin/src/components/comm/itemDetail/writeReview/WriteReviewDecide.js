import * as React from 'react';
import { Text,Image, View, Dimensions,ScrollView,StyleSheet,TouchableOpacity, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
  
const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

export default function WriteReviewDecide({saveData}){
  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.purchaseContainer} onPress={saveData}>
          <Text style={styles.purchase}>구매후기 남기고 적립금 받기</Text>
        </TouchableOpacity>
    </View>
  )
};


const styles = EStyleSheet.create({
  container:{
    padding:"15rem",
    width:"100%",
    alignItems: "center", 
    justifyContent: "center",
    marginBottom:"33rem",
  },
  purchaseContainer:{
    width:"350.618rem",
    height:"54rem",
    backgroundColor:"#0D2141",
    fontSize:"22.773rem",
    borderRadius:50,
    alignItems: "center", 
    justifyContent: "center",
    marginRight:"auto",
    marginBottom:"5rem",
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity:  0.4,
    shadowRadius: 13,
    elevation: 35,
  },
  purchase:{
    color:"white",
  },
});