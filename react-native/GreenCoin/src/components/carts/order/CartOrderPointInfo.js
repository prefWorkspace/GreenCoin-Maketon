import React , {useState} from 'react';
import { Text, View, Dimensions,TouchableOpacity,Image,CheckBox ,TextInput} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import CartOrderPointDropDownContent from './CartOrderPointDropDownContent';
import MarginBox from '../../comm/MarginBox';

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

export default function CartOrderPointInfo({pointLimit,setPoint,point,coupon}){
  const [dropDown,setDropDown] = useState(true);
  const setDropModalEvent = () =>{setDropDown(!dropDown)}

  return (
    <View style={[styles.container, coupon ? { opacity : 0.5} : { opacity : 1}]}>
      <View style={styles.itemContainer}>
        <TouchableOpacity  style={styles.titleContainer} onPress={setDropModalEvent}>
          <Text style={styles.title}>포인트 <Text style={styles.subtitle}></Text></Text>
          {
            !coupon && dropDown ? 
            <Image style={styles.subtitle} source={require("../../../assets/img/label_point/dropUpPoint.png")}/>
            :
            <Image style={styles.subtitle} source={require("../../../assets/img/label_point/dropDownPoint.png")}/>
          }
        </TouchableOpacity>
        {
          !coupon && dropDown ?
          <CartOrderPointDropDownContent coupon={coupon} point={point} pointLimit={pointLimit} setPoint={setPoint}/>
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
    alignItems: "center", 
    justifyContent: "center",
    marginTop:"20rem",
    backgroundColor:"white",
  },
  itemContainer:{
    width:"100%",
    paddingLeft:"15rem",
    paddingRight:"15rem",
    alignItems: "center", 
    bottom:"10rem",
  },
  titleContainer:{ 
    width:"100%",
    paddingLeft:"4rem",
    marginRight:"auto",
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
    fontSize:"17rem",
  },
  dropContainer:{
    width:"100%",
  },

});