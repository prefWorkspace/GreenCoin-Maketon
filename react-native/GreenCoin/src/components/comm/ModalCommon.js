import React, {useState} from 'react';
import {Image, Text, View,Dimensions,TouchableOpacity} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Modal from 'react-native-modal';
import ModalTextList from './ModalTextList';

const ModalSelectBottom = ({setIsModalVisible,submitClick}) => {
  return (
  <View style={styles.bottomContainer}>
    <TouchableOpacity style={[styles.closeBox,{backgroundColor:"#B5B5B5"}]} onPress={()=>{setIsModalVisible(false)}}>
      <Text style={styles.click}>취소</Text>
    </TouchableOpacity>
    <TouchableOpacity style={[styles.closeBox,{backgroundColor:"#66D8B9"}]} onPress={()=>{ submitClick ? submitClick(false) : null}}>
      <Text style={styles.click}>확인</Text>
    </TouchableOpacity>
  </View>
  );
}

const ModalOkayBottom = ({setIsModalVisible}) =>{
  return (
  <TouchableOpacity style={styles.bottomContainer} onPress={()=>{setIsModalVisible(false)}}>
    <View style={styles.okayBox} >
      <Text style={styles.click}>확인</Text>
    </View>
  </TouchableOpacity>
  );
}

export default function ModalCommon({title,render, bottomType,isModalVisible,setIsModalVisible,submitClick}) {
    return (
      <Modal isVisible={isModalVisible} style={styles.modal}>
          <View style={[styles.container]} >
            <TouchableOpacity style={styles.closeContainer} onPress={()=>{setIsModalVisible(false)}}>
              <Image resizeMode={"stretch"} source={require('../../assets/img/logo/close.png')} style={styles.close}></Image>
            </TouchableOpacity>
            <View style={styles.contentContainer} >
              {
                title ?
                <Text style={styles.title}>{title}</Text> 
                :
                null
              }
              {
                render ?
                render()
                :
                null
              }
            </View>
            {
              bottomType == "select" ? 
              <ModalSelectBottom setIsModalVisible={setIsModalVisible} submitClick={submitClick}/>
              :
              <ModalOkayBottom  setIsModalVisible={setIsModalVisible} />
            }
          </View>
      </Modal>
    );
}

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });


const styles = EStyleSheet.create({
  container: {
    width:"90%",
    padding:"10rem",
    backgroundColor:"white",
    borderRadius:10,
  },
  contentContainer:{
    width:"100%",
    alignItems: "center",
    justifyContent: "center",
    paddingTop:"60rem",
    paddingBottom:"60rem",
  },
  bottomContainer:{
    width:"100%",
    height:"50rem",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: 'row',
  },
  modal:{
    alignItems: "center",
    justifyContent: "center",
  },
  okayBox:{
    width:"100%",
    height:"100%",
    alignItems: "center",
    justifyContent: "center",
  },
  close:{
    color:"#66D8B9",
    width:"20rem",
    height:"20rem",
  },
  closeContainer:{
    marginLeft:"auto",
    marginRight:"10rem",
    marginTop:"10rem",
  },
  closeBox:{
    margin:"4rem",
    width:"48%",
    height:"50rem",
    borderRadius:10,
    marginTop:"auto",
    alignItems: "center",
    justifyContent: "center",
  },
  title:{
    color:"#505050",
    fontWeight: 'bold',
    fontSize : 15,
    textAlign:"center",
  },
  label:{
    fontSize :"13rem",
    textAlign:"center",
  },
  click:{
    color:"#FFFFFF",
    fontWeight: 'bold',
  }
 
 
});