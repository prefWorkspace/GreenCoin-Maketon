import React, {useState} from 'react';
import {Button, TouchableOpacity, View,Dimensions,Image} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Modal from 'react-native-modal';


export default function ModalImageContent({show,setShow,image}) {
  const [style,setStyle] = useState({height:"20%"});
  const resizeModal =(ev)=> {
    setStyle({height: parseInt(ev.nativeEvent.layout.height) + 60});
  }

  const closeModal = () =>{
    setShow(false);
  }

    return (
      <Modal isVisible={show} style={styles.modal} onBackdropPress={closeModal} onBackButtonPress={closeModal}>
          <View style={[styles.container ,style]} >
            <TouchableOpacity onPress={closeModal} style={styles.contentContainer} onLayout={(ev)=>{resizeModal(ev)}} >
              <Image style={styles.imageContainer} source={image} resizeMode={"stretch"}></Image>
            </TouchableOpacity>
          </View>
      </Modal>
    );
}

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });


const styles = EStyleSheet.create({
  container: {
    width:"99%",
    height:"100%",
    borderRadius:10,
  },
  contentContainer:{
    width:"100%",
    alignItems: "center",
    justifyContent: "center",
  },
  modal:{
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer:{
    width:"100%",
    height:"200rem",
  },
});