import React, {useState} from 'react';
import {Button, Text, View,Dimensions,TouchableOpacity} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Data from '../../assets/fonts/modalString';

export default function ModalTextList({type}){
    return (
    <View style={styles.container}>
        <Text style={styles.title}>{Data[type].title}</Text>
        <Text style={styles.label}>{Data[type].label}</Text>
        {
            type == "InformationAboutAccount" ? 
            <View>
                <Text style={styles.extraLabelPoint}>{"\n"}신용카드: <Text style={styles.extraLabel}>취소일자 기준 평균 3~7일 소요</Text></Text>
                <Text style={styles.extraLabelPoint}>휴대폰결제: <Text style={styles.extraLabel}>당월(1~31일)에 한해 전체취소 가능</Text></Text>
                <Text style={styles.extraLabelPoint}>계좌 간편결제: <Text style={styles.extraLabel}>결제한 계좌와 동일한 계좌로 환불</Text></Text>
            </View>
            :
            null
        }
    </View>
    );
}

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });


const styles = EStyleSheet.create({
  container:{
    padding:"15rem",
  },
  title:{
    fontWeight: 'bold',
    fontSize :"16.846rem",
    textAlign:"center",
    marginBottom:"2rem",
  },
  label:{
    marginTop:"2rem",
    fontSize :"12.882rem",
    textAlign:"center",
    color:"black",
  },
  click:{
    color:"#007AFF",
    fontWeight: 'bold',
  },
  extraLabelPoint:{
    fontSize :"12.882rem",
    textAlign:"center",
    fontWeight: 'bold',
  },
  extraLabel:{
    fontSize :"12.882rem",
    textAlign:"center",
    fontWeight: 'normal',

  }
 
 
});