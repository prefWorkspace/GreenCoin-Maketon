import React, {useState} from 'react';
import {Button, Text, View,Dimensions,TouchableOpacity} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Modal from 'react-native-modal';
import ModalTextList from './ModalTextList';

const ModalSelectBottom = ({setIsModalVisible,submitClick}) => {
  return (
  <View style={styles.bottomContainer}>
    <TouchableOpacity style={styles.closeBox} onPress={()=>{setIsModalVisible(false)}}>
      <Text style={styles.click}>취소</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.closeBox} onPress={()=>{ submitClick ? submitClick(false) : null}}>
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

export default function ModalContent({navigation,modalType, bottomType,isModalVisible,setIsModalVisible,submitClick}) {
  const [style,setStyle] = useState({height:"20%"});
  const resizeModal =(ev)=> {
    setStyle({height: parseInt(ev.nativeEvent.layout.height) + 60});
  }

    return (
      <Modal isVisible={isModalVisible} style={styles.modal}>
          <View style={[styles.container ,style]} >
            <View style={styles.contentContainer} onLayout={(ev)=>{resizeModal(ev)}} >
              <ModalTextList type={modalType}></ModalTextList>
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
    height:"100%",
    backgroundColor:"white",
    borderRadius:10,
  },
  contentContainer:{
    width:"100%",
    alignItems: "center",
    justifyContent: "center",
    paddingTop:"5rem",
  },
  bottomContainer:{
    width:"100%",
    height:"50rem",
    top:"10rem",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: 'row',
    borderTopWidth:1,
    borderTopColor:"rgba(60, 60, 67, 0.29)",
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
  closeBox:{
    width:"50%",
    height:"50rem",
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
    fontWeight: 'bold',
  }
 
 
});