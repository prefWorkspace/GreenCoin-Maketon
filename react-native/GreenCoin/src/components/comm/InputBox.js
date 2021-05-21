import React ,{useState,useEffect} from 'react';
import { Text, View, Dimensions,TextInput, TouchableOpacity ,Platform} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
  
const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

export default function InputBox({placeholder,title,setText,submitEvent,text,clickEvent,secure,inputType,error}){


  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.itemContainer} activeOpacity={1}>  
          <TextInput 
            style={error ? styles.inputErrorContainer  : styles.inputContainer } 
            onBlur={submitEvent}
            onChangeText={t =>{setText(t)}}
            onSubmitEditing={submitEvent}
            editable={clickEvent ? false : true}
            value={text}
            keyboardType={inputType ? "numeric" : "default"}
            secureTextEntry={secure ? true : false}
            placeholder={placeholder}
          />
          <Text style={styles.placeholder}>
            {title}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
            {error ? <Text style={styles.error}>{error}</Text> : null}
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
    height:"44rem",
    borderRadius:10,
    borderWidth:1,
    borderColor:"#DDDDDD",
    backgroundColor: "rgba(196, 196, 196, 0.1)",
    textAlign:"center",
    backgroundColor:"white",
    alignItems: "center", 
    justifyContent: "center",
    fontSize:15,
    fontFamily:"Montserrat-Medium",
    color:"black"
  },
  inputErrorContainer:{
    width:"100%",
    height:"44rem",
    borderRadius:10,
    borderWidth:1,
    borderColor:"#FF6767",
    backgroundColor: "rgba(196, 196, 196, 0.1)",
    textAlign:"center",
    backgroundColor:"white",
    alignItems: "center", 
    justifyContent: "center",
    fontSize:15,
    fontFamily:"Montserrat-Medium",
    color:"black"
  },
  placeholder:{
    position: 'absolute',
    left:"20rem",
    top: "-5rem",
    fontSize: 11,
    color: 'black',
    fontFamily:"NotoSansKR-Medium",
  },
  label:{
    marginRight:"auto",
    color:"#000000",
    fontSize:"13rem",
  },
  error:{
      color:"#FF6767"
  }
});