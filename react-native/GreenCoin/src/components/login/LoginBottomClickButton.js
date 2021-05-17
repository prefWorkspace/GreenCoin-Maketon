import React ,{useState}from 'react';
import { Text, View, Dimensions,TouchableOpacity ,Keyboard} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { useIsFocused  } from '@react-navigation/native';


const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

export default function LoginBottomClickButton({title,clickEvent,fontColor,backgroundColor}){

  const [keyboard ,setKeyboard] = useState(true);
  
  const _keyboardDidShow = () => {
    setKeyboard(false);
  };

  const _keyboardDidHide = () => {
    setKeyboard(true);
  };

  if(useIsFocused()){
    Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
    Keyboard.addListener("keyboardDidHide", _keyboardDidHide);
  }else{
    Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
    Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
  }
  



  return (
    <View style={styles.container}>
      {
        keyboard ? 
        <TouchableOpacity style={[styles.touchBox,{backgroundColor:backgroundColor}]} onPress={clickEvent}>
          <Text style={[styles.title,{color:fontColor}]}>{title}</Text>
        </TouchableOpacity>
        :
        null
      }
    </View>
  )
};


const styles = EStyleSheet.create({
  container:{
    width:"100%",
    alignItems: "center", 
    justifyContent: "center",
  },
  touchBox:{
    width:"350.618rem",
    height:"54rem",
    backgroundColor:"#EEF1F5",
    fontSize:"22.773rem",
    borderRadius:100,
    alignItems: "center", 
    justifyContent: "center",
    marginBottom:"5rem",
  },
  titleActive:{
    color:"white",
  },
  title:{
    color:"#D8D8D8",
    fontSize:"16rem",
    fontFamily: Platform.OS != "ios" ?"FontsFree-Net-SFProDisplay-Semibold" : "Poppins-SemiBold",
  },
});