import React ,{useState}  from 'react';
import { TouchableOpacity,Text, View, Dimensions,ScrollView,StyleSheet ,FlatList} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import { useNavigation ,useRoute } from '@react-navigation/native';


function numberWithCommas(x) {return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");}


export default function CartSelectCupon({originalPrice,coupon,setCoupon}) {
  const navigation = useNavigation();
  const routeInfo = useRoute();
  
  const navigationMove = () =>{ navigation.navigate("cartCupon",{root:routeInfo.name ,setCoupon:setCoupon,totalPrice : originalPrice}); }

    return (
      <View style={styles.container}>
        {
          coupon ?
           <Text style={styles.title}>{coupon.cp_name }
            <Text style={styles.point}> 
              {coupon.cp_discount  == 0 ? ` ${numberWithCommas(coupon.cp_discount_amount)}원` :` ${coupon.cp_discount}%`}
            </Text>
          </Text>
          :
          null
        }
        <TouchableOpacity style={styles.titleBar} onPress={navigationMove}>
            <Text style={styles.title}>쿠폰선택</Text>
        </TouchableOpacity>
      </View>
    );
  }


const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });


const styles = EStyleSheet.create({
  container: {
    width :"100%",
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:"white",
    paddingLeft:"30rem",
    paddingRight:"30rem",
    paddingTop:"30rem",
    paddingBottom:"30rem",
  },
  titleBar:{
    width:"125rem",
    backgroundColor:"white",
    justifyContent: "center",
    alignItems: "center",
    borderWidth:1,
    borderColor:"#E1E6ED",
    borderRadius:5,
    marginLeft:"auto",
  },
  touchableOpacity:{
    paddingLeft:"14rem",
    paddingRight:"14rem",
    paddingTop:"4rem",
  },
  title:{
    fontFamily:"NotoSansKR-Bold",
    color:"black",
  },
  point:{
    color:"#26CBFF",
  }
});