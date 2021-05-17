import React, {useState} from 'react';
import {Button, Text, View,Dimensions,TouchableOpacity} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Modal from 'react-native-modal';

export default function ModalTester() {
  const [style,setStyle] =useState({height:"20%"});
  const resizeModal =(ev)=> {
    setStyle({height: parseInt(ev.nativeEvent.layout.height) + 60});
  }
  const isModalVisible = true;

    return (
      <Modal isVisible={isModalVisible} style={styles.modal}>
          <View style={[styles.container ,style]} >
            <View style={styles.contentContainer} onLayout={(ev)=>{resizeModal(ev)}} >
              <View stlye={styles.labelContainer}>
                <Text style={styles.title}>로그아웃</Text>
                <Text style={styles.label}>로그아웃하시겠어요?</Text>
              </View>
            </View>
            <View style={styles.bottomContainer}>
              <TouchableOpacity style={styles.closeBox} >
                <Text style={styles.click}>취소</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.closeBox} >
                <Text style={styles.click}>확인</Text>
              </TouchableOpacity>
            </View>
          </View>
      </Modal>
    );
}

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });


const styles = EStyleSheet.create({
  container: {
    width:"70%",
    height:"100%",
    backgroundColor:"white",
    borderRadius:10,
  },
  contentContainer:{
    width:"100%",
    alignItems: "center",
    justifyContent: "center",
    paddingTop:"20rem",
  },
  labelContainer:{
    width:"100%",
    height:"100%",
    alignItems: "center",
    justifyContent: "center",
  },
  bottomContainer:{
    width:"100%",
    height:"50rem",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: 'row',
    marginTop:"auto",
  },
  modal:{
    alignItems: "center",
    justifyContent: "center",
  },
  closeBox:{
    width:"50%",
    height:"40rem",
    borderTopWidth:1,
    borderTopColor:"rgba(60, 60, 67, 0.29)",
    borderRightWidth:1,
    borderRightColor:"rgba(60, 60, 67, 0.29)",
    marginTop:"auto",
    alignItems: "center",
    justifyContent: "center",
  },
  title:{
    fontWeight: 'bold',
    fontSize :"16rem",
    textAlign:"center",
  },
  label:{
    fontSize :"13rem",
    textAlign:"center",
  },
  click:{
    color:"#007AFF",
  }
 
 
});