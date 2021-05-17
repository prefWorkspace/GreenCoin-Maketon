import React,{useState} from 'react';
import { Text, View, Dimensions,TextInput, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import ModalCalendar from '../../comm/ModalCalendar';

export default function BirthdayInformation({year,month,day,setYear,setMonth,setDay}) {

    const [show,setShow] = useState({show:false,type:""});

    const clickDate = (d) =>{
      let date = new Date(d);
      if(date.getTime() >= new Date().getTime()){
        Alert.alert(" ","날짜를 확인해주세요");
        return;
      }

      setYear(date.getFullYear());
      setMonth(date.getMonth() + 1);
      setDay(date.getDate());

      setShow({show : false , type:""});
    }

    const openModal =()=>{
      setShow({show : true , type:""});
    }
    
    return (
      <View style={styles.container}>
        <View style={styles.itemContainer}>
            <Text style={styles.title}>생년월일</Text>
            <Text onPress={openModal} style={styles.textInput}  >{year}</Text>
            <Text> 년  </Text>
            <Text onPress={openModal} style={styles.textInput}  >{month}</Text>
            <Text> 월  </Text>
            <Text onPress={openModal} style={styles.textInput}  >{day}</Text>
            <Text> 일</Text>
        </View>
        <View style={styles.hr}></View>
        <ModalCalendar show={show} setShow={setShow} clickDate={clickDate}></ModalCalendar>
      </View>
    );
  }
  

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });


const styles = EStyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",

  },
  itemContainer:{
    width:"86%",
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
    height:'59.457rem',
  },
  yearInput:{
    width:"60.385rem",
    height:"35.674rem",
    borderColor:"#efefef",
    borderWidth:1,
    borderRadius:5,
    padding:"1rem",
    paddingLeft:"10rem",
  },
  textInput:{
    padding:"10rem",
    borderColor:"#efefef",
    borderWidth:1,
    borderRadius:5,
    textAlign:"center",
    paddingLeft:"10rem",
    paddingRight:"10rem",
  },
  title:{
      marginRight:"auto",
      fontSize:"14.864rem",
  },
  hr:{
    marginTop:"auto",
    width:"86%",
    borderBottomColor: '#efefef',
    borderBottomWidth: 1.2,
  }, 
});