import React ,{useState,useEffect} from 'react';
import { Text, View, Dimensions,TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import InputBox from '../comm/InputBox';

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

export default function RegisterPasswordBox({isClick_1,isClick_2 ,passwordIdentify,setPasswordIdentify,vaildate}){
  const [password,setPassword] = useState("");
  const [passwordCheck,setPasswordCheck] = useState("");
  
  useEffect(() => {
    if(password != "" && passwordCheck != "" && password.length >= 4)
      setPasswordIdentify(password == passwordCheck? password : false); 
    }, [password,passwordCheck]);

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <InputBox isClick={isClick_1} placeholder={"비밀번호 입력"} setText={setPassword} submitEvent={vaildate} secure={true}/>
        <InputBox isClick={isClick_2} placeholder={"비밀번호 확인"} setText={setPasswordCheck} submitEvent={vaildate} secure={true}/>
        <View style={styles.stateContainer}>
          <Text style={passwordIdentify == false ? styles.title: styles.titleActive}>
            {
            passwordIdentify == null ? 
            "" : 
            passwordIdentify ? 
            "비밀번호가 일치합니다." : 
            "비밀번호가 일치하지 않습니다"
            }
          </Text>
        </View>
    </KeyboardAvoidingView>
  )
};


const styles = EStyleSheet.create({
  container:{
    width:"100%",
  },
  itemContainer:{
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
    top: "5rem",
    bottom:"20rem",
    fontSize: "13rem",
    color: '#BBBEC2',
    fontFamily:"NotoSansKR-Medium",
  },
  stateContainer:{
    flexDirection: 'row',
    alignItems: "center", 
    paddingLeft:"10rem",
    marginTop:"13rem",
    marginBottom:"13rem",
  },
  title:{
    color:"#FF0000",
    fontSize:"13rem",
    left:"150rem",
    bottom:"89rem",
  },
  titleActive:{
    color:"#26CBFF",
    fontSize:"13rem",
    left:"150rem",
    bottom:"89rem",
  },
});