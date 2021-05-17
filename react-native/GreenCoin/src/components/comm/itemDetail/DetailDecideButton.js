import React from 'react';
import { Text, View, Dimensions , TouchableOpacity} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
  
const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

export default function DetailDecideButton({setModal,purchaseClick,cartClick,wishClick}){
  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.purchaseContainer} onPress={purchaseClick} activeOpacity={.8}>
          <Text style={styles.purchase}>구매하기</Text>
        </TouchableOpacity>
        <View style={styles.optionContainer}>
          <TouchableOpacity style={styles.optionBox} onPress={()=>{setModal({type:true,event:"cart"})}} activeOpacity={.8}>
            <Text style={styles.label}>장바구니</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionBox} onPress={wishClick} activeOpacity={.8}>
            <Text style={styles.label}>찜하기</Text>
          </TouchableOpacity>
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