import React, {useState} from 'react';
import {Button, Text, View,Dimensions,TouchableOpacity} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Modal from 'react-native-modal';
import CalendarPicker from 'react-native-calendar-picker';

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });


export default function ModalCalendar({show ,setShow ,clickDate}) {


  const closeModal = () =>{
     setShow(false);
   }
 

    return (
      <Modal isVisible={show} style={styles.modal} onBackdropPress={closeModal}>
          <View style={[styles.container]} >
            <CalendarPicker 
              onDateChange={clickDate}
              width={300 * (entireScreenWidth / 380)}
              previousTitle={"이전달"}
              weekdays={['일', '월', '화', '수', '목', '금', '토']}
              months={['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']}
              nextTitle={"다음달"}
            ></CalendarPicker>
          </View>
      </Modal>
    );
}


const styles = EStyleSheet.create({
  container: {
    width:"100%",
    padding:"20rem",
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