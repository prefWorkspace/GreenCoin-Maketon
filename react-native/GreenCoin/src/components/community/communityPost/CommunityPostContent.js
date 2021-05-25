import React, {useState} from 'react';
import { TouchableOpacity, Text,Image, View, Dimensions,TextInput,StyleSheet, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { useNavigation ,useRoute } from '@react-navigation/native';
import userInfoSingleton from '../../../db/userInfoSingleton';
import DateText from '../../commonsjh/dateText';


export default function CommunityPostContent({titleValue, labelValue, setTitleValue, setLabelValue}) {
  const navigation = useNavigation();

  const goBack = () =>{ navigation.goBack(); }

    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.titleAreaBody} onPress={goBack}>
           <Text style={styles.titleLabel}>{DateText(new Date(), ".")}</Text>
        </TouchableOpacity>
        <View style={styles.labelContainer}>
          <TextInput value={titleValue} onChangeText={e => setTitleValue(e)} style={styles.title} placeholder="제목을 입력해주세요."></TextInput>
          <View style={styles.hr}></View>
          <TextInput value={labelValue} onChangeText={e => setLabelValue(e)}  style={styles.label} multiline={true} placeholder="내용을 입력해주세요."></TextInput>
        </View>
      </View>
    );
  }
  

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });


const styles = EStyleSheet.create({
  container: {
    backgroundColor:"white",
    paddingLeft:"20rem",
    paddingRight:"20rem",
  },
  titleAreaBody:{
    width:"100%",
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
    marginTop:"12rem",
  },
  titleLabel:{
    fontSize :"14rem",
    fontWeight:'bold',
    color:"#505050",
    marginRight:"auto",
  },
  titleAddressPoint:{
    marginLeft:"auto",
    right:"10rem",
  },
  title:{
    paddingLeft:"10rem",
    fontSize:15,
    color:"#505050",
    marginTop:"10rem",
    marginBottom:"10rem",
    borderWidth:1,
    borderRadius:5,
    borderColor:"#DDDDDD",
  },
  label:{
    paddingLeft:"10rem",
    height:"400rem",
    color:"#505050",
    borderWidth:1,
    borderRadius:5,
    borderColor:"#DDDDDD",
    fontSize:13,
    textAlignVertical: "top"
  },
  hr:{
    width:"100%",
    borderWidth:.8,
    borderColor:"#E6E6E6",
    marginBottom:"10rem",
  },


});
