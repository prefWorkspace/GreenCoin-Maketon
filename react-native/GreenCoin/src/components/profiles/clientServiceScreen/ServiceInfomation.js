import React,{useState} from 'react';
import { Text, View, Dimensions ,Linking,Platform} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import ModalContent from '../../comm/ModalContent';
//import KakaoSDK from "@actbase/react-native-kakaosdk";

export default function ServiceInfomation() {
  const [reqeust,setReqeust] = useState(false);

    async function kakaolinkText () {
      Linking.openURL('https://pf.kakao.com/_dexmSK');
      /*
      KakaoSDK.Channel
        .addFriend(plusFreindId)
        .then(res => console.log(res))
        .catch(e => console.log(e));*/
  };
    return (
      <View style={styles.hr}>
        <View style={styles.container}>
              <View style={styles.itemContainer}>
                <Text style={styles.subtitle}>업무시간: 09:00-18:00  일요일/공휴일 휴무</Text>
                <Text style={styles.title}>02-2279-7459</Text>
              </View>
              <View style={styles.buttonContainer}>
                <Text style={styles.selectBox} onPress={()=>{Linking.openURL("tel:02-2279-7459")}}>전화하기</Text>
                <Text style={styles.selectBox} onPress={()=>{setReqeust(true)}}>카톡하기</Text>
              </View>
        </View>
        <ModalContent modalType={"RequestKakao"} bottomType={"select"} isModalVisible={reqeust} setIsModalVisible={setReqeust} submitClick={kakaolinkText}></ModalContent>
      </View>
    );
  }
  


const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });


const styles = EStyleSheet.create({
  container: {
    width:"100%",
    flexDirection: 'row',
  },
 
  itemContainer:{ 
    width:"50%", 
    backgroundColor:"white", 
    paddingLeft:"10rem",
  },
  buttonContainer:{
    width:"50%",  
    height:"90%",
    flexDirection: 'row',
    padding:"25rem",
    paddingLeft:"30rem",
  },
  title:{
    fontFamily:"NotoSansKR-Medium",
    fontSize:"25.764rem",
    color:"black",
    bottom: Platform.OS != "ios" ?"14rem" : 0,
  },
  subtitle:{
    width:"300rem",
    fontFamily:"NotoSansKR-Medium",
    fontSize:"11rem",
    color:"black",
  },
  selectBox:{
    width :"64.412rem",
    height:"31.710rem",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    fontSize:"11.5rem",
    textAlign: "center",
    fontFamily:"NotoSansKR-Regular",
    marginTop:"auto",
    marginLeft:"5rem",
    padding: Platform.OS != "ios" ? 0 : "5rem"
  },
  hr:{
    width:"100%",
    paddingBottom:"20rem"
 
  }, 
});