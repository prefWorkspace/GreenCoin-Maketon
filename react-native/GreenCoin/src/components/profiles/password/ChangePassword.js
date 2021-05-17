import * as React from 'react';
import { Text, View, Dimensions,TextInput, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';


export default function RefundInformation({ setPassword ,setCheckPassword}) {
    return (
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <TextInput 
            style={styles.inputBox}
            placeholder="신규 비밀번호"
            onChangeText={text=>{setPassword(text)}}
            
            secureTextEntry={true}
          />
          <TextInput 
            style={styles.inputBox}
            placeholder="신규 비밀번호 재확인"
            onChangeText={text=>{setCheckPassword(text)}}
            
            secureTextEntry={true}
          />
        </View>
      </View>
    );
  }
  


const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });


const styles = EStyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainer:{
    marginTop:"10rem",
    width:"100%",
    alignItems: "center",
    justifyContent: "center",
  },
  inputBox:{
    width:"100%",
    height:"48.556rem",
    backgroundColor:"white",
    borderColor:"grey",
    borderWidth:1,
    borderRadius:5,
    width:"86%",  
     marginTop:"10rem",
  },
});