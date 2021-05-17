import React from 'react';
import { Text, View, Dimensions, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
  
const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

export default function ChangeDecideBox(){
  return (
    <View style={styles.container}>
        <View style={styles.purchaseContainer}>
          <Text style={styles.purchase}>구매하기</Text>
        </View>
        <View style={styles.optionContainer}>
          <View style={styles.optionBox}>
            <Text style={styles.label}>장바구니</Text>
          </View>
          <View style={styles.optionBox}>
            <Text style={styles.label}>찜하기</Text>
          </View>
        </View>
    </View>
  )
};


const styles = EStyleSheet.create({
  container:{
    padding:"15rem",
    width:"100%",
    alignItems: "center", 
    justifyContent: "center",
  },
  purchaseContainer:{
    width:"350.618rem",
    height:"64rem",
    backgroundColor:"#0D2141",
    fontSize:"22.773rem",
    borderRadius:50,
    alignItems: "center", 
    justifyContent: "center",
    marginRight:"auto",
    marginBottom:"5rem",
  },
  purchase:{
    color:"white",
  },
  optionContainer:{
    flexDirection: 'row',
    alignItems: "center", 
    justifyContent: "center",
  },
  optionBox:{
    backgroundColor:"black",
    width:"170rem",
    height:"64rem",
    borderRadius:100,
    backgroundColor:"#EEF1F5",
    alignItems: "center", 
    justifyContent: "center",
    margin:"5rem",
  },
  label:{
    color:"#0D2141",
  }
});