import * as React from 'react';
import { Text,Image, View, Dimensions,ScrollView,StyleSheet, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationHelpersContext, useNavigation,useRoute } from '@react-navigation/native';
import userInfoSingleton from '../../../db/userInfoSingleton';

export default function ProfileContent({title,navi, onPress}) {

  const navigation = useNavigation();
  const moveToPage = () =>{
    if(navi)
    navigation.navigate(navi);
    return;
  }
    return (
      <View style={styles.container}>
          <TouchableOpacity style={styles.touchableOpacity} 
              onPress={moveToPage}
            >
            <View style={styles.infoColum}>
              <Text style={styles.label}>{title}</Text>
            </View>
          </TouchableOpacity>
      </View>
    );
  }
  

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });


const styles = EStyleSheet.create({
  container: {
    marginTop:"1rem",
    alignItems: "center",
    justifyContent: "center",
  },
  infoColum:{
    width:"347.645rem",
    height:"50rem",   
    flexDirection: 'row',    
    alignItems: "center",
    justifyContent: "center",
  },
  label:{
    color:"black",
    fontSize:15,
    fontFamily:"NotoSansKR-Regular",
    textAlign:"center",
  },
  touchableOpacity:{
    width:"100%",
  },

});
