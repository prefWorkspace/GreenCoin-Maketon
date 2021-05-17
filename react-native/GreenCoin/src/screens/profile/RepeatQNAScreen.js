import React,{useState} from 'react';
import { Text,Image, View, Dimensions,ScrollView,StyleSheet, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import CommonTitleBar from '../../components/comm/CommonTitleBar'
import DropDownText from '../../components/profiles/repeatQNA/DropDownText';
import RepeatQNASubtitle from '../../components/profiles/repeatQNA/RepeatQNASubtitle';
import {navigationBackHandler} from '../../navigation/NavigationBackHandler';
import appStaticInfomation from '../../db/appStaticInfomation';


export default function RepeatQNAScreen() {
  navigationBackHandler();

  var appInfo = appStaticInfomation.getInstance();

  const faqCatList = appInfo._faqCatList;
  const faqlist = appInfo._faqlist;
  const getTextList = (list) =>{
    return list.map((item)=>{
      return <DropDownText item={item}></DropDownText>
    })
  }
    return (
      <ScrollView style={styles.container}>
          <CommonTitleBar title={"자주 묻는 질문"} leftOption={"back"}></CommonTitleBar>
          <View style={styles.contentContainer}>
            {
              faqCatList.map((value)=>{
                return  (
                  <View style={styles.contentContainer}>
                    <RepeatQNASubtitle title={faqlist[value][0].faq_cat_name}/>
                    {getTextList(faqlist[value])}
                  </View>
                )
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
    backgroundColor:"white",
  },
  contentContainer:{
    width:"100%",
    justifyContent: "center",
    alignItems: "center",
  },
  heightBox:{
    alignSelf:"stretch",
  },
  DropBoxBorder:{
    width :"90%",
    marginTop:"15rem",
    marginBottom:"15rem",
    height:"10rem",
    borderBottomWidth:1,
    borderBottomColor :"#efefef",
    backgroundColor:"white",
  }
});