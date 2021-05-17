import  React ,{useState}  from 'react';
import { Text, View, Dimensions ,TextInput ,TouchableOpacity, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import loginRegisterController from '../../../server/loginRegisterController';

/*
getRegisterPhoneNumber:(formData,moveToNext) =>{
  api.post(`users/check/phone`,formData,{}).then(response=>{
    moveToNext(response.data);
   }).catch(e=>{console.log(e)})
},
updatePhoneNumber:(formData,moveToNext) =>{
  api.post(`users/update/phone`,formData,{}).then(response=>{
    moveToNext(response.data);
   }).catch(e=>{console.log(e)})
},*/

export default function PhoneInfomation( {phone,setPhone , phoneButton, identify, setIdentify,clickPhoneIdentify,clickChangePhoneNumber}) {





    return (
      <View style={styles.container}>
        <View style={styles.itemContainer}>
            <Text style={styles.title}>핸드폰 번호</Text>
            <TextInput style={styles.textInput} onChangeText={(e)=>{setPhone(e)}}>{phone}</TextInput>
            <TouchableOpacity style={styles.checkPhoneContainer} onPress={clickPhoneIdentify}>
              <Text style={styles.checkPhoneTitle}>
                 확인
              </Text>
            </TouchableOpacity>
        </View>
        {
          phoneButton ? 
          <View style={styles.itemContainer}>
              <Text style={styles.title}>인증하기</Text>
              <TextInput style={styles.textInput} onChangeText={(e)=>{setIdentify(e)}}>{identify}</TextInput>
              <TouchableOpacity style={styles.checkPhoneContainer} onPress={clickChangePhoneNumber}>
                <Text style={styles.checkPhoneTitle}>
                   확인
                </Text>
              </TouchableOpacity>
          </View>
          :
          null
        }
        <View style={styles.hr}></View>
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
  title:{
      marginRight:"auto",
      fontSize:"14.864rem",
  },
  textInput:{
    borderColor:"#efefef",
    borderWidth: 1,
    borderRadius: 10,
    height:"36rem",
    width:"160rem",
    marginRight:"10rem",
    textAlign: 'center',
  },
  checkPhoneContainer:{
    borderWidth: 1,
    borderRadius: 10,
    width :"50rem",
    height:"36rem",
    alignItems: "center",
    justifyContent: "center",
  },
  hr:{
    marginTop:"auto",
    width:"86%",
    borderBottomColor: '#efefef',
    borderBottomWidth: 1.2,
  }, 
});