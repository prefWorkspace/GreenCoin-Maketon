import React ,{useState,useEffect} from 'react';
import { Text, View, Dimensions,TextInput, TouchableOpacity ,Platform} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
  
const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

export default function InputBox({isClick,placeholder,setText,submitEvent,value,clickEvent,secure,inputType}){

  if(value == "" && clickEvent){
    clickEvent();
  }

  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.itemContainer} activeOpacity={1} onPress={()=>{ clickEvent? clickEvent() : null}}>  
          <TextInput 
            style={[styles.inputContainer]} 
            onFocus={isClick}
            onBlur={submitEvent}
            onChangeText={text =>{setText(text)}}
            onSubmitEditing={submitEvent}
            editable={clickEvent ? false : true}
            value={value}
            keyboardType={inputType ? "numeric" : "default"}
            secureTextEntry={secure ? true : false}
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
    backgroundColor: "rgba(196, 196, 196, 0.1)",
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
    top:   Platform.OS != "ios" ? "5rem" : "20rem",
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