import * as React from 'react';
import { Text,Image, View, Dimensions,ScrollView,StyleSheet,TouchableOpacity, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
  
const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

export default function DetailBottomNav({cartClick ,purchaseClick}){
  return (
    <View style={styles.container}>
        <View style={styles.optionContainer}>
          <TouchableOpacity style={styles.optionBox} onPress={cartClick} >
            <Text style={styles.cart}>장바구니</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.purchaseBox} onPress={purchaseClick}>
            <Text style={styles.buy}>구매하기</Text>
          </TouchableOpacity>
        </View>
    </View>
  )
};


const styles = EStyleSheet.create({
  container:{
    padding:"8rem",
    width:"100%",
    alignItems: "center", 
    justifyContent: "center",
    position:"absolute",
    bottom:0,
    backgroundColor:"white",
  },
  optionContainer:{
    flexDirection: 'row',
    alignItems: "center", 
    justifyContent: "center",
    overflow: 'hidden', 
    paddingBottom: 5,
  },
  optionBox:{
    width:"160rem",
    height:"50rem",
    borderRadius:100,
    backgroundColor:"#EEF1F5",
    alignItems: "center", 
    justifyContent: "center",
    margin:"5rem",
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity:  0.4,
    shadowRadius: 4,
    elevation: 7,
  },
  purchaseBox:{
    width:"160rem",
    height:"50rem",
    borderRadius:100,
    backgroundColor:"#0D2141",
    alignItems: "center", 
    justifyContent: "center",
    margin:"5rem",
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity:  0.4,
    shadowRadius: 4,
    elevation: 7,
  },
  cart:{
    color:"#0D2141",
  },
  buy:{
    color:"white",
  }


});