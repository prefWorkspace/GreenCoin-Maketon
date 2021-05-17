import * as React from 'react';
import { Text, View, Dimensions, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

export default function IdInformation({id}) {
    return (
      <View style={styles.container}>
        <View style={styles.itemContainer}>
            <Text style={styles.title}>아이디</Text>
            <Text>{id}</Text>
        </View>
        <View style={styles.hr}></View>
      </View>
    );
  }
  


const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });


const styles = EStyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",

  },
  itemContainer:{
    width:"86%",
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
    height:'59.457rem',
  },
  title:{
      marginRight:"auto",
      fontSize:"14.864rem",
  },
  hr:{
    marginTop:"auto",
    width:"86%",
    borderBottomColor: '#efefef',
    borderBottomWidth: 1.2,
  }, 
});