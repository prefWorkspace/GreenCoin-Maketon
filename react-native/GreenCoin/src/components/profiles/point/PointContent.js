import * as React from 'react';
import { Text, View, Dimensions, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';


function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


function getDateType(date){
  function checkZero(checkString){
    return checkString.toString().length == 1 ?  "0" + checkString : checkString;
  }
  var temp = `${checkZero(date.getFullYear())}-${checkZero(date.getMonth() + 1)}-${checkZero(date.getDate())}`;
  return temp;
}



export default function PointContent({item}) {

    const point = item.pt_point;

    function getStartDate(){
      try{
        let date = item.pt_start_date.split('.')[0].split('T');
        console.log(date[0] + " " + date[1])
        return date[0] + " " + date[1].slice(0,-3);
      }
      catch{
        return "";
      }
    }

    return (
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.startDate}>{getStartDate()}</Text>
          <View style={styles.contentContainer}>
            <Text Text style={styles.title}>{item.pt_content} </Text>
            <Text style={point >= 0 ? styles.price : styles.minus}>{point > 0 ? " +" : " -"}{numberWithCommas(point > 0 ? point : -point)}{point > 0 ? " 지급" : " 사용"}</Text>
            <Text style={styles.endDate}>{point >= 0 ? "지급내역" : "사용내역"}</Text>
          </View>
        </View>
      </View>
    );
  }
  


const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });


const styles = EStyleSheet.create({
  container: {
    width:'100%',
    height:'106.032rem',
    justifyContent: "center",
    backgroundColor: "rgb(178, 227, 250)",
    borderBottomWidth:1,
    borderBottomColor :"#efefef",
    backgroundColor:"white",
  },
  textContainer:{
      bottom:"7rem",
      padding:"20rem"
  },
  contentContainer:{
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
  },
  startDate:{
    fontSize:"10.9rem",
    color:'#ACACAC',
    bottom:"14rem"
  },
  title:{
    fontSize:"13.873rem",
    width:"180rem",
  },
  price:{
    fontSize:"13.873rem",
    color:"#26CBFF",
  },
  minus:{

    fontSize:"13.873rem",
    color:"red",
  },
  endDate:{
    fontSize:"13.873rem",
    marginLeft:"auto",
  }
});