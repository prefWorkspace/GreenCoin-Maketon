import * as React from 'react';
import { TouchableOpacity, Text,Image, View, Dimensions,ScrollView,StyleSheet, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { useNavigation ,useRoute } from '@react-navigation/native';
import userInfoSingleton from '../../../db/userInfoSingleton';

export default function MainAreaTitle() {
  const navigation = useNavigation();
  const routeInfo = useRoute();

    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.titleAreaBody} onPress={()=>{navigation.navigate("selectArea")}}>
          <Text style={styles.titleLabel}>{userInfoSingleton.getInstance()._location_fullname}</Text>
          <Image style={styles.titleAddressPoint} source={require('../../../assets/img/label_point/rightClickPoint.png')}></Image>
        </TouchableOpacity>
      </View>
    );
  }
  

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });


const styles = EStyleSheet.create({
  container: {
    flexDirection: 'row',
    width :"380rem",
    paddingLeft:"20rem",
    backgroundColor:"#F8F7F7"
  },
  titleAreaBody:{
    flexDirection: 'row',
    width:"240rem",
    // padding:"10rem",
    height:"50.42rem",
    alignItems: "center",
    // justifyContent: "center",
  },
  titleLabel:{
    textAlign:"center",
    fontSize :"14rem",
    fontWeight:'bold',
    color:"#505050",
  },
  titleAddressPoint:{
    marginLeft:"5rem",
  },

});
