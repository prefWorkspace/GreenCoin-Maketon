import * as React from 'react';
import { TouchableOpacity, Text,Image, View, Dimensions,ScrollView,StyleSheet, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { useNavigation ,useRoute } from '@react-navigation/native';
import userInfoSingleton from '../../../db/userInfoSingleton';

export default function MainTitle() {
  const navigation = useNavigation();
  const routeInfo = useRoute();

    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.titleLeft} onPress={()=>{navigation.navigate("main")}}>
          <Image style={styles.logoImage} source={require('../../../assets/img/logo/MainLogo.png')} resizeMode="stretch" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.titleRight}  onPress={()=>{  navigation.navigate(""); }}>
          <Image style={styles.searchImage} source={require('../../../assets/img/logo/profile.png')}/>
        </TouchableOpacity>
      </View>
    );
  }
  

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });


const styles = EStyleSheet.create({
  container: {
    flexDirection: 'row',
    height :"68.42rem",
    justifyContent: "center",
    right:"10rem",
  },
  titleLeft:{
    flexDirection: 'row',
    padding:"10rem",
    paddingLeft:"30rem",
    height:"68.42rem",
    marginRight:"auto",
  },
  titleRight:{
    flexDirection: 'row',
    padding:"10rem",
    height:"68.42rem",
    marginLeft:"auto",
  },
 
  logoImage:{
    height:"40.62rem",
    width:"123.09rem"
  },
  searchImage:{
    width :"40.62rem",
    height:"40.62rem",
    backgroundColor:"grey",
    borderRadius:50,

    
  }

});
