import React,{useState} from 'react';
import { Text, View, Dimensions ,Linking} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import SettingContent from './SettingContent';
import ModalContent from '../../comm/ModalContent';
import ff from '@react-native-seoul/kakao-login'
//import KakaoSDK from "tbase/react-native-kakaosdk";
//import RNKakaoPlusFriend from 'react-native-kakao-plus-friend';

export default function SettingApplication() {
    const [report,setReport] = useState(false);
    const [reqeust,setReqeust] = useState(false);

    const reportClickEvent = () => { setReport(true); };
    const requestClickEvent = () => { setReqeust(true);};

    const submitReport = () =>{
      Linking.openURL('mailto:yddcompany2019@gmail.com');
      setReport(false);
    }

    async function kakaolinkText () {
      
      Linking.openURL('https://pf.kakao.com/_dexmSK');
  };


    return (
      <View style={styles.container}>
        <View style={styles.shadow}>
          <SettingContent 
            url={require("../../../assets/img/settingIcon/event.png")}
            title={"이벤트/마케팅 알림"}
            point={"switch"}
          />
          <View style={styles.hr}/>
           <SettingContent 
            url={require("../../../assets/img/settingIcon/event.png")}
            title={"야간 혜택 알림(21시~08시)"}
            point={"switch"}
          />
          <View style={styles.hr}/>
           <SettingContent 
            url={require("../../../assets/img/settingIcon/require.png")}
            title={"앱 요청하기"}
            point={null}
            clickEvent={requestClickEvent}
          />
          <View style={styles.hr}/>
           <SettingContent 
            url={require("../../../assets/img/settingIcon/report.png")}
            title={"신고하기"}
            point={null}
            clickEvent={reportClickEvent}
          />
         </View>
         <ModalContent modalType={"ReportEmail"} bottomType={"select"} isModalVisible={report} setIsModalVisible={setReport} submitClick={submitReport}></ModalContent>
         <ModalContent modalType={"RequestKakao"} bottomType={"select"} isModalVisible={reqeust} setIsModalVisible={setReqeust} submitClick={kakaolinkText}></ModalContent>
      </View>
    );
  }
  


const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });


const styles = EStyleSheet.create({
  container: {
    padding:"10rem",
    alignItems: "center",
    justifyContent: "center",
    borderRadius:"10rem",
  },
  shadow:{
    width:"90%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor:"white",
    borderRadius:10,
    elevation:6,
    shadowColor: "#000",
    shadowOffset: {
	    width: 0,
	    height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,
  },
  itemContainer:{
    width:"306.205rem",
    height:"57.457rem",
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
    padding:10,
  },
  icon:{
    marginRight:"auto",
  },
  title:{
    width:"190rem",
    fontFamily:"NotoSansKR-Medium",
    fontSize:"14.864rem",
    marginRight:"40rem",
  },
  select:{
    height:"33.692rem",
    fontSize:"11.891rem",
    fontFamily:"NotoSansKR-Regular",
    marginLeft:"auto",
  },
  hr:{
    width:"90%",
    borderBottomColor: '#efefef',
    borderBottomWidth: 1.2,
  }, 
});