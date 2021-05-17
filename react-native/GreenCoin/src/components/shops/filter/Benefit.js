import React , {useState} from 'react';
import { Text, View, Dimensions ,Platform} from 'react-native';
import CheckBox  from '@react-native-community/checkbox';

import EStyleSheet from 'react-native-extended-stylesheet';

export default function Benefit({benefit,setBenefit}) {
    return (
      <View style={styles.hr}>
      <View style={styles.container}>
        <Text style={styles.title}>혜택</Text>
            <View style={styles.contentContainer}>
              <Text style={styles.label}>세일 상품만 보기</Text>
              <CheckBox
                  boxType="square"
                  tintColors={{true:"#0D2141" ,false:"#D2D5DA"}}
                  style={styles.checkbox}
                  value={benefit}
                  onValueChange={()=>{setBenefit(!benefit)}}
              />
        </View>
      </View>
      </View>
    );
  }
  


const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });


const styles = EStyleSheet.create({
  container: {
    width:"100%",
    height: Platform.OS != "ios" ?"65rem" : "50rem",
    bottom: Platform.OS != "ios" ? "9rem" : 0
  },
  title:{
    fontFamily:"NotoSansKR-Medium",
    fontSize:"15.855rem",
  },
  contentContainer:{
    flexDirection: 'row',
    bottom: Platform.OS != "ios" ?  "12rem" : 0,
  },
  checkbox:{
    marginLeft: Platform.OS != "ios" ?  "auto" : "70%",
    top: Platform.OS != "ios" ? "7rem" : 0,
    bottom: Platform.OS != "ios" ? 0 : "10rem",
    transform: Platform.OS != "ios" ? [] : [{scaleX:0.8},{scaleY:0.8}]
  },
  label:{
    fontFamily:"NotoSansKR-Regular",
    fontSize:"14.864rem",
    color:"#F15571",
  },
  hr:{
    width:"100%",
    padding:"15rem",
    borderBottomColor: '#efefef',
    borderBottomWidth: 1,
  }
});