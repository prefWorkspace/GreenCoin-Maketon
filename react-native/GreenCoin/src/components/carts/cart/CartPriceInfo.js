import React ,{useState}  from 'react';
import { Text, View, Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import appStaticInfomation from '../../../db/appStaticInfomation'

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function CartPriceInfo({totalPrice,shipping,isFreeShip}) {

  
 
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <View style={styles.labelContainer}>
            <Text style={styles.title}>배송비</Text>
            <View style={styles.borderBar}/>
            <Text style={styles.price}>{ isFreeShip ? 0 : numberWithCommas(shipping)}원</Text>
          </View>
          <View style={styles.labelContainer}>
            <Text style={styles.title}>총 합계</Text>
            <View style={styles.borderBar}/>
            <Text style={styles.price}>{numberWithCommas(totalPrice)}원</Text>
          </View>
        </View>
     
      </View>
    );
  }


const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });


const styles = EStyleSheet.create({
  container: {
    width :"100%",
    paddingLeft:"30rem",
    paddingRight:"30rem",
    paddingTop:"10rem",
    paddingBottom:"10rem",
    backgroundColor:"white",
    borderTopWidth:1,
    borderBottomWidth:1,
    borderColor:"#E1E6ED",
  },
  titleContainer:{
    width:"100%",
    fontSize:"13.873rem",
    color :"#D2D5DA",
    backgroundColor:"white",
    justifyContent: "center",
  },
  title:{
    width:"17%",
    fontFamily:"NotoSansKR-Bold",
    color:"#0D2141",
  },
  borderBar:{
    height:1,
    width:"80%",
    borderColor: '#E1E6ED',
    borderRadius: 1,
    borderWidth: 0.5,
    borderStyle: 'dashed',
    marginRight:"auto",
  },
  price:{
    marginLeft:"auto",
    backgroundColor:"#F7F7F7",
  },
  labelContainer:{
    width:"100%",
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center",
  },
  otherTitle:{
    fontFamily:"NotoSansKR-Regular",
    color:"#D2D5DA",
  }
});