import { useNavigation ,useRoute} from '@react-navigation/native';
import * as React from 'react';
import { Text,Image, View, Dimensions,ScrollView,StyleSheet,TouchableOpacity, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
  
const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

function numberWithCommas(x) {
  if(x == undefined)
    return 0;
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function DetailTitleInfo({productInfo}){

  const navigation = useNavigation();
  const routeInfo = useRoute();
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{productInfo.prd_title}</Text>
      <View style={styles.titleDetailContainer}>
        {
          productInfo.prd_sale_rate != 0 ?
          <Text style={styles.sale}>{Math.floor(productInfo.prd_sale_rate)}%</Text>
          :
          null
        }
        <Text style={productInfo.prd_sale_rate ? styles.salePrice : styles.price}>{numberWithCommas(Math.round(productInfo.prd_price  -((productInfo.prd_price * productInfo.prd_sale_rate) / 100)))}원</Text>
        {
          productInfo.prd_sale_rate != 0 ?
          <Text style={styles.originalPrice}>{numberWithCommas(Math.round(productInfo.prd_price))}원</Text>
          :
          null
        }
      </View>
  </View>
  )
};


const styles = EStyleSheet.create({
  container:{
    padding:"15rem",
    width:"100%",
    borderBottomWidth:1,
    borderBottomColor:"#efefef",
  },
  title:{
    fontSize:"22.773rem",
    marginRight:"auto",
  },
  titleDetailContainer:{
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
  },
  sale:{
    color:"#26CBFF",
    fontSize:"23.782rem",
    marginRight:"10rem",
  },
  price:{
    color:"black",
    fontSize:"23.782rem",
    marginRight:"auto",
  },
  salePrice:{
    color:"black",
    fontSize:"23.782rem",
    marginRight:"10rem",
  },
  originalPrice:{
    color:"#878787",
    fontSize:"18.828rem",
    marginRight:"auto",
    textDecorationLine:"line-through",
  },
  image:{
    top:"5rem",
  }
});