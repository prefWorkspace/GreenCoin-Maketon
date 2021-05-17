import * as React from 'react';
import { Text,Image, View, Dimensions,ScrollView,StyleSheet, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { TouchableOpacity } from 'react-native-gesture-handler';
//
export default function ReapQNASubtitle({title}) {
    return (
      <View style={styles.container}>
          <View style={styles.infoColum}>
              <Text style={styles.title}>{title}</Text>
          </View>
      </View>
    );
  }


const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });


const styles = EStyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth:1,
    borderBottomColor :"#efefef",
    backgroundColor:"white",
    marginBottom:"5rem",
  },
  infoColum:{
    width:"90%",
    height:"64.412rem",   
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth:1.5,
    borderBottomColor :"black",
  },
  title:{
    color:"black",
    marginRight:"auto",
    fontFamily:"NotoSansKR-Bold",
    fontSize:"16.846rem",
  },

});
