import { useNavigation ,useRoute } from '@react-navigation/native';
import * as React from 'react';
import { Text, View, Dimensions, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

export default function TrackDeliverAndAsk() {
  const navigation = useNavigation();
  const routeInfo = useRoute();
    return (
      <View style={styles.hr}>
      <View style={styles.container}>
         <Text style={styles.title}>상품 및 배송문의</Text>
            <View style={styles.itemContainer}>
              <Text style={styles.subtitle}>해당 판매자에게 요청 주시면 빠르고 정확한 답변을 받아보실 수 있습니다.</Text>
              <Text style={styles.selectBox} onPress={()=>{ navigation.navigate("deliverInfo",{root:routeInfo.name})}}>주문/배송조회 가기</Text>
            </View>
      </View>
      </View>
    );
  }
  


const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });


const styles = EStyleSheet.create({
  container: {
    width:"100%",
    bottom:"10rem"
  },
  title:{
    fontFamily:"NotoSansKR-Medium",
    fontSize:"15.855rem",
  },
  itemContainer:{ 
    width:"100%",  
    backgroundColor:"white",
  },
  subtitle:{
    fontSize:"11rem",
    color:"#878787",
    bottom:Platform.OS != "ios" ?"10rem" : 0,
  },
  selectBox:{
    width :"100%",
    height:"33.692rem",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    fontSize:"11.891rem",
    textAlign: "center",
    marginTop:"5rem",
    paddingTop: Platform.OS != "ios" ? 0 : "5rem",
    fontFamily:"NotoSansKR-Regular",
  },
  hr:{
    width:"100%",
    padding:"10rem",
    borderBottomColor: '#efefef',
    borderBottomWidth: 1,
  }, 
});