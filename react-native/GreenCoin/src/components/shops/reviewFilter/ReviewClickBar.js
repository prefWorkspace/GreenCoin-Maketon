import React,{useState}  from 'react';
import { Text,Image, View, Dimensions,ScrollView,TextInput,TouchableOpacity, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';



export default function ReviewSearchBar({style , title,color,clickEvent}) {
    //
    return (
      <View style={styles.container}>
          <TouchableOpacity style={[styles.itemContainer,style]} onPress={clickEvent}>
            <Text style={[styles.title,{color:color}]}>{title}</Text>
          </TouchableOpacity>
      </View>
    );
  }

//
//<Text style={styles.example}>asdsadas</Text>
const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });


const styles = EStyleSheet.create({
  container: {
    width:"100%",
    alignItems: "center",
    justifyContent: "center",
    paddingTop:"10rem", 
  },
  itemContainer:{
    width:"100%",
    height:"45rem",
    borderColor:"#E1E6ED",
    alignItems: "center",
    justifyContent: "center",
  },
  title:{
    color:"black",
    fontFamily:"NotoSansKR-Bold",
  },
});
