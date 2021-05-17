import React, {useState} from 'react';
import { Text, View, Dimensions,Image ,TouchableOpacity} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';


export default function RefundInformation() {
    const [dropDown,setDropDown] = useState(false);
    return (
      <View style={styles.container}>
        <TouchableOpacity activeOpacity={1} style={styles.titleContainer} onPress={()=>{setDropDown(!dropDown)}}>
          <Text style={styles.title}>계좌정보 수집 및 이용동의</Text>
          {
                  dropDown ?
                  <Image style={styles.image} source={require('../../../assets/img/label_point/dropUpPoint.png')} tintColor='#878787'></Image>
                  :
                  <Image style={styles.image} source={require('../../../assets/img/label_point/dropDownPoint.png')} tintColor='#878787'></Image>
          }
        </TouchableOpacity>
        {
          dropDown == true?
          <View style={styles.dropdownContainer}>
          <View style={styles.contentContainer}>
            <View style={styles.content}>
                <Text style={styles.subtitle}>수집목적</Text>
                <Text style={styles.description}>환불 접수시 계약(환불)의 이행</Text>
            </View>
            <View style={styles.content}>
                <Text style={styles.subtitle}>수집항목</Text>
                <Text style={styles.description}>계좌주,은행,계좌번호</Text>
            </View>
            <View style={styles.content}>
                <Text style={styles.subtitle}>보유 및 이용기간</Text>
                <Text style={styles.description}>-회원 탈퇴 시 파기처리{"\n"}-휴면회원 전환시 별도 분리 보관{"\n"}-단, 관계 법령의 규정에 따라 보존할 의무가 있으면 해당기간 동안 보존</Text>
            </View>
           
          </View>
           <Text style={styles.policy}>* 개인정보 수집 및 이용에 대한 동의를 거부할 권리가 있으며, 동의 거부 시 환불계좌 관리 서비스 이용이 제한됩니다.</Text>
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
    width:"86%",
    alignItems: "center",
    justifyContent: "center",
  },
  titleContainer:{
    width:"100%",
    marginTop:"20rem",
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
  },
  title:{
    marginLeft:"auto",
    fontSize:"12.8rem",
    color:"#878787",
    textDecorationLine : "underline"
  },
  image:{
    marginLeft:"5rem",
  },
  dropdownContainer:{
    width:"100%",
    marginTop:"10rem",
  },
  contentContainer:{
    width:"100%",
    backgroundColor:"#efefef",
    padding:"20rem",
  },
  content:{
    flexDirection: 'row',
  },
  subtitle:{
    fontSize:"11rem",
    width:"40rem",
  },
  description:{
    fontSize:"11rem",
    marginLeft:"10rem",
    width:"60%",
  },
  policy:{
    fontSize:"11rem",
    marginTop:"10rem",
  },
 
});