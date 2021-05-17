import React,{useState}  from 'react';
import { Text,Image, View, Dimensions,ScrollView,StyleSheet,TouchableOpacity, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { useNavigation } from '@react-navigation/native';

export default function WriteAskTitle({saveData}) {
  const navigation = useNavigation();
    return (
      <View style={styles.container}>
          <View style={styles.itemContainer}>
              <TouchableOpacity style={styles.canceleBox} onPress={()=>{navigation.goBack();}}>
                  <Text>취소</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.okayBox} onPress={saveData}>
                  <Text style={styles.okay}>등록</Text>
              </TouchableOpacity>
          </View>
      </View>
    );
  }


const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });


const styles = EStyleSheet.create({
  container: {
    width:"100%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom:"45rem",
    marginTop:"5rem",
  },
  itemContainer:{
    width:"100%",
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
  },
  canceleBox:{
    width:"72rem",
    height:"40rem",
    marginRight:"10rem",
    borderWidth: 1,
    borderRadius:5,
    alignItems: "center",
    justifyContent: "center",
  },  
  okayBox:{
    width:"72rem",
    height:"40rem",
    borderWidth: 1,
    borderRadius:5,
    backgroundColor:"#0D2141",
    alignItems: "center",
    justifyContent: "center",
  },
  okay:{
    color:"white",
  }
 

});
