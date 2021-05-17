import * as React from 'react';
import { Text,Image, View, Dimensions,ScrollView,StyleSheet, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

export default function ProfileSubtitle({title}) {
    return (
      <View style={styles.container}>
          <View style={styles.infoColum}>
            <Text style={styles.label}>{title}</Text>
          </View>
      </View>
    );
  }
  

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });


const styles = EStyleSheet.create({
  container: {
    paddingLeft:"20rem",
    borderBottomWidth:1,
    borderBottomColor :"#F4F6F9",
    borderTopWidth:"5rem",
    borderTopColor :"#F4F6F9",
    backgroundColor:"white",
    alignItems: "center",
    justifyContent: "center",

  },
  infoColum:{
    width:"347.645rem",
    height:"76.448rem",   
    flexDirection: 'row',    
    alignItems: "center",
    justifyContent: "flex-start",
  },
  label:{
    color:"black",
    fontSize:"13.873rem",
    fontFamily:"Montserrat-Bold",
    bottom:"2rem"
  }

});
