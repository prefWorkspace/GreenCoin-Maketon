import * as React from 'react';
import { Text,Image, View, Dimensions,ScrollView,StyleSheet, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

export default function MarginBox({height,title ,backgroundColor , marginTop , marginBottom , width ,customStyle}) {

    return (
      <View style={[styles.container,{
        height:height, 
        backgroundColor : backgroundColor ? backgroundColor : "white",
        marginTop : marginTop ? marginTop : 0,
        marginBottom : marginBottom ? marginBottom : 0,
        width:width ? width : "100%",
        },
        customStyle
        ]}>
          <Text style={styles.titleLabel}>{title}</Text>
      </View>
    );
  }
  


const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });


const styles = EStyleSheet.create({
  container: {
    flexDirection: 'row',
    width:"100%",
    alignItems: "center",
    justifyContent: "center",
  },
});