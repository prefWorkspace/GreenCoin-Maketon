import React , {useState} from 'react';
import { Text, View, Dimensions,TouchableOpacity,Image, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import CartOrderItemDetailInfo from './CartOrderItemDetailInfo';
import MarginBox from '../../comm/MarginBox';

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

export default function CartOrderItemInfo({itemlist}){
  const [dropDown,setDropDown] = useState(true);


  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <TouchableOpacity  style={styles.titleContainer} onPress={()=>{setDropDown(!dropDown)}}>
          <Text style={styles.title}>주문상품</Text>
          {
            dropDown ? 
            <Image style={styles.subtitle} source={require("../../../assets/img/label_point/dropUpPoint.png")}/>
            :
            <Image style={styles.subtitle} source={require("../../../assets/img/label_point/dropDownPoint.png")}/>
          }
        </TouchableOpacity>
        {
           dropDown ?
           itemlist.map((value)=>{
             return <CartOrderItemDetailInfo item={value}/>;
           })
           :
           null
        }
      </View>
      <MarginBox height={5} backgroundColor={"#F4F6F9"}></MarginBox>
    </View>
  )
};


const styles = EStyleSheet.create({
  container:{
    backgroundColor:"white", 
  },
  itemContainer:{
    width:"100%",
    paddingLeft:"15rem",
    paddingRight:"15rem",
    alignItems: "center",
    marginBottom:"20rem",
    bottom:"10rem",
  },
  titleContainer:{ 
    width:"100%",
    paddingLeft:"4rem",
    marginRight:"auto",
    marginBottom :"4rem",
    flexDirection: 'row',
    alignItems: "center", 
    justifyContent: "center",
  },
  title:{
    fontFamily:"NotoSansKR-Bold",
    color:"#000000",
    fontSize:"17rem",
    marginRight:"auto",
  },
  subtitleContainer:{
    marginLeft:"auto",
  },
  subtitle:{
    fontFamily:"NotoSansKR-Bold",
    color:"#26CBFF",
    fontSize:"13rem",
    textDecorationLine:"underline",
  },
});