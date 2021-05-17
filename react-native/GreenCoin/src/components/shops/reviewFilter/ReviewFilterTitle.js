import React,{useState}  from 'react';
import { Text,Image, View, Dimensions,TextInput,TouchableOpacity, Alert } from 'react-native';
import CheckBox  from '@react-native-community/checkbox';

import EStyleSheet from 'react-native-extended-stylesheet';




export default function ReviewFilterTitle({sortType,setSortType,checkbox,setCheckBox}) {
    return (
      <View style={styles.container}>
          <View style={styles.tagContainer}>
            <Text style={styles.label} onPress={()=>{setSortType(0)}}>{sortType == 0 ? "⦁" : " "} 최신상품순</Text>
            <Text style={styles.label} onPress={()=>{setSortType(1)}}>{sortType == 1 ? "⦁" : " "}  조회순</Text>
            <Text style={styles.label} onPress={()=>{setSortType(2)}}>{sortType == 2 ? "⦁" : " "}  인기순</Text>
            <View style={styles.checkBoxConatiner}>  
              <CheckBox
                  tintColors={{true:"#0D2141" ,false:"#D2D5DA"}}
                  style={styles.checkbox}
                  value={checkbox}
                  onValueChange={()=>{setCheckBox(!checkbox)}}
              />
              <Text>포토만 보기</Text>
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
    alignItems: "center",
    justifyContent: "center",
    paddingLeft :"20rem",
    paddingRight:"20rem",
  },
  tagContainer:{   
    left:"4.5rem",
    flexDirection: 'row',
    backgroundColor:"white",
    alignItems: "center",
    justifyContent: "center",
    paddingTop:"12rem",
    paddingBottom:"12rem",
    width:"100%",
  },
  label:{
    marginRight:"15rem",
  },
  selectBox:{
    width:"160rem",
    height:"40rem",
    borderWidth:1,
    borderColor:"#E1E6ED",
    padding:"10rem",
    fontSize:"12.882rem",
    alignItems: "center",
    justifyContent: "center",
  },
  checkBoxConatiner:{
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
    marginLeft:"auto",
  }



});
