import React,{useEffect, useState} from 'react';
import { Text,Image, View, Dimensions,ScrollView,StyleSheet, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import CommonTitleBar from '../../components/comm/CommonTitleBar'
import {navigationBackHandler} from '../../navigation/NavigationBackHandler';
import settingServerController from '../../server/settingServerController';
import userInfoSingleton from '../../db/userInfoSingleton';


function Item({value}){
  return (
    <View style={styles.itemContainer}>
        <Text style={styles.title}>{value.noti_title}</Text>
        <Text style={styles.label}>{value.noti_content}</Text>
        <Text style={styles.date}>{value.noti_date ? value.noti_date.split(' ')[0] : null}</Text>
    </View>
  )
}

export default function AlarmResultScreen() {

  const [notificationList,setNotificationList] = useState([]);

  useEffect(() => {
    var formData = new FormData();
    formData.append("mem_id",userInfoSingleton.getInstance()._userId);
    settingServerController.getNotificationList(formData,function(e){
      setNotificationList(e);
    });

  }, [])
  
 
    return (
      <ScrollView style={styles.container}>
        <CommonTitleBar leftOption={"back"} title={"알림 내역"}></CommonTitleBar>
          <View style={styles.form}>
            {
              notificationList.map((value)=>{
                return <Item value={value}></Item>
              })
            }
          </View>
      </ScrollView>
    );
}

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

const c = StyleSheet.create({
  
})
const styles = EStyleSheet.create({
  container: {
    width :"100%",
    height:"100%",
    backgroundColor:"white",
  },
  form:{ 
    width:"100%",  
    padding:"20rem",
    marginBottom:"10rem",
    justifyContent: "center",
    alignItems: "center",
  },
  itemContainer:{
    width:"100%",  
    padding:"15rem",
    flexDirection: 'row',
    marginBottom:"10rem",  
    borderWidth:1,
    borderColor:"#D2D5DA",
    borderRadius:10,
  },
  title:{
    color:"black",
    width:"30%",

  },
  label:{
    color:"black",
    marginRight:"auto",
  },
  date:{
    color:"black",
  },
  clear:{
    margin:"3.5rem",
    width :"155.877rem",
    height:"56.316rem",
    fontSize:"14.864rem",
    textAlign: "center",
    backgroundColor:"#DFE1E8",
    borderRadius:100,
    paddingVertical: "6.5rem",
    fontFamily:"NotoSansKR-Medium",
    color:"#FFFFFF"
  }, 
  submit:{
    margin:"3.5rem",
    width :"155.877rem",
    height:"56.316rem",
    fontSize:"14.864rem",
    textAlign: "center",
    backgroundColor:"#0D2141",
    borderRadius:100,
    paddingVertical: "6.5rem",
    fontFamily:"NotoSansKR-Medium",
    color:"#FFFFFF"
  },
  hr:{
    padding:"15rem",
    borderBottomColor: '#efefef',
    borderBottomWidth: 1,
  }
});