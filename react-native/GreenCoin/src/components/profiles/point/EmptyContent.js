import * as React from 'react';
import { Text, View, Dimensions, Platform, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

export default function MainEventBanner({label}) {
    return (
      <View style={styles.container}>
        <View style={styles.labelContainer}>
          <Text Text style={styles.label}>{label[0]}</Text>
          <Text Text style={styles.labelBottom}>{label[1]}</Text>
        </View>
      </View>
    );
  }
  


const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });


const styles = EStyleSheet.create({
  container: {
    width:'100%',
    height:'100%',
  },
  labelContainer:{
    top:"42.611rem",
    alignItems: "center",
    justifyContent: "center",
  },
  label:{
    fontSize:"13.873rem",
    color:"#878787",
    fontFamily:"NotoSansKR-Regular",
  },
  labelBottom:{
    fontSize:"13.873rem",
    color:"#878787",
    fontFamily:"NotoSansKR-Regular",
    bottom: Platform.OS != "ios" ? "12rem" : 0 
  }
});