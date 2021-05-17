import React, {useState} from 'react';
import {Button, Text, View,Dimensions,TouchableOpacity} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Modal from 'react-native-modal';

export default function ModalSelectPhoneCompany({isModalVisible , setPhoneCompany}) {

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

    return (
      <Modal isVisible={isModalVisible} style={styles.modal}>
          <View style={styles.container}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>통신사선택</Text>
            </View>
            <TouchableOpacity style={styles.labelContainer}  onPress={()=>{setPhoneCompany("SKT")}}>
              <Text style={styles.label}>SKT</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.labelContainer}  onPress={()=>{setPhoneCompany("KT")}}>
              <Text style={styles.label}>KT</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.labelContainer}  onPress={()=>{setPhoneCompany("LG U+")}}>
              <Text style={styles.label}>LG U+</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.labelContainer}  onPress={()=>{setPhoneCompany("SKT 알뜰폰")}}>
              <Text style={styles.label}>SKT 알뜰폰</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.labelContainer}  onPress={()=>{setPhoneCompany("KT 알뜰폰")}}>
              <Text style={styles.label}>KT 알뜰폰</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.labelContainer}  onPress={()=>{setPhoneCompany("LG U+ 알뜰폰")}}>
              <Text style={styles.label}>LG U+ 알뜰폰</Text>
            </TouchableOpacity>
          </View>
      </Modal>
    );
  
}

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });


const styles = EStyleSheet.create({
  container: {
    width:"100%",
    height:"400rem",
    backgroundColor:"#1A1A1A",
    right:"19rem",
    position:"absolute",
    bottom:"-30rem",
    borderRadius:30,
  },
  modal:{
    width:"100%",
    top:"20rem",
  },
  titleContainer:{
    width:"100%",
    borderBottomWidth:0.5,
    padding:"20rem",
  },
  title:{
    color:"#BBBEC2",    
    fontSize:"15rem",
  },
  label:{
    color:"#BBBEC2",    
    fontSize:"17rem",
  },
  labelContainer:{
    width:"349rem",
    height:"48.412rem",
    padding:"20rem",
    justifyContent: "center",
  },
 
});