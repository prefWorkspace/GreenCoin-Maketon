import React , {useState} from 'react';
import { Text, View, Dimensions,TouchableOpacity,Image, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import MarginBox from '../../comm/MarginBox';

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

function numberWithCommas(x) {return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");}


export default function CartOrderCuponInfo({coupon,clickSetCoupon}){
  const [dropDown,setDropDown] = useState(true);


  const dropDownEvent = () =>{setDropDown(!dropDown)}
  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <TouchableOpacity  style={styles.titleContainer} onPress={dropDownEvent}>
        <Text style={styles.title}>쿠폰   
          <Text style={styles.subtitle}>
            {/* {
              coupon && coupon.cp_name ? coupon.cp_name : ""
            }
             {
            //   coupon ? coupon.cp_discount  == 0 ? ` ${numberWithCommas(coupon.cp_discount_amount)}원` :` ${coupon.cp_discount}%` : ""
             } */}
          </Text>
        </Text>
        <View>
          <Text style={styles.coupon}>
            {
              coupon && coupon.cp_name ? coupon.cp_name : ""
            }
            </Text>
        </View>
          {
            dropDown ? 
            <Image style={styles.subtitle} source={require("../../../assets/img/label_point/dropUpPoint.png")}/>
            :
            <Image style={styles.subtitle} source={require("../../../assets/img/label_point/dropDownPoint.png")}/>
          }
        </TouchableOpacity>
        {
          dropDown ?
          <View style={styles.dropContainer}>
            <TouchableOpacity style={styles.RadioContainer} onPress={()=>{clickSetCoupon(false);}}> 
              <View style={styles.RadioBox}>
                {
                  coupon ? 
                  <View style={styles.dot}></View>
                  :
                  null
                }
              </View>
              <Text>  쿠폰선택</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.RadioContainer} onPress={()=>{clickSetCoupon(true);}}>  
              <View style={styles.RadioBox}>
                {
                  coupon == null ? 
                  <View style={styles.dot}></View>
                  :
                  null
                }
              </View>
              <Text>  사용 안함</Text>
            </TouchableOpacity>
          </View>
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
  coupon:{
    fontFamily:"NotoSansKR-Bold",
    color:"black",
    fontSize:"12rem",
    right:"80rem",
  },
  subtitle:{
    fontFamily:"NotoSansKR-Bold",
    color:"#26CBFF",
    fontSize:"17rem",
  },
  dropContainer:{
    width:"100%",
  },
  RadioContainer:{
    flexDirection: 'row',
    margin:"10rem",
    marginRight:"auto",
  },
  RadioBox:{
    width:"21rem",
    height:"21rem",
    borderWidth:1,
    borderRadius:"10rem",
    borderColor:"rgba(0, 0, 0, 0.1)",
    alignItems: "center", 
    justifyContent: "center",
  },
  dot:{
    width:"12rem",
    height:"12rem",
    borderWidth:1,
    borderRadius:"5rem",    
    borderColor:"rgba(0, 0, 0, 0.1)",
    backgroundColor:"#26CBFF",
  },
});