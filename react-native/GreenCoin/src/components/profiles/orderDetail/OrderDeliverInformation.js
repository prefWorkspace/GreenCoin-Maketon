import React, {useState} from 'react';
import { Text, View, Dimensions,Image, TouchableOpacity, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

function getPhoneNumber(phone){
  var test = phone.substring(0, 3) + "-" + phone.substring(3);
  return  test.substring(0, 8) + "-" + test.substring(8);
}

export default function OrderDeliverInformation({detail}) {
  const [dropDown,setDropDown] = useState(true);

    return (
      <View style={styles.container}>
         <TouchableOpacity style={styles.titleContainer} onPress={()=>{setDropDown(!dropDown)}}>
          <Text style={styles.title} >배송지 정보</Text>
          {
                dropDown ?
                <Image style={styles.image} source={require('../../../assets/img/label_point/dropUpPoint.png')}></Image>
                :
                <Image style={styles.image} source={require('../../../assets/img/label_point/dropDownPoint.png')}></Image>
          }
          </TouchableOpacity>
        {
          dropDown == true?
          <View style={styles.contentContainer}>
            <View style={styles.content}>
                <Text style={styles.subtitle}>받으시는분</Text>
                <Text style={styles.description}>{detail.mem_name}</Text>
            </View>
            <View style={styles.content}>
                <Text style={styles.subtitle}>우편번호</Text>
                <Text style={styles.description}>{detail.receiver_zipcode}</Text>
            </View>
            <View style={styles.content}>
                <Text style={styles.subtitle}>주소</Text>
                <Text style={styles.description}>{detail.receiver_address}</Text>
            </View>
            <View style={styles.content}>
                <Text style={styles.subtitle}>일반전화</Text>
                <Text style={styles.description}>{getPhoneNumber(detail.receiver_phone)}</Text>
            </View>
            <View style={styles.content}>
                <Text style={styles.subtitle}>휴대전화</Text>
                <Text style={styles.description}>{getPhoneNumber(detail.receiver_phone)}</Text>
            </View>
            <View style={styles.content}>
                <Text style={styles.subtitle}>요청사항</Text>
                <Text style={styles.description}>{detail.receiver_memo}</Text>
            </View>
          </View>
          :
          null
        }
      </View>
    );
  }
  


const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });


const styles = EStyleSheet.create({
  container: {
    width:"100%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom:"20rem",
  },
  titleContainer:{
    width:"90%",
    height:"35rem",
    marginTop:"20rem",
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
  },
  image:{
    marginLeft:"auto",
  },
  title:{
    fontSize:"14.8rem",
    color:"black",
    fontFamily:"NotoSansKR-Bold",
  },
  contentContainer:{
    width:"100%",
    paddingLeft:"20rem",
  },
  content:{
    flexDirection: 'row',
    marginTop:"15rem",
    borderBottomColor: '#efefef',
    borderBottomWidth: 1.2,
    paddingBottom:"10rem",
  },
  subtitle:{
    fontSize:"13.873rem",
    width:"90rem",
  },
  description:{
    fontSize:"13.873rem",
    marginLeft:"10rem",
    width:"240rem",
  },

 
});