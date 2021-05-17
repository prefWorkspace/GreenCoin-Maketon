import React , {useState} from 'react';
import { Text, View, Dimensions,TouchableOpacity,Image, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

export default function CartOrderCuponInfo({checkMustInfo,setCheckMustInfo}){
  const [dropDown,setDropDown] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>      
        <View style={styles.row}>
          <TouchableOpacity  style={styles.checkContainer} activeOpacity={1} onPress={()=>{setCheckMustInfo(!checkMustInfo)}}>
            {
              checkMustInfo?
              <Image source={require('../../assets/img/label_point/checkPoint.png')}></Image>
              :
              <Image source={require('../../assets/img/label_point/check.png')}></Image>
            }
          </TouchableOpacity>
          <TouchableOpacity  style={styles.titleContainer} activeOpacity={1} onPress={()=>{setDropDown(!dropDown)}}>
          <Text style={styles.title}>필수 약관 전체동의</Text>
          {
            dropDown ? 
            <Image style={styles.subtitle} source={require("../../assets/img/label_point/dropUpPoint.png")}/>
            :
            <Image style={styles.subtitle} source={require("../../assets/img/label_point/dropDownPoint.png")}/>
          }
          </TouchableOpacity>
        </View>
        {
          dropDown ?
          <View style={styles.dropContainer}>
            <Text>wqrqweqweqwuievhqwirvqwiv</Text>
          </View>
          :
          null
        }
      </View>
    </View>
  )
};


const styles = EStyleSheet.create({
  container:{
    alignItems: "center", 
    justifyContent: "center",
  },
  itemContainer:{
    width:"100%",
    paddingLeft:"15rem",
    paddingRight:"15rem",
    alignItems: "center", 
  },
  row:{
    width:"100%",
    height:"40rem",
    flexDirection: 'row',
    alignItems: "center", 
    justifyContent: "center",
  },
  checkContainer:{
    width:"8%",
    height:"100%",
    alignItems: "center", 
    justifyContent: "center",
  },
  titleContainer:{ 
    width:"92%",
    paddingLeft:"4rem",
    marginRight:"auto",
    flexDirection: 'row',
    alignItems: "center", 
    justifyContent: "center",
  },
  subtitle:{
    marginLeft:"auto",
  },
  title:{
    fontFamily:"NotoSansKR-Regular",
    color:"#000000",
    fontSize:"15rem",
    marginRight:"auto",
  },
  dropContainer:{
    width:"100%",
  },
});