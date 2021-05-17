import * as React from 'react';
import { Text,Image, View, Dimensions,TouchableOpacity,StyleSheet, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

export default function AddressSaveList({title,subtitle,navigation,back}) {
    return (
      <View style={styles.container}>
          <TouchableOpacity style={styles.touchableOpacity} 
              onPress={()=>{ back ? navigation.goBack() : ""}}
            >
            <View style={styles.infoColum}>
              <View style={styles.iconContainer}>
                <Image style={styles.image} source={require('../../../assets/img/address/mark.png')} resizeMode={'stretch'}/>
              </View>
              <View style={styles.labelContainer}> 
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.subtitle}>{subtitle}</Text>
              </View>
              
            </View>
          </TouchableOpacity>
      </View>
    );
  }
  

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });


const styles = EStyleSheet.create({
  container: {
    width:"100%",
    borderBottomWidth:1,
    borderBottomColor :"#efefef", 
    backgroundColor:"white",
    marginTop:"1rem",
    alignItems: "center",
    justifyContent: "center",
    padding:"10rem",
  },
  iconContainer:{
    width:"35rem",
    alignItems: "center",
    justifyContent: "center",
  },
  labelContainer:{
    width:"100%",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  infoColum:{
    width:"347.645rem",
    height:"58.448rem",   
    flexDirection: 'row',    
    alignItems: "center",
    justifyContent: "flex-start",
  },
  title:{
    color:"black",
    fontSize:"14rem",
    fontFamily:"NotoSansKR-Regular",
    marginRight:"auto",
    top:"8rem",
  },
  subtitle:{
    color:"grey",
    fontSize:"14rem",
    fontFamily:"NotoSansKR-Regular",
    bottom:"8rem",
    marginRight:"auto",
  },
  touchableOpacity:{
    width:"100%",
  },
  image:{
    width:"18rem",
    height:"25rem",
  }

});