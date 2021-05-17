import React,{useState} from 'react';
import { Text, View, Dimensions,TextInput ,TouchableOpacity} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import registerServerController from '../../../server/registerServerController';


export default function UserIdAndPassword({setPassword,setId}) {


    return (
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <View style={styles.labelContainer}>
              <Text style={styles.label}>아이디</Text>
          </View>
          <TextInput 
            style={styles.inputBox}
            placeholder="아이디를 입력해주세요"
            onChangeText = {text=>{setId(text)}}
          
          />
          <View style={styles.labelContainer}>
              <Text style={styles.label}>비밀번호</Text>
          </View>
          <TextInput 
            style={styles.inputBox}
            placeholder="비밀번호를 입력해주세요"
            
            onChangeText={text=>{setPassword(text)}}
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
  itemContainer:{  
    width:"86%",
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
    height:'59.457rem',
  },
  contentContainer:{
    width:"100%",
    alignItems: "center",
    justifyContent: "center",
  },
  labelContainer:{
    width:"86%",
    justifyContent: "center",
    marginTop:"10rem",
  },
  label:{
    fontSize:"13rem",
    fontFamily:"NotoSansKR-Bold",
  },
  inputBox:{
    width:"100%",
    height:"48.556rem",
    backgroundColor:"white",
    borderColor:"#E1E6ED",
    borderWidth:1,
    borderRadius:5,
    width:"86%",
    paddingLeft:"10rem",
  },
});