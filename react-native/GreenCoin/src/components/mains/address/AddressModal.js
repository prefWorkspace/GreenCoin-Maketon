import React, {useState} from 'react';
import {Button, Text, View,Dimensions,TouchableOpacity} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Modal from 'react-native-modal';

export default function AddressModal({inputBox,isModalVisible , setModalVisible}) {

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
    inputBox.current.focus();
  };

    return (
      <Modal isVisible={isModalVisible} style={styles.modal}>
          <View style={styles.container}>
            <Text style={styles.title}>상세 주소를 입력하세요</Text>
            <Text style={styles.subTitle}>아파트명(건물명)/동/호 등의 정보를 정확하게 입력해주세요.</Text>
            <TouchableOpacity style={styles.inputBox}  onPress={toggleModal}>
              <Text style={styles.input}>상세 주소 입력</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeBox} onPress={toggleModal}>
              <Text>닫기</Text>
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
    height:"350rem",
    backgroundColor:"white",
    right:"19rem",
    position:"absolute",
    bottom:0,
    padding:"20rem",
  },
  modal:{
    width:"100%",
    top:"20rem",
  },
  title:{
    fontSize:"20rem",
  },
  subTitle:{
    marginTop:"10rem",
    color:"#94989E",
  },
  inputBox:{
    marginTop:"20rem",
    width:"349rem",
    height:"64.412rem",
    backgroundColor:"#0D2141",
    borderRadius:100,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
  },
  input:{
    color:"white"
  },
  closeBox:{
    width:"349rem",
    height:"64.412rem",
    backgroundColor:"#EEF1F5",
    borderRadius:100,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    marginTop:"15rem",
  }
 
});