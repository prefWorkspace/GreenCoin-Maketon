import React,{useState} from 'react';
import { Text, View, Dimensions,TextInput ,TouchableOpacity} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import registerServerController from '../../../server/registerServerController';

export default function IdentifiyPhoneNumber({phone, setPhone,setNumber,identify,setIdentify,originalPhone,clickNext, clickPhoneIdentify}) {

    const identifyNumber = () =>{
      if(identify == null && phone.length > 9 && phone.length < 12)
        clickPhoneIdentify();
    }

    return (
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <TextInput 
            style={styles.inputBox}
            placeholder="휴대폰 번호"
            keyboardType={"numeric"}
            onChangeText = {text=>{setPhone(text)}}
          
          />
          <View style={styles.labelContainer}>
            <TouchableOpacity style={styles.labelTag} onPress={identify == null ? identifyNumber : clickNext}>
                <Text style={styles.label}>인증하기</Text>
            </TouchableOpacity>
          </View>
          <TextInput 
            style={styles.inputBox}
            placeholder="인증번호"
            keyboardType={"numeric"}
            onChangeText={text=>{setNumber(text)}}
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
  itemContainer:{  
    width:"86%",
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
    height:'59.457rem',
  },
  contentContainer:{
    marginTop:"20rem",
    width:"100%",
    alignItems: "center",
    justifyContent: "center",
  },
  labelContainer:{
    width:"86%",
    alignItems: "center",
    justifyContent: "center",
    marginTop:"10rem",
    marginBottom:"10rem",
  },
  labelTag:{
    marginLeft:"auto",
    borderWidth:1,
    width:"64.412rem",
    height:"31.710rem",
    borderRadius:5,
    alignItems: "center",
    justifyContent: "center",
  },
  label:{
    fontSize:"12.864rem",
  },
  inputBox:{
    width:"100%",
    height:"48.556rem",
    backgroundColor:"white",
    borderColor:"grey",
    borderWidth:1,
    borderRadius:5,
    width:"86%",
    paddingLeft:"10rem",
  },
});