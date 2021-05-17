import React,{useState} from 'react';
import { Text,Image, View, Dimensions,ScrollView,StyleSheet, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { TouchableOpacity } from 'react-native-gesture-handler';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

const getDefaultTitleName = (addr_base) =>{
  switch(addr_base){
    case "0": return "현재 위치로 배송";
    case "1": return "집";
    case "2": return "회사";
  } 
}


export default function AddressSaveList({item,icon,clickAddress,clickDelete,defaultTitle}) {

  const [deleteVisible,setDeleteVisible] = useState(false);


  const onSwipeLeft =()=> {
    setDeleteVisible(true);
  }

  const onSwipeRight =()=> {
    setDeleteVisible(false);
  }
  
const getIconFromicon = (base) =>{
  switch(base){
    case "0": return require('../../../assets/img/address/currentPoint.png');
    case "1": return require('../../../assets/img/address/home.png');
    case "2": return require('../../../assets/img/address/company.png');
    case "3": return require('../../../assets/img/address/mark.png');
    default : return require('../../../assets/img/address/mark.png');
  } 
}

    return (
      <GestureRecognizer style={styles.container}
          onSwipeLeft={() => onSwipeLeft()}
          onSwipeRight={() => onSwipeRight()}
        >
          <View style={styles.touchableOpacity}
            >
            <TouchableOpacity style={deleteVisible ? styles.infoColumDelete : styles.infoColum }
              activeOpacity={1} 
              onLongPress={()=>{ setDeleteVisible(e=>!e);}}
              onPress={()=>{onSwipeRight(); 
                clickAddress != undefined ? 
                clickAddress(item) 
                : 
                null}}
            >
              <View style={styles.iconContainer}>
                <Image source={getIconFromicon(icon)}></Image>
              </View>
              {
                item.addr_base == undefined ?   
                <View>
                  <Text style={styles.defaultTitle}>{defaultTitle}</Text>
                </View>
                :
                null
              }
            
              {
                item.addr_title != undefined ? 
                <View style={styles.labelContainer}> 
                  <Text style={styles.title}>{clickDelete == undefined ? getDefaultTitleName(item.addr_base) : item.addr_wireline}</Text>
                  <Text style={styles.subtitle}>{ item.addr_title == undefined || item.addr_title == "undefined" ? "" : item.addr_title}</Text>
                </View>
                :
                null
              }
            </TouchableOpacity>
            {
              deleteVisible && clickDelete
              ?
              <TouchableOpacity style={styles.deleteContainer}  onPress={()=>{clickDelete(item)}}    activeOpacity={.8} >
                <Text style={styles.delete}>삭제</Text>
              </TouchableOpacity>
              :
              null
            }
          </View>
      </GestureRecognizer>
    );
  }
  

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });


const styles = EStyleSheet.create({
  container: {
    borderBottomWidth:1,
    borderBottomColor :"#efefef", 
    backgroundColor:"white",
    marginTop:"1rem",
    alignItems: "center",
    padding:"10rem",
    justifyContent: "center",
  },
  iconContainer:{
    width:"40rem",
    alignItems: "center",
    justifyContent: "center",
    right:"5rem",
  },
  labelContainer:{
    padding:"5rem",
    paddingRight:"20rem",
    paddingLeft:"20rem",
    alignItems: "center",
    justifyContent: "center",
  },
  infoColum:{
    width:"380rem",
    height:"66.448rem",   
    flexDirection: 'row',    
    alignItems: "center",
  },
  infoColumDelete:{
    width:"280rem",
    height:"63.448rem",   
    flexDirection: 'row',    
    alignItems: "center",
  },
  defaultTitle:{
    color:"black",
    fontSize:"15rem",
    fontFamily:"NotoSansKR-Regular",
    marginRight:"auto",
  },
  title:{
    color:"black",
    fontSize:"15rem",
    fontFamily:"NotoSansKR-Regular",
    marginRight:"auto",
    top:"20rem",
  },
  subtitle:{
    color:"grey",
    fontSize:"13.873rem",
    fontFamily:"NotoSansKR-Regular",
    bottom:"-1rem",
    marginRight:"auto",
  },
  touchableOpacity:{
    width:"100%",
    flexDirection: 'row',  
    paddingLeft:"20rem",
  },
  deleteContainer:{
    width:"70rem",
    height:"63.448rem",   
    backgroundColor:"black",
    alignItems: "center",
    justifyContent: "center",
  },
  delete:{
    color:"white",
  },

});