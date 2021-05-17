import  React from 'react';
import { Text, View, Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import MarginBox from '../MarginBox';

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function DetailResultPrice({totalPrice}){
  return (
    <View style={styles.container}>
      <MarginBox height={1.7} backgroundColor={"black"} marginBottom={10}></MarginBox>
      <View style={styles.titleDetailContainer}>
        <Text style={styles.title}>총 상품 금액</Text>
        <Text style={styles.totalPrice}>{numberWithCommas(totalPrice)}원</Text>
      </View>
  </View>
  )
};


const styles = EStyleSheet.create({
  container:{
    padding:"15rem",
    width:"100%",
    alignItems: "center",
    justifyContent: "center",
    zIndex : 0,
  },
  title:{
    fontSize:"20rem",
    marginRight:"auto",
  },
  titleDetailContainer:{
    width:"100%",
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
  },
  totalPrice:{
    color:"black",
    fontSize:"20rem",
    marginLeft:"auto",
  },
});