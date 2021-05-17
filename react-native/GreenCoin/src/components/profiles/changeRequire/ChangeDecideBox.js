import React from 'react';
import { Text, View, Dimensions , TouchableOpacity} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
  
const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

export default function ChangeDecideBox({cancleClick,changeClick}){
  return (
    <View style={styles.container}>
        <View style={styles.optionContainer}>
          <TouchableOpacity style={styles.optionBox} onPress={cancleClick}>
            <Text style={styles.label}>취소</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.changeBox} onPress={changeClick}>
            <Text style={styles.change}>교환하기</Text>
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
  changeBox:{
    backgroundColor:"black",
    width:"170rem",
    height:"64rem",
    borderRadius:100,
    backgroundColor:"#0D2141",
    alignItems: "center", 
    justifyContent: "center",
    margin:"5rem",
  },
  change:{
    color:"white",
    fontFamily:"NotoSansKR-Medium"
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
    fontFamily:"NotoSansKR-Medium"
  }
});