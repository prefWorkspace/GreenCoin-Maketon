import React,{useState} from 'react';
import { Text, View, Dimensions,TextInput, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import ModalCalendar from '../../comm/ModalCalendar';

export default function BirthdayInformation({year,month,day,setYear,setMonth,setDay}) {

    const [show,setShow] = useState(false);

    const clickDate = (d) =>{
      let date = new Date(d);
      if(date.getTime() >= new Date().getTime()){
        Alert.alert(" ","날짜를 확인해주세요");
        return;
      }

      setYear(date.getFullYear());
      setMonth(date.getMonth() + 1);
      setDay(date.getDate());

      setShow(false);
    }

    const openModal =()=>{
      setShow(true);
    }
    
    return (
      <View style={styles.container}>
      <Text style={styles.title}>생년월일</Text>
        <View style={styles.itemContainer}>
            <Text onPress={openModal} style={styles.year}>{year ? year : "0000"}</Text>
            <Text style={styles.label}> 년  </Text>
            <Text onPress={openModal} style={styles.month}>{month ? month : "00"}</Text>
            <Text style={styles.label}> 월  </Text>
            <Text onPress={openModal} style={styles.day}>{day ? day : "00"}</Text>
            <Text style={styles.label}> 일</Text>
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
    height:"90rem",
    bottom:"10rem",
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
  label:{
    marginRight:"10rem",
    marginLeft:"10rem",
  },
  year:{
    width:"120rem",
    padding:"10rem",
    borderColor:"#efefef",
    borderWidth:1,
    borderRadius:5,
    textAlign:"center",
    paddingLeft:"10rem",
    paddingRight:"10rem",
  },
  month:{
    width:"50rem",
    padding:"10rem",
    borderColor:"#efefef",
    borderWidth:1,
    borderRadius:5,
    textAlign:"center",
    paddingLeft:"10rem",
    paddingRight:"10rem",
  },
  day:{
    width:"50rem",
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
      left:"20rem",
      fontSize:11,
      color: 'black',
      fontFamily:"NotoSansKR-Medium",
      top: "10rem",
  },
  hr:{
    marginTop:"auto",
    width:"86%",
  }, 
});