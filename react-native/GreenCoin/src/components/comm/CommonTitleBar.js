import * as React from 'react';
import { Text,Image, View, Dimensions,ScrollView,TouchableOpacity, Platform, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { useNavigation } from '@react-navigation/native';

const Data = {
  option: <Image source={require('../../assets/img/title/option.png')}></Image>,
  close: <Image source={require('../../assets/img/title/close.png')}></Image>,
  back: <Image source={require('../../assets/img/label_point/leftClickPoint.png')}></Image>,
  closeText: <Text>취소</Text>,
  submitText: <Text>완료</Text>,
  nextText :  <Text>다음</Text>,
  dropDown : <Image source={require('../../assets/img/label_point/titleAddressPoint.png')}></Image>,
};

export default function CommonTitleBar({title,leftOption,leftClick,rightOption,rightClick,bottom,direction ,shadow}) {
    const navigation = useNavigation();
    return (
      <View style={ direction == undefined || direction == false ? ([styles.container, bottom == undefined ? { backgroundColor :"white",shadowRadius: 3, elevation: 2} : null]) : {display:'none'} }>
        <View style={ bottom == false ? styles.defaultContainer : [styles.shadowContainer, (shadow == false ? null : styles.shadow)]}>
          <TouchableOpacity style={styles.leftContainer} onPress={()=>{leftClick == undefined ? (leftOption ? navigation.canGoBack() ? navigation.goBack() : null : null ) : leftClick()}}>
          {
            Data[leftOption] == undefined ? <Text>{leftOption}</Text> : Data[leftOption] 
          }
          </TouchableOpacity>
          <View styles={styles.titleContainer}>
            <Text style={styles.titleLabel}>{title}</Text>
          </View>
          <TouchableOpacity style={styles.rightContainer} onPress={()=>{rightClick == undefined ? (rightOption ? navigation.goBack() : null ): rightClick()}}>
          {
            Data[rightOption] == undefined ? <Text>{rightOption}</Text> : Data[rightOption] 
          }
          </TouchableOpacity>
        </View>
      </View>
    );
}
  
const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });


const styles = EStyleSheet.create({
  container: {
    height: Platform.OS != "ios" ? "62rem" : "60rem",
    paddingBottom: "30rem",
    marginBottom:"12rem",
  },
  defaultContainer:{
    width:"100%",
    height:"68rem",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: 'row',
  },
  shadowContainer:{
    backgroundColor:"white",
    width:"100%",
    height: Platform.OS != "ios" ? "62rem" : "60rem",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: 'row',
  },
  shadow:{
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity:  0.4,
    shadowRadius: 1,
    elevation: 6,
  },
  leftContainer:{
    width:"40rem",
    height:"40rem",
    marginLeft:"10rem",
    paddingLeft:"4rem",
    marginRight:"auto", 
    alignItems: "center",
    justifyContent: "center",
    backgroundColor:"white",
    borderRadius : 100
  },
  rightContainer:{
    width:"17.5%",
    height:"100%",
    marginLeft:"auto",    
    alignItems: "center",
    justifyContent: "center",
  },
  titleContainer:{
    width:"65%",
    height:"100%",
    backgroundColor:"grey",
  },
  titleLabel:{
    textAlign:"center",
    fontSize :"18rem",
    fontWeight:'bold',
    top:"1rem"
  },
  

});