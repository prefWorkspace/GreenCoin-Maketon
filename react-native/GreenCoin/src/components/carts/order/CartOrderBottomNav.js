import React ,{useState}  from 'react';
import { TouchableOpacity,Text, View, Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { useNavigation } from '@react-navigation/native';

export default function CartOrderBottomNav({totalPrice,clickOrderItem}) {

  const navigation = useNavigation();

    return (
      <View style={styles.container}>
        <View style={styles.resultContainer}>
          <TouchableOpacity style={styles.titleBar} >
            <Text style={styles.title}>총합계</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.titleBar} >
            <Text style={styles.price}>{totalPrice}원</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.orderBox} onPress={clickOrderItem}>
            <Text style={styles.order}>결제하기</Text>
        </TouchableOpacity>
      </View>
    );
  }


const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });


const styles = EStyleSheet.create({
  container: {
    width :"100%",
    height :"100rem",
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center",
    paddingLeft:"30rem",
    paddingRight:"25rem",
    backgroundColor:"white",
  },
  resultContainer:{
    height :"100%",
    justifyContent: "center",
    alignItems: "center",
    marginRight:'auto',
    bottom:"2rem",
  },
  titleBar:{
    width:"100%",
    flexDirection: 'row',
  },
  title:{
    fontFamily:"NotoSansKR-Bold",
    color:"#A1A3A7",
    fontSize:"14rem",
  },
  price:{
    color:"black",
    fontSize:"25rem",
    bottom:"6rem",
  },
  orderBox:{
    width:"155rem",
    height:"64rem",
    borderRadius:50,
    backgroundColor:"#0D2141",
    fontFamily:"NotoSansKR-Regular",
    color:"#D2D5DA",
    justifyContent: "center",
    alignItems: "center",
  },
  order:{
    color:"white",
  }
});