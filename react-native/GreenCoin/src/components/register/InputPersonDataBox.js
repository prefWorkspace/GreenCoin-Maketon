import React ,{useState,useEffect} from 'react';
import { Text, View, Dimensions,TextInput, TouchableOpacity, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
// import TextInputMask from 'react-native-text-input-mask';

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

export default function InputPersonDataBox({isClick,placeholder,setText,clickEvent,submitEvent}){

  const [personal,setPersonal] = useState("");

  const updateTextForm = (text) =>{
    var regex = /[^0-9]/g;
    var result = text.replace(regex, "");

    if(result.length > 3)
      var result = result.slice(0, 6) + "-" + result.slice(6);
    result = result.slice(0 , 8);
    
    setText(result.replace(regex, ""));

    if(text.length == 8){
      result += "******";
    }
    setPersonal(result);
 }


  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.itemContainer} activeOpacity={1} onPress={()=>{ clickEvent? clickEvent() : null}}>  
         <TextInput
             value={personal}
             onFocus={isClick}
             onBlur={submitEvent}
             autoFocus={true}
             keyboardType={"numeric"}
             style={styles.inputContainer} 
             onChangeText={(text) => {
              updateTextForm(text);
            }}
            onSubmitEditing={submitEvent}
           /> 
          <Text style={styles.placeholder}>
            {placeholder}
          </Text>
        </TouchableOpacity>
    </View>
  )
};


const styles = EStyleSheet.create({
  container:{
    width:"100%",
    height:"90rem",
  },
  itemContainer:{
    height:"100%",
    width:"100%",
    alignItems: "center", 
    justifyContent: "center",
  },
  inputContainer:{
    width:"100%",
    height:"80rem",
    borderRadius:18,
    paddingTop:"30rem",
    paddingLeft:"23rem",
    backgroundColor:"white",
    fontSize:"24rem",
    fontFamily:"Montserrat-Medium",
    color:"black"
  },
  placeholder:{
    position: 'absolute',
    left:"20rem",
    top: "5rem",
    bottom:"20rem",
    fontSize: "13rem",
    color: '#BBBEC2',
    fontFamily:"NotoSansKR-Medium",
  },
  label:{
    marginRight:"auto",
    color:"#000000",
    fontSize:"13rem",
  }
});