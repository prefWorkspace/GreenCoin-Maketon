import React , {useState}  from 'react';
import { Text,Image, View, Dimensions,ScrollView,StyleSheet, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import CommonTitleBar from '../../components/comm/CommonTitleBar'
import SettingAccount from '../../components/profiles/setting/SettingAccount';
import SettingApplication from '../../components/profiles/setting/SettingApplication';
import SettingPolicy from '../../components/profiles/setting/SettingPolicy';
import OrderFindBar from '../../components/comm/OrderFindBar';
import SettingDeleteAccount from '../../components/profiles/setting/SettingDeleteAccount';


export default function ClientServiceScreen() {

    return (
      <View>
        <ScrollView style={styles.container}>
          <CommonTitleBar title={"설정"} leftOption={"back"}></CommonTitleBar>
          <SettingAccount></SettingAccount>
          <SettingApplication></SettingApplication>
          <SettingPolicy></SettingPolicy>
          <SettingDeleteAccount></SettingDeleteAccount>
        </ScrollView>
        <OrderFindBar></OrderFindBar>
      </View>
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
    justifyContent: "flex-start",
    flexWrap: 'wrap',
    flexDirection: 'row',
    backgroundColor:"white",
    marginBottom:"40rem",
    marginTop:"20rem",    
    justifyContent: "center",
    alignItems: "center",
  },
  label:{
    left:"8rem",
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