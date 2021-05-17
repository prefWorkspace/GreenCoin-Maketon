import * as React from 'react';
import { Text,Image, View, Dimensions,ScrollView,StyleSheet, TouchableOpacity, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

export default function ApplySimpleSign() {
    return (
      <View style={styles.container}>
          <TouchableOpacity style={styles.infoColum} onPress={()=>{Alert.alert(" ","준비중입니다.")}}>
            <Text style={styles.label}>간편 결제 등록</Text>
          </TouchableOpacity>
      </View>
    );
  }
  

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });


const styles = EStyleSheet.create({
  container: {
    height:"90rem",
    alignItems: "center",
    justifyContent: "center",   
    marginBottom:"10rem",
  },
  infoColum:{
    width:"347.645rem",
    height:"58.448rem",   
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
    backgroundColor:"#26CBFF",
    borderRadius:50,
  },
  label:{
    color:"white",
    fontSize:"13.873rem",
  }

});
