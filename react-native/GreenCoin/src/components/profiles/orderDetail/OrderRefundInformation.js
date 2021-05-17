import React, {useState} from 'react';
import { Text, View, Dimensions,Image, TouchableOpacity, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';


export default function OrderRefundInformation() {
  const [dropDown,setDropDown] = useState(true);
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.titleContainer} onPress={()=>{setDropDown(!dropDown)}}>
          <Text style={styles.title} >환불정보</Text>
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
                <Text style={styles.subtitle}>취소상품</Text>
                <Text style={styles.description}>빈티지 후드 오버핏 자켓</Text>
            </View>
            <View style={styles.content}>
                <Text style={styles.subtitle}>옵션정보</Text>
                <Text style={styles.description}>[옵션:black / small] * 1개</Text>
            </View>
            <View style={styles.content}>
                <Text style={styles.subtitle}>환불일자</Text>
                <Text style={styles.description}>2020-11-29 22:31:04 (환불 완료)</Text>
            </View>
            <View style={styles.content}>
                <Text style={styles.subtitle}>환불금액</Text>
                <Text style={styles.description}>상품금액 54,000 - 3,000(상품별할인) - 3,000(쿠폰할인) = 합계 48,000원</Text>
            </View>
            <View style={styles.content}>
                <Text style={styles.subtitle}>환불수단</Text>
                <Text style={styles.description}>신용카드</Text>
            </View>
            <View style={styles.content}>
                <Text style={styles.subtitle}>할인 및{"\n"}부가결제{"\n"}복원 내역</Text>
                <Text style={styles.description}>6,000원</Text>
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