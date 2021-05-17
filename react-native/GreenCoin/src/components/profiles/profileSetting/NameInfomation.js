import * as React from 'react';
import { Text, View, Dimensions,TextInput} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

export default function NameInfomation({name ,setName}) {
    return (
      <View style={styles.container}>
        <View style={styles.itemContainer}>
            <Text style={styles.title}>이름</Text>
            <TextInput style={styles.textInput} onChangeText={(e)=>{setName(e)}}>{name}</TextInput>
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
  textInput:{
    borderColor:"#efefef",
    borderWidth: 1,
    borderRadius: 10,
    textAlign: 'center',
    height:"36rem",
    width:"160rem",
    marginRight:"10rem",
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